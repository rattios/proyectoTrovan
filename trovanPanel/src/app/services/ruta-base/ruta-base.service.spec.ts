import { TestBed, inject } from '@angular/core/testing';

import { RutaBaseService } from './ruta-base.service';

import {} from 'jasmine';

describe('RutaBaseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RutaBaseService]
    });
  });

  it('should be created', inject([RutaBaseService], (service: RutaBaseService) => {
    expect(service).toBeTruthy();
  }));
});
