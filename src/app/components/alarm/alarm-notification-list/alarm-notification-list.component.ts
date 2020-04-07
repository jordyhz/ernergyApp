import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { AlarmNotificationService } from 'src/app/shared/alarm-notification.service';
import { AlarmNotification } from 'src/app/model/alarmNotification';
import { Observable } from 'rxjs';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';
import { DataService } from 'src/app/shared/data.service';


@Component({
  selector: 'app-alarm-notification-list',
  templateUrl: './alarm-notification-list.component.html',
  styleUrls: ['./alarm-notification-list.component.scss']
})
export class AlarmNotificationListComponent implements OnInit {

  displayedColumns = ['id', 'notName', 'notDesc', 'customerId', 'customerTag', 'notCheck', 'thresholdValue', 'period', 'notLevel', 'active', 'deleted', 'update'];
  dsAlarms: MatTableDataSource<AlarmNotification>;
  isLoading  =  true;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @Output() onUpdate  = new EventEmitter();
  

  constructor(
    public service: AlarmNotificationService,
    private router: Router,
    public dataService : DataService
  ) { }

  ngOnInit() {
    this.service.getAlarms();
    this.service.alarms.subscribe((data: any) => {
      this.dsAlarms = new MatTableDataSource(data);
      this.dsAlarms.paginator = this.paginator;
      this.dsAlarms.sort = this.sort;
      this.isLoading = false;
    });
    

  }

  public applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dsAlarms.filter = filterValue;
  }

  
  sendData(alarmId : number){
    let data = alarmId;

    this.dataService.changeAlarmId(data);
    this.router.navigate(['/alarm/alarm-notification']);
    console.log(data);

  }



}
