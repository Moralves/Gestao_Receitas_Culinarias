import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { combineLatest, map, startWith } from 'rxjs';

import { Category } from '../../models/category.model';
import { Recipe } from '../../models/recipe.model';
import { CategoriesService } from '../../services/categories.service';
import { RecipesService } from '../../services/recipes.service';

interface RecipeFilters {
  search: string;
  categoryId: string;
}

interface RecipeCard {
  id: string;
  title: string;
  description: string;
  categoryName: string;
  servings: number;
  prepTimeMinutes: number;
}

interface RecipesViewModel {
  recipes: RecipeCard[];
  categories: Category[];
  total: number;
  filteredTotal: number;
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
  private readonly categoriesService = inject(CategoriesService);
  private readonly recipesService = inject(RecipesService);

  /**
   * Filter form used to refine the list of recipes.
   */
  readonly filterForm = this.fb.nonNullable.group({
    search: '',
    categoryId: 'all'
  });

  /**
   * View model for the recipes list.
   */
  private readonly filters$ = this.filterForm.valueChanges.pipe(
    startWith(this.filterForm.getRawValue()),
    map((value) => ({
      search: value.search ?? '',
      categoryId: value.categoryId ?? 'all'
    }))
  );

  readonly viewModel$ = combineLatest([
    this.recipesService.recipes$,
    this.categoriesService.categories$,
    this.filters$
  ]).pipe(
    map(([recipes, categories, filters]) =>
      this.toViewModel(recipes, categories, filters)
    )
  );

  /**
   * Track recipes by id for stable rendering.
   */
  readonly trackByRecipe = (_: number, recipe: RecipeCard) => recipe.id;

  /**
   * Track categories by id for stable rendering.
   */
  readonly trackByCategory = (_: number, category: Category) => category.id;

  removeRecipe(id: string, title: string): void {
    const confirmed = window.confirm(
      `Remover a receita "${title}"?`
    );
    if (!confirmed) {
      return;
    }

    this.recipesService.remove(id);
  }

  private toViewModel(
    recipes: Recipe[],
    categories: Category[],
    filters: RecipeFilters
  ): RecipesViewModel {
    const categoryMap = new Map(
      categories.map((category) => [category.id, category.name])
    );

    const filtered = this.applyFilters(recipes, filters);
    const cards = filtered.map((recipe) => ({
      id: recipe.id,
      title: recipe.title,
      description: recipe.description,
      categoryName: categoryMap.get(recipe.categoryId) ?? 'Sem categoria',
      servings: recipe.servings,
      prepTimeMinutes: recipe.prepTimeMinutes
    }));

    return {
      recipes: cards,
      categories,
      total: recipes.length,
      filteredTotal: cards.length
    };
  }

  private applyFilters(
    recipes: Recipe[],
    filters: RecipeFilters
  ): Recipe[] {
    const search = this.normalize(filters.search);
    return recipes.filter((recipe) => {
      const matchesSearch = !search
        || this.normalize(recipe.title).includes(search)
        || recipe.ingredients.some((item) =>
          this.normalize(item).includes(search)
        );

      const matchesCategory =
        filters.categoryId === 'all'
        || recipe.categoryId === filters.categoryId;

      return matchesSearch && matchesCategory;
    });
  }

  private normalize(value: string): string {
    return value
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();
  }
}
