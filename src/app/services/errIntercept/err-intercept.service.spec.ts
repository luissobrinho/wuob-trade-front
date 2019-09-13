import { TestBed } from '@angular/core/testing';

import { ErrInterceptService } from './err-intercept.service';

describe('ErrInterceptService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ErrInterceptService = TestBed.get(ErrInterceptService);
    expect(service).toBeTruthy();
  });
});
