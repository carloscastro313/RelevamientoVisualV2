import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CosasFeasPageRoutingModule } from './cosas-feas-routing.module';

import { CosasFeasPage } from './cosas-feas.page';
import { UtilityModule } from '../../utility/utility.module';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CosasFeasPageRoutingModule,
    UtilityModule,
    ComponentsModule,
  ],
  declarations: [CosasFeasPage],
})
export class CosasFeasPageModule {}
