import { Attribute } from './attribute';
import { ListOfValue } from './listOfValue';
import { Customer } from './customer';

export interface Kpi {

id : number;
kpiName : string;
kpiContact : string;
customerId : Customer;
customerTag : Attribute ;
kpiCheck : ListOfValue;
thresholdValue : number;
frequency : ListOfValue;
kpiLevel : ListOfValue;
kpiDesc : string;
status : ListOfValue;
active : boolean;
deleted : boolean;

}