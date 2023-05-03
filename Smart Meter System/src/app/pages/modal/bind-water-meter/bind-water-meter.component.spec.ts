import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BindWaterMeterComponent } from './bind-water-meter.component';

describe('BindWaterMeterComponent', () => {
  let component: BindWaterMeterComponent;
  let fixture: ComponentFixture<BindWaterMeterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BindWaterMeterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BindWaterMeterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
