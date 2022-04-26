import { TestBed } from '@angular/core/testing';

import { RatesStoreService } from './rates-store.service';

describe('CurrencyConverterStoreService', () => {
  let service: RatesStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RatesStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
