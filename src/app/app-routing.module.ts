import { NgModule, InjectionToken } from '@angular/core';
import { Routes, RouterModule, ActivatedRouteSnapshot } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { AuthGuard } from './auth.guard';
import { MapComponent } from './components/home/map/map.component';
import { MetricListComponent } from './components/metric/metric-list.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import {DashboardComponent} from './components/dashboard/dashboard/dashboard.component';
import {AlarmListComponent} from './components/alarm/alarm-list/alarm-list.component';
import {DefaultComponent} from '../app/layout/default/default.component'
import { Auth } from 'aws-amplify';
const externalUrlProvider = new InjectionToken('externalUrlRedirectResolver');
const deactivateGuard = new InjectionToken('deactivateGuard');


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: AuthComponent },
 // { path: 'map', component: MapComponent, canActivate: [AuthGuard]},
  { path: 'metric', component: MetricListComponent, canActivate: [AuthGuard] },
  { path: 'screen', loadChildren: () => import('./modules/screen/screen.module').then(m => m.ScreenModule), canActivate: [AuthGuard] },
  { path: 'roles', loadChildren: () => import('./modules/roles/roles.module').then(m => m.RolesModule), canActivate: [AuthGuard] },
  {
    path: 'module_screen', loadChildren: () => import('./modules/module-screen/module-screen.module').
      then(m => m.ModuleScreenModule), canActivate: [AuthGuard]
  },
  { path: 'module', loadChildren: () => import('./modules/module/module.module').then(m => m.ModuleModule), canActivate: [AuthGuard] },
  {
    path: 'equipment', loadChildren: () => import('./components/equipment/equipment.module').
      then(m => m.EquipmentModule), canActivate: [AuthGuard]
  },
  {
    path: 'attribute', loadChildren: () => import('./components/attribute/attribute.module').
      then(m => m.AttributeModule), canActivate: [AuthGuard]
  },

  { path: 'alarm', loadChildren : () => import('./components/alarm/alarm.module').
      then(m => m.AlarmModule), canActivate: [AuthGuard]

  },

  { path: 'kpi', loadChildren : () => import('./components/kpi/kpi.module').
      then(m => m.KpiModule), canActivate: [AuthGuard]

  },

  {
    path: 'dashboard', loadChildren: () => import('./components/dashboard/dashboards.module').
      then(m => m.DashboardsModule), canActivate: [AuthGuard]
  },
  {
    path: 'measurementPoint', loadChildren: () => import('./components/measurement-point/measurement-point.module').
      then(m => m.MeasurementPointModule), canActivate: [AuthGuard]
  },
  {
    path: 'customer', loadChildren: () => import('./components/customer/customer.module').
      then(m => m.CustomerModule), canActivate: [AuthGuard]
  },
  {
    path: 'home', loadChildren: () => import('./components/home/home.module').
      then(m => m.HomeModule), canActivate: [AuthGuard]
  },
  {
    path: 'customer_equipment', loadChildren: () => import('./components/customer-equipment/customer-equipment.module').
      then(m => m.CustomerEquipmentModule), canActivate: [AuthGuard]
  },
  {
    path: 'customer_measurement_point', loadChildren: () =>
      import('./components/customer-measurement-point/customer-measurement-point.module').
        then(m => m.CustomerMeasurementPointModule), canActivate: [AuthGuard]
  },
  {
    path: 'externalRedirect',
    canActivate: [externalUrlProvider],
    // We need a component here because we cannot define the route otherwise
    component: NotFoundComponent,
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],

  providers: [
    {
        provide: externalUrlProvider,
        useValue: (route: ActivatedRouteSnapshot) => {
            
            const externalUrl = route.paramMap.get('externalUrl');
            window.open(externalUrl, '_self');
        },
    },
    {
      provide: deactivateGuard,
      useValue: () => {
        console.log('Guard function is called!')
        
        return false;
      }
    },
],

})
export class AppRoutingModule { }
