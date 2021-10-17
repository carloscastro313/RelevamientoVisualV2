import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import * as d3 from 'd3';
import { Foto } from 'src/app/models/foto.model';
import { FotosService } from 'src/app/services/fotos.service';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss'],
})
export class BarComponent implements OnInit {
  private svg;
  private margin = 40;
  private width = 250;
  private height = 250;
  // The radius of the pie chart is half the smallest side
  private radius = Math.min(this.width, this.height) / 2 - this.margin;
  private colors;

  fotosStats: Foto[] = [];

  constructor(private stats: FotosService, private nav: NavController) {}

  async ngOnInit() {
    this.fotosStats = await this.stats.getEstadisticas('CosasLindas');
    this.createSvg();
    this.createColors();
    this.drawChart();
  }

  private createSvg(): void {
    this.svg = d3
      .select('figure#pie')
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g')
      .attr(
        'transform',
        'translate(' + this.width / 2 + ',' + this.height / 2 + ')'
      );
  }
  private createColors(): void {
    this.colors = d3
      .scaleOrdinal()
      .domain(this.fotosStats.map((d) => d.like.length.toString()))
      .range(['#c7d3ec', '#a5b8db', '#879cc4']);
  }

  private drawChart(): void {
    // Compute the position of each group on the pie:
    const pie = d3.pie<any>().value((d: any) => Number(d.like.length));

    // Build the pie chart
    this.svg
      .selectAll('pieces')
      .data(pie(this.fotosStats))
      .enter()
      .append('path')
      .attr('d', d3.arc().innerRadius(0).outerRadius(this.radius))
      .attr('fill', (d, i) => this.colors(i))
      .attr('stroke', '#121926')
      .style('stroke-width', '1px')
      .on('click', (a, { data }) => this.detalle(data.id));

    // Add labels
    const labelLocation = d3.arc().innerRadius(100).outerRadius(this.radius);

    this.svg
      .selectAll('pieces')
      .data(pie(this.fotosStats))
      .enter()
      .append('text')
      .text((d) => d.data.correo)
      .attr('transform', (d) => 'translate(' + labelLocation.centroid(d) + ')')
      .style('text-anchor', 'middle')
      .style('font-size', 15);
  }

  detalle(id) {
    console.log(id);
    this.nav.navigateForward(`/main/detalle/${id}`);
  }
}
