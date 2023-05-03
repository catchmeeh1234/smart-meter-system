import { TestBed } from '@angular/core/testing';

import { SmartmeterService } from './smartmeter.service';

describe('SmartmeterService', () => {
  let service: SmartmeterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SmartmeterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
