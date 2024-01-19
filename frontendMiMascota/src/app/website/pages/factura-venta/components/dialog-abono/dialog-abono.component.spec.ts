import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAbonoComponent } from './dialog-abono.component';

describe('DialogAbonoComponent', () => {
  let component: DialogAbonoComponent;
  let fixture: ComponentFixture<DialogAbonoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogAbonoComponent]
    });
    fixture = TestBed.createComponent(DialogAbonoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
