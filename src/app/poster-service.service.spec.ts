import { TestBed } from '@angular/core/testing';

import { PosterServiceService } from './poster-service.service';

describe('PosterServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PosterServiceService = TestBed.get(PosterServiceService);
    expect(service).toBeTruthy();
  });
});
