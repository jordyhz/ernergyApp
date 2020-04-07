import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {CustomerService} from '../../../shared/customer.service';
import {Customer} from '../../../model/customer';
import {CustomerEquipment} from '../../../model/customerEquipment';
import {EquipmentService} from '../../../shared/equipment.service';
import {Equipment} from '../../../model/equipment';

@Component({
  selector: 'app-customer-equipment-attribute-operations',
  templateUrl: './customer-equipment-attribute-operations.component.html',
  styleUrls: ['./customer-equipment-attribute-operations.component.scss']
})
export class CustomerEquipmentAttributeOperationsComponent implements OnInit {
  inputForm: FormGroup;
  equipments: Equipment[];
  customerEquipmentId: number;
  constructor(private equipmentService: EquipmentService, private customerService: CustomerService,
              private dialogRef: MatDialogRef<CustomerEquipmentAttributeOperationsComponent>,
              private toast: ToastrService, @Inject(MAT_DIALOG_DATA) public customer) {
  }


  ngOnInit() {
    this.inputForm = this.createFormGroup();
    this.customerEquipmentId = 0;
    this.equipmentService.getEquipments();
    this.equipmentService.equipments.subscribe((data: any) => {
      this.equipments = data;
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.inputForm.controls[controlName].hasError(errorName);
  }

  createFormGroup() {
    return new FormGroup({
      name: new FormControl(''),
      serialNumber: new FormControl(''),
      equipmentId: new FormControl(''),
    });
  }

  reset() {
    this.inputForm.reset();
    this.customerEquipmentId = 0;
  }

  close() {
    this.dialogRef.close();
  }

  saveEquipment() {
    const customerEquipment = {} as CustomerEquipment;
    customerEquipment.customer = {} as Customer;
    customerEquipment.equipment = {} as Equipment;
    customerEquipment.name = this.inputForm.value.name;
    customerEquipment.serialNumber = this.inputForm.value.serialNumber;
    customerEquipment.equipment.id = this.inputForm.value.equipmentId;
    customerEquipment.customer = this.customer;
    customerEquipment.id = this.customerEquipmentId;
    if ( customerEquipment.id > 0) {
      this.customerService.updateEquipment(customerEquipment).subscribe(
        data => {
          this.customerService.getEquipments(customerEquipment.customer.id);
          console.log('Update Request is successful ', data);
          this.toast.success('Başarıyla Güncellendi!', 'Kayıt İşlemi');
        }
      );
    } else {
      this.customerService.addEqiupment(customerEquipment).subscribe(
        data => {
          this.customerService.getEquipments(customerEquipment.customer.id);
          console.log('Insert Request is successful ', data);
          this.toast.success('Başarıyla Kaydedildi!', 'Kayıt İşlemi');
        }
      );
    }
  }

  onUpdate(customerEquipment:  CustomerEquipment) {
    this.inputForm.controls['name'].setValue(customerEquipment.name);
    this.inputForm.controls['serialNumber'].setValue(customerEquipment.serialNumber);
    this.inputForm.controls['equipmentId'].setValue(customerEquipment.equipment.id);
    this.customerEquipmentId = customerEquipment.id;
  }
}
