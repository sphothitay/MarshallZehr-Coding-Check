import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CurrencyConverterComponent} from './currency-converter.component';
import {provideMockStore} from "@ngrx/store/testing";
import {RatesApiService} from "./rates-api.service";
import {of} from "rxjs";


describe('CurrencyConverterComponent', () => {
  let component: CurrencyConverterComponent;
  let fixture: ComponentFixture<CurrencyConverterComponent>;
  let mockApiService: jasmine.SpyObj<RatesApiService>;

  beforeEach(async () => {
    mockApiService = jasmine.createSpyObj('RatesApiService', ['loadRates', 'fromDto']);
    mockApiService.fromDto.and.returnValue({});
    mockApiService.loadRates.and.returnValue(of({observations: []}));

    await TestBed.configureTestingModule({
      declarations: [ CurrencyConverterComponent ],
      providers: [
        provideMockStore(),
        {provide: RatesApiService, useValue: mockApiService}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyConverterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
