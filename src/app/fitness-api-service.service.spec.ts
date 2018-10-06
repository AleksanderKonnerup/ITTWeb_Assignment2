import { TestBed } from '@angular/core/testing';

import { FitnessApiService } from './fitness-api-service.service';

describe('FitnessApiServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FitnessApiService = TestBed.get(FitnessApiService);
    expect(service).toBeTruthy();
  });
});
