import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerEquipmentRoutingModule } from './customer-equipment-routing.module';
import {CustomerEquipmentOperationsComponent} from './customer-equipment-operations/customer-equipment-operations.component';
import {AppMaterialModule} from '../../app-material/app-material.module';
import {CustomerEquipmentListComponent} from './customer-equipment-list/customer-equipment-list.component';
import {CustomerListComponent} from './customer-list/customer-list.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomerEquipmentAttributeListComponent } from './customer-equipment-attribute-list/customer-equipment-attribute-list.component';
import { CustomerEquipmentAttributeOperationsComponent } from './customer-equipment-attribute-operations/customer-equipment-attribute-operations.component';


@NgModule({
  declarations: [CustomerEquipmentListComponent,
    CustomerEquipmentOperationsComponent,
    CustomerListComponent,
    CustomerEquipmentAttributeListComponent,
    CustomerEquipmentAttributeOperationsComponent],
  imports: [
    CommonModule,
    AppMaterialModule,
    CustomerEquipmentRoutingModule,
    ReactiveFormsModule,
    NgxMatSelectSearchModule
  ],
  entryComponents: [
    CustomerEquipmentOperationsComponent, CustomerEquipmentAttributeOperationsComponent
  ]
})
export class CustomerEquipmentModule {
  constructor() {
    console.log('CustomerEquipmentModule loaded.');
  }
}
