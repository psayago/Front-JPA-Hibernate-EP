import { TestBed } from '@angular/core/testing';

import { TraerDelBackService } from './traer-del-back.service';

describe('TraerDelBackService', () => {
  let service: TraerDelBackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TraerDelBackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
