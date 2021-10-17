import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FotoComponent } from './foto/foto.component';
import { IonicModule } from '@ionic/angular';
import { FotosListaComponent } from './fotos-lista/fotos-lista.component';
import { DetalleFotoComponent } from './detalle-foto/detalle-foto.component';
import { GraphComponent } from './graph/graph.component';
import { BarComponent } from './bar/bar.component';

@NgModule({
  declarations: [
    FotoComponent,
    FotosListaComponent,
    DetalleFotoComponent,
    GraphComponent,
    BarComponent,
  ],
  imports: [CommonModule, IonicModule],
  exports: [
    FotoComponent,
    FotosListaComponent,
    DetalleFotoComponent,
    GraphComponent,
    BarComponent,
  ],
})
export class ComponentsModule {}
