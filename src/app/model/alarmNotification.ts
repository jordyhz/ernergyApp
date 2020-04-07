import { ListOfValue } from './listOfValue';
import { User } from './user';
import { Attribute } from './attribute';
import { Customer } from './customer';

export interface AlarmNotification{
  id: number;
  notName : string ;
  notDesc : string ;
  customerId : Customer ;
  customerTag : Attribute ;
  notCheck : ListOfValue ;
  thresholdValue : number ;
  period : number ;
  notLevel : ListOfValue ;
  active : boolean ;
  deleted : boolean ;
  
}