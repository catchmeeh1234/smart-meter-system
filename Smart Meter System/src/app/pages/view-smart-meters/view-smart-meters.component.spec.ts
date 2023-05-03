import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSmartMetersComponent } from './view-smart-meters.component';

describe('ViewSmartMetersComponent', () => {
  let component: ViewSmartMetersComponent;
  let fixture: ComponentFixture<ViewSmartMetersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSmartMetersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSmartMetersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
