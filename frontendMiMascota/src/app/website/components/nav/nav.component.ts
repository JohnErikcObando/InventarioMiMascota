import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AsyncPipe, NgIf } from '@angular/common';
import { MenuService } from 'src/app/core/services/menu.service';
import { MenuModel } from 'src/app/core/models/menu.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  listaMenus: MenuModel[] = [];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private menuservice: MenuService
  ) {
    this.getListaMenu();
  }

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  ngOnInit(): void {}

  getListaMenu() {
    this.menuservice.getListaMenu().subscribe({
      next: (rta) => {
        this.listaMenus = rta;
      },
      error: (e) => {
        console.error('Error al obtener los datos:', e);
      },
    });
  }
}
