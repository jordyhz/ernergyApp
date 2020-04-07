import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlarmListComponent } from './alarm-list/alarm-list.component';
import { AlarmOperationsComponent } from './alarm-operations/alarm-operations.component';
import { AlarmReportComponent } from './alarm-report/alarm-report.component';
import { AlarmNotificationComponent } from './alarm-notification/alarm-notification.component';
import { AlarmNotificationListComponent } from './alarm-notification-list/alarm-notification-list.component';


const routes: Routes = [
  

    {path : '' , redirectTo : 'alarm-list' , pathMatch : 'full'},
    {path : 'alarm-list' , component : AlarmListComponent},
    {path : 'alarm-operations' , component : AlarmOperationsComponent},
    // {path : 'alarm-notification' , component : AlarmNotificationComponent},
    // {path : 'alarm-notification/edit/id' , component : AlarmNotificationComponent},
    {path:'alarm-notification',children:[
      {path:'',component: AlarmNotificationComponent}, 
      {path:'edit/:id',component: AlarmNotificationComponent}
    ]},
    {path : 'alarm-notification-list' , component : AlarmNotificationListComponent},
    {path : 'alarm-report' , component : AlarmReportComponent},
    

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlarmRoutingModule { }
