import { TestBed } from '@angular/core/testing';

import { BackService } from './back.service';

describe('TraerDelBackService', () => {
  let service: BackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
