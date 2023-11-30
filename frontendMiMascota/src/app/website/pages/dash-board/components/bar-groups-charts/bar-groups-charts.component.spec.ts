import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarGroupsChartsComponent } from './bar-groups-charts.component';

describe('BarGroupsChartsComponent', () => {
  let component: BarGroupsChartsComponent;
  let fixture: ComponentFixture<BarGroupsChartsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BarGroupsChartsComponent]
    });
    fixture = TestBed.createComponent(BarGroupsChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
