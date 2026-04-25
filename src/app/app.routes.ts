import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./features/home/home.page').then((m) => m.HomePageComponent),
  },
  {
    path: 'tasks',
    loadComponent: () =>
      import('./features/task/task.component').then((m) => m.TaskComponent),
  },
  {
    path: 'categories',
    loadComponent: () =>
      import('./features/categories/categories.component').then(
        (m) => m.CategoriesComponent,
      ),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
