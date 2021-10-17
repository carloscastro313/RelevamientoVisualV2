import { Component, Input, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Foto } from 'src/app/models/foto.model';
import { FotosService } from 'src/app/services/fotos.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.page.html',
  styleUrls: ['./listado.page.scss'],
})
export class ListadoPage implements OnInit {
  complete: boolean = true;
  fotos: Foto[] = [];

  constructor(private foto: FotosService, private nav: NavController) {}

  async ngOnInit() {
    await this.foto.initService();
    this.foto.getFotosPorUsuario().subscribe((data) => {
      this.fotos = data.sort((a, b) => {
        console.log(a, b);
        if (a.time < b.time) return 1;
        if (a.time > b.time) return -1;
        return 0;
      });
      this.complete = false;
    });
  }

  detalle(id) {
    console.log(id);
    this.nav.navigateRoot(`/main/detalle-propio/${id}`);
  }
}
