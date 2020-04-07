import {Customer} from './customer';
import {Equipment} from './equipment';
export interface CustomerEquipment {
  id: number;
  customer: Customer;
  name: number;
  serialNumber: string;
  equipment: Equipment;
}
