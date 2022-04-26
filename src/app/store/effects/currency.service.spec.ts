import { TestBed } from '@angular/core/testing';

import { CurrencyService } from './currency.service';
import {CurrenciesDto} from "../../app.interface";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {HttpClient} from "@angular/common/http";

describe('CurrencyService', () => {
  let service: CurrencyService;
  let httpController: HttpTestingController;
  let httpClient: HttpClient;
  let mockDto: CurrenciesDto;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(CurrencyService);
    httpController = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    mockDto = {
      groupDetails: {
        groupSeries: {
          "FXAUDCAD": {
            "label": "AUD/CAD",
          },
          "FXBRLCAD": {
            "label": "BRL/CAD",
          },
          "FXCNYCAD": {
            "label": "CNY/CAD",
          },
        }
      }
    };
  });

  afterEach(() => {
    httpController.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getCurrencies: should execute get API request', () => {
    service.getCurrencies().subscribe(
      {
        next: res => expect(res).toEqual(mockDto, 'should return expected results')
      }
    );

    const req = httpController.expectOne('https://www.bankofcanada.ca/valet/groups/FX_RATES_DAILY');
    expect(req.request.method).toEqual('GET');

    // Provide each request with a mock response
    req.flush(mockDto);
  });

  it('fromDto: should parse currencies into array of strings', () => {
    const result = service.fromDto(mockDto);
    expect(result).toEqual(['AUD', 'BRL', 'CNY']);
  });
});
