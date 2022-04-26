import { Injectable } from '@angular/core';
import {ComponentStore} from "@ngrx/component-store";
import {LoadRatesPayload, RatesDto, RatesState} from "./currency-converter.inteface";
import {catchError, EMPTY, map, Observable, switchMap, tap} from "rxjs";
import {RatesApiService} from "./rates-api.service";

@Injectable()
export class RatesStoreService extends ComponentStore<RatesState>{
  constructor(private apiService: RatesApiService) {
    super({
      loaded: false,
      loading: false,
      rates: {}
    });
  }

  readonly rates$: Observable<Record<string, number>> = this.select(state => state.rates);
  readonly loading$: Observable<boolean> = this.select(state => state.loading);

  readonly loadRates = this.effect((rates$: Observable<LoadRatesPayload>) =>
    rates$.pipe(
      tap(
        {
          next: () => this.updater((state) => ({
            ...state,
            loaded: false,
            loading: true
          }))
        }
      ),
      switchMap(({currencies, date}) => this.apiService.loadRates(currencies, date).pipe(
        tap(
          {
            next: (dto: RatesDto) => {
              const rates = this.apiService.fromDto(dto);
              return this.updater((state) => ({
                ...state,
                loaded: true,
                loading: false,
                rates: {...rates}
              }))
            },
            error: () => this.updater((state) => ({
              ...state,
              loaded: false,
              loading: false
            }))
          }
        )
      ))
    )
  );
}
