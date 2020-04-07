import { Component, OnInit } from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { AlarmMailComponent } from '../alarm-mail/alarm-mail.component';
import { AlarmPhoneComponent } from '../alarm-phone/alarm-phone.component';


@Component({
  selector: 'app-alarm-operations',
  templateUrl: './alarm-operations.component.html',
  styleUrls: ['./alarm-operations.component.scss']
})
export class AlarmOperationsComponent implements OnInit {

  constructor(public dialog1: MatDialog, public dialog2 : MatDialog) { }

  ngOnInit() {
  }

  openDialog1(): void {
    const dialogRef = this.dialog1.open(AlarmMailComponent);

    dialogRef.afterClosed().subscribe(result => {});
  }

  openDialog2(): void {
    const dialogRef = this.dialog2.open(AlarmPhoneComponent);

    dialogRef.afterClosed().subscribe(result => {});
  }

}
