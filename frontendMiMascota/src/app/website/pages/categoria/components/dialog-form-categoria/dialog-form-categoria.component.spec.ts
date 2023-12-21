import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFormCategoriaComponent } from './dialog-form-categoria.component';

describe('DialogFormCategoriaComponent', () => {
  let component: DialogFormCategoriaComponent;
  let fixture: ComponentFixture<DialogFormCategoriaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogFormCategoriaComponent]
    });
    fixture = TestBed.createComponent(DialogFormCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
