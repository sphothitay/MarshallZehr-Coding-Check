import { TestBed } from '@angular/core/testing';

import { RatesStoreService } from './rates-store.service';
import {RatesApiService} from "./rates-api.service";
import {of} from "rxjs";

describe('RatesStoreService', () => {
  let service: RatesStoreService;
  let mockApiService: jasmine.SpyObj<RatesApiService>;

  beforeEach(() => {
    mockApiService = jasmine.createSpyObj('RatesApiService', ['loadRates', 'fromDto']);
    mockApiService.fromDto.and.returnValue({});
    mockApiService.loadRates.and.returnValue(of({observations: []}));

    TestBed.configureTestingModule({
      providers: [
        RatesStoreService,
        {provide: RatesApiService, useValue: mockApiService}
      ]
    });
    service = TestBed.inject(RatesStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
