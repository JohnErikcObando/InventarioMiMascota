import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogformMarcaComponent } from './dialogform-marca.component';

describe('DialogformMarcaComponent', () => {
  let component: DialogformMarcaComponent;
  let fixture: ComponentFixture<DialogformMarcaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogformMarcaComponent]
    });
    fixture = TestBed.createComponent(DialogformMarcaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
