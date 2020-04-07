import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AlarmNotificationMessage } from 'src/app/model/alarmNotificationMessage';
import { NgForm, FormGroup, Validators, FormControl } from '@angular/forms';
import { AlarmNotificationService } from 'src/app/shared/alarm-notification.service';
import { AlarmNotification } from 'src/app/model/alarmNotification';
import { User } from 'src/app/model/user';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AlarmNotificationComponent } from '../alarm-notification/alarm-notification.component';
import { DataService } from 'src/app/shared/data.service';




@Component({
  selector: 'app-alarm-notification-message',
  templateUrl: './alarm-notification-message.component.html',
  styleUrls: ['./alarm-notification-message.component.scss']
})
export class AlarmNotificationMessageComponent implements OnInit {
  
 
  inputForm: FormGroup;
  aNId:number;
  notifId:number;
  notifN : AlarmNotificationMessage[] = [];
  saveddAlarm: AlarmNotificationMessage[] = [];
  idpass:number;
  alarmnotifications:Observable<AlarmNotificationMessage[]>;
  checked = false;
  checked1 = false;


  constructor(
    public AlarmNotifService: AlarmNotificationService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data:any,
    public dataService : DataService,
    public dialogRef: MatDialogRef<AlarmNotificationMessageComponent>,
    
  ) { 
    this.idpass = data.comp;
    this.aNId = data.comp1;
  }

  ngOnInit() {
    
    this.inputForm = this.createFormGroup();
    
    
    console.log(this.aNId);

    if(this.aNId){

      this.AlarmNotifService.getAlarmNotifById(this.aNId);
      this.AlarmNotifService.notifs.subscribe((data: any) => {
        this.notifN = data;
        this.onUpdate(this.notifN[0]);
      })
      
      
    }
    else if(this.notifId) {
    this.reset();
    }

  }

  

  createFormGroup(){
    return new FormGroup({
      alarmNotification: new FormControl(''),
      title: new FormControl(''),
      name: new FormControl(''),
      wpPhone: new FormControl('', [
        Validators.required, 
        Validators.pattern("^((\\+90-?)|0)?[0-9]{10}$")]
      ),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
      ]),
      
      wpActive: new FormControl(''),
      mailActive: new FormControl(''),
      user: new FormControl(''),
      
    });

  }

  get primEmail(){
    return this.inputForm.get('email')
    }

  get primNumber(){
      return this.inputForm.get('wpPhone')
      }

  onUpdate(alrm: AlarmNotificationMessage) {
    
    this.inputForm.controls['title'].setValue(alrm.title);
    this.inputForm.controls['name'].setValue(alrm.name);
    this.inputForm.controls['wpPhone'].setValue(alrm.wpPhone);
    this.inputForm.controls['email'].setValue(alrm.email);
    this.inputForm.controls['wpActive'].setValue(alrm.wpActive);
    this.inputForm.controls['mailActive'].setValue(alrm.mailActive);
    this.inputForm.controls['user'].setValue(alrm.user.id);
    alrm.id = this.notifN[0].id;
    alrm.alarmNotification = this.idpass;
    console.log(this.notifN[0].id);
    
    
  }

  reset(){
    this.inputForm.reset();
    this.aNId = 0;
    this.notifId = 0;
   
  }

  saveAlarmNotif(){
    const alarm = {} as AlarmNotificationMessage;
    alarm.user = {} as User;
    if(this.aNId){
      alarm.id= this.aNId;
    }
    else if(this.notifId) {
      alarm.id = this.notifId;
    }
    
    alarm.alarmNotification = this.inputForm.value.alarmNotification;
    alarm.title = this.inputForm.value.title;
    alarm.name= this.inputForm.value.name;
    alarm.wpPhone = this.inputForm.value.wpPhone;
    alarm.user.id = this.inputForm.value.user;
    alarm.email= this.inputForm.value.email;
    alarm.wpActive= this.inputForm.value.wpActive;
    alarm.mailActive = this.inputForm.value.mailActive;

    

    if(alarm.id > 0) {
      
      this.AlarmNotifService.updateAlarmsNotifs(alarm).subscribe(
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

      
    
    this.AlarmNotifService.addAlarmsNotifs(alarm).subscribe(
      res => { 
        
        let responseAlarm = {
          resultCode : ( res as any).resultCode,
          responseBody : ( res as any).responseBody 

         }
         responseAlarm.responseBody.forEach(item => {
          this.saveddAlarm.push({id:item.id,alarmNotification:item.alarmNotification.id,title:item.title,name:item.name,wpPhone:item.wpPhone,
          user:item.user.id,email:item.email,wpActive:item.wpActive,mailActive:item.mailActive
        });

        });
        this.toastr.success('Başarıyla Kaydedildi!', 'Kayıt İşlemi') ;
       },
      err => {
        console.log('Error', err);
        this.toastr.error(err.error.errorMessage, 'Kayıt İşlemi');
      }
     
    );
  }
   
    this.dialogRef.close();

}

  }



