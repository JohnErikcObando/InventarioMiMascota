import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFromFormaPagoComponent } from './dialog-from-forma-pago.component';

describe('DialogFromFormaPagoComponent', () => {
  let component: DialogFromFormaPagoComponent;
  let fixture: ComponentFixture<DialogFromFormaPagoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogFromFormaPagoComponent]
    });
    fixture = TestBed.createComponent(DialogFromFormaPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
