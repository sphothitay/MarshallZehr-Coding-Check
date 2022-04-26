import {currencyReducer, CurrencyState} from "./currency.reducer";
import {ActionReducer, ActionReducerMap} from "@ngrx/store";

export interface AppState {
  currency: CurrencyState
}

export const reducers: ActionReducerMap<AppState> = {
  currency: currencyReducer
};

export * from './currency.reducer';
