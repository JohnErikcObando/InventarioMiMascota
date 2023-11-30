import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DashBoardService } from 'src/app/core/services/dash-board.service';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-pie-charts',
  templateUrl: './pie-charts.component.html',
  styleUrls: ['./pie-charts.component.scss'],
})
export class PieChartsComponent implements OnInit {
  @ViewChild('pieChart') pieChartRef!: ElementRef;

  ventasDia: any[] = [];

  constructor(private dashBoardService: DashBoardService) {}

  ngOnInit(): void {
    this.getVentasDia();
  }

  private getVentasDia() {
    this.dashBoardService.getVentasDia().subscribe((rta) => {
      this.ventasDia = rta;
      this.createPieChart();
    });
  }

  private createPieChart() {
    const ctx = this.pieChartRef.nativeElement.getContext('2d');
    if (ctx) {
      const dias = this.ventasDia.map((venta) => venta.dia);
      const montos = this.ventasDia.map((venta) => venta.total);

      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: dias,
          datasets: [
            {
              data: montos,
              backgroundColor: [
                'rgba(255, 99, 132, 0.8)',
                'rgba(54, 162, 235, 0.8)',
                'rgba(255, 206, 86, 0.8)',
                'rgba(75, 192, 192, 0.8)',
                'rgba(153, 102, 255, 0.8)',
                'rgba(255, 159, 64, 0.8)',
                'rgba(230, 25, 75, 0.8)', // Puedes agregar más colores según sea necesario
              ],
            },
          ],
        },
      });
    }

    // Ajustar el tamaño del canvas al contenedor
    const container = this.pieChartRef?.nativeElement.parentElement;
    if (container) {
      container.style.width = '100%';
      container.style.height = '100%';

      // Aplicar estilos al canvas
      const canvas = this.pieChartRef?.nativeElement;
      canvas.style.width = '100%';
      canvas.style.height = '100%';
    }
  }
}
