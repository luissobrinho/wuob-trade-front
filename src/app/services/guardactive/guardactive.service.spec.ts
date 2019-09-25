import { TestBed } from '@angular/core/testing';

import { GuardactiveService } from './guardactive.service';

describe('GuardactiveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GuardactiveService = TestBed.get(GuardactiveService);
    expect(service).toBeTruthy();
  });
});
