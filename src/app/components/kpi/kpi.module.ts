import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KpiRoutingModule } from './kpi-routing.module';
import { KpiOperationsComponent } from './kpi-operations/kpi-operations.component';
import { KpiListComponent } from './kpi-list/kpi-list.component';

import { AppMaterialModule } from 'src/app/app-material/app-material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgxEchartsModule } from 'ngx-echarts';
import 'hammerjs';

import { GaugesModule } from '@progress/kendo-angular-gauges';
import { HttpClient , HttpHeaders, HttpParams, HttpClientModule} from '@angular/common/http';
import {  FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import {  MatSelectModule } from '@angular/material';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input'; 
import {MatDialogModule} from '@angular/material/dialog';



@NgModule({
  declarations: [KpiOperationsComponent , KpiListComponent],
  imports: [
    CommonModule,
    KpiRoutingModule,
    HttpClientModule,
    NgxEchartsModule,
    GaugesModule,
    NgbModule,
    AppMaterialModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgxMatSelectSearchModule,
    MatSelectModule,
    MatButtonModule,
   
  ],
  
})
export class KpiModule { }
