import { TestBed } from '@angular/core/testing';

import { GetAdminFromDatabaseService } from './get-admin-from-database.service';

describe('GetAdminFromDatabaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetAdminFromDatabaseService = TestBed.get(GetAdminFromDatabaseService);
    expect(service).toBeTruthy();
  });
});
