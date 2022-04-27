import {Injectable} from '@angular/core';
import {ComponentStore, tapResponse} from "@ngrx/component-store";
import {LoadRatesPayload, RatesDto, RatesState} from "./currency-converter.inteface";
import {Observable, switchMap, tap} from "rxjs";
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
          next: () => this.patchState({
            loaded: false,
            loading: true
          })
        }
      ),
      switchMap(({currencies, date}) => this.apiService.loadRates(currencies, date).pipe(
        tapResponse(
          (dto: RatesDto) => this.updateRates(this.apiService.fromDto(dto)),
          () => this.patchState({
            loaded: false,
            loading: false
          })
        )
      ))
    )
  );

  readonly updateRates = this.updater((state, rates: Record<string, number>) => ({
    loaded: true,
    loading: false,
    rates: {...rates}
  }));
}
