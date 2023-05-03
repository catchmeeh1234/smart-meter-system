import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddConcessionaireComponent } from './add-concessionaire.component';

describe('AddConcessionaireComponent', () => {
  let component: AddConcessionaireComponent;
  let fixture: ComponentFixture<AddConcessionaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddConcessionaireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddConcessionaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
