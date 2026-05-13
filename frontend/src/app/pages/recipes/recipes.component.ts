import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

/**
 * Simple placeholder for the recipes list page (Phase 1).
 */
@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [NgFor],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent {
  /**
   * Focus items that will be implemented in the next phases.
   */
  readonly nextDeliveries = [
    'Lista de receitas com cards',
    'Filtros por categoria e busca',
    'Formulario de cadastro e edicao'
  ];

  /**
   * Track list items by content for stable rendering.
   */
  readonly trackByItem = (_: number, item: string) => item;
}
