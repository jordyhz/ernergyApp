import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home.component';
import { MapComponent } from './map/map.component';
import { HomemainComponent } from './homemain/homemain.component';


const routes: Routes = [
  {path : '', component: MapComponent, pathMatch: 'full'},
  {path : 'main', component: HomemainComponent},
  {path : 'details', component: HomeComponent}

  //{path : '', component: HomeComponent, pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
