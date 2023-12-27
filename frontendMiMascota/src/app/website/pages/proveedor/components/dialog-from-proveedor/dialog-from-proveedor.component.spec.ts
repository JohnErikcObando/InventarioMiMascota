import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFromProveedorComponent } from './dialog-from-proveedor.component';

describe('DialogFromProveedorComponent', () => {
  let component: DialogFromProveedorComponent;
  let fixture: ComponentFixture<DialogFromProveedorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogFromProveedorComponent]
    });
    fixture = TestBed.createComponent(DialogFromProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
