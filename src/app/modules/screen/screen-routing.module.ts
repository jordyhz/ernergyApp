import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScreenListComponent } from './screen-list/screen-list.component';

const routes: Routes = [
  {path : '' , component: ScreenListComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScreenRoutingModule { }
