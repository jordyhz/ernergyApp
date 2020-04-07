import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {MAT_DIALOG_DATA} from '@angular/material';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ScreenService} from '../../../shared/screen.service';
import { ScreenListComponent } from '../screen-list/screen-list.component';
import {ConfirmDialogModel} from '../../../model/confirmDialogModel';
import {ConfirmDialogComponent} from '../../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-screen-operations',
  templateUrl: './screen-operations.component.html',
  styleUrls: ['./screen-operations.component.scss']
})
export class ScreenOperationsComponent implements OnInit {

  inputForm: FormGroup;
  screenId: number;
  constructor(private screenService: ScreenService, public dialog: MatDialog,private toast: ToastrService, @Inject(MAT_DIALOG_DATA) public updateScreenData,public dialogRef: MatDialogRef<ScreenListComponent>) { }

  ngOnInit() {
    this.inputForm = this.createFormGroup();
    if (this.updateScreenData) {
      this.onUpdate(this.updateScreenData);
    } else {
      this.reset();
    }
  }

  onUpdate(screen: any) {
    this.inputForm.controls['screenCode'].setValue(screen.screenCode);
    this.inputForm.controls['screenName'].setValue(screen.screenName);
    this.screenId = screen.id;
    if (this.screenId > 0) {
      this.inputForm.controls['screenCode'].disable();
    }
  }

  confirmDialog(): void {
    const message = `Bu ekran kaydetme emin misiniz?`;

    const dialogData = new ConfirmDialogModel('Onay', message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.saveCustomer();
      }
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.inputForm.controls[controlName].hasError(errorName);
  }

  createFormGroup() {
    return new FormGroup({
      screenCode: new FormControl(''),
      screenName: new FormControl(''),
    });
  }

  reset() {
    this.inputForm.reset();
    this.screenId = 0;
    this.inputForm.controls['screenCode'].enable();
  }

  


  public saveCustomer() {
    const screen = {} as any;
    screen.screenCode = this.inputForm.getRawValue().screenCode;
    screen.screenName = this.inputForm.getRawValue().screenName;
    screen.id = this.screenId;

    console.log("screen form code "+this.inputForm.getRawValue().screenCode);
    console.log( "Screen nmae forrm"+this.inputForm.getRawValue().screenName);
    console.log( "Screnn Id "+screen.id);
    console.log();

    if (screen.id > 0) {
      this.screenService.updateScreen(screen).subscribe(
        data => {
          this.screenService.getScreens();
          this.toast.success('Başarıyla Güncellendi!', 'Kayıt İşlemi');
        },
        error => {
          this.toast.error('Kayıt Hatası!', 'Kayıt İşlemi');
        }
      );
    } else {
      this.screenService.addScreen(screen).subscribe(
        data => {
          this.screenService.getScreens();
          this.toast.success('Başarıyla Kaydedildi!', 'Kayıt İşlemi');
        },
        err => {
          this.toast.error(err.error.errorMessage, 'Kayıt İşlemi');
        }
      );
    }
  }
}
