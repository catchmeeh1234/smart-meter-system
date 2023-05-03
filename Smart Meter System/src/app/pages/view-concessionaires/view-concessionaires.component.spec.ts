import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewConcessionairesComponent } from './view-concessionaires.component';

describe('ViewConcessionairesComponent', () => {
  let component: ViewConcessionairesComponent;
  let fixture: ComponentFixture<ViewConcessionairesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewConcessionairesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewConcessionairesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
