import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFormMovimientoComponent } from './dialog-form-movimiento.component';

describe('DialogFormMovimientoComponent', () => {
  let component: DialogFormMovimientoComponent;
  let fixture: ComponentFixture<DialogFormMovimientoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogFormMovimientoComponent]
    });
    fixture = TestBed.createComponent(DialogFormMovimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
