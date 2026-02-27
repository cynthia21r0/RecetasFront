import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Buscador } from './pages/buscador/buscador';
import { MisRecetas } from './pages/mis-recetas/mis-recetas';
import { CrearReceta } from './pages/crear-receta/crear-receta';

export const routes: Routes = [
  // { path: '', component: Home },
  { path: '', component: Buscador },
  { path: 'mis-recetas', component: MisRecetas },
  { path: 'crear', component: CrearReceta},
  { path: 'editar/:id', component: CrearReceta},
  { path: '**', redirectTo: '' } // Si alguien pone una URL rara, lo manda al inicio
];
