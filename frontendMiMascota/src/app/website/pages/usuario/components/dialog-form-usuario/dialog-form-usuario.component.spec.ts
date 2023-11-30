import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFormUsuarioComponent } from './dialog-form-usuario.component';

describe('DialogFormUsuarioComponent', () => {
  let component: DialogFormUsuarioComponent;
  let fixture: ComponentFixture<DialogFormUsuarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogFormUsuarioComponent]
    });
    fixture = TestBed.createComponent(DialogFormUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
