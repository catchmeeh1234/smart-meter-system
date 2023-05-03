import { TestBed } from '@angular/core/testing';

import { ConcessionairesService } from './concessionaires.service';

describe('ConcessionairesService', () => {
  let service: ConcessionairesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConcessionairesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
