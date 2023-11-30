import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DashBoardService } from 'src/app/core/services/dash-board.service';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-bar-groups-charts',
  templateUrl: './bar-groups-charts.component.html',
  styleUrls: ['./bar-groups-charts.component.scss'],
})
export class BarGroupsChartsComponent {
  @ViewChild('barChart') barChartRef!: ElementRef;

  productoMes: any[] = [];

  constructor(private dashBoardService: DashBoardService) {}

  ngOnInit(): void {
    this.getProductoMes();
  }

  private getProductoMes() {
    this.dashBoardService.getProductosMes().subscribe((rta) => {
      this.productoMes = rta;
      this.createBarChart();
    });
  }

  private createBarChart() {
    const ctx = this.barChartRef.nativeElement.getContext('2d');
    if (ctx) {
      const productos = Array.from(
        new Set(this.productoMes.map((item) => item.nombre_producto))
      );
      const meses = Array.from(
        new Set(this.productoMes.map((item) => item.mes))
      );
      const datasets = productos.map((producto) => {
        const data = meses.map((mes) => {
          const valor = this.productoMes.find(
            (item) => item.nombre_producto === producto && item.mes === mes
          );
          return valor ? +valor.cantidad_producto : 0;
        });
        return { label: producto, data };
      });

      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: meses,
          datasets,
        },
        options: {
          scales: {
            x: { stacked: true },
            y: { stacked: true },
          },
        },
      });
    }

    // Ajustar el tamaño del canvas al contenedor
    const container = this.barChartRef?.nativeElement.parentElement;
    if (container) {
      container.style.width = '100%';
      container.style.height = '100%';

      // Aplicar estilos al canvas
      const canvas = this.barChartRef?.nativeElement;
      canvas.style.width = '100%';
      canvas.style.height = '100%';
    }
  }
}
