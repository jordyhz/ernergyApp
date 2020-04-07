import { Injectable } from '@angular/core';
import { AlarmNotification } from '../model/alarmNotification';
import { AlarmNotificationMessage } from '../model/alarmNotificationMessage';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AlarmNotificationService {
 
  formData: AlarmNotification;
  AlarmNotificationMessage: AlarmNotificationMessage[]=[];
  AlarmNotification: AlarmNotification[]=[];

  baseUrl = environment.baseUrl;

  public alarms = new Subject;

  public notifs = new Subject;





  constructor( private http: HttpClient) { }


getAlarms() {
  return this.http.get(this.baseUrl + '/alarms').
  subscribe((res: any) => {
    this.alarms.next();
    this.alarms.next(res.responseBody);
  });
}

 addAlarm(alarm: AlarmNotification) {
  console.log(alarm);

  return this.http.post(this.baseUrl + '/alarms/add',
    {
      
      'notName': alarm.notName,
      'customerId': alarm.customerId.id,
      'customerTag': {
        "id": alarm.customerTag.id,
      },
      'notCheck': {
        "id":  alarm.notCheck.id
      },
      'thresholdValue': alarm.thresholdValue,
      'period': alarm.period,
      
      'notLevel': {
        "id": alarm.notLevel.id
      },
      'notDesc': alarm.notDesc,
      'active': alarm.active,
      'deleted' : alarm.deleted,
    });
}

updateAlarm(alarm: AlarmNotification){

  return this.http.put(this.baseUrl + '/alarms/update/' + alarm.id,
  {

    'notName': alarm.notName,
    'customerId': alarm.customerId.id,
    'customerTag': {
        "id": alarm.customerTag.id
      },
    'notCheck': {
        "id":  alarm.notCheck.id
      },
    'thresholdValue': alarm.thresholdValue,
    'period': alarm.period,
      
    'notLevel': {
        "id": alarm.notLevel.id
      },
    'notDesc': alarm.notDesc,
    'active': alarm.active,
    'deleted' : alarm.deleted,


  });

}

getAlarmById(id: number) {
  return this.http.get(this.baseUrl + '/alarms/'+ id).subscribe((res: any) => {
    
    this.alarms.next(res.responseBody);

    console.log(res.responseBody);

    
  });

}

getAlarmsNotifs(id : number) {
  this.http.get(this.baseUrl + '/alarms/'+ id).subscribe((res: any) => {
    this.alarms.next();
    this.alarms.next(res.responseBody);
  });
}

addAlarmsNotifs(alarmNotif: AlarmNotificationMessage){
  return this.http.post(this.baseUrl + '/alarms/msg/add' ,
    {

      'alarmNotification': {
        'id': alarmNotif.alarmNotification,
    },
    'title': alarmNotif.title,
    'name': alarmNotif.name,
    'wpPhone': alarmNotif.wpPhone,
    'email': alarmNotif.email,
    'wpActive': alarmNotif.wpActive,
    'mailActive': alarmNotif.mailActive,
    'user': {
        'id': alarmNotif.user.id,
    }
      
     });


}

updateAlarmsNotifs(alarmNotif: AlarmNotificationMessage){
  return this.http.put(this.baseUrl + '/alarms/msg/update/' +alarmNotif.id,
    {

      'alarmNotification': {
        'id': alarmNotif.alarmNotification,
    },
    'title': alarmNotif.title,
    'name': alarmNotif.name,
    'wpPhone': alarmNotif.wpPhone,
    'email': alarmNotif.email,
    'wpActive': alarmNotif.wpActive,
    'mailActive': alarmNotif.mailActive,
    'user': {
        'id': alarmNotif.user.id,
    }
      
     });


}

getAlarmNotifByAlarm(alarmId: number) {
   this.http.get(this.baseUrl + '/alarms/' + alarmId + '/msg').subscribe((res: any) => {

    this.notifs.next(res.responseBody);

    console.log(res.responseBody);
  });
}

getAlarmNotifById(index: number) {
  return this.http.get(this.baseUrl + '/alarms/msgdtl/'  + index  ).subscribe((res: any) => {
    
    this.notifs.next(res.responseBody);

    console.log(res.responseBody);
  });
}

  
  }




