import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndexComponent } from './index/index.component';
import { Index2Component } from './index2/index2.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgxEchartsModule } from 'ngx-echarts';
import 'hammerjs';

import { GaugesModule } from '@progress/kendo-angular-gauges';

import { HttpClient , HttpHeaders, HttpParams, HttpClientModule} from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import {DashboardsRoutingModule} from './dashboards-routing.module';
import { Summary01Component } from '../../components/widgets/summary01/summary01.component';
import { DetailTilesComponent } from '../../components/detail-tiles/detail-tiles.component';
import { Index3Component } from './index3/index3.component';
import { WidgetCounterTileComponent } from '../widgets/widget-counter-tile/widget-counter-tile.component';


@NgModule({
    declarations : [IndexComponent , Index2Component, WidgetCounterTileComponent,DashboardComponent,Summary01Component,DetailTilesComponent, Index3Component],
    
    imports : [
        HttpClientModule,
        NgxEchartsModule,
        CommonModule,
        GaugesModule,
        NgbModule,
        DashboardsRoutingModule,
    ],

})

export class DashboardsModule { }