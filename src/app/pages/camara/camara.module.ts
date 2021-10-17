import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CamaraPageRoutingModule } from './camara-routing.module';

import { CamaraPage } from './camara.page';
import { UtilityModule } from '../../utility/utility.module';
import { ComponentsModule } from '../../components/components.module';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CamaraPageRoutingModule,
    UtilityModule,
    ComponentsModule,
    PipesModule,
  ],
  declarations: [CamaraPage],
})
export class CamaraPageModule {}
