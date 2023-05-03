import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewWaterMeterComponent } from './view-water-meter.component';

describe('ViewWaterMeterComponent', () => {
  let component: ViewWaterMeterComponent;
  let fixture: ComponentFixture<ViewWaterMeterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewWaterMeterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewWaterMeterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
