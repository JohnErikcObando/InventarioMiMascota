import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashBoardRoutingModule } from './dash-board-routing.module';
import { BarChartsComponent } from './components/bar-charts/bar-charts.component';
import { HorizontalBarChartsComponent } from './components/horizontal-bar-charts/horizontal-bar-charts.component';
import { MaterialModule } from 'src/app/material/material.module';
import { DashBoardComponent } from './components/dash-board/dash-board.component';
import { HttpClientModule } from '@angular/common/http';
import { DashBoardService } from 'src/app/core/services/dash-board.service';
import { BarGroupsChartsComponent } from './components/bar-groups-charts/bar-groups-charts.component';
import { LineChartsComponent } from './components/line-charts/line-charts.component';
import { PieChartsComponent } from './components/pie-charts/pie-charts.component';

@NgModule({
  declarations: [
    BarChartsComponent,
    HorizontalBarChartsComponent,
    DashBoardComponent,
    BarGroupsChartsComponent,
    LineChartsComponent,
    PieChartsComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    DashBoardRoutingModule,
    MaterialModule,
  ],
  providers: [
    DashBoardService,
    // Otros servicios o proveedores
  ],
})
export class DashBoardModule {}
