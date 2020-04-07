import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScreenRoutingModule } from './screen-routing.module';
import { ScreenListComponent } from './screen-list/screen-list.component';
import {AppMaterialModule} from '../../app-material/app-material.module';
import {IntlModule} from '@progress/kendo-angular-intl';
import { ScreenOperationsComponent } from './screen-operations/screen-operations.component';
import {ReactiveFormsModule} from '@angular/forms';
import { ScreenUpdateComponent } from './screen-update/screen-update.component';


@NgModule({
  declarations: [ScreenListComponent, ScreenOperationsComponent, ScreenUpdateComponent],
  imports: [
    CommonModule,
    ScreenRoutingModule,
    AppMaterialModule,
    IntlModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    ScreenOperationsComponent,
    ScreenUpdateComponent
  ]
})
export class ScreenModule { }
