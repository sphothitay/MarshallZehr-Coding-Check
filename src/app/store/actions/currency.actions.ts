import {createAction, props} from '@ngrx/store';
import {Currency} from "../../app.interface";
import {HttpErrorResponse} from "@angular/common/http";

export const LOAD_CURRENCY = '[Currency] Load List';
export const loadCurrencyList = createAction(LOAD_CURRENCY);

export const LOAD_CURRENCY_SUCCESS = '[Currency] Load List Success';
export const loadCurrencyListSuccess = createAction(LOAD_CURRENCY_SUCCESS, props<{list: Currency[]}>());

export const LOAD_CURRENCY_ERROR = '[Currency] Load List Error';
export const loadCurrencyListError = createAction(LOAD_CURRENCY_ERROR, props<{error: HttpErrorResponse}>());
