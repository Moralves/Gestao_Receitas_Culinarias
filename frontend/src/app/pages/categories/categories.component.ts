import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { combineLatest, map } from 'rxjs';

import { Category } from '../../models/category.model';
import { CategoriesService } from '../../services/categories.service';
import { RecipesService } from '../../services/recipes.service';

interface CategoryView {
  id: string;
  name: string;
  description: string;
  recipeCount: number;
  canDelete: boolean;
}

/**
 * Categories CRUD with inline editing.
 */
@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf, ReactiveFormsModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesComponent {
  private readonly fb = inject(FormBuilder);
  private readonly categoriesService = inject(CategoriesService);
  private readonly recipesService = inject(RecipesService);

  /**
   * Form used to create or edit categories.
   */
  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(40)]],
    description: ['', [Validators.maxLength(120)]]
  });

  /**
   * Currently edited category id, if any.
   */
  editingId: string | null = null;

  /**
   * Displays validation feedback not covered by form validators.
   */
  errorMessage = '';

  /**
   * View model for categories list.
   */
  readonly viewModel$ = combineLatest([
    this.categoriesService.categories$,
    this.recipesService.recipes$
  ]).pipe(
    map(([categories, recipes]) => ({
      categories: categories.map((category) => {
        const count = recipes.filter(
          (recipe) => recipe.categoryId === category.id
        ).length;

        return {
          id: category.id,
          name: category.name,
          description: category.description,
          recipeCount: count,
          canDelete: count === 0
        };
      })
    }))
  );

  /**
   * Track categories by id for stable rendering.
   */
  readonly trackByCategory = (_: number, category: CategoryView) => category.id;

  saveCategory(): void {
    this.errorMessage = '';
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();
    if (this.categoriesService.nameExists(value.name, this.editingId ?? undefined)) {
      this.errorMessage = 'Ja existe uma categoria com esse nome.';
      return;
    }

    if (this.editingId) {
      this.categoriesService.update(this.editingId, value);
    } else {
      this.categoriesService.create(value);
    }

    this.resetForm();
  }

  startEdit(category: CategoryView): void {
    this.editingId = category.id;
    this.form.setValue({
      name: category.name,
      description: category.description
    });
    this.errorMessage = '';
  }

  cancelEdit(): void {
    this.resetForm();
  }

  removeCategory(category: CategoryView): void {
    this.errorMessage = '';
    if (!category.canDelete) {
      this.errorMessage = 'Nao e possivel remover categorias com receitas.';
      return;
    }

    const confirmed = window.confirm(
      `Remover a categoria "${category.name}"?`
    );
    if (!confirmed) {
      return;
    }

    this.categoriesService.remove(category.id);
    if (this.editingId === category.id) {
      this.resetForm();
    }
  }

  clearError(): void {
    this.errorMessage = '';
  }

  private resetForm(): void {
    this.editingId = null;
    this.form.reset({
      name: '',
      description: ''
    });
  }
}
