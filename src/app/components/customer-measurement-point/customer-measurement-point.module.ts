import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerMeasurementPointRoutingModule } from './customer-measurement-point-routing.module';
import { CustomerMeasurementPointOperationsComponent } from './customer-measurement-point-operations/customer-measurement-point-operations.component';
import { CustomerMeasurementPointListComponent } from './customer-measurement-point-list/customer-measurement-point-list.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import {AppMaterialModule} from '../../app-material/app-material.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomerMeasurementPointAttributeListComponent } from './customer-measurement-point-attribute-list/customer-measurement-point-attribute-list.component';
import { CustomerMeasurementPointAttributeOperationsComponent } from './customer-measurement-point-attribute-operations/customer-measurement-point-attribute-operations.component';


@NgModule({
  declarations: [CustomerMeasurementPointOperationsComponent, CustomerMeasurementPointListComponent,
    CustomerListComponent, CustomerMeasurementPointAttributeListComponent, CustomerMeasurementPointAttributeOperationsComponent],
  imports: [
    CommonModule,
    AppMaterialModule,
    CustomerMeasurementPointRoutingModule,
    ReactiveFormsModule,
    NgxMatSelectSearchModule
  ],
  entryComponents: [
    CustomerMeasurementPointOperationsComponent, CustomerMeasurementPointAttributeOperationsComponent
  ]
})
export class CustomerMeasurementPointModule {
  constructor() {
    console.log('CustomerMeasurementPointModule loaded.');
  }
}
