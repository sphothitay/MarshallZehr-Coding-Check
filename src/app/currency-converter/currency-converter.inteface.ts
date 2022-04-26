export interface RateDto {
  v: string;
}

export interface RateObservationDto extends Record<string, RateDto | string> {
  d: string;
}

export interface RatesDto {
  observations: RateObservationDto[]
}

export interface RatesState {
  rates: Record<string, number>;
  loading: boolean;
  loaded: boolean;
}

export interface LoadRatesPayload {
  date: string,
  currencies: string[];
}
