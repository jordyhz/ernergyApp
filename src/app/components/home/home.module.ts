import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from 'src/app/app-material/app-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './home.component';
//import {MatTabsModule} from '@angular/material';
import { ChartsModule } from '@progress/kendo-angular-charts';
import { GaugesModule } from '@progress/kendo-angular-gauges';
import {DiagramComponent} from './diagram/diagram.component';
import { HomemainComponent } from './homemain/homemain.component';
import { MapComponent } from './map/map.component';
import { AgmCoreModule } from '@agm/core';


@NgModule({
  declarations: [HomeComponent, DiagramComponent, HomemainComponent,MapComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    AppMaterialModule,
    ReactiveFormsModule,
   // MatTabsModule,
    ChartsModule,
    GaugesModule,
    AgmCoreModule.forRoot({
      apiKey : 'AIzaSyC30Cxv1q7CE_0tkYhntYCC2MKgBfvGeDs'
    })
  ],
  entryComponents: [
    HomeComponent
  ]
})
export class HomeModule {
  constructor() {
    console.log('HomeModule loaded.');
  }
}
