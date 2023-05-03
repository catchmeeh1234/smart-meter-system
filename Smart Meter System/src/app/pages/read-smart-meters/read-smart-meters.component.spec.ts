import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadSmartMetersComponent } from './read-smart-meters.component';

describe('ReadSmartMetersComponent', () => {
  let component: ReadSmartMetersComponent;
  let fixture: ComponentFixture<ReadSmartMetersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadSmartMetersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadSmartMetersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
