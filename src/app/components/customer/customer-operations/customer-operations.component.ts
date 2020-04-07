import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Customer} from '../../../model/customer';
import {CustomerService} from '../../../shared/customer.service';
import {ToastrService} from 'ngx-toastr';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ListOfValue} from '../../../model/listOfValue';
import {CommonService} from '../../../shared/common.service';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-customer-operations',
  templateUrl: './customer-operations.component.html',
  styleUrls: ['./customer-operations.component.scss']
})
export class CustomerOperationsComponent implements OnInit {
  inputForm: FormGroup;
  sectors: ListOfValue[];
  filteredSectors: Observable<ListOfValue[]>;
  customerId: number;
  parentCusName: string;
  cusLevel: number;
  constructor(private customerService: CustomerService, private commonService: CommonService, private toast: ToastrService,
              private dialogRef: MatDialogRef<CustomerOperationsComponent>, @Inject(MAT_DIALOG_DATA) public updateCustomerData) { }

  ngOnInit() {
    this.inputForm = this.createFormGroup();
    if (this.updateCustomerData) {
      this.onUpdate(this.updateCustomerData);
    } else {
      this.reset();
    }

    this.commonService.getSectors().subscribe((data: any) => {
      this.sectors = data.responseBody;
      this.filteredSectors = this.inputForm.controls['sectorValue'].valueChanges
        .pipe(
          startWith(''),
          map(sector => sector ? this._filterSectors(sector) : this.sectors.slice())
        );
    });
  }

  private _filterSectors(value: string): ListOfValue[] {
    const filterValue = value.toLowerCase();
    return this.sectors.filter(state => state.value.toLowerCase().indexOf(filterValue) === 0);
  }

  onUpdate(customer:  Customer) {
    this.inputForm.controls['cusCode'].setValue(customer.cusCode);
    this.inputForm.controls['cusName'].setValue(customer.cusName);
    this.inputForm.controls['active'].setValue(customer.active);
    this.cusLevel = 10;
    if (customer.id) {
      this.inputForm.controls['cusCode'].disable();
    }
    if (customer.sector) {
      this.inputForm.controls['sectorId'].setValue(customer.sector.id);
      this.inputForm.controls['sectorValue'].setValue(customer.sector.value);
    }
     if (customer.parent) {
       this.inputForm.controls['parentId'].setValue(customer.parent.id);
       this.inputForm.controls['cusLevel'].setValue(customer.parent.cusLevel + 10);
       this.cusLevel = customer.parent.cusLevel + 10;
       this.parentCusName = customer.parent.cusName;
     }
    this.customerId = customer.id;
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.inputForm.controls[controlName].hasError(errorName);
  }

  createFormGroup() {
    return new FormGroup({
      cusCode: new FormControl(''),
      cusName: new FormControl(''),
      cusLevel: new FormControl(''),
      active: new FormControl(''),
      parentId: new FormControl(''),
      sectorId: new FormControl(''),
      sectorValue: new FormControl('')
    });
  }

  reset() {
    this.inputForm.reset();
    this.customerId = 0;
    this.cusLevel = 10;
    this.inputForm.controls['cusCode'].enable();
    this.inputForm.controls['active'].setValue(true);
  }

  close() {
    this.dialogRef.close();
  }



  saveCustomer() {
    const customer = {} as Customer;
    customer.sector = {} as ListOfValue;
    customer.parent = {} as Customer;
    customer.cusCode = this.inputForm.value.cusCode;
    customer.cusName = this.inputForm.value.cusName;
    customer.cusLevel = this.cusLevel;
    customer.active = this.inputForm.value.active;
    customer.sector.id = this.inputForm.value.sectorId;
    customer.parent.id = this.inputForm.value.parentId;
    customer.id = this.customerId;

    if ( customer.id > 0) {
      this.customerService.updateCustomer(customer).subscribe(
        data => {
          this.customerService.getCustomers();
          this.toast.success('Başarıyla Güncellendi!', 'Kayıt İşlemi');
        },
        error => {
          console.log('Error', error);
          this.toast.error('Kayıt Hatası!', 'Kayıt İşlemi');
        }
      );
    } else {
      this.customerService.addCustomer(customer).subscribe(
        data => {
          this.customerService.getCustomers();
          this.toast.success('Başarıyla Kaydedildi!', 'Kayıt İşlemi');
        },
        err => {
          console.log('Error', err);
          this.toast.error(err.error.errorMessage, 'Kayıt İşlemi');
        }
      );
    }
  }

}
