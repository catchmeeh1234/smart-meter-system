import { TestBed } from '@angular/core/testing';

import { RatescheduleService } from './rateschedule.service';

describe('RatescheduleService', () => {
  let service: RatescheduleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RatescheduleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
