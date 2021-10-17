import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallePageRoutingModule } from './detalle-routing.module';

import { DetallePage } from './detalle.page';
import { ComponentsModule } from '../../components/components.module';
import { UtilityModule } from '../../utility/utility.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetallePageRoutingModule,
    UtilityModule,
    ComponentsModule,
  ],
  declarations: [DetallePage],
})
export class DetallePageModule {}
