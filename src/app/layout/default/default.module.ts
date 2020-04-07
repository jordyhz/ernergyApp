import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { MatSidenavModule, MatDividerModule, MatCardModule, MatTableModule,  MatPaginatorModule } from '@angular/material'
import { NgxEchartsModule } from 'ngx-echarts';
import { RouterModule } from '@angular/router';

/*Components Modules */

import {HomeModule} from '../../components/home/home.module';

@NgModule({
    declarations : [
    ],

    imports : [
        HomeModule,
        MatSidenavModule,
        MatDividerModule, 
        MatCardModule, 
        MatTableModule,  
        MatPaginatorModule,
        CommonModule,
        HttpClientModule,
        NgxEchartsModule,
        RouterModule,

    ],

   

    providers : [

    ]
})

export class DefaultModule {}
