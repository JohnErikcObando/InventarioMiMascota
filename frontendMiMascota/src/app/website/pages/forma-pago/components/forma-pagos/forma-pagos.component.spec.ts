import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormaPagosComponent } from './forma-pagos.component';

describe('FormaPagosComponent', () => {
  let component: FormaPagosComponent;
  let fixture: ComponentFixture<FormaPagosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormaPagosComponent]
    });
    fixture = TestBed.createComponent(FormaPagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
