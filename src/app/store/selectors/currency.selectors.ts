import {createFeatureSelector, createSelector} from "@ngrx/store";
import {CurrencyState} from "../reducers/currency.reducer";
import {AppState} from "../reducers";

export const getCurrencyFeature =  createFeatureSelector<CurrencyState>('currency');
export const getCurrencyList = createSelector(
  getCurrencyFeature,
  (state: CurrencyState) => state.list
);

export const getCurrencyLoading = createSelector(
  getCurrencyFeature,
  (state: CurrencyState) => state.loading
);
