import { Component, OnInit, Inject, ViewChild, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AlarmNotificationService } from 'src/app/shared/alarm-notification.service';
import { NgForm, FormGroup, FormControl } from '@angular/forms';
import { ListOfValue } from 'src/app/model/listOfValue';
import { AlarmNotificationMessageComponent } from '../alarm-notification-message/alarm-notification-message.component';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA, MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/model/user';
import { AlarmNotification } from 'src/app/model/alarmNotification';
import { Attribute } from '../../../model/attribute';
import { Customer } from 'src/app/model/customer';
import { Observable } from 'rxjs';
import { CommonService } from 'src/app/shared/common.service';
import { startWith, map } from 'rxjs/operators';
import { AttributeService } from 'src/app/shared/attribute.service';
import { AlarmNotificationMessage } from 'src/app/model/alarmNotificationMessage';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/shared/data.service';
import { userInfo } from 'os';
import {Sort} from '@angular/material/sort';
import { CustomerInfo } from 'src/app/model/customerInfo';
import { CustomerService } from 'src/app/shared/customer.service';
declare const myTest: any;
declare const myTest1: any;
declare const myTest2: any;
declare const myTest3: any;

@Component({
  selector: 'app-alarm-notification',
  templateUrl: './alarm-notification.component.html',
  styleUrls: ['./alarm-notification.component.scss']
})
export class AlarmNotificationComponent implements OnInit, OnDestroy {
  
 
  alarmNotificationId:number;
  customerId:number;
  inputForm: FormGroup;
  notChecks: ListOfValue[];
  notLevels: ListOfValue[];
  attributes: Attribute[];
  customers: Customer[];
  filteredNotCheck: Observable<ListOfValue[]>;
  filteredCustomer: Observable<Customer []>;
  filteredNotLevel: Observable<ListOfValue[]>;
  filteredTag: Observable<Attribute[]>;
  savedAlarm : AlarmNotification[] = [];
  checked = false;
  checked1 = false;
  alarmId:number;
  alarmN : any;
  alarmA : any;
  alarmNotifsInfo : AlarmNotificationMessage [] = [];
  customerInfos : CustomerInfo [];
  

  
  
  
  

  constructor(public AlarmNotifService: AlarmNotificationService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private commonService: CommonService,
    private attributeService: AttributeService, 
    public dataService : DataService,
    private router: Router,
    private customerService: CustomerService, 
    
    
    
    
    ) { 
      
    }

    

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

    this.commonService.getNotChecks().subscribe((data: any) => {
      this.notChecks = data.responseBody;
      this.filteredNotCheck = this.inputForm.controls['notCheckValue'].valueChanges
        .pipe(
          startWith(''),
          map(notCheck => notCheck ? this._filterNotCheck(notCheck) : this.notChecks.slice())
        );
    });

    this.commonService.getNotLevels().subscribe((data: any) => {
      this.notLevels = data.responseBody;
      this.filteredNotLevel = this.inputForm.controls['notLevelValue'].valueChanges
        .pipe(
          startWith(''),
          map(notLevel => notLevel ? this._filterNotLevel(notLevel) : this.notLevels.slice())
        );
    });
    
  

