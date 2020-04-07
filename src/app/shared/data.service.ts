import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

//@Injectable()
@Injectable({
  providedIn: 'root'
})
export class DataService {

  private customerIdSource = new BehaviorSubject<number>(0);
  currentCustomerId = this.customerIdSource.asObservable()

  
  private alarmIdSource = new BehaviorSubject<number>(0);
  currentAlarmId = this.alarmIdSource.asObservable()

  private kpiIdSource = new BehaviorSubject<number>(0);
  currentKpiId = this.kpiIdSource.asObservable()

  

  


  constructor() { }

  changeCustomerId(customerId) {
    this.customerIdSource.next(customerId);
    
  }

  changeAlarmId(alarmId: number) {
    this.alarmIdSource.next(alarmId);
  }

  changeKpiId(kppId: number) {
    this.kpiIdSource.next(kppId);
  }

  
}
