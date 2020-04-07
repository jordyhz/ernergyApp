import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {CustomerService} from '../../../../shared/customer.service';
import {CustomerAddress} from '../../../../model/customerAddress';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ListOfValue} from '../../../../model/listOfValue';
import {Observable} from 'rxjs';
import {CommonService} from '../../../../shared/common.service';
import {map, startWith} from 'rxjs/operators';
import {Customer} from '../../../../model/customer';

@Component({
  selector: 'app-customer-address-operations',
  templateUrl: './customer-address-operations.component.html',
  styleUrls: ['./customer-address-operations.component.scss']
})
export class CustomerAddressOperationsComponent implements OnInit {

  inputForm: FormGroup;
  countries: ListOfValue[];
  filteredCountries: Observable<ListOfValue[]>;
  cities: ListOfValue[];
  filteredCities: Observable<ListOfValue[]>;
  addressId: number;
  constructor(private commonService: CommonService, private customerService: CustomerService,
              private dialogRef: MatDialogRef<CustomerAddressOperationsComponent>,
              private toast: ToastrService, @Inject(MAT_DIALOG_DATA) public customer) {
  }


  ngOnInit() {
    this.inputForm = this.createFormGroup();
    this.reset();
    this.commonService.getCountries().subscribe((data: any) => {
      this.countries = data.responseBody;
      this.filteredCountries = this.inputForm.controls['countryValue'].valueChanges
        .pipe(
          startWith(''),
          map(country => country ? this._filterCountries(country) : this.countries.slice())
        );
    });

    this.commonService.getCities().subscribe((data: any) => {
      this.cities = data.responseBody;
      this.filteredCities = this.inputForm.controls['cityValue'].valueChanges
        .pipe(
          startWith(''),
          map(city => city ? this._filterCities(city) : this.cities.slice())
        );
    });
  }

  private _filterCountries(value: string): ListOfValue[] {
    const filterValue = value.toLowerCase();
    return this.countries.filter(country => country.value.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filterCities(value: string): ListOfValue[] {
    const filterValue = value.toLowerCase();
    return this.cities.filter(city => city.value.toLowerCase().indexOf(filterValue) === 0);
  }


  public hasError = (controlName: string, errorName: string) => {
    return this.inputForm.controls[controlName].hasError(errorName);
  }

  createFormGroup() {
    return new FormGroup({
      addressType: new FormControl(''),
      addressLine: new FormControl(''),
      phone1: new FormControl(''),
      phone2: new FormControl(''),
      zipCode: new FormControl(''),
      countryId: new FormControl(''),
      countryValue: new FormControl(''),
      cityId: new FormControl(''),
      cityValue: new FormControl('')
    });
  }

  reset() {
    this.inputForm.reset();
    this.addressId = 0;
  }

  close() {
    this.dialogRef.close();
  }

  saveAddress() {
    const address = {} as CustomerAddress;
    address.customer = {} as Customer;
    address.country = {} as ListOfValue;
    address.city = {} as ListOfValue;
    address.addressLine = this.inputForm.value.addressLine;
    address.country.id = this.inputForm.value.countryId;
    address.city.id = this.inputForm.value.cityId;
    address.phone1 = this.inputForm.value.phone1;
    address.phone2 = this.inputForm.value.phone2;
    address.zipCode = this.inputForm.value.zipCode;
    address.addressType = this.inputForm.value.addressType;
    address.customer = this.customer;
    address.id = this.addressId;
    if ( address.id > 0) {
      this.customerService.updateAddress(address).subscribe(
        data => {
          this.customerService.getAddresses(address.customer.id);
          console.log('Update Request is successful ', data);
          this.toast.success('Başarıyla Güncellendi!', 'Kayıt İşlemi');
        },
        error => {
          console.log('Error', error);
          this.toast.error('Kayıt Hatası!', 'Kayıt İşlemi');
        }
      );
    } else {
      this.customerService.addAddress(address).subscribe(
        data => {
          this.customerService.getAddresses(address.customer.id);
          console.log('Insert Request is successful ', data);
          this.toast.success('Başarıyla Kaydedildi!', 'Kayıt İşlemi');
        },
        err => {
          console.log('Error', err);
          this.toast.error(err.error.errorMessage, 'Kayıt İşlemi');
        }
      );
    }
  }

  onUpdate(address:  CustomerAddress) {
    this.inputForm.controls['phone1'].setValue(address.phone1);
    this.inputForm.controls['phone2'].setValue(address.phone2);
    this.inputForm.controls['zipCode'].setValue(address.zipCode);
    this.inputForm.controls['addressType'].setValue(address.addressType);
    this.inputForm.controls['addressLine'].setValue(address.addressLine);
    if (address.country) {
      this.inputForm.controls['countryId'].setValue(address.country.id);
      this.inputForm.controls['countryValue'].setValue(address.country.value);
    }
    if (address.city) {
      this.inputForm.controls['cityId'].setValue(address.city.id);
      this.inputForm.controls['cityValue'].setValue(address.city.value);
    }
    this.addressId = address.id;
  }

}
