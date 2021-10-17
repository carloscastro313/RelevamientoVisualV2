import { Component, OnInit } from '@angular/core';
import { SystemService } from '../../utility/services/system.service';
import { FotosService } from '../../services/fotos.service';
import { ActivatedRoute } from '@angular/router';
import { tipoFoto } from '../../models/foto.model';

@Component({
  selector: 'app-camara',
  templateUrl: './camara.page.html',
  styleUrls: ['./camara.page.scss'],
})
export class CamaraPage implements OnInit {
  fotos: any[] = [];
  tipo: tipoFoto = 'CosasFeas';
  constructor(
    private camara: SystemService,
    private foto: FotosService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.addFoto();
    this.route.params.subscribe((param) => (this.tipo = param['tipo']));
  }

  upload() {
    this.foto.upload(
      this.fotos.map((d) => d.file),
      this.tipo
    );
  }

  async addFoto() {
    const foto = await this.camara.getPicture();
    console.log(foto);
    if (foto) this.fotos.push(foto);
  }

  deleteFoto(event: number) {
    this.fotos = this.fotos.filter((foto, index) => index !== event);
  }
}
