import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MenuService } from 'src/app/core/services/menu.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, PagesRoutingModule, HttpClientModule],
  providers: [MenuService],
})
export class PagesModule {}
