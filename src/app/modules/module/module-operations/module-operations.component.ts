import { Component, Inject, OnInit } from '@angular/core';
import {FormControl, FormGroup } from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {MAT_DIALOG_DATA} from '@angular/material';
import {ModuleService} from '../../../shared/module.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ModuleListComponent} from '../module-list/module-list.component';


@Component({
  selector: 'app-module-operations',
  templateUrl: './module-operations.component.html',
  styleUrls: ['./module-operations.component.scss']
})
export class ModuleOperationsComponent implements OnInit {

  inputForm: FormGroup;
  moduleId: number;
  constructor(private moduleService: ModuleService, private toast: ToastrService, @Inject(MAT_DIALOG_DATA) public updatemoduleData,public dialogRef: MatDialogRef< ModuleListComponent>) { }


  ngOnInit() {
    this.inputForm = this.createFormGroup();
    if (this.updatemoduleData) {
      this.onUpdate(this.updatemoduleData);
    } else {
      this.reset();
    }
  }

  reset() {
    this.inputForm.reset();
    this.moduleId = 0;
    this.inputForm.controls['moduleCode'].enable();
  }

  createFormGroup() {
    return new FormGroup({
      moduleCode: new FormControl(''),
      moduleName: new FormControl(''),
    });
  }

  onUpdate(module: any) {
    this.inputForm.controls['moduleCode'].setValue(module.moduleCode);
    this.inputForm.controls['moduleName'].setValue(module.moduleName);
    this.moduleId = module.id;
    if (this.moduleId > 0) {
      this.inputForm.controls['moduleCode'].disable();
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.inputForm.controls[controlName].hasError(errorName);
  }

  saveModule() {
    const module = {} as any;
    module.moduleCode = this.inputForm.getRawValue().moduleCode;
    module.moduleName = this.inputForm.getRawValue().moduleName;
    module.id = this.moduleId;
    if (module.id > 0) {
      this.moduleService.updateModule(module).subscribe(
        data => {
          this.moduleService.getModules();
          this.toast.success('Başarıyla Güncellendi!', 'Kayıt İşlemi');
        },
        error => {
          this.toast.error('Kayıt Hatası!', 'Kayıt İşlemi');
        }
      );
    } else {
      this.moduleService.addModule(module).subscribe(
        data => {
          this.moduleService.getModules();
          this.toast.success('Başarıyla Kaydedildi!', 'Kayıt İşlemi');
        },
        err => {
          this.toast.error(err.error.errorMessage, 'Kayıt İşlemi');
        }
      );
    }
  }

}
