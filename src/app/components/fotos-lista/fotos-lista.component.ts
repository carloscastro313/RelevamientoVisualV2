import { Component, Input, OnInit, Output } from '@angular/core';
import { Foto } from 'src/app/models/foto.model';
import { FotosService } from '../../services/fotos.service';
import { NavController } from '@ionic/angular';
import { tipoFoto } from '../../models/foto.model';

@Component({
  selector: 'app-fotos-lista',
  templateUrl: './fotos-lista.component.html',
  styleUrls: ['./fotos-lista.component.scss'],
})
export class FotosListaComponent implements OnInit {
  @Input() tipo: tipoFoto;

  complete: boolean = true;
  fotos: Foto[] = [];

  constructor(private foto: FotosService, private nav: NavController) {}

  ngOnInit() {
    this.foto.getFotos(this.tipo).subscribe((data) => {
      this.fotos = data.sort((a, b) => {
        if (a.time < b.time) return 1;
        if (a.time > b.time) return -1;
        return 0;
      });
      this.complete = false;
    });
  }

  detalle(id) {
    console.log(id);
    this.nav.navigateForward(`/main/detalle/${id}`);
  }
}
