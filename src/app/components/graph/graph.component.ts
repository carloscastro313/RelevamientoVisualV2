import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import * as d3 from 'd3';
import { Foto } from 'src/app/models/foto.model';
import { FotosService } from '../../services/fotos.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
})
export class GraphComponent implements OnInit {
  svg: any;
  private margin = 30;
  private width = 300 - this.margin * 2;
  private height = 200 - this.margin * 2;
  fotosStats: Foto[] = [];

  constructor(private stats: FotosService, private nav: NavController) {}

  async ngOnInit() {
    this.fotosStats = await this.stats.getEstadisticas('CosasFeas');

    this.createSvg();
    this.drawBars(this.fotosStats);
  }

  private drawBars(data: Foto[]): void {
    // Create the X-axis band scale
    const x = d3
      .scaleBand()
      .range([0, this.width])
      .domain(data.map((d) => d.correo))
      .padding(0.2);

    // Draw the X-axis on the DOM
    this.svg
      .append('g')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3.axisBottom(x))
      .selectAll('text')
      // .attr('transform', 'translate(-10,0)rotate(-45)')
      .style('text-anchor', 'center');

    // Create the Y-axis band scale
    const y = d3
      .scaleLinear()
      .domain([0, data[0].like.length || 0])
      .range([this.height, 0]);

    // Draw the Y-axis on the DOM
    this.svg.append('g').call(d3.axisLeft(y));

    // Create and fill the bars
    this.svg
      .selectAll('bars')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d) => x(d.correo))
      .attr('y', (d) => y(d.like.length))
      .attr('width', x.bandwidth())
      .attr('height', (d) => this.height - y(d.like.length))
      .attr('fill', '#d04a35')
      .on('click', (a, d) => {
        this.detalle(d.id);
      });
  }

  private createSvg(): void {
    this.svg = d3
      .select('figure#bar')
      .append('svg')
      .attr('width', this.width + this.margin * 2)
      .attr('height', this.height + this.margin * 2)
      .append('g')
      .attr('transform', 'translate(' + this.margin + ',' + this.margin + ')');
  }

  detalle(id) {
    console.log(id);
    this.nav.navigateForward(`/main/detalle/${id}`);
  }
}
