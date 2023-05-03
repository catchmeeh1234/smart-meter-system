import { TestBed } from '@angular/core/testing';

import { MetersizeService } from './metersize.service';

describe('MetersizeService', () => {
  let service: MetersizeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MetersizeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
