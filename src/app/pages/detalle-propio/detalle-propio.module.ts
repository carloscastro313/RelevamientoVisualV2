import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallePropioPageRoutingModule } from './detalle-propio-routing.module';

import { DetallePropioPage } from './detalle-propio.page';
import { UtilityModule } from '../../utility/utility.module';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetallePropioPageRoutingModule,
    UtilityModule,
    ComponentsModule,
  ],
  declarations: [DetallePropioPage],
})
export class DetallePropioPageModule {}
