import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFromProductoComponent } from './dialog-from-producto.component';

describe('DialogFromProductoComponent', () => {
  let component: DialogFromProductoComponent;
  let fixture: ComponentFixture<DialogFromProductoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogFromProductoComponent]
    });
    fixture = TestBed.createComponent(DialogFromProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
