import {Customer} from './customer';
import {MeasurementPoint} from './measurementPoint';
import {CustomerEquipment} from './customerEquipment';

export interface CusMeasurementPoint {
    id: number;
    customer : Customer;
    measurementPoint : MeasurementPoint;
    customerEquipment : CustomerEquipment;
    desc : String;
    name: string;
    
}
