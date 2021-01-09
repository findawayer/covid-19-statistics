export type SerializableType = 'string' | 'number' | 'boolean';

export type SerializableData =
  | SerializableType
  | SerializableType[]
  | Record<string, unknown>;

export type CountryData = {
  country: string;
  code: string;
  confirmed: number;
  recovered: number;
  critical: number;
  deaths: number;
  latitude: number;
  longitude: number;
  lastChange: string; // Date string
  lastUpdate: string; // Date string
};

export type AllCountriesData = CountryData[];
