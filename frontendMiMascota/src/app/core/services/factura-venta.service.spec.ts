import { TestBed } from '@angular/core/testing';

import { FacturaVentaService } from './factura-venta.service';

describe('FacturaVentaService', () => {
  let service: FacturaVentaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacturaVentaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
