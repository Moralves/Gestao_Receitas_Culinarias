import { Routes } from '@angular/router';

import { CategoriesComponent } from './pages/categories/categories.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { RecipesComponent } from './pages/recipes/recipes.component';

/**
 * Application routes kept intentionally small for the initial phase.
 */
export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Gestao de Receitas | Inicio'
  },
  {
    path: 'receitas',
    component: RecipesComponent,
    title: 'Gestao de Receitas | Receitas'
  },
  {
    path: 'categorias',
    component: CategoriesComponent,
    title: 'Gestao de Receitas | Categorias'
  },
  {
    path: '**',
    component: NotFoundComponent,
    title: 'Pagina nao encontrada'
  }
];
