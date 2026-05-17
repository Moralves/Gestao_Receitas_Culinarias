import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { RecipeDetailComponent } from './pages/recipes/recipe-detail/recipe-detail.component';
import { RecipeFormComponent } from './pages/recipes/recipe-form/recipe-form.component';
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
    path: 'receitas/nova',
    component: RecipeFormComponent,
    title: 'Gestao de Receitas | Nova receita'
  },
  {
    path: 'receitas/:id',
    component: RecipeDetailComponent,
    title: 'Gestao de Receitas | Detalhe da receita'
  },
  {
    path: '**',
    component: NotFoundComponent,
    title: 'Pagina nao encontrada'
  }
];
