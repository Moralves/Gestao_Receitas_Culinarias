import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';

import { RecipeInput, RecipeCategory, recipeCategoryOptions } from '../../../models/recipe.model';
import { RecipesService } from '../../../services/recipes.service';

interface RecipeFormValue {
  nome: string;
  categoria: RecipeCategory | '';
  tempoPreparo: number;
  porcoes: number;
  ingredientes: string[];
  modoPreparo: string;
}

/**
 * Form used to create or update recipes.
 */
@Component({
  selector: 'app-recipe-form',
  standalone: true,
  imports: [NgFor, NgIf, ReactiveFormsModule, RouterLink],
  templateUrl: './recipe-form.component.html',
  styleUrl: './recipe-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly recipesService = inject(RecipesService);

  readonly categories = recipeCategoryOptions;
  readonly pageTitle = 'Nova receita';
  readonly submitLabel = 'Salvar receita';

  submitError = '';
  saving = false;

  /**
   * Main reactive form for recipes.
   */
  readonly form = this.fb.nonNullable.group({
    nome: ['', [Validators.required, Validators.minLength(3)]],
    categoria: ['', Validators.required],
    tempoPreparo: [30, [Validators.required, Validators.min(1)]],
    porcoes: [2, [Validators.required, Validators.min(1)]],
    ingredientes: this.fb.nonNullable.array(
      [this.createLineControl()],
      { validators: [this.atLeastOneLineValidator()] }
    ),
    modoPreparo: ['', [Validators.required, Validators.minLength(10)]]
  });

  /**
   * Shortcut for ingredients form array.
   */
  get ingredients(): FormArray<FormControl<string>> {
    return this.form.controls.ingredientes as FormArray<FormControl<string>>;
  }

  /**
   * Track list items by index.
   */
  readonly trackByIndex = (index: number) => index;

  /**
   * Track categories by id for stable rendering.
   */
  readonly trackByCategory = (_: number, category: { value: string }) => category.value;

  addIngredient(): void {
    this.ingredients.push(this.createLineControl());
  }

  removeIngredient(index: number): void {
    if (this.ingredients.length <= 1) {
      return;
    }
    this.ingredients.removeAt(index);
  }

  save(): void {
    this.submitError = '';
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue() as RecipeFormValue;
    const ingredientes = this.cleanList(value.ingredientes);
    if (ingredientes.length === 0) {
      this.ingredients.setErrors({ required: true });
      this.form.markAllAsTouched();
      return;
    }

    const payload: RecipeInput = {
      nome: value.nome.trim(),
      categoria: value.categoria as RecipeCategory,
      tempoPreparo: value.tempoPreparo,
      porcoes: value.porcoes,
      ingredientes,
      modoPreparo: value.modoPreparo.trim()
    };

    this.saving = true;
    this.recipesService.create(payload)
      .pipe(finalize(() => { this.saving = false; }))
      .subscribe({
        next: () => {
          this.router.navigate(['/receitas'], {
            queryParams: { sucesso: 'cadastrada' }
          });
        },
        error: (error) => {
          this.submitError = error?.status === 409
            ? 'Ja existe uma receita com esse nome.'
            : 'Nao foi possivel cadastrar a receita.';
        }
      });
  }

  private createLineControl(): FormControl<string> {
    return this.fb.nonNullable.control('', [
      Validators.required,
      Validators.maxLength(120)
    ]);
  }

  private atLeastOneLineValidator(): ValidatorFn {
    return (control: AbstractControl) => {
      const formArray = control as FormArray<FormControl<string>>;
      const hasValue = formArray.controls.some((item) =>
        item.value.trim().length > 0
      );
      return hasValue ? null : { required: true };
    };
  }

  private cleanList(values: string[]): string[] {
    return values
      .map((value) => value.trim())
      .filter((value) => value.length > 0);
  }
}
