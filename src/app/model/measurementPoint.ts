import {CustomerMeasurementPoint} from './customerMeasurementPoint';
import {Equipment} from './equipment';

export interface MeasurementPoint {
    id: number;
    name: string;
    desc: string;
    level: string;
    equipment: Equipment;
    cusMesPoint: CustomerMeasurementPoint[];
}
