import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetallePropioPage } from './detalle-propio.page';

const routes: Routes = [
  {
    path: '',
    component: DetallePropioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetallePropioPageRoutingModule {}
