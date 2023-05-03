import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSelectedSmartMeterComponent } from './view-selected-smart-meter.component';

describe('ViewSelectedSmartMeterComponent', () => {
  let component: ViewSelectedSmartMeterComponent;
  let fixture: ComponentFixture<ViewSelectedSmartMeterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSelectedSmartMeterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSelectedSmartMeterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
