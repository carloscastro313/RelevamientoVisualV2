import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CosasLindasPageRoutingModule } from './cosas-lindas-routing.module';

import { CosasLindasPage } from './cosas-lindas.page';
import { UtilityModule } from '../../utility/utility.module';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CosasLindasPageRoutingModule,
    UtilityModule,
    ComponentsModule,
  ],
  declarations: [CosasLindasPage],
})
export class CosasLindasPageModule {}
