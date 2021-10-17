import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../login/services/auth.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  constructor(public auth: AuthService, public nav: NavController) {}

  ngOnInit() {}
}
