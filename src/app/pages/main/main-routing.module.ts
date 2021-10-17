import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPage } from './main.page';
import { SessionGuard } from '../../login/guards/session.guard';

const routes: Routes = [
  {
    path: '',
    component: MainPage,
    canActivate: [SessionGuard],
    children: [
      {
        path: '',
        redirectTo: 'inicio',
      },
      {
        path: 'inicio',
        loadChildren: () =>
          import('../inicio/inicio.module').then((m) => m.InicioPageModule),
      },
      {
        path: 'CosasFeas',
        loadChildren: () =>
          import('../cosas-feas/cosas-feas.module').then(
            (m) => m.CosasFeasPageModule
          ),
      },

      {
        path: 'CosasLindas',
        loadChildren: () =>
          import('../cosas-lindas/cosas-lindas.module').then(
            (m) => m.CosasLindasPageModule
          ),
      },
      {
        path: 'listado',
        loadChildren: () =>
          import('../listado/listado.module').then((m) => m.ListadoPageModule),
      },
      {
        path: 'camara/:tipo',
        loadChildren: () =>
          import('../camara/camara.module').then((m) => m.CamaraPageModule),
      },
      {
        path: 'detalle/:id',
        loadChildren: () =>
          import('../detalle/detalle.module').then((m) => m.DetallePageModule),
      },
      {
        path: 'detalle-propio/:id',
        loadChildren: () =>
          import('../detalle-propio/detalle-propio.module').then(
            (m) => m.DetallePropioPageModule
          ),
      },
      {
        path: 'estadistica',
        loadChildren: () =>
          import('../estadistica/estadistica.module').then(
            (m) => m.EstadisticaPageModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule {}
