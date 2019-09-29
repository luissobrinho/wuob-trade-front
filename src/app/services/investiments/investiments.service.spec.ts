import { TestBed } from '@angular/core/testing';

import { InvestimentsService } from './investiments.service';

describe('InvestimentsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InvestimentsService = TestBed.get(InvestimentsService);
    expect(service).toBeTruthy();
  });
});
