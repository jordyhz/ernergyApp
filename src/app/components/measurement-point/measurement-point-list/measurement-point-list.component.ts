import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ToastrService} from 'ngx-toastr';
import {ConfirmDialogModel} from '../../../model/confirmDialogModel';
import {ConfirmDialogComponent} from '../../confirm-dialog/confirm-dialog.component';
import {MeasurementPoint} from '../../../model/measurementPoint';
import {MeasurementpointService} from '../../../shared/measurementpoint.service';
import {MeasurementPointOperationsComponent} from '../measurement-point-operations/measurement-point-operations.component';

@Component({
  selector: 'app-measurement-point-list',
  templateUrl: './measurement-point-list.component.html',
  styleUrls: ['./measurement-point-list.component.scss']
})
export class MeasurementPointListComponent implements OnInit {

  @Output() onUpdate  = new EventEmitter();
  @Output() onDelete  = new EventEmitter();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  displayedColumns = ['id', 'name', 'desc', 'level', 'equipment', 'update', 'delete'];
  dsMeasurementPoint: MatTableDataSource<MeasurementPoint>;
  isLoading  =  true;




  constructor(private toast: ToastrService,
              public dialog: MatDialog, private mpointService: MeasurementpointService) {

  }


  ngOnInit() {
    this.mpointService.getMeasurementPoints();
    this.mpointService.mpoints.subscribe((data: any) => {
      this.dsMeasurementPoint = new MatTableDataSource(data);
      this.dsMeasurementPoint.paginator = this.paginator;
      this.dsMeasurementPoint.sort = this.sort;
      this.isLoading = false;
    });
    setTimeout(() => {
      this.isLoading  =  false;
    }, 2000);
  }


  public applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dsMeasurementPoint.filter = filterValue;


  }

  openDialog(): void {
    const dialogRef = this.dialog.open(MeasurementPointOperationsComponent);

    dialogRef.afterClosed().subscribe(result => {});
  }

  public deleteMeasurementPoint(id: number) {
    this.mpointService.deleteMeasurementPoint(id).subscribe(data => {
        this.mpointService.getMeasurementPoints();
        console.log('Deleted Successfully');
        this.toast.success('Başarıyla Silindi!', 'Kayıt İşlemi');
      },
      err => {
        console.log(err);
        this.toast.error(err.error.errorMessage, 'Kayıt İşlemi');
      },
    );
  }

  public updateMeasurementPoint(index: number) {
    const dialogRef = this.dialog.open(MeasurementPointOperationsComponent,
      {data: this.dsMeasurementPoint.filteredData.find(module => module.id === index)});
    dialogRef.afterClosed().subscribe(result => {});
  }


  confirmDialog(id: number): void {
    const message = `Bu modül kaydını silmeye emin misiniz?`;

    const dialogData = new ConfirmDialogModel('Onay', message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {

      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.deleteMeasurementPoint(id);
      }
    });
  }

}
