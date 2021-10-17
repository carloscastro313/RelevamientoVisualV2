import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Foto } from 'src/app/models/foto.model';
import { FotosService } from 'src/app/services/fotos.service';

@Component({
  selector: 'app-detalle-foto',
  templateUrl: './detalle-foto.component.html',
  styleUrls: ['./detalle-foto.component.scss'],
})
export class DetalleFotoComponent implements OnInit {
  foto: Foto = null;
  @Input() isLikeable: boolean = true;
  loading: boolean = false;
  constructor(private route: ActivatedRoute, public fotos: FotosService) {}

  async ngOnInit() {
    console.log(this.isLikeable);
    await this.fotos.initService();
    this.route.params.subscribe((params) => {
      console.log(params);
      this.fotos.getFoto(params['id']).subscribe(
        (data) => {
          this.foto = data;
          this.foto.time = this.foto.time.toDate() as any;
          this.loading = true;
        },
        () => {}
      );
    });
  }
}
