import {Component} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import * as fromStore from "../store";
import {RatesStoreService} from "./rates-store.service";

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.css'],
  providers: [
    RatesStoreService
  ]
})
export class CurrencyConverterComponent {
  currencies$: Observable<string[]> = this.store.pipe(select(fromStore.getCurrencyList));

  selectedCurrency = '';
  from = false;

  constructor(private store: Store, ratesStore: RatesStoreService) {

  }
}
