import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { seedCategories } from '../data/seed-data';
import { Category, CategoryInput } from '../models/category.model';
import { createId } from '../utils/id';
import { StorageService } from './storage.service';

/**
 * Manages recipe categories with local persistence.
 */
@Injectable({ providedIn: 'root' })
export class CategoriesService {
  private readonly storageKey = 'grc_categories';
  private readonly categoriesSubject = new BehaviorSubject<Category[]>(
    this.loadInitialState()
  );

  /**
   * Observable stream of categories used by the UI.
   */
  readonly categories$ = this.categoriesSubject.asObservable();

  constructor(private readonly storage: StorageService) {}

  /**
   * Returns a snapshot of the current categories.
   */
  getSnapshot(): Category[] {
    return this.categoriesSubject.getValue();
  }

  /**
   * Finds a category by id.
   */
  getById(id: string): Category | undefined {
    return this.getSnapshot().find((category) => category.id === id);
  }

  /**
   * Checks if a category name is already in use.
   */
  nameExists(name: string, ignoreId?: string): boolean {
    const normalized = name.trim().toLowerCase();
    return this.getSnapshot().some((category) => {
      if (ignoreId && category.id === ignoreId) {
        return false;
      }
      return category.name.trim().toLowerCase() === normalized;
    });
  }

  /**
   * Creates a new category and persists it.
   */
  create(input: CategoryInput): Category {
    const now = new Date().toISOString();
    const category: Category = {
      id: createId(),
      name: input.name.trim(),
      description: input.description.trim(),
      createdAt: now,
      updatedAt: now
    };

    const next = [...this.getSnapshot(), category];
    this.commit(next);
    return category;
  }

  /**
   * Updates an existing category.
   */
  update(id: string, input: CategoryInput): Category {
    const categories = this.getSnapshot();
    const index = categories.findIndex((category) => category.id === id);
    if (index === -1) {
      throw new Error('Categoria nao encontrada.');
    }

    const next: Category = {
      ...categories[index],
      name: input.name.trim(),
      description: input.description.trim(),
      updatedAt: new Date().toISOString()
    };

    const updated = [...categories];
    updated[index] = next;
    this.commit(updated);
    return next;
  }

  /**
   * Removes a category by id.
   */
  remove(id: string): void {
    const categories = this.getSnapshot();
    if (!categories.some((category) => category.id === id)) {
      throw new Error('Categoria nao encontrada.');
    }

    this.commit(categories.filter((category) => category.id !== id));
  }

  private loadInitialState(): Category[] {
    const stored = this.storage.read<Category[]>(this.storageKey, []);
    if (stored.length > 0) {
      return stored;
    }

    this.storage.write(this.storageKey, seedCategories);
    return seedCategories;
  }

  private commit(next: Category[]): void {
    this.categoriesSubject.next(next);
    this.storage.write(this.storageKey, next);
  }
}
