import { Kpi } from './kpi';

export interface KpiInfo {

    id : number;
    customerId : number;
    kpi : Kpi;
    value : number;
}