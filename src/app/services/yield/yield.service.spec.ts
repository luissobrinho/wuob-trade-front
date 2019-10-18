import { TestBed } from '@angular/core/testing';

import { YieldService } from './yield.service';

describe('YieldService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: YieldService = TestBed.get(YieldService);
    expect(service).toBeTruthy();
  });
});
