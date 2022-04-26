import {Component} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import * as fromStore from "../store";

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.css']
})
export class CurrencyConverterComponent {
  currencies$: Observable<string[]> = this.store.pipe(select(fromStore.getCurrencyList));

  selectedCurrency = '';
  from = false;

  constructor(private store: Store) {
  }
}
