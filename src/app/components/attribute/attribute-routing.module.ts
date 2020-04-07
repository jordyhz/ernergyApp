import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AttributeListComponent} from './attribute-list/attribute-list.component';


const routes: Routes = [
  {path : '', component: AttributeListComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttributeRoutingModule { }
