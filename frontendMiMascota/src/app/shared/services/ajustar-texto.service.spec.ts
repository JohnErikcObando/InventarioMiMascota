import { TestBed } from '@angular/core/testing';

import { AjustarTextoService } from './ajustar-texto.service';

describe('AjustarTextoService', () => {
  let service: AjustarTextoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AjustarTextoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
