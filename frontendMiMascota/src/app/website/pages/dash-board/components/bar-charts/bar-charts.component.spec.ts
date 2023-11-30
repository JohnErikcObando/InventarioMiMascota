import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarChartsComponent } from './bar-charts.component';

describe('BarChartsComponent', () => {
  let component: BarChartsComponent;
  let fixture: ComponentFixture<BarChartsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BarChartsComponent]
    });
    fixture = TestBed.createComponent(BarChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
