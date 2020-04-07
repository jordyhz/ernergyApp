import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm, FormGroup, FormControl } from '@angular/forms';
import { ListOfValue } from 'src/app/model/listOfValue';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA, MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { Attribute } from '../../../model/attribute';
import { Observable } from 'rxjs';
import { CommonService } from 'src/app/shared/common.service';
import { startWith, map } from 'rxjs/operators';
import { AttributeService } from 'src/app/shared/attribute.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/shared/data.service';
import { Kpi } from 'src/app/model/kpi';
import { KpiService } from 'src/app/shared/kpi.service';
import { Customer } from 'src/app/model/customer';
import { CustomerService } from 'src/app/shared/customer.service';


@Component({
  selector: 'app-kpi-operations',
  templateUrl: './kpi-operations.component.html',
  styleUrls: ['./kpi-operations.component.scss']
})
export class KpiOperationsComponent implements OnInit, OnDestroy {

  kpiId : number;
  inputForm: FormGroup;
  kpiChecks: ListOfValue [];
  kpiLevels: ListOfValue [];
  frequencies : ListOfValue [];
  statuses : ListOfValue [];
  attributes: Attribute [];
  customers: Customer[];
  filteredCustomer: Observable<Customer []>;
  filteredKpiCheck: Observable<ListOfValue []>;
  filteredKpiLevel: Observable<ListOfValue []>;
  filteredFrequency: Observable<ListOfValue []>;
  filteredStatus: Observable<ListOfValue []>;
  filteredTag: Observable<Attribute []>;
  savedKpi : Kpi [] = [];
  checked = false;
  checked1 = false;
  kppId:number;
  kpiN : any;

  constructor(
    private commonService: CommonService,
    private attributeService: AttributeService,
    private customerService: CustomerService, 
    public kpiService : KpiService,
    private router: Router,
    private toastr: ToastrService,
    public dataService : DataService,
  ) { }

  ngOnInit() {

    this.inputForm = this.createFormGroup();

    this.attributeService.getAttributes();

    this.attributeService.attributes.subscribe((data: any) => {
      this.attributes = data;
      this.filteredTag = this.inputForm.controls['customerTagName'].valueChanges
        .pipe(
          startWith(''),
          map(customerTag => customerTag ? this._filterTag(customerTag) : this.attributes.slice())
        );


    });

    this.customerService.getCustomers();

    this.customerService.customers.subscribe((data: any) => {
      this.customers = data;
      this.filteredCustomer = this.inputForm.controls['customerName'].valueChanges
        .pipe(
          startWith(''),
          map(customerId => customerId ? this._filterCustomer(customerId) : this.customers.slice())
        );


    });

    this.commonService.getKpiChecks().subscribe((data: any) => {
      this.kpiChecks = data.responseBody;
      this.filteredKpiCheck = this.inputForm.controls['kpiCheckValue'].valueChanges
        .pipe(
          startWith(''),
          map(kpiCheck => kpiCheck ? this._filterKpiCheck(kpiCheck) : this.kpiChecks.slice())
        );
    });

    this.commonService.getKpiLevels().subscribe((data: any) => {
      this.kpiLevels = data.responseBody;
      this.filteredKpiLevel = this.inputForm.controls['kpiLevelValue'].valueChanges
        .pipe(
          startWith(''),
          map(kpiLevel => kpiLevel ? this._filterKpiLevel(kpiLevel) : this.kpiLevels.slice())
        );
    });

    this.commonService.getStatuses().subscribe((data: any) => {
      this.statuses = data.responseBody;
      this.filteredStatus = this.inputForm.controls['statusValue'].valueChanges
        .pipe(
          startWith(''),
          map(status => status ? this._filterStatus(status) : this.statuses.slice())
        );
    });

  this.commonService.getFrequencies().subscribe((data: any) => {
    this.frequencies = data.responseBody;
    this.filteredFrequency = this.inputForm.controls['frequencyValue'].valueChanges
    .pipe(
      startWith(''),
      map(frequency => frequency ? this._filterFrequency(frequency): this.frequencies.slice() )
    );
  });

  this.dataService.currentKpiId.subscribe(kppId => {
    this.kpiId = kppId;

    if(this.kpiId){

      this.kpiService.getKpiById(this.kpiId);
      this.kpiService.kpis.subscribe((data: any) => {
        this.kpiN = data;
        this.onUpdate(this.kpiN[0]);
      })
    }

    else {
      this.reset();
    }

  });

    

  }

  ngOnDestroy(){
    this.dataService.changeKpiId(this.kpiId);
  }

  public _filterKpiCheck(value: string): ListOfValue[] {
    const filterValue = value.toLowerCase();
    return this.kpiChecks.filter(state => state.value.toLowerCase().indexOf(filterValue) === 0);
  }

  public _filterKpiLevel(value: string): ListOfValue[] {
    const filterValue = value.toLowerCase();
    return this.kpiLevels.filter(state => state.value.toLowerCase().indexOf(filterValue) === 0);
  }

  public _filterStatus(value: string): ListOfValue[] {
    const filterValue = value.toLowerCase();
    return this.statuses.filter(state => state.value.toLowerCase().indexOf(filterValue) === 0);
  }

