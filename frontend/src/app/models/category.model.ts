/**
 * Represents a category used to group recipes.
 */
export interface Category {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Payload used when creating or updating categories.
 */
export interface CategoryInput {
  name: string;
  description: string;
}
