import { TestBed } from '@angular/core/testing';

import { CurrencyConverterStoreService } from './currency-converter-store.service';

describe('CurrencyConverterStoreService', () => {
  let service: CurrencyConverterStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrencyConverterStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
