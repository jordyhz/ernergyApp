import {Customer} from './customer';
import {ListOfValue} from './listOfValue';

export interface CustomerAddress {
  id: number;
  customer: Customer;
  addressType: number;
  addressLine: string;
  phone1: number;
  phone2: number;
  zipCode: string;
  city: ListOfValue;
  country: ListOfValue;
}
