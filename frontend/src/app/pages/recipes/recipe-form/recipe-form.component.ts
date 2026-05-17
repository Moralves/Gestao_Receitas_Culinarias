import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { take } from 'rxjs';

import { Category } from '../../../models/category.model';
import { RecipeInput } from '../../../models/recipe.model';
import { CategoriesService } from '../../../services/categories.service';
import { RecipesService } from '../../../services/recipes.service';

interface RecipeFormValue {
  title: string;
  description: string;
  categoryId: string;
  servings: number;
  prepTimeMinutes: number;
  ingredients: string[];
  steps: string[];
}

/**
 * Form used to create or update recipes.
 */
@Component({
  selector: 'app-recipe-form',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf, ReactiveFormsModule, RouterLink],
  templateUrl: './recipe-form.component.html',
  styleUrl: './recipe-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly recipesService = inject(RecipesService);
  private readonly categoriesService = inject(CategoriesService);

  readonly categories$ = this.categoriesService.categories$;
  readonly recipeId = this.route.snapshot.paramMap.get('id');
  readonly isEditMode = Boolean(this.recipeId);
  readonly pageTitle = this.isEditMode ? 'Editar receita' : 'Nova receita';
  readonly submitLabel = this.isEditMode ? 'Salvar alteracoes' : 'Cadastrar receita';

  notFound = false;

  /**
   * Main reactive form for recipes.
   */
  readonly form = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.maxLength(80)]],
    description: ['', [Validators.required, Validators.maxLength(220)]],
    categoryId: ['', Validators.required],
    servings: [2, [Validators.required, Validators.min(1), Validators.max(30)]],
    prepTimeMinutes: [
      30,
      [Validators.required, Validators.min(5), Validators.max(600)]
    ],
    ingredients: this.fb.nonNullable.array([this.createLineControl()]),
    steps: this.fb.nonNullable.array([this.createLineControl()])
  });

  constructor() {
    this.hydrateForm();
  }

  /**
   * Shortcut for ingredients form array.
   */
  get ingredients(): FormArray<FormControl<string>> {
    return this.form.controls.ingredients as FormArray<FormControl<string>>;
  }

  /**
   * Shortcut for steps form array.
   */
  get steps(): FormArray<FormControl<string>> {
    return this.form.controls.steps as FormArray<FormControl<string>>;
  }

  /**
   * Track list items by index.
   */
  readonly trackByIndex = (index: number) => index;

  /**
   * Track categories by id for stable rendering.
   */
  readonly trackByCategory = (_: number, category: Category) => category.id;

  addIngredient(): void {
    this.ingredients.push(this.createLineControl());
  }

  removeIngredient(index: number): void {
    if (this.ingredients.length <= 1) {
      return;
    }
    this.ingredients.removeAt(index);
  }

  addStep(): void {
    this.steps.push(this.createLineControl());
  }

  removeStep(index: number): void {
    if (this.steps.length <= 1) {
      return;
    }
    this.steps.removeAt(index);
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue() as RecipeFormValue;
    const payload: RecipeInput = {
      title: value.title,
      description: value.description,
      categoryId: value.categoryId,
      servings: value.servings,
      prepTimeMinutes: value.prepTimeMinutes,
      ingredients: this.cleanList(value.ingredients),
      steps: this.cleanList(value.steps)
    };

    if (this.recipeId) {
      this.recipesService.update(this.recipeId, payload);
      this.router.navigate(['/receitas', this.recipeId]);
      return;
    }

    const created = this.recipesService.create(payload);
    this.router.navigate(['/receitas', created.id]);
  }

  private hydrateForm(): void {
    if (this.recipeId) {
      const recipe = this.recipesService.getById(this.recipeId);
      if (!recipe) {
        this.notFound = true;
        return;
      }

      this.form.patchValue({
        title: recipe.title,
        description: recipe.description,
        categoryId: recipe.categoryId,
        servings: recipe.servings,
        prepTimeMinutes: recipe.prepTimeMinutes
      });

      this.replaceArrayValues(this.ingredients, recipe.ingredients);
      this.replaceArrayValues(this.steps, recipe.steps);
      return;
    }

    this.categoriesService.categories$
      .pipe(take(1))
      .subscribe((categories) => this.setDefaultCategory(categories));
  }

  private setDefaultCategory(categories: Category[]): void {
    if (!categories.length) {
      return;
    }

    if (!this.form.controls.categoryId.value) {
      this.form.controls.categoryId.setValue(categories[0].id);
    }
  }

  private replaceArrayValues(formArray: FormArray, values: string[]): void {
    formArray.clear();
    values.forEach((item) => {
      const control = this.createLineControl();
      control.setValue(item);
      formArray.push(control);
    });
    if (formArray.length === 0) {
      formArray.push(this.createLineControl());
    }
  }

  private createLineControl(): FormControl<string> {
    return this.fb.nonNullable.control('', [
      Validators.required,
      Validators.maxLength(120)
    ]);
  }

  private cleanList(values: string[]): string[] {
    return values
      .map((value) => value.trim())
      .filter((value) => value.length > 0);
  }
}
