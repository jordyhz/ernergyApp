import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModuleScreenListComponent } from './module-screen-list/module-screen-list.component';


const routes: Routes = [
  {path : '', component: ModuleScreenListComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuleScreenRoutingModule { }
