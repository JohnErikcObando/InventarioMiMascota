import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalBarChartsComponent } from './horizontal-bar-charts.component';

describe('HorizontalBarChartsComponent', () => {
  let component: HorizontalBarChartsComponent;
  let fixture: ComponentFixture<HorizontalBarChartsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HorizontalBarChartsComponent]
    });
    fixture = TestBed.createComponent(HorizontalBarChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
