import * as fromActions from '../actions/currency.actions';
import {Action, ActionReducer, createReducer, on} from "@ngrx/store";

export interface CurrencyState {
  list: string[];
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
    debugger
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
