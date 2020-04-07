import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ToastrService} from 'ngx-toastr';
import {CommonService} from '../../../shared/common.service';
import {ConfirmDialogModel} from '../../../model/confirmDialogModel';
import {ConfirmDialogComponent} from '../../../components/confirm-dialog/confirm-dialog.component';
import {ModuleService} from '../../../shared/module.service';
import {ModuleOperationsComponent} from '../module-operations/module-operations.component';
import { Module } from 'src/app/model/module';

@Component({
  selector: 'app-module-list',
  templateUrl: './module-list.component.html',
  styleUrls: ['./module-list.component.scss']
})
export class ModuleListComponent implements OnInit {

  @Output() onUpdate  = new EventEmitter();
  @Output() onDelete  = new EventEmitter();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  displayedColumns = ['id', 'moduleCode', 'moduleName', 'createdDateTime', 'updatedDateTime', 'update', 'delete'];
  dsModules: MatTableDataSource<Module>;
  sortBy: any;
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
              public dialog: MatDialog, private moduleService: ModuleService,
              private commonService: CommonService) {
    moduleService.getModules();
    moduleService.modules.subscribe((data: any) => {
      this.dsModules = new MatTableDataSource(data);
      this.dsModules.paginator = this.paginator;
      this.dsModules.sort = this.sort;
      this.dsModules.sortingDataAccessor = this.sortingDataAccessor;
      this.isLoading = false;
    });
  }

  globalFilter = '';

  ngOnInit() {


    console.log(this.dsModules);


    setTimeout(() => {
      this.isLoading  =  false;
    }, 2000);
  }

  ngAfterViewInit() {
  }



  public applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dsModules.filter = filterValue;


  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModuleOperationsComponent);

    dialogRef.afterClosed().subscribe(result => {});
  }

  public deleteModule(id: number) {
    this.moduleService.deleteModule(id).subscribe(data => {

        this.moduleService.getModules();
        console.log(this.dsModules);
        console.log('Deleted Successfully');
        this.toast.success('Başarıyla Silindi!', 'Kayıt İşlemi');
      },
      err => {
        console.log(err);
        this.toast.error(err.error.errorMessage, 'Kayıt İşlemi');
      },
    );
  }

  public updateModule(index: number) {
    const dialogRef = this.dialog.open(ModuleOperationsComponent, {data: this.dsModules.filteredData.find(module => module.id === index)});
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
        this.deleteModule(id);
      }
    });
  }
}