    this.dataService.currentAlarmId.subscribe(alarmId =>  { 
      this.alarmId = alarmId;
       
    if(this.alarmId){
      
      this.AlarmNotifService.getAlarmById(this.alarmId);
      this.AlarmNotifService.alarms.subscribe((data: any) => {
  
        this.alarmN = data;

        this.onUpdated(this.alarmN[0]);

     
        
      });

      this.AlarmNotifService.getAlarmNotifByAlarm(this.alarmId);
      this.AlarmNotifService.notifs.subscribe((data:any)=>{

        this.alarmNotifsInfo = data;


    });
      
      
      
      }
      
      else {
        this.reset();
        //this.free();  
      
      }
  
      
      

    
     } );

   
   

    

  }


  ngOnDestroy(){
    this.dataService.changeAlarmId(this.alarmId);
  }


   public _filterNotCheck(value: string): ListOfValue[] {
    const filterValue = value.toLowerCase();
    return this.notChecks.filter(state => state.value.toLowerCase().indexOf(filterValue) === 0);
  }

  public _filterNotLevel(value: string): ListOfValue[] {
    const filterValue = value.toLowerCase();
    return this.notLevels.filter(state => state.value.toLowerCase().indexOf(filterValue) === 0);
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
      notName: new FormControl(''),
      notDesc: new FormControl(''),
      customerId: new FormControl(''),
      customerName: new FormControl(''),
      customerTagId: new FormControl(''),
      customerTagName: new FormControl(''),
      period: new FormControl(''),
      notCheckId: new FormControl(''),
      notCheckValue: new FormControl(''),
      notLevelId: new FormControl(''),
      notLevelValue: new FormControl(''),
      thresholdValue: new FormControl(''),
      active: new FormControl(''),
      deleted:new FormControl(''),

    });
  }
  
  // free(){

    
  //   this.customerInfos = JSON.parse(localStorage.customer_infos) ;
  //   console.log("Customer Infos" , this.customerInfos);
  // }

  goToList(){
    
    this.reset();
    this.router.navigate(['/alarm/alarm-notification-list']);

    
  }

  
  onUpdated(alrm: AlarmNotification) {
    
    this.inputForm.controls['notName'].setValue(alrm.notName);
    this.inputForm.controls['notDesc'].setValue(alrm.notDesc);
    this.inputForm.controls['customerId'].setValue(alrm.customerId);
    if(alrm.customerTag){
    this.inputForm.controls['customerTagId'].setValue(alrm.customerTag.id);
    this.inputForm.controls['customerTagName'].setValue(alrm.customerTag.name);
    }
    
    this.inputForm.controls['period'].setValue(alrm.period);
    
    if(alrm.notCheck){
     this.inputForm.controls['notCheckId'].setValue(alrm.notCheck.id);
     this.inputForm.controls['notCheckValue'].setValue(alrm.notCheck.value);
    }
    if(alrm.notLevel){
    this.inputForm.controls['notLevelId'].setValue(alrm.notLevel.id);
    this.inputForm.controls['notLevelValue'].setValue(alrm.notLevel.value);
    }
    this.inputForm.controls['thresholdValue'].setValue(alrm.thresholdValue);
    this.inputForm.controls['active'].setValue(alrm.active);
    this.inputForm.controls['deleted'].setValue(alrm.deleted);
    this.alarmNotificationId = alrm.id;
    myTest();
    
  }

  reset() {
    
    this.inputForm.reset();
    this.alarmNotificationId = 0;
    this.alarmId = this.alarmNotificationId;
    this.alarmNotifsInfo = [];   
    myTest2();
    myTest3();
    
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.inputForm.controls[controlName].hasError(errorName);
  }

  saveAlarm() {
    
    const alarm = {} as AlarmNotification;
    alarm.notCheck = {} as ListOfValue;
    alarm.notLevel = {} as ListOfValue;
    alarm.customerTag = {} as Attribute;
    alarm.customerId = {} as Customer;
    alarm.id= this.alarmNotificationId;
    alarm.notName = this.inputForm.value.notName;
    alarm.customerId.id= this.inputForm.value.customerId;
    alarm.customerTag.id = this.inputForm.value.customerTagId;
    alarm.notCheck.id = this.inputForm.value.notCheckId;
    alarm.thresholdValue= this.inputForm.value.thresholdValue;
    alarm.period= this.inputForm.value.period;
    alarm.notLevel.id = this.inputForm.value.notLevelId;
    alarm.notDesc = this.inputForm.value.notDesc;
    alarm.active = this.inputForm.value.active;
    alarm.deleted = this.inputForm.value.deleted;

    if (alarm.id > 0) {

      
      this.AlarmNotifService.updateAlarm(alarm).subscribe(
        data => {

        

          console.log(data);
       
          this.toastr.success('Başarıyla Güncellendi!', 'Kayıt İşlemi');

          
          
        },
        err => {
          this.toastr.error(err.error, 'Kayıt İşlemi');
          console.log(err);
        }
      );

     
    }
       
    else {
      this.AlarmNotifService.addAlarm(alarm).subscribe(
        res => { 

       

           let responseAlarm = {
            resultCode : ( res as any).resultCode,
            responseBody : ( res as any).responseBody 

           }
           responseAlarm.responseBody.forEach(item => {
            this.savedAlarm.push({id:item.id,notName:item.notName,notDesc:item.notDesc,customerId:item.customerId,
            customerTag:item.customerTag.id,notCheck:item.notCheck.id,thresholdValue:item.thresholdValue,period:item.period,
            notLevel:item.notLevel.id,active:item.active,deleted:item.deleted})
            
            
          });
           
          this.toastr.success('Başarıyla Kaydedildi!', 'Kayıt İşlemi') ;
           
          
        },
        err => {
          console.log('Error', err);
          this.toastr.error(err.error.errorMessage, 'Kayıt İşlemi');
        }
       
      );
      myTest();

      myTest1();
    }
      

  }

  
 
  openDialog(): void {

    if (this.alarmId){

      const dialogRef = this.dialog.open(AlarmNotificationMessageComponent, {

        width : '600px',

        data: { comp: this.alarmId}

      });

      dialogRef.afterClosed().subscribe(result => {});

    }

    else {
    const dialogRef = this.dialog.open(AlarmNotificationMessageComponent, {
     
      width: '600px', 
      
    data:{ comp:this.savedAlarm[0].id}   });
    
    dialogRef.afterClosed().subscribe(result => {});
  }
  }

  public updateNotif(index : number){

    const dialogRef = this.dialog.open(AlarmNotificationMessageComponent, {
     
      width: '600px', 
      
    data:{ comp1:index}   });

    
    dialogRef.afterClosed().subscribe(result => {});
  }


  sortData(sort: Sort) {
    const data = this.alarmNotifsInfo.slice();
    if (!sort.active || sort.direction === '') {
      this.alarmNotifsInfo = data;
      return;
    }

    this.alarmNotifsInfo = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id': return compare(a.id, b.id, isAsc);
        case 'name': return compare(a.name, b.name, isAsc);
        case 'title': return compare(a.title, b.title, isAsc);
        
        default: return 0;
      }
    });
  }
}


function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}


