import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DashBoardService } from 'src/app/core/services/dash-board.service';
import { Chart, registerables, LineController } from 'chart.js';

Chart.register(LineController); // Agrega esta línea para registrar el controlador de línea

@Component({
  selector: 'app-line-charts',
  templateUrl: './line-charts.component.html',
  styleUrls: ['./line-charts.component.scss'],
})
export class LineChartsComponent implements OnInit {
  @ViewChild('lineChart') lineChartRef!: ElementRef;

  ventasMes: any[] = [];

  constructor(private dashBoardService: DashBoardService) {}

  ngOnInit(): void {
    this.getVentasMes();
  }

  private getVentasMes() {
    this.dashBoardService.getVentasMes().subscribe((rta) => {
      this.ventasMes = rta;
      this.createLineChart();
    });
  }

  private createLineChart() {
    const ctx = this.lineChartRef.nativeElement.getContext('2d');
    if (ctx) {
      const meses = this.ventasMes.map((venta) => venta.mes);
      const montos = this.ventasMes.map((venta) => venta.total);

      console.log('ventas por mes  meses', meses, 'valor', montos);

      new Chart(ctx, {
        type: 'line',
        data: {
          labels: meses,
          datasets: [
            {
              label: 'Ventas Mensuales',
              data: montos,
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1,
            },
          ],
        },
        options: {
          scales: {
            x: { type: 'category' },
            y: { beginAtZero: true },
          },
        },
      });
    }

    // // Ajustar el tamaño del canvas al contenedor
    // const container = this.lineChartRef?.nativeElement.parentElement;
    // if (container) {
    //   container.style.width = '100%';
    //   container.style.height = '100%';

    //   // Aplicar estilos al canvas
    //   const canvas = this.lineChartRef?.nativeElement;
    //   canvas.style.width = '100%';
    //   canvas.style.height = '100%';
    // }
  }
}
