import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { seedRecipes } from '../data/seed-data';
import { Recipe, RecipeInput } from '../models/recipe.model';
import { createId } from '../utils/id';
import { StorageService } from './storage.service';

/**
 * Manages recipes with local persistence.
 */
@Injectable({ providedIn: 'root' })
export class RecipesService {
  private readonly storageKey = 'grc_recipes';
  private readonly recipesSubject = new BehaviorSubject<Recipe[]>(
    this.loadInitialState()
  );

  /**
   * Observable stream of recipes used by the UI.
   */
  readonly recipes$ = this.recipesSubject.asObservable();

  constructor(private readonly storage: StorageService) {}

  /**
   * Returns a snapshot of the current recipes.
   */
  getSnapshot(): Recipe[] {
    return this.recipesSubject.getValue();
  }

  /**
   * Finds a recipe by id.
   */
  getById(id: string): Recipe | undefined {
    return this.getSnapshot().find((recipe) => recipe.id === id);
  }

  /**
   * Creates a new recipe and persists it.
   */
  create(input: RecipeInput): Recipe {
    const now = new Date().toISOString();
    const recipe: Recipe = {
      id: createId(),
      title: input.title.trim(),
      description: input.description.trim(),
      categoryId: input.categoryId,
      servings: input.servings,
      prepTimeMinutes: input.prepTimeMinutes,
      ingredients: input.ingredients,
      steps: input.steps,
      createdAt: now,
      updatedAt: now
    };

    const next = [...this.getSnapshot(), recipe];
    this.commit(next);
    return recipe;
  }

  /**
   * Updates a recipe by id.
   */
  update(id: string, input: RecipeInput): Recipe {
    const recipes = this.getSnapshot();
    const index = recipes.findIndex((recipe) => recipe.id === id);
    if (index === -1) {
      throw new Error('Receita nao encontrada.');
    }

    const next: Recipe = {
      ...recipes[index],
      title: input.title.trim(),
      description: input.description.trim(),
      categoryId: input.categoryId,
      servings: input.servings,
      prepTimeMinutes: input.prepTimeMinutes,
      ingredients: input.ingredients,
      steps: input.steps,
      updatedAt: new Date().toISOString()
    };

    const updated = [...recipes];
    updated[index] = next;
    this.commit(updated);
    return next;
  }

  /**
   * Removes a recipe by id.
   */
  remove(id: string): void {
    const recipes = this.getSnapshot();
    if (!recipes.some((recipe) => recipe.id === id)) {
      throw new Error('Receita nao encontrada.');
    }

    this.commit(recipes.filter((recipe) => recipe.id !== id));
  }

  /**
   * Counts recipes linked to a category.
   */
  countByCategoryId(categoryId: string): number {
    return this.getSnapshot().filter((recipe) => recipe.categoryId === categoryId)
      .length;
  }

  private loadInitialState(): Recipe[] {
    const stored = this.storage.read<Recipe[]>(this.storageKey, []);
    if (stored.length > 0) {
      return stored;
    }

    this.storage.write(this.storageKey, seedRecipes);
    return seedRecipes;
  }

  private commit(next: Recipe[]): void {
    this.recipesSubject.next(next);
    this.storage.write(this.storageKey, next);
  }
}
