import {TransactionCurrent} from './transactionCurrent';

export interface CustomerMeasurementPoint {
    id: number;
    name: string;
    mesPointId: number;
    transaction: TransactionCurrent[];
}
