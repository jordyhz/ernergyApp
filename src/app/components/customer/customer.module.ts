import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from 'src/app/app-material/app-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import {CustomerListComponent} from './customer-list/customer-list.component';
import {CustomerOperationsComponent} from './customer-operations/customer-operations.component';
import {CustomerRoutingModule} from './customer-routing.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import {CustomerAddressOperationsComponent} from './customer-address/customer-address-operations/customer-address-operations.component';
import {CustomerAddressListComponent} from './customer-address/customer-address-list/customer-address-list.component';


@NgModule({
  declarations: [
    CustomerListComponent,
    CustomerOperationsComponent,
    CustomerAddressOperationsComponent,
    CustomerAddressListComponent],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    AppMaterialModule,
    ReactiveFormsModule,
    NgxMatSelectSearchModule
  ],
  entryComponents: [
    CustomerOperationsComponent, CustomerAddressOperationsComponent
  ]
})
export class CustomerModule {
  constructor() {
    console.log('CustomerModule loaded.');
  }
}
