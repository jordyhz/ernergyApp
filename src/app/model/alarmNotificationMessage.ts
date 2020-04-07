import { User } from './user';
import { AlarmNotification } from './alarmNotification';

export interface AlarmNotificationMessage {
  id: number;
  alarmNotification : number ; //master id 
  title : string ;
  name : string ;
  wpPhone : string ;
  email : string ;
  wpActive : boolean ;
  mailActive : boolean ;
  user : User ;  
  }