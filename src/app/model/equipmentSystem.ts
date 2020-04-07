import { MeasurementPoint } from './measurementPoint';

export interface EquipmentSystem {
    id: number;
    name: string;
    desc: string;
    mesPoint: MeasurementPoint[];
}
