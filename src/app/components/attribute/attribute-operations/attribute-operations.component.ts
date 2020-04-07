import { Component, Inject, OnInit } from '@angular/core';
import {FormControl, FormGroup } from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {MAT_DIALOG_DATA} from '@angular/material';
import {MatDialogRef} from '@angular/material/dialog';
import {Equipment} from '../../../model/equipment';
import {AttributeListComponent} from '../attribute-list/attribute-list.component';
import {Attribute} from '../../../model/attribute';
import {AttributeService} from '../../../shared/attribute.service';
@Component({
  selector: 'app-attribute-operations',
  templateUrl: './attribute-operations.component.html',
  styleUrls: ['./attribute-operations.component.scss']
})
export class AttributeOperationsComponent implements OnInit {

  inputForm: FormGroup;
  attributeId: number;
  constructor(private attributeService: AttributeService, private toast: ToastrService,
              @Inject(MAT_DIALOG_DATA) public attributeData, public dialogRef: MatDialogRef< AttributeListComponent>) { }


  ngOnInit() {
    this.inputForm = this.createFormGroup();
    if (this.attributeData) {
      this.onUpdate(this.attributeData);
    } else {
      this.reset();
    }
  }

  reset() {
    this.inputForm.reset();
    this.attributeId = 0;
  }

  createFormGroup() {
    return new FormGroup({
      name: new FormControl(''),
      desc: new FormControl(''),
      unit: new FormControl(''),
      type: new FormControl(''),
      calcMethod: new FormControl('')
    });
  }

  onUpdate(attr: Attribute) {
    this.inputForm.controls['name'].setValue(attr.name);
    this.inputForm.controls['desc'].setValue(attr.desc);
    this.inputForm.controls['unit'].setValue(attr.unit);
    this.inputForm.controls['type'].setValue(attr.type);
    this.inputForm.controls['calcMethod'].setValue(attr.calcMethod);
    this.attributeId = attr.id;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.inputForm.controls[controlName].hasError(errorName);
  }

  saveAttribute() {
    const attribute = {} as Attribute;
    attribute.id = this.attributeId;
    attribute.name = this.inputForm.value.name;
    attribute.desc = this.inputForm.value.desc;
    attribute.unit = this.inputForm.value.unit;
    attribute.type = this.inputForm.value.type;
    attribute.calcMethod = this.inputForm.value.calcMethod;

    if (attribute.id > 0) {
      this.attributeService.updateAttribute(attribute).subscribe(
        data => {
          this.attributeService.getAttributes();
          this.toast.success('Başarıyla Güncellendi!', 'Kayıt İşlemi');
        },
        error => {
          this.toast.error('Kayıt Hatası!', 'Kayıt İşlemi');
        }
      );
    } else {
      this.attributeService.addAttribute(attribute).subscribe(
        data => {
          this.attributeService.getAttributes();
          this.toast.success('Başarıyla Kaydedildi!', 'Kayıt İşlemi');
        },
        err => {
          this.toast.error(err.error.errorMessage, 'Kayıt İşlemi');
        }
      );
    }
  }

}
