import { Category } from '../models/category.model';
import { Recipe } from '../models/recipe.model';

const now = new Date().toISOString();

/**
 * Initial categories used when the storage is empty.
 */
export const seedCategories: Category[] = [
  {
    id: 'cat-massas',
    name: 'Massas',
    description: 'Receitas classicas com massas e molhos.',
    createdAt: now,
    updatedAt: now
  },
  {
    id: 'cat-sobremesas',
    name: 'Sobremesas',
    description: 'Doces e preparos para finalizar a refeicao.',
    createdAt: now,
    updatedAt: now
  },
  {
    id: 'cat-saudavel',
    name: 'Saudavel',
    description: 'Opcoes leves e equilibradas para o dia a dia.',
    createdAt: now,
    updatedAt: now
  }
];

/**
 * Initial recipes used when the storage is empty.
 */
export const seedRecipes: Recipe[] = [
  {
    id: 'rec-penne-pesto',
    title: 'Penne ao pesto fresco',
    description: 'Massa com molho pesto de manjericao e queijo.',
    categoryId: 'cat-massas',
    servings: 3,
    prepTimeMinutes: 25,
    ingredients: [
      '250g de penne',
      '1 xicara de manjericao',
      '2 colheres de azeite',
      '40g de queijo parmesao',
      '1 dente de alho'
    ],
    steps: [
      'Cozinhe a massa ate ficar al dente.',
      'Bata manjericao, alho, queijo e azeite.',
      'Misture o molho com a massa e finalize.'
    ],
    createdAt: now,
    updatedAt: now
  },
  {
    id: 'rec-mousse-cacau',
    title: 'Mousse de cacau',
    description: 'Sobremesa leve com cacau e iogurte.',
    categoryId: 'cat-sobremesas',
    servings: 4,
    prepTimeMinutes: 15,
    ingredients: [
      '2 potes de iogurte natural',
      '2 colheres de cacau em po',
      '2 colheres de mel'
    ],
    steps: [
      'Misture todos os ingredientes.',
      'Leve a geladeira por 2 horas.',
      'Sirva gelado.'
    ],
    createdAt: now,
    updatedAt: now
  }
];
