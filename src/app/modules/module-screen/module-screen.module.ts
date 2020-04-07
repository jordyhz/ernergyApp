
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleScreenRoutingModule } from './module-screen-routing.module';
import { ModuleScreenListComponent } from './module-screen-list/module-screen-list.component';
import { ModuleScreenOperationsComponent } from './module-screen-operations/module-screen-operations.component';
import { AppMaterialModule } from 'src/app/app-material/app-material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModuleBindScreenOperationsComponent } from './module-bind-screen-operations/module-bind-screen-operations.component';



@NgModule({
  declarations: [ModuleScreenListComponent, ModuleScreenOperationsComponent, ModuleBindScreenOperationsComponent],
  imports: [
    CommonModule,
    ModuleScreenRoutingModule,
    AppMaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  entryComponents: [
    ModuleScreenOperationsComponent,
    ModuleBindScreenOperationsComponent
  ]
})
export class ModuleScreenModule { }

