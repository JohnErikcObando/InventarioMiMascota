import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFormClientesComponent } from './dialog-form-clientes.component';

describe('DialogFormClientesComponent', () => {
  let component: DialogFormClientesComponent;
  let fixture: ComponentFixture<DialogFormClientesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogFormClientesComponent]
    });
    fixture = TestBed.createComponent(DialogFormClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
