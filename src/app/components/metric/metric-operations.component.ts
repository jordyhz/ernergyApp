import { Component, Inject, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MetricService } from 'src/app/shared/metric.service';
import { MetricListComponent } from './metric-list.component';
import { Metric } from 'src/app/model/metric';

@Component({
  selector: 'app-metric-operations',
  templateUrl: './metric-operations.component.html',
  styleUrls: ['./metric-operations.component.scss']
})
export class MetricOperationsComponent implements OnInit {

  inputForm: FormGroup;
  metricId: number;
  constructor(private metricService: MetricService, private toast: ToastrService,
    @Inject(MAT_DIALOG_DATA) public metricData, public dialogRef: MatDialogRef<MetricListComponent>) { }

  ngOnInit() {
    this.inputForm = this.createFormGroup();
    if (this.metricData) {
      this.onUpdate(this.metricData);
    } else {
      this.reset();
    }
  }

  reset() {
    this.inputForm.reset();
    this.metricId = 0;
  }

  
  createFormGroup() {
    return new FormGroup({
      id: new FormControl(0,Validators.required),
      metricName: new FormControl('',Validators.required),
      sqlStatement: new FormControl('',[Validators.required, Validators.minLength(10)]),
      metricDesc: new FormControl('')

    });
  }

  get nameCtrl() {
    return this.inputForm.get('metricName');
  }


  public inputCheck = (controlName: string) => {
    return this.inputForm.get(controlName);
   }
 

  onUpdate(metric: Metric) {
    this.inputForm.controls['id'].setValue(metric.id);
    this.inputForm.controls['metricName'].setValue(metric.metricName);
    this.inputForm.controls['sqlStatement'].setValue(metric.sqlStatement);
    this.inputForm.controls['metricDesc'].setValue(metric.metricDesc);

    this.metricId = metric.id;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public hasError = (controlName: string, errorName: string) => {
   //return this.inputForm.controls[controlName].hasError(errorName);
  }


  
  saveMetric() {
    console.log("Save metric .... ") ;

    const metric = {} as Metric;
    metric.id = this.inputForm.value.id;
    metric.metricName = this.inputForm.value.metricName;
    metric.sqlStatement = this.inputForm.value.sqlStatement;
    metric.metricDesc = this.inputForm.value.metricDesc;

    this.metricService.addMetric(metric).subscribe(
      data => {
        this.metricService.getMetrics();
        this.toast.success('Başarıyla Kaydedildi!', 'Kayıt İşlemi');
      },
      err => {
        this.toast.error(err.error.errorMessage, 'Kayıt İşlemi');
      }
    );

    /*

    if (metric.id > 0) {
      this.equipmentService.updateEquipment(equipment).subscribe(
        data => {
          this.equipmentService.getEquipments();
          this.toast.success('Başarıyla Güncellendi!', 'Kayıt İşlemi');
        },
        error => {
          this.toast.error('Kayıt Hatası!', 'Kayıt İşlemi');
        }
      );
    } else {
      this.equipmentService.addEquipment(equipment).subscribe(
        data => {
          this.equipmentService.getEquipments();
          this.toast.success('Başarıyla Kaydedildi!', 'Kayıt İşlemi');
        },
        err => {
          this.toast.error(err.error.errorMessage, 'Kayıt İşlemi');
        }
      );
    } */


  }

  

  
}
