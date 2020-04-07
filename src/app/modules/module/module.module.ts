import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleRoutingModule } from './module-routing.module';
import { ModuleListComponent } from './module-list/module-list.component';
import { ModuleOperationsComponent } from './module-operations/module-operations.component';
import { AppMaterialModule } from 'src/app/app-material/app-material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ModuleListComponent, ModuleOperationsComponent],
  imports: [
    CommonModule,
    ModuleRoutingModule,
    AppMaterialModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    ModuleOperationsComponent
  ]
})
export class ModuleModule { }
