import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-foto',
  templateUrl: './foto.component.html',
  styleUrls: ['./foto.component.scss'],
})
export class FotoComponent implements OnInit {
  @Input() src: string;
  @Input() index: number;
  @Output() delete: EventEmitter<number> = new EventEmitter<number>();

  constructor() {}

  ngOnInit() {}

  deleteFoto() {
    this.delete.emit(this.index);
  }
}
