import { Component, Inject,EventEmitter, OnInit,  Output, Input, ViewChild, AfterViewInit } from '@angular/core';
import {AttributeService} from '../../../shared/attribute.service';
import {MeasurementPoint} from '../../../model/measurementPoint';
import {CustomerEquipment} from '../../../model/customerEquipment';
import {MeasurementPointListComponent} from '../../measurement-point/measurement-point-list/measurement-point-list.component';
import {MatDialogRef} from '@angular/material/dialog';
import {MeasurementpointService} from '../../../shared/measurementpoint.service';
import {EquipmentService} from '../../../shared/equipment.service';
import {MAT_DIALOG_DATA} from '@angular/material';
import {ToastrService} from 'ngx-toastr';
import { MatListOption } from '@angular/material/list';
import { FormGroup,FormControl } from '@angular/forms';
import {CustomerService} from '../../../shared/customer.service';
import { CustomerMeasurementPoint } from 'src/app/model/customerMeasurementPoint';
import {CusMeasurementPoint} from 'src/app/model/cusMeasurementPoint';
import {Customer} from 'src/app/model/customer'
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-customer-measurement-point-operations',
  templateUrl: './customer-measurement-point-operations.component.html',
  styleUrls: ['./customer-measurement-point-operations.component.scss']
})
export class CustomerMeasurementPointOperationsComponent implements OnInit {

 // measurementPoints : MeasurementPoint[];
//  @Output() onUpdate  = new EventEmitter();
//   @Output() onDelete  = new EventEmitter();
//   @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
//   @ViewChild(MatSort, { static: false }) sort: MatSort;
//   @Input() customerId;
 inputForm: FormGroup;
 measurementPoints : MeasurementPoint[];
 customerMeasurementpointId: number;
 customerEquipments : CustomerEquipment[];


 constructor(private measurementPointService : MeasurementpointService, private customerService: CustomerService, 
   private dialogRef: MatDialogRef<CustomerMeasurementPointOperationsComponent>,
             private toast: ToastrService, @Inject(MAT_DIALOG_DATA) public customer : Customer ) { }

 ngOnInit() {

   this.inputForm = this.createFormGroup();
   this.customerMeasurementpointId = 0;
   this.measurementPointService.getMeasurementPoints();
   this.measurementPointService.mpoints.subscribe((data: any) => {
     this.measurementPoints = data;
     console.log("Measurements points : " + data)
   });

   console.log(this.customer);
   this.customerService.getEquipments(this.customer.id);
   this.customerService.equipmentList.subscribe((data : any) => {
     this.customerEquipments = data;
     console.log("Customer Equipments : " + data);
   })

   
   
 }

 public hasError = (controlName: string, errorName: string) => {
   return this.inputForm.controls[controlName].hasError(errorName);
 }

 createFormGroup() {
  return new FormGroup({
    name: new FormControl(''),
    mesPoint_id : new FormControl(''),
    customer_Equipment_Id : new FormControl(''),
    desc : new FormControl('')
  });
}

 reset() {
   this.inputForm.reset();
   this.customerMeasurementpointId = 0;
 }

 close() {
   this.dialogRef.close();
 }

 saveMeasurementPoint() {
  const custMeas_Point = {} as CusMeasurementPoint;
  custMeas_Point.customer = {} as Customer;
  custMeas_Point.measurementPoint = {} as MeasurementPoint ;
  custMeas_Point.customerEquipment = {} as CustomerEquipment;
  custMeas_Point.name = this.inputForm.value.name;
  custMeas_Point.customerEquipment.id = this.inputForm.value.customer_Equipment_Id;
  custMeas_Point.desc = this.inputForm.value.desc;
  custMeas_Point.id = this.customerMeasurementpointId;
  custMeas_Point.customer = this.customer;
  custMeas_Point.measurementPoint.id = this.inputForm.value.mesPoint_id;

  console.log(custMeas_Point);
  if( custMeas_Point.id > 0){
    this.customerService.updateMeasurementPoint(custMeas_Point).subscribe(
      data => {
        this.customerService.getMeasurements(custMeas_Point.customer.id);
        console.log('Update Request is successful', data);
        this.toast.success('Başarıyla Güncellendi ', ' Kyıt İşlem');
      }
    )
  
  } else {
    this.customerService.addMeasurementPoint(custMeas_Point).subscribe(
      data => {
        this.customerService.getMeasurements(custMeas_Point.customer.id);
        console.log('Customer Measurement Point inserted ...', data);
        this.toast.success('Başarıyla Kaydedildi !' , 'Kayıt İşlem');

      }
    )
  }
}

onUpdate(cusMesPoint : CusMeasurementPoint){
  this.inputForm.controls['name'].setValue(cusMesPoint.name);
  this.inputForm.controls['desc'].setValue(cusMesPoint.desc);
  this.inputForm.controls['mesPoint_id'].setValue(cusMesPoint.measurementPoint.id);
  this.inputForm.controls['customer_Equipment_Id'].setValue(cusMesPoint.customerEquipment.id);
  this.customerMeasurementpointId = cusMesPoint.id;
  
}

 

}

