import { Component, Inject, OnInit } from '@angular/core';
import {FormControl, FormGroup } from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {MAT_DIALOG_DATA} from '@angular/material';
import {MatDialogRef} from '@angular/material/dialog';
import {EquipmentListComponent} from '../equipment-list/equipment-list.component';
import {Equipment} from '../../../model/equipment';
import {EquipmentService} from '../../../shared/equipment.service';

@Component({
  selector: 'app-equipment-operations',
  templateUrl: './equipment-operations.component.html',
  styleUrls: ['./equipment-operations.component.scss']
})
export class EquipmentOperationsComponent implements OnInit {

  inputForm: FormGroup;
  equipmentId: number;
  constructor(private equipmentService: EquipmentService, private toast: ToastrService,
              @Inject(MAT_DIALOG_DATA) public equipmentData, public dialogRef: MatDialogRef< EquipmentListComponent>) { }


  ngOnInit() {
    this.inputForm = this.createFormGroup();
    if (this.equipmentData) {
      this.onUpdate(this.equipmentData);
    } else {
      this.reset();
    }
  }

  reset() {
    this.inputForm.reset();
    this.equipmentId = 0;
  }

  createFormGroup() {
    return new FormGroup({
      name: new FormControl(''),
      desc: new FormControl(''),
    });
  }

  onUpdate(equipment: Equipment) {
    this.inputForm.controls['name'].setValue(equipment.name);
    this.inputForm.controls['desc'].setValue(equipment.desc);
    this.equipmentId = equipment.id;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.inputForm.controls[controlName].hasError(errorName);
  }

  saveEquipment() {
    const equipment = {} as Equipment;
    equipment.name = this.inputForm.value.name;
    equipment.desc = this.inputForm.value.desc;
    equipment.id = this.equipmentId;
    if (equipment.id > 0) {
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
    }
  }

}
