import * as fromActions from '../actions/currency.actions';
import {ActionReducer, createReducer, on} from "@ngrx/store";
import {Currency} from "../../app.interface";

export interface CurrencyState {
  list: Currency[];
  loading: boolean;
  loaded: boolean,
}

const initialState: CurrencyState = {
  list: [],
  loaded: false,
  loading: false
}

export const currencyReducer: ActionReducer<CurrencyState> = createReducer(
  initialState,
  on(fromActions.loadCurrencyList, state => ({
    ...state,
    loading: true,
    loaded: false
  })),

  on(fromActions.loadCurrencyListSuccess, (state, {list}) => {
    return ({
      ...state,
      loading: false,
      loaded: true,
      list
    })
  }),

  on(fromActions.loadCurrencyListError, state => ({
    ...state,
    loading: false,
    loaded: true,
  })),
);
