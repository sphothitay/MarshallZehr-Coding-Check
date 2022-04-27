import { Component } from '@angular/core';
import {select, Store} from "@ngrx/store";
import * as fromStore from './store';
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loading$: Observable<boolean> = this.store.pipe(select(fromStore.getCurrencyLoading));

  constructor(private store: Store) {
    this.store.dispatch({type: fromStore.LOAD_CURRENCY});
  }
}
