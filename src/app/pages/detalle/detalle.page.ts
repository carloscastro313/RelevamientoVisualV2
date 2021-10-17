import { Component, Input, OnInit } from '@angular/core';
import { ActivationEnd, ActivatedRoute } from '@angular/router';
import { FotosService } from '../../services/fotos.service';
import { Foto } from '../../models/foto.model';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {
  constructor() {}

  ngOnInit() {}
}
