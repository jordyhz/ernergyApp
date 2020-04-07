import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Customer} from '../../../model/customer';
import {ToastrService} from 'ngx-toastr';
import {CommonService} from '../../../shared/common.service';
import {ConfirmDialogModel} from '../../../model/confirmDialogModel';
import {ConfirmDialogComponent} from '../../../components/confirm-dialog/confirm-dialog.component';
import {ScreenService} from '../../../shared/screen.service';
import {ScreenOperationsComponent} from '../screen-operations/screen-operations.component';
import { ScreenUpdateComponent } from '../screen-update/screen-update.component';

@Component({
  selector: 'app-screen-list',
  templateUrl: './screen-list.component.html',
  styleUrls: ['./screen-list.component.scss']
})
export class ScreenListComponent implements OnInit {

  @Output() onUpdate  = new EventEmitter();
  @Output() onDelete  = new EventEmitter();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  displayedColumns = ['id', 'screenCode', 'screenName', 'createdDateTime', 'updatedDateTime', 'update', 'delete'];
  dsScreens: MatTableDataSource<Customer>;
  isLoading  =  true;

  sortingDataAccessor(item , property){
    switch (property) {

      case 'createdDate': {
          console.log('Inside date');

          let newDate = new Date(item.createdDateTime);
          console.log(newDate);
        return newDate;
      }

      case 'updatedDate': {
        console.log('Inside date');

        let newDate = new Date(item.updatedDateTime);
        console.log(newDate);
      return newDate;
    }
      default: {
        console.log('Inside default sort');
        return item[property];}
              }
  }


  constructor(private toast: ToastrService,
              public dialog: MatDialog, private screenService: ScreenService,
              private commonService: CommonService) {
    screenService.getScreens();
    screenService.screens.subscribe((data: any) => {
      this.dsScreens = new MatTableDataSource(data);
      this.dsScreens.paginator = this.paginator;
      this.dsScreens.sort = this.sort;
      //this.dsScreens.sortingDataAccessor = this.sortingDataAccessor;
      this.isLoading = false;
    });
  }

  ngOnInit() {
    setTimeout(() => {
      this.isLoading  =  false;
    }, 2000);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ScreenOperationsComponent);

    dialogRef.afterClosed().subscribe(result => {});
  }


  public applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dsScreens.filter = filterValue;
  }

  public deleteScreen(id: number) {
    this.screenService.deleteScreen(id).subscribe(data => {
        this.screenService.getScreens();
        console.log('Deleted Successfully');
        this.toast.success('Başarıyla Silindi!', 'Kayıt İşlemi');
      },
      err => {
        console.log(err);
        this.toast.error( err.error.errorMessage, 'Kayıt İşlemi');
      },
    );
  }

  public updateScreen(index: number) {
    const dialogRef = this.dialog.open(ScreenUpdateComponent, {data: this.dsScreens.filteredData.find(screen => screen.id === index)});

    dialogRef.afterClosed().subscribe(result => {});
  }

  confirmDialog(id: number): void {
    const message = `Bu ekran kaydını silmeye emin misiniz?`;

    const dialogData = new ConfirmDialogModel('Onay', message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {

      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.deleteScreen(id);
      }
    });
  }
}
