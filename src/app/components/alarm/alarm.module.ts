import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppMaterialModule } from 'src/app/app-material/app-material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgxEchartsModule } from 'ngx-echarts';
import 'hammerjs';

import { GaugesModule } from '@progress/kendo-angular-gauges';

import { HttpClient , HttpHeaders, HttpParams, HttpClientModule} from '@angular/common/http';
import {AlarmWidgetComponent} from '../widgets/alarm-widget/alarm-widget.component';
import { AlarmListComponent } from './alarm-list/alarm-list.component';
import { AlarmOperationsComponent } from './alarm-operations/alarm-operations.component';
import { AlarmRoutingModule } from './alarm-routing.module';
import { AlarmMailComponent } from './alarm-mail/alarm-mail.component';
import { AlarmPhoneComponent } from './alarm-phone/alarm-phone.component';
import { AlarmReportComponent } from './alarm-report/alarm-report.component';
import { AlarmNotificationComponent } from './alarm-notification/alarm-notification.component';
import { AlarmNotificationMessageComponent } from './alarm-notification-message/alarm-notification-message.component';
import {  FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import {  MatSelectModule } from '@angular/material';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input'; 
import {MatDialogModule} from '@angular/material/dialog';
import { AlarmNotificationListComponent } from './alarm-notification-list/alarm-notification-list.component'; 

@NgModule({
    declarations : [ AlarmWidgetComponent , AlarmListComponent,AlarmOperationsComponent, AlarmMailComponent, AlarmPhoneComponent, AlarmReportComponent, AlarmNotificationComponent, AlarmNotificationMessageComponent, AlarmNotificationListComponent ],
    
    imports : [
        HttpClientModule,
        NgxEchartsModule,
        CommonModule,
        GaugesModule,
        NgbModule,
        AppMaterialModule,
        AlarmRoutingModule,
        FormsModule,
        MatDialogModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        NgxMatSelectSearchModule,
        MatSelectModule,
        MatButtonModule,
       

       
    ],
    entryComponents: [
        AlarmPhoneComponent,AlarmMailComponent,AlarmNotificationMessageComponent
      ]

})

export class AlarmModule { }