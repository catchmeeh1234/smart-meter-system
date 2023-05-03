//export const API_URL = 'https://192.168.10.37:4211';
//export const API_URL = 'http://192.168.10.37:4217';
export const API_URL = 'https://backend.smartmetersystem.home:4211';

export const OPENWEATHERMAP_API_KEY = 'cf710047a35a7e143c0efc547def83a3';

export interface User {
  CustomerType: string;
  MinimumCharge: string;
  MeterSize: string;
  twenty: number;
  thirty: number;
  forty: number;
  fifty: number;
  maxx: number;
}
