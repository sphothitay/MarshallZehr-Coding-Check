import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {CurrencyService} from "./currency.service";
import * as fromActions from "../actions/currency.actions";
import {catchError, map, of, switchMap} from "rxjs";

@Injectable()
export class CurrencyEffects {
  constructor(
    private actions$: Actions,
    private dataService: CurrencyService
  ) {
  }

  loadCurrencies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.loadCurrencyList),
      switchMap(() =>
        this.dataService.getCurrencies()
          .pipe(
            map(dto => ({type: fromActions.LOAD_CURRENCY_SUCCESS, list: this.dataService.fromDto(dto)})),
            catchError(error => of({type: fromActions.LOAD_CURRENCY_ERROR, error: error}))
          )
      )
    )
  );
}
