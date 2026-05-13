import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

/**
 * Describes a short highlight displayed on the home page.
 */
interface HomeHighlight {
  title: string;
  description: string;
}

/**
 * Landing page with project overview and quick navigation.
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  /**
   * Summary blocks that explain the core goals of the app.
   */
  readonly highlights: HomeHighlight[] = [
    {
      title: 'Cadastro completo',
      description: 'Centralize ingredientes, modo de preparo e rendimento.'
    },
    {
      title: 'Organizacao clara',
      description: 'Estruture receitas por categoria e mantenha tudo acessivel.'
    },
    {
      title: 'Busca rapida',
      description: 'Encontre receitas por nome ou ingrediente em segundos.'
    }
  ];

  /**
   * Track cards by title for consistent rendering.
   */
  readonly trackByTitle = (_: number, item: HomeHighlight) => item.title;
}
