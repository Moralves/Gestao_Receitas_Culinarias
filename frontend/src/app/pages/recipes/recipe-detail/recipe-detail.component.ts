import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { combineLatest, map } from 'rxjs';

import { Category } from '../../../models/category.model';
import { Recipe } from '../../../models/recipe.model';
import { CategoriesService } from '../../../services/categories.service';
import { RecipesService } from '../../../services/recipes.service';

interface RecipeDetailViewModel {
  recipe: Recipe | null;
  categoryName: string;
}

/**
 * Detail view for a single recipe.
 */
@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf, RouterLink],
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly recipesService = inject(RecipesService);
  private readonly categoriesService = inject(CategoriesService);

  private readonly recipeId = this.route.snapshot.paramMap.get('id');

  /**
   * View model for the detail screen.
   */
  readonly viewModel$ = combineLatest([
    this.recipesService.recipes$,
    this.categoriesService.categories$
  ]).pipe(
    map(([recipes, categories]) =>
      this.buildViewModel(recipes, categories)
    )
  );

  /**
   * Track list entries by index.
   */
  readonly trackByIndex = (index: number) => index;

  removeRecipe(recipe: Recipe): void {
    const confirmed = window.confirm(
      `Remover a receita "${recipe.title}"?`
    );
    if (!confirmed) {
      return;
    }

    this.recipesService.remove(recipe.id);
    this.router.navigate(['/receitas']);
  }

  private buildViewModel(
    recipes: Recipe[],
    categories: Category[]
  ): RecipeDetailViewModel {
    if (!this.recipeId) {
      return { recipe: null, categoryName: '' };
    }

    const recipe = recipes.find((item) => item.id === this.recipeId) ?? null;
    if (!recipe) {
      return { recipe: null, categoryName: '' };
    }

    const categoryName =
      categories.find((category) => category.id === recipe.categoryId)?.name
      ?? 'Sem categoria';

    return { recipe, categoryName };
  }
}
