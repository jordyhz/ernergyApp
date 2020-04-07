import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MeasurementPointListComponent} from './measurement-point-list/measurement-point-list.component';
import {MeasurementPointOperationsComponent} from './measurement-point-operations/measurement-point-operations.component';
import {AppMaterialModule} from '../../app-material/app-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import {MeasurementPointRoutingModule} from './measurement-point-routing.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';



@NgModule({
  declarations: [MeasurementPointListComponent, MeasurementPointOperationsComponent],
  imports: [
    CommonModule,
    MeasurementPointRoutingModule,
    AppMaterialModule,
    ReactiveFormsModule,
    NgxMatSelectSearchModule
  ],
  entryComponents: [
    MeasurementPointOperationsComponent
  ]
})
export class MeasurementPointModule {
  constructor() {
    console.log('MeasurementPointModule loaded.');
  }
}
