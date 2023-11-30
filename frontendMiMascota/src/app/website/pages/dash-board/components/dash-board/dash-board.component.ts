import { Component, inject } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';

import { Router } from '@angular/router';

import { DashBoardService } from 'src/app/core/services/dash-board.service';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss'],
})
export class DashBoardComponent {
  constructor(private dashBoardService: DashBoardService) {}

  ngOnInit(): void {}

  private breakpointObserver = inject(BreakpointObserver);

  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Movimientos Por Mes', cols: 1, rows: 1 },
          { title: 'Venta de Producto Por Mes', cols: 1, rows: 1 },
          { title: 'Ventas Por Mes', cols: 1, rows: 1 },
          { title: 'Recaudo por Dias', cols: 1, rows: 2 },
          { title: 'Ventas Por Semana', cols: 1, rows: 1 },
        ];
      }

      return [
        { title: 'Movimientos Por Mes', cols: 2, rows: 1 },
        { title: 'Venta de Producto Por Mes', cols: 1, rows: 1 },
        { title: 'Ventas Por Mes', cols: 1, rows: 1 },
        { title: 'Recaudo por Dias', cols: 1, rows: 2 },
        { title: 'Ventas Por Semana', cols: 1, rows: 1 },
      ];
    })
  );
}
