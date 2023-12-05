import { TestBed } from '@angular/core/testing';

import { UtilidadServiceService } from './utilidad-service.service';

describe('UtilidadServiceService', () => {
  let service: UtilidadServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilidadServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
