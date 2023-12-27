import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFormImpuestoComponent } from './dialog-form-impuesto.component';

describe('DialogFormImpuestoComponent', () => {
  let component: DialogFormImpuestoComponent;
  let fixture: ComponentFixture<DialogFormImpuestoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogFormImpuestoComponent]
    });
    fixture = TestBed.createComponent(DialogFormImpuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
