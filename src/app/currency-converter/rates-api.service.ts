import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {RateDto, RatesDto} from "./currency-converter.inteface";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RatesApiService {
  constructor(private httpClient: HttpClient) { }

  loadRates(currencies: string[], date: string): Observable<RatesDto> {
    const url = `${environment.api}/observations/${currencies.join(',')}/json`;
    const params = {
      start_date: date,
      end_date: date
    }

    return this.httpClient.get<RatesDto>(url, {params});
  }

  fromDto(dto: RatesDto): Record<string, number> {
    const {d, ...rest} = dto.observations[0];
    const result: Record<string, number> = {};

    Object.keys(rest).forEach(observation => {
      result[observation] = Number((rest[observation] as RateDto).v);
    });

    return result;
  }
}
