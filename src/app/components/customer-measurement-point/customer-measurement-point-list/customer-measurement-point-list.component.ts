import {Component, EventEmitter, OnInit, Output, Input, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ToastrService} from 'ngx-toastr';
import {CustomerService} from '../../../shared/customer.service';
import {ConfirmDialogComponent} from '../../confirm-dialog/confirm-dialog.component';
import {ConfirmDialogModel} from '../../../model/confirmDialogModel';
import {CustomerMeasurementPoint} from '../../../model/customerMeasurementPoint';
import { MeasurementPoint } from 'src/app/model/measurementPoint';

@Component({
  selector: 'app-customer-measurement-point-list',
  templateUrl: './customer-measurement-point-list.component.html',
  styleUrls: ['./customer-measurement-point-list.component.scss']
})
export class CustomerMeasurementPointListComponent implements OnInit {

  @Output() onUpdate  = new EventEmitter();
  @Output() onDelete  = new EventEmitter();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @Input() customerId;
  displayedColumns = ['id', 'name' , 'msPoint_Name', 'update', 'delete'];
  dsMeasurementPoint: MatTableDataSource<MeasurementPoint>;
  isLoading  =  true;

  constructor(private toast: ToastrService, private customerService: CustomerService, public dialog: MatDialog) { }

  ngOnInit() {


    this.getMeasurementList(this.customerId);
    setTimeout(() => {
      this.isLoading  =  false;
    }, 2000);

    

    
  }

  public getMeasurementList(customerId: number) {
    this.customerService.getMeasurements(customerId);
    this.customerService.measurementList.subscribe((data: any) => {
        this.dsMeasurementPoint = new MatTableDataSource(data);
        this.dsMeasurementPoint.paginator = this.paginator;
        this.dsMeasurementPoint.sort = this.sort;
        this.isLoading = false;
        
      }
    );
    

    
  }

  public applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dsMeasurementPoint.filter = filterValue;
  }

  private UpdateMeasurementPoint(index: number) {
    this.onUpdate.emit(this.dsMeasurementPoint.filteredData[index]);
  }

  confirmDialog(id: number): void {
    const message = `Bu adresi silmeye emin misiniz?`;

    const dialogData = new ConfirmDialogModel('Onay', message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      maxHeight: '300px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.deleteMeasurement_Point(this.customerId, id);
      }
    });
  }

  private deleteMeasurement_Point(customerId: number, id: number) {
    this.customerService.deleteMeasurementPoint(id).subscribe(data => {
        this.customerService.getEquipments(customerId);
        console.log('Deleted Successfully');
        this.toast.success('Başarıyla Silindi!', 'Kayıt İşlemi');
      }
    );
  }

}
