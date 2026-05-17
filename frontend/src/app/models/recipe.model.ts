/**
 * Represents a recipe entity displayed in the UI.
 */
export interface Recipe {
  id: string;
  title: string;
  description: string;
  categoryId: string;
  servings: number;
  prepTimeMinutes: number;
  ingredients: string[];
  steps: string[];
  createdAt: string;
  updatedAt: string;
}

/**
 * Payload used when creating or updating recipes.
 */
export interface RecipeInput {
  title: string;
  description: string;
  categoryId: string;
  servings: number;
  prepTimeMinutes: number;
  ingredients: string[];
  steps: string[];
}
