import { TestBed } from '@angular/core/testing';

import { PutUserInsideDatabaseService } from './put-user-inside-database.service';

describe('PutUserInsideDatabaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PutUserInsideDatabaseService = TestBed.get(PutUserInsideDatabaseService);
    expect(service).toBeTruthy();
  });
});
