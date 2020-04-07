import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KpiOperationsComponent } from './kpi-operations/kpi-operations.component';
import { KpiListComponent } from './kpi-list/kpi-list.component';


const routes: Routes = [
  {path : '', redirectTo: 'kpi' , pathMatch : 'full'},
  {path : 'kpi-operations' , component : KpiOperationsComponent},
  {path : 'kpi-list' , component : KpiListComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KpiRoutingModule { }
