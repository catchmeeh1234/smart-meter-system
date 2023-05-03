import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewConcessionaireComponent } from './view-concessionaire.component';

describe('ViewConcessionaireComponent', () => {
  let component: ViewConcessionaireComponent;
  let fixture: ComponentFixture<ViewConcessionaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewConcessionaireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewConcessionaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
