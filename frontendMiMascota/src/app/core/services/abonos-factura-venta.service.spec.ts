import { TestBed } from '@angular/core/testing';

import { AbonosFacturaVentaService } from './abonos-factura-venta.service';

describe('AbonosFacturaVentaService', () => {
  let service: AbonosFacturaVentaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbonosFacturaVentaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
