import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFromCajaComponent } from './dialog-from-caja.component';

describe('DialogFromCajaComponent', () => {
  let component: DialogFromCajaComponent;
  let fixture: ComponentFixture<DialogFromCajaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogFromCajaComponent]
    });
    fixture = TestBed.createComponent(DialogFromCajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
