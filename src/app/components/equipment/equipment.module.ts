import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from 'src/app/app-material/app-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import {EquipmentOperationsComponent} from './equipment-operations/equipment-operations.component';
import {EquipmentListComponent} from './equipment-list/equipment-list.component';
import {EquipmentRoutingModule} from './equipment-routing.module';
import { EquipmentAttributeOperationsComponent } from './equipment-attribute-operations/equipment-attribute-operations.component';


@NgModule({
  declarations: [EquipmentListComponent, EquipmentOperationsComponent, EquipmentAttributeOperationsComponent],
  imports: [
    CommonModule,
    EquipmentRoutingModule,
    AppMaterialModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    EquipmentOperationsComponent, EquipmentAttributeOperationsComponent
  ]
})
export class EquipmentModule {
  constructor() {
    console.log('EquipmentModule loaded.');
  }
}
