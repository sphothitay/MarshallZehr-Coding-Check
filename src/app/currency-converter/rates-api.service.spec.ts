import {TestBed} from '@angular/core/testing';

import {RatesApiService} from './rates-api.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {RatesDto} from "./currency-converter.inteface";
import {environment} from "../../environments/environment";

describe('CurrencyConverterApiService', () => {
  let service: RatesApiService;
  let httpController: HttpTestingController;
  let mockDto: RatesDto;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(RatesApiService);
    httpController = TestBed.inject(HttpTestingController);
    mockDto = {
      observations: [
        {
          d: '2017-01-03',
          FXAUDCAD: {
            v: '0.9702'
          },
          FXEURCAD: {
            v: '1.3973'
          },
          FXUSDCAD: {
            v: '1.3435'
          }
        }
      ]
    }
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getCurrencies: should execute get API request', () => {
    const date = '2017-01-03';
    service.loadRates(['AUD', 'EUR', 'USD'], date).subscribe(
      {
        next: res => expect(res).toEqual(mockDto, 'should return expected results')
      }
    );

    const expectationUrl = `${environment.api}observations/AUD,EUR,USD/json?start_date=${date}&end_date=${date}`;
    const req = httpController.expectOne(expectationUrl);
    expect(req.request.method).toEqual('GET');

    // Provide each request with a mock response
    req.flush(mockDto);
  });

  it('fromDto: should convert to a dictionary of rates', () => {
    const result = service.fromDto(mockDto);
    expect(result).toEqual({
      AUD: 0.9702,
      EUR: 1.3973,
      USD: 1.3435
    })
  });
});