  public _filterFrequency(value: string): ListOfValue[] {
    const filterValue = value.toLowerCase();
    return this.frequencies.filter(state => state.value.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filterTag(value: string): Attribute[] {
    const filterValue = value.toLowerCase();
    return this.attributes.filter(state => state.name.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filterCustomer(value: string): Customer[] {
    const filterValue = value.toLowerCase();
    return this.customers.filter(state => state.cusName.toLowerCase().indexOf(filterValue) === 0);
  }

  createFormGroup() {
    return new FormGroup({
      kpiName: new FormControl(''),
      kpiContact: new FormControl(''),
      customerId: new FormControl(''),
      customerName: new FormControl(''),
      customerTagId: new FormControl(''),
      customerTagName: new FormControl(''),
      kpiDesc: new FormControl(''),
      kpiCheckId: new FormControl(''),
      kpiCheckValue: new FormControl(''),
      frequencyId: new FormControl(''),
      frequencyValue: new FormControl(''),
      statusId: new FormControl(''),
      statusValue: new FormControl(''),
      kpiLevelId: new FormControl(''),
      kpiLevelValue: new FormControl(''),
      thresholdValue: new FormControl(''),
      active: new FormControl(''),
      deleted:new FormControl(''),

    });
  }

  reset() {
    this.inputForm.reset();
    this.kpiId = 0;

  }

  public hasError = (controlName: string, errorName: string) => {
    return this.inputForm.controls[controlName].hasError(errorName);
  }

  goToList(){
    
    this.reset();
    this.router.navigate(['/kpi/kpi-list']);

  }

  onUpdate(kpi: Kpi) {
    this.inputForm.controls['kpiName'].setValue(kpi.kpiName);
    this.inputForm.controls['kpiDesc'].setValue(kpi.kpiDesc);
    //if(kpi.customerId){
    this.inputForm.controls['customerId'].setValue(kpi.customerId);
    //this.inputForm.controls['customerId'].setValue(kpi.customerId.cusName);
    //}
    if(kpi.customerTag){
    this.inputForm.controls['customerTagId'].setValue(kpi.customerTag.id);
    this.inputForm.controls['customerTagName'].setValue(kpi.customerTag.name);
    }
    
    this.inputForm.controls['kpiContact'].setValue(kpi.kpiContact);
    
    if(kpi.kpiCheck){
     this.inputForm.controls['kpiCheckId'].setValue(kpi.kpiCheck.id);
     this.inputForm.controls['kpiCheckValue'].setValue(kpi.kpiCheck.value);
    }
    if(kpi.kpiLevel){
    this.inputForm.controls['kpiLevelId'].setValue(kpi.kpiLevel.id);
    this.inputForm.controls['kpiLevelValue'].setValue(kpi.kpiLevel.value);
    }
    if(kpi.frequency){
      this.inputForm.controls['frequencyId'].setValue(kpi.frequency.id);
      this.inputForm.controls['frequencyValue'].setValue(kpi.frequency.value);
      }
    if(kpi.status){
    this.inputForm.controls['statusId'].setValue(kpi.status.id);
    this.inputForm.controls['statusValue'].setValue(kpi.status.value);
    }
    this.inputForm.controls['thresholdValue'].setValue(kpi.thresholdValue);
    this.inputForm.controls['active'].setValue(kpi.active);
    this.inputForm.controls['deleted'].setValue(kpi.deleted);
    this.kpiId = kpi.id;

  }

  saveKPI() {

    const kpi = {} as Kpi;
    kpi.kpiCheck = {} as ListOfValue;
    kpi.kpiLevel = {} as ListOfValue;
    kpi.frequency = {} as ListOfValue;
    kpi.status = {} as ListOfValue;
    kpi.customerTag = {} as Attribute;
    kpi.customerId = {} as Customer;
    kpi.id = this.kpiId;
    kpi.kpiName = this.inputForm.value.kpiName;
    kpi.kpiDesc = this.inputForm.value.kpiDesc;
    kpi.kpiContact = this.inputForm.value.kpiContact;
    kpi.customerId.id= this.inputForm.value.customerId;
    kpi.customerTag.id = this.inputForm.value.customerTagId;
    kpi.thresholdValue = this.inputForm.value.thresholdValue;
    kpi.kpiCheck.id =  this.inputForm.value.kpiCheckId;
    kpi.kpiLevel.id = this.inputForm.value.kpiLevelId;
    kpi.frequency.id = this.inputForm.value.frequencyId;
    kpi.status.id = this.inputForm.value.statusId;
    kpi.active = this.inputForm.value.active;
    kpi.deleted = this.inputForm.value.deleted;

    if (kpi.id > 0) {

      this.kpiService.updateKPI(kpi).subscribe(
        data => {
          this.toastr.success('Başarıyla Güncellendi!', 'Kayıt İşlemi');
        },
        err => {
          this.toastr.error(err.error, 'Kayıt İşlemi');
          console.log(err);
        }
      );
      

    }

     else {
      this.kpiService.addKPI(kpi).subscribe(
        res => {

          let responseKpi = {
            resultCode :(res as any).resultCode,
            responseBody : (res as any).responseBody
          }
          responseKpi.responseBody.forEach(item => {
            this.savedKpi.push({id: item.id , kpiName: item.kpiName , kpiDesc: item.kpiDesc , kpiContact: item.kpiContact ,
            customerId: item.customerId.id , customerTag: item.customerTag.id , kpiCheck: item.kpiCheck.id , frequency: item.frequency.id ,
            status: item.status.id , active: item.active , deleted: item.deleted , thresholdValue: item.thresholdValue, kpiLevel: item.kpiLevel.id  })
          });
          console.log(this.savedKpi[0]);
          this.toastr.success('Başarıyla Kaydedildi!', 'Kayıt İşlemi') ;
        },
        err => {
          console.log('Error', err);
          this.toastr.error(err.error.errorMessage, 'Kayıt İşlemi');
        }
      );

      this.reset();

    }



  
  }


}
