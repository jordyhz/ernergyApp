import {ListOfValue} from './listOfValue';

export interface Customer {
  id: number;
  cusCode: string,
  cusName: string;
  cusLevel: number;
  active: boolean;
  parent: Customer;
  sector: ListOfValue;
}
