/**
 * Categories supported by the API.
 */
export type RecipeCategory = 'DOCE' | 'SALGADO' | 'BEBIDA' | 'SOBREMESA';

/**
 * Friendly labels for the recipe categories.
 */
export const recipeCategoryOptions: Array<{ value: RecipeCategory; label: string }> = [
  { value: 'DOCE', label: 'Doce' },
  { value: 'SALGADO', label: 'Salgado' },
  { value: 'BEBIDA', label: 'Bebida' },
  { value: 'SOBREMESA', label: 'Sobremesa' }
];

/**
 * Maps category codes to UI-friendly labels.
 */
export const recipeCategoryLabels: Record<RecipeCategory, string> = {
  DOCE: 'Doce',
  SALGADO: 'Salgado',
  BEBIDA: 'Bebida',
  SOBREMESA: 'Sobremesa'
};

/**
 * Represents a recipe entity displayed in the UI.
 */
export interface Recipe {
  id: number;
  nome: string;
  categoria: RecipeCategory;
  tempoPreparo: number;
  porcoes: number;
  ingredientes: string[];
  modoPreparo: string;
  dataCadastro: string;
}

/**
 * Payload used when creating recipes.
 */
export interface RecipeInput {
  nome: string;
  categoria: RecipeCategory;
  tempoPreparo: number;
  porcoes: number;
  ingredientes: string[];
  modoPreparo: string;
}
