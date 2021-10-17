import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  routes = [
    {
      name: 'Fotos subidas',
      route: '/main/listado',
    },
    {
      name: 'Estadísticas',
      route: '/main/estadistica',
    },
  ];

  constructor() {}

  ngOnInit() {}
}
