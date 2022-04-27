import {Component, OnDestroy} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {filter, Subject, takeUntil} from "rxjs";
import * as fromStore from "../store";
import {RatesStoreService} from "./rates-store.service";
import {Currency} from "../app.interface";

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.css'],
  providers: [
    RatesStoreService
  ]
})
export class CurrencyConverterComponent implements OnDestroy {
  selectedCurrency = '';
  from = false;
  currencies: Currency[] = [];
  currenciesModel: string[] = [];
  date: string = '';
  maxDate: string = '';
  foreign = 0;
  cad = 0;
  rates: Record<string, number> = {};

  readonly loading$ = this.ratesStore.loading$;
  get hasRates() {
    return Object.keys(this.rates).length > 0;
  }

  private readonly unsubscribe$: Subject<void> = new Subject();

  constructor(private store: Store, private ratesStore: RatesStoreService) {
    this.setMaxDate();

    this.ratesStore.rates$.subscribe({
      next: rates => {
        debugger;
        this.rates = rates;
        this.convertRates();
      }
    });

    this.store.pipe(
      select(fromStore.getCurrencyList),
      takeUntil(this.unsubscribe$)
    ).subscribe({
      next: currencies => {
        this.currencies = currencies;
        this.selectedCurrency = currencies[0].model;
        this.currenciesModel = currencies.map(currency => currency.model);
        this.loadRates(this.date, this.currenciesModel);
      }
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
  }

  loadRates(date: string, currencies: string[]) {
    this.date = date;
    this.ratesStore.loadRates({currencies, date});
  }

  setSelectedCurrency(currency: string) {
    this.selectedCurrency = currency;
    this.convertRates();
  }

  convertRates() {
    const rate = this.rates[this.selectedCurrency];

    if (!rate) {
      return;
    }

    if (this.from) {
      this.foreign = this.round(this.cad / rate);
    } else {
      this.cad = this.round(this.foreign * rate);
    }
  }

  private round(num: number) {
    return Math.round(num * 10000) / 10000;
  }

  private setMaxDate() {
    const date = new Date();
    const utcHours = date.getUTCHours();
    // The daily average exchange rates are published once each business day by 16:30 ET
    // UTC 22 is 5 mp EST.
    // Before that time use yesterday as initial & the max date
    if (utcHours < 22) {
      date.setDate(date.getDate() - 1);
    }

    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();

    this.maxDate = `${yyyy}-${mm}-${dd}`
    this.date = this.maxDate;
  }
}
