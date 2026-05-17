import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

/**
 * Define the navigation structure used by the application shell.
 */
interface NavLink {
  label: string;
  path: string;
  exact?: boolean;
}

/**
 * Root shell component. It owns the global layout and navigation.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgFor, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  /**
   * Application brand label shown in the header.
   */
  readonly brandName = 'Gestao de Receitas';

  /**
   * Primary navigation entries displayed in the header.
   */
  readonly navLinks: NavLink[] = [
    { label: 'Inicio', path: '/', exact: true },
    { label: 'Receitas', path: '/receitas' }
  ];

  /**
   * Track navigation links by path to keep rendering stable.
   */
  readonly trackByPath = (_: number, link: NavLink) => link.path;
}
