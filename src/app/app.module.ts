import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavComponent} from './components/nav/nav.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import { AuthComponent } from './components/auth/auth.component';
import {AmplifyAngularModule, AmplifyService} from 'aws-amplify-angular';
import { AppMaterialModule } from './app-material/app-material.module';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
// import { MapComponent } from './components/home/map/map.component';
import { TokenInterceptor } from './interceptor/token.interceptor';
import { ErrorInterceptor } from './interceptor/error.interceptor';
import { MetricListComponent } from './components/metric/metric-list.component';
import { MetricOperationsComponent } from './components/metric/metric-operations.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ExternalUrlDirective } from './external-url.directive';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
//import {AgmCoreModule } from '@agm/core';
import {DefaultModule } from './layout/default/default.module';
import {DefaultComponent} from './layout/default/default.component';
import { EnergyCardsComponent } from './components/widgets/energy-cards/energy-cards.component';
import { KpiOperationsComponent } from './components/kpi/kpi-operations/kpi-operations.component';
import { KpiListComponent } from './components/kpi/kpi-list/kpi-list.component';


// import { AlarmOperationsComponent } from './components/alarm/alarm-operations/alarm-operations.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    AuthComponent,
    ConfirmDialogComponent,
   // MapComponent,
    MetricListComponent,
    MetricOperationsComponent,
    NotFoundComponent,
    ExternalUrlDirective,
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    DefaultComponent,
    //AlarmOperationsComponent,
    EnergyCardsComponent,
    // KpiOperationsComponent,
    // KpiListComponent,
    
    // backup
   
  ],

  imports: [
    DefaultModule,
    AmplifyAngularModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    ToastrModule.forRoot(),
    CommonModule,
    ReactiveFormsModule,
    //AgmCoreModule.forRoot({
    //  apiKey : 'AIzaSyC30Cxv1q7CE_0tkYhntYCC2MKgBfvGeDs'
   // })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    AmplifyService
  ],
  entryComponents: [ConfirmDialogComponent,MetricOperationsComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    console.log('AppModule loaded.');
  }
}
