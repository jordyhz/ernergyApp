import {CustomerEquipment} from './customerEquipment';
export interface CustomerEquipmentAttribute {
  id: number;
  attrValue: string;
  attrSuggestedValue: string;
  customerEquipment: CustomerEquipment;
}
