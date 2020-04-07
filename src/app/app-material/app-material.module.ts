import { NgModule } from '@angular/core';
import {
  MatInputModule,
  MatButtonModule,
  MatToolbarModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatPaginatorModule,
  MatTableModule,
  MatFormFieldModule,
  MatMenuModule,
  MatExpansionModule,
  MatSortModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatCheckboxModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatTooltipModule,
  MatNativeDateModule,
  MatTabsModule,
} from '@angular/material';
import {MatDatepickerModule} from '@angular/material/datepicker';
import '@progress/kendo-ui';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [],
  exports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatPaginatorModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatExpansionModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatCheckboxModule,
    MatSelectModule,
    MatSlideToggleModule,
    FormsModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule
    
  ]
})
export class AppMaterialModule { }
