
import { createAction, props } from '@ngrx/store';
import {CommonErrorResponse} from "../../app.interface";

export const LOAD_CURRENCY = '[Currency] Load List';
export const loadCurrencyList = createAction(LOAD_CURRENCY);

export const LOAD_CURRENCY_SUCCESS = '[Currency] Load List Success';
export interface LoadCurrencyListSuccess {
  list: string[];
}
export const loadCurrencyListSuccess = createAction(LOAD_CURRENCY_SUCCESS, props<LoadCurrencyListSuccess>());

export const LOAD_CURRENCY_ERROR = '[Currency] Load List Error';
export const loadCurrencyListError = createAction(LOAD_CURRENCY_ERROR, props<CommonErrorResponse>());
