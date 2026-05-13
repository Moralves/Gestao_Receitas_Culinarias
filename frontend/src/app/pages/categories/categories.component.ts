import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

/**
 * Placeholder for categories management (Phase 1).
 */
@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [NgFor],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
  /**
   * Example categories to illustrate future content.
   */
  readonly sampleCategories = ['Massas', 'Sobremesas', 'Vegetariano', 'Rapido'];

  /**
   * Track category pills by name to avoid re-render.
   */
  readonly trackByCategory = (_: number, category: string) => category;
}
