import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BehaviorSubject, catchError, combineLatest, debounceTime, distinctUntilChanged, map, of, startWith, switchMap, take } from 'rxjs';

import { Recipe, recipeCategoryLabels } from '../../models/recipe.model';
import { RecipesService } from '../../services/recipes.service';

interface RecipeCard {
  id: number;
  nome: string;
  categoriaLabel: string;
  tempoPreparo: number;
}

interface RecipesViewModel {
  recipes: RecipeCard[];
  total: number;
  search: string;
  errorMessage: string;
}

/**
 * Recipes list with filtering and primary actions.
 */
@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf, ReactiveFormsModule, RouterLink],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipesComponent {
  private readonly fb = inject(FormBuilder);
  private readonly recipesService = inject(RecipesService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly refreshSubject = new BehaviorSubject<void>(undefined);
  private readonly successMessageSubject = new BehaviorSubject<string>('');
  private readonly errorMessageSubject = new BehaviorSubject<string>('');

  /**
   * Success message displayed after create/delete actions.
   */
  readonly successMessage$ = this.successMessageSubject.asObservable();

  /**
   * Error message displayed when an action fails.
   */
  readonly errorMessage$ = this.errorMessageSubject.asObservable();

  /**
   * Filter form used to refine the list of recipes.
   */
  readonly filterForm = this.fb.nonNullable.group({
    search: ''
  });

  /**
   * View model for the recipes list.
   */
  private readonly search$ = this.filterForm.controls.search.valueChanges.pipe(
    startWith(this.filterForm.controls.search.value ?? ''),
    map((value) => value?.trim() ?? ''),
    debounceTime(250),
    distinctUntilChanged()
  );

  readonly viewModel$ = combineLatest([this.search$, this.refreshSubject]).pipe(
    map(([search]) => search),
    switchMap((search) =>
      this.recipesService.list(search).pipe(
        map((recipes) => this.toViewModel(recipes, search)),
        catchError(() =>
          of({
            recipes: [],
            total: 0,
            search,
            errorMessage: 'Nao foi possivel carregar as receitas.'
          })
        )
      )
    )
  );

  /**
   * Track recipes by id for stable rendering.
   */
  readonly trackByRecipe = (_: number, recipe: RecipeCard) => recipe.id;

  removeRecipe(id: number, title: string): void {
    const confirmed = window.confirm(
      `Remover a receita "${title}"?`
    );
    if (!confirmed) {
      return;
    }

    this.recipesService.remove(id).subscribe({
      next: () => {
        this.successMessageSubject.next('Receita removida com sucesso.');
        this.errorMessageSubject.next('');
        this.refreshSubject.next();
      },
      error: () => {
        this.errorMessageSubject.next('Nao foi possivel remover a receita.');
        this.successMessageSubject.next('');
      }
    });
  }

  constructor() {
    this.route.queryParamMap.pipe(take(1)).subscribe((params) => {
      const success = params.get('sucesso');
      if (!success) {
        return;
      }

      if (success === 'cadastrada') {
        this.successMessageSubject.next('Receita cadastrada com sucesso.');
        this.errorMessageSubject.next('');
      }

      if (success === 'excluida') {
        this.successMessageSubject.next('Receita removida com sucesso.');
        this.errorMessageSubject.next('');
      }

      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { sucesso: null },
        queryParamsHandling: 'merge',
        replaceUrl: true
      });
    });
  }

  private toViewModel(recipes: Recipe[], search: string): RecipesViewModel {
    const cards = recipes.map((recipe) => ({
      id: recipe.id,
      nome: recipe.nome,
      categoriaLabel: recipeCategoryLabels[recipe.categoria] ?? recipe.categoria,
      tempoPreparo: recipe.tempoPreparo
    }));

    return {
      recipes: cards,
      total: recipes.length,
      search,
      errorMessage: ''
    };
  }
}
