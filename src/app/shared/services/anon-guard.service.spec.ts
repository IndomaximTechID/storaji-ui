import { TestBed, inject } from '@angular/core/testing';

import { AnonGuardService } from './anon-guard.service';

describe('AnonGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnonGuardService]
    });
  });

  it('should be created', inject([AnonGuardService], (service: AnonGuardService) => {
    expect(service).toBeTruthy();
  }));
});
