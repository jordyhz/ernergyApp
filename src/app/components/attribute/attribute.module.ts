import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AppMaterialModule} from '../../app-material/app-material.module';
import {AttributeRoutingModule} from './attribute-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import {AttributeListComponent} from './attribute-list/attribute-list.component';
import {AttributeOperationsComponent} from './attribute-operations/attribute-operations.component';



@NgModule({
  declarations: [AttributeListComponent, AttributeOperationsComponent],
  imports: [
    CommonModule,
    AttributeRoutingModule,
    AppMaterialModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    AttributeOperationsComponent
  ]
})
export class AttributeModule {
  constructor() {
    console.log('AttributeModule loaded.');
  }
}
