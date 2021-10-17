import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EstadisticaPageRoutingModule } from './estadistica-routing.module';

import { EstadisticaPage } from './estadistica.page';
import { UtilityModule } from '../../utility/utility.module';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EstadisticaPageRoutingModule,
    UtilityModule,
    ComponentsModule,
  ],
  declarations: [EstadisticaPage],
})
export class EstadisticaPageModule {}
