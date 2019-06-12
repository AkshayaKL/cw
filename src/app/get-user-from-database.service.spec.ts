import { TestBed } from '@angular/core/testing';

import { GetUserFromDatabaseService } from './get-user-from-database.service';

describe('GetUserFromDatabaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetUserFromDatabaseService = TestBed.get(GetUserFromDatabaseService);
    expect(service).toBeTruthy();
  });
});
