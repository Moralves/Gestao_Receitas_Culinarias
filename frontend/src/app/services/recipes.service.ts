import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Recipe, RecipeInput } from '../models/recipe.model';

/**
 * API client used to manage recipes via the backend service.
 */
@Injectable({ providedIn: 'root' })
export class RecipesService {
  private readonly baseUrl = 'http://localhost:8080/api/receitas';

  constructor(private readonly http: HttpClient) {}

  /**
   * Retrieves recipes, optionally filtering by name.
   */
  list(search?: string): Observable<Recipe[]> {
    const trimmed = search?.trim();
    const params = trimmed ? new HttpParams().set('nome', trimmed) : undefined;
    return this.http.get<Recipe[]>(this.baseUrl, { params });
  }

  /**
   * Retrieves a recipe by id.
   */
  getById(id: number): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.baseUrl}/${id}`);
  }

  /**
   * Creates a recipe on the API.
   */
  create(input: RecipeInput): Observable<Recipe> {
    return this.http.post<Recipe>(this.baseUrl, input);
  }

  /**
   * Removes a recipe by id.
   */
  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
