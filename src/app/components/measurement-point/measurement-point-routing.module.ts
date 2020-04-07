import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MeasurementPointListComponent} from './measurement-point-list/measurement-point-list.component';


const routes: Routes = [
  {path : '', component: MeasurementPointListComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeasurementPointRoutingModule { }
