import {HttpErrorResponse} from "@angular/common/http";

export interface CommonErrorResponse {
  error: HttpErrorResponse
}

export interface CurrencyDto {
  label: string;
}

export interface CurrenciesGroupDetailsDto {
  groupSeries: Record<string, CurrencyDto>
}

export interface CurrenciesDto {
  groupDetails: CurrenciesGroupDetailsDto
}
