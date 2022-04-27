import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {CurrenciesDto} from "./currency.interface";
import {environment} from "../../../environments/environment";
import {Currency} from "../../app.interface";

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  constructor(private httpClient: HttpClient) {
  }

  getCurrencies(): Observable<CurrenciesDto> {
    return this.httpClient.get<CurrenciesDto>(`${environment.api}/groups/FX_RATES_DAILY`);
  }

  fromDto(dto: CurrenciesDto): Currency[] {
    return Object.keys(dto.groupDetails.groupSeries).map(key => {
      const {label} = dto.groupDetails.groupSeries[key];
      const delimiterInder = label.indexOf('/');
      return {
        view: label.substring(0, delimiterInder),
        model: key
      };
    });
  }
}
