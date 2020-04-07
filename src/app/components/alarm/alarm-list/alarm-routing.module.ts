import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlarmListComponent } from './alarm-list.component';
// import {AttributeListComponent} from './attribute-list/attribute-list.component';


const routes: Routes = [
  {path : '', component: AlarmListComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlarmRoutingModule { }
