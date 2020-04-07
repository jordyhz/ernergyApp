import { Component, Inject, OnInit } from '@angular/core';
import {FormControl, FormGroup } from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {MAT_DIALOG_DATA} from '@angular/material';
import {MatDialogRef} from '@angular/material/dialog';
import {MeasurementPoint} from '../../../model/measurementPoint';
import {MeasurementPointListComponent} from '../measurement-point-list/measurement-point-list.component';
import {MeasurementpointService} from '../../../shared/measurementpoint.service';
import {Equipment} from '../../../model/equipment';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {EquipmentService} from '../../../shared/equipment.service';

@Component({
  selector: 'app-measurement-point-operations',
  templateUrl: './measurement-point-operations.component.html',
  styleUrls: ['./measurement-point-operations.component.scss']
})
export class MeasurementPointOperationsComponent implements OnInit {

  inputForm: FormGroup;
  mPointId: number;
  equipments: Equipment[];
  filteredEquipments: Observable<Equipment[]>;
  constructor(private mpointService: MeasurementpointService, private toast: ToastrService, private equipmentService: EquipmentService,
              @Inject(MAT_DIALOG_DATA) public mPointData, public dialogRef: MatDialogRef< MeasurementPointListComponent>) { }


  ngOnInit() {
    this.inputForm = this.createFormGroup();
    this.equipmentService.getEquipments();
    this.equipmentService.equipments.subscribe((data: any) => {
      this.equipments = data;
      this.filteredEquipments = this.inputForm.controls['equipmentName'].valueChanges
        .pipe(
          startWith(''),
          map(equipment => equipment ? this._filterEquipments(equipment) : this.equipments.slice())
        );
      if (this.mPointData) {
        this.onUpdate(this.mPointData);
      } else {
        this.reset();
      }
    });
  }

  private _filterEquipments(value: string): Equipment[] {
    const filterValue = value.toLowerCase();
    return this.equipments.filter(state => state.name.toLowerCase().indexOf(filterValue) === 0);
  }

  reset() {
    this.inputForm.reset();
    this.mPointId = 0;
  }

  createFormGroup() {
    return new FormGroup({
      name: new FormControl(''),
      desc: new FormControl(''),
      level: new FormControl(''),
      equipmentId: new FormControl(''),
      equipmentName: new FormControl('')
    });
  }

  onUpdate(mPoint: MeasurementPoint) {
    this.inputForm.controls['name'].setValue(mPoint.name);
    this.inputForm.controls['desc'].setValue(mPoint.desc);
    this.inputForm.controls['level'].setValue(mPoint.level);
    this.inputForm.controls['equipmentId'].setValue(mPoint.equipment.id);
    this.inputForm.controls['equipmentName'].setValue(mPoint.equipment.name);
    this.mPointId = mPoint.id;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.inputForm.controls[controlName].hasError(errorName);
  }

  saveMeasurementPoint() {
    const mPoint = {} as MeasurementPoint;
    mPoint.equipment = {} as Equipment;
    mPoint.id = this.mPointId;
    mPoint.name = this.inputForm.value.name;
    mPoint.desc = this.inputForm.value.desc;
    mPoint.level = this.inputForm.value.level;
    mPoint.equipment.id = this.inputForm.value.equipmentId;
    if (mPoint.id > 0) {
      this.mpointService.updateMeasurementPoint(mPoint).subscribe(
        data => {
          this.mpointService.getMeasurementPoints();
          this.toast.success('Başarıyla Güncellendi!', 'Kayıt İşlemi');
        },
        err => {
          this.toast.error(err.error, 'Kayıt İşlemi');
          console.log(err);
        }
      );
    } else {
      this.mpointService.addMeasurementPoint(mPoint).subscribe(
        data => {
          this.mpointService.getMeasurementPoints();
          this.toast.success('Başarıyla Kaydedildi!', 'Kayıt İşlemi');
        },
        err => {
          this.toast.error(err.error, 'Kayıt İşlemi');
          console.log(err);
        }
      );
    }
  }
}
