import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'session',
    loadChildren: () =>
      import('./pages/session/session.module').then((m) => m.SessionPageModule),
  },
  {
    path: '',
    redirectTo: 'session',
    pathMatch: 'full',
  },
  {
    path: 'main',
    loadChildren: () =>
      import('./pages/main/main.module').then((m) => m.MainPageModule),
  },
  {
    path: 'registro',
    loadChildren: () =>
      import('./pages/registro/registro.module').then(
        (m) => m.RegistroPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
