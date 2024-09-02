import { TestBed } from '@angular/core/testing';

import { ResidentsService } from './residents.service';

describe('ResidentsService', () => {
  let service: ResidentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResidentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
