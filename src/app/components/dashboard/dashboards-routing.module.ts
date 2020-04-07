import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { Index2Component } from './index2/index2.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Index3Component } from './index3/index3.component';


const routes : Routes = [

    {
        path : '',
        component : DashboardComponent,
        children : [
            { path: '', redirectTo:'index', pathMatch: 'full'},
            { path: 'index', component: IndexComponent, data: { title: 'Observer' }},
            { path: 'index2', component: Index2Component, data: { title: 'Observer' }},
            { path: 'index3', component: Index3Component, data: { title: 'Observer' }},
        ]
    }
]

@NgModule({
    imports : [RouterModule.forChild(routes)],
    exports : [RouterModule]
})

export class DashboardsRoutingModule {}