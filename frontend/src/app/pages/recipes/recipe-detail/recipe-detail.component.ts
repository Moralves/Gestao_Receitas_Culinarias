import { AsyncPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { catchError, map, of } from 'rxjs';

import { Recipe, recipeCategoryLabels } from '../../../models/recipe.model';
import { RecipesService } from '../../../services/recipes.service';

interface RecipeDetailViewModel {
  recipe: Recipe | null;
  categoryLabel: string;
  errorMessage: string;
}

/**
 * Detail view for a single recipe.
 */
@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [AsyncPipe, DatePipe, NgFor, NgIf, RouterLink],
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly recipesService = inject(RecipesService);

  private readonly recipeId = Number(this.route.snapshot.paramMap.get('id'));

  /**
   * View model for the detail screen.
   */
  readonly viewModel$ = this.recipeId
    ? this.recipesService.getById(this.recipeId).pipe(
      map((recipe) => this.buildViewModel(recipe)),
      catchError((error) =>
        of({
          recipe: null,
          categoryLabel: '',
          errorMessage: error?.status === 404
            ? 'Receita nao encontrada.'
            : 'Nao foi possivel carregar a receita.'
        })
      )
    )
    : of({
      recipe: null,
      categoryLabel: '',
      errorMessage: 'Receita nao encontrada.'
    });

  /**
   * Track list entries by index.
   */
  readonly trackByIndex = (index: number) => index;

  removeRecipe(recipe: Recipe): void {
    const confirmed = window.confirm(
      `Remover a receita "${recipe.nome}"?`
    );
    if (!confirmed) {
      return;
    }

    this.recipesService.remove(recipe.id).subscribe({
      next: () => {
        this.router.navigate(['/receitas'], {
          queryParams: { sucesso: 'excluida' }
        });
      }
    });
  }

  private buildViewModel(
    recipe: Recipe
  ): RecipeDetailViewModel {
    return {
      recipe,
      categoryLabel: recipeCategoryLabels[recipe.categoria] ?? recipe.categoria,
      errorMessage: ''
    };
  }
}
