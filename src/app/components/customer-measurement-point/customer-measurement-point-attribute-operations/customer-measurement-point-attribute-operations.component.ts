import { Component, Inject, OnInit,EventEmitter, AfterViewInit, Attribute ,Output, ViewChild } from '@angular/core';
import {AttributeService} from '../../../shared/attribute.service';
import {MeasurementPoint} from '../../../model/measurementPoint';
import {CustomerMeasurementPoint} from '../../../model/customerMeasurementPoint';
import {MeasurementPointListComponent} from '../../measurement-point/measurement-point-list/measurement-point-list.component';
import {MatDialogRef} from '@angular/material/dialog';
import {MeasurementpointService} from '../../../shared/measurementpoint.service';
import {MAT_DIALOG_DATA,MatTableDataSource, MatPaginator, MatSort} from '@angular/material';
import {ToastrService} from 'ngx-toastr';
import { MatListOption } from '@angular/material/list';
import { FormGroup,FormControl } from '@angular/forms';
import {CustomerService} from '../../../shared/customer.service';

@Component({
  selector: 'app-customer-measurement-point-attribute-operations',
  templateUrl: './customer-measurement-point-attribute-operations.component.html',
  styleUrls: ['./customer-measurement-point-attribute-operations.component.scss']
})
export class CustomerMeasurementPointAttributeOperationsComponent implements OnInit {


  @Output() onUpdate  = new EventEmitter();
  @Output() onDelete  = new EventEmitter();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  // measurementPoints : MeasurementPoint[];
  

  customers : any;

  inputForm: FormGroup;
  measurementPoints : MeasurementPoint[];
  customerMeasurementpointId: number;
  attributes : Attribute[];
  displayedColumns = ['id', 'name' , 'msPoint_Name', 'update', 'delete'];
  dsCusMeasurementPoint: MatTableDataSource<CustomerMeasurementPoint>;
  isLoading  =  true;



  constructor(private measurementPointService : MeasurementpointService, private attributeService : AttributeService, private customerService: CustomerService,
    private dialogRef: MatDialogRef<CustomerMeasurementPointAttributeOperationsComponent>,
              private toast: ToastrService, @Inject(MAT_DIALOG_DATA) public customer ) { 
                
    
              }

  ngOnInit() {

    

     this.inputForm = this.createFormGroup();
    // this.customerMeasurementpointId = 0;
    // this.measurementPointService.getMeasurementPoints();
    // this.measurementPointService.mpoints.subscribe((data: any) => {
    //   this.measurementPoints = data;
      
    // });

    this.customerService.getMeasurements(this.customer.id);

    this.customerService.measurementList.subscribe((data : any) => {
      this.dsCusMeasurementPoint = new MatTableDataSource(data);
      this.dsCusMeasurementPoint.paginator = this.paginator;
      this.dsCusMeasurementPoint.sort = this.sort;
      this.isLoading = false;
      console.log(this.dsCusMeasurementPoint);
    })

    this.attributeService.getAttributes();
    this.attributeService.attributes.subscribe((data : any) => {
      //let attributes : [] ;

      this.attributes = data;
      //console.log(data);
      
    })

    

    console.log(this.customer);
    
  }

 

  public hasError = (controlName: string, errorName: string) => {
    return this.inputForm.controls[controlName].hasError(errorName);
  }

  reset() {
    this.inputForm.reset();
    this.customerMeasurementpointId = 0;
  }

  close() {
    this.dialogRef.close();
  }

  createFormGroup() {
    return new FormGroup({
      name: new FormControl(''),
      desc: new FormControl(''),
      level: new FormControl(''),
    });
  }

}
