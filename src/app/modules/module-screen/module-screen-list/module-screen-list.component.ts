import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Customer} from '../../../model/customer';
import {ToastrService} from 'ngx-toastr';
import {CommonService} from '../../../shared/common.service';
import {ConfirmDialogModel} from '../../../model/confirmDialogModel';
import {ConfirmDialogComponent} from '../../../components/confirm-dialog/confirm-dialog.component';
import {ModuleService} from '../../../shared/module.service';
import {ModuleScreenOperationsComponent} from '../module-screen-operations/module-screen-operations.component';
import { Module } from 'src/app/model/module';
import {ModuleBindScreenOperationsComponent} from '../module-bind-screen-operations/module-bind-screen-operations.component';
import { ScreenService } from 'src/app/shared/screen.service';
import {ModuleIdService} from '../../../shared/module-id.service';

@Component({
  selector: 'app-module-screen-list',
  templateUrl: './module-screen-list.component.html',
  styleUrls: ['./module-screen-list.component.scss']
})
export class ModuleScreenListComponent implements OnInit {

  @Output() onUpdate  = new EventEmitter();
  @Output() onDelete  = new EventEmitter();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatPaginator, { static: false }) paginator2: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatSort, { static: false }) sort2: MatSort;
  moduleId: number;

  displayedColumns = ['id', 'moduleCode', 'moduleName', 'createdDate', 'updatedDate', 'delete', 'update','addScreen'];
  displayedColumnsScreen = ['id', 'cusCode', 'cusName', 'createdDate', 'updatedDate', 'unbind'];
  dsModules: MatTableDataSource<Module>;
  dsScreens: MatTableDataSource<Customer>;
  dsScreens2: MatTableDataSource<Customer>;
  isLoading  =  true;
  selection = new SelectionModel<Module>(false, []);
  modId: number;
  username: string;

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
              public dialog: MatDialog, private moduleService: ModuleService, private screenService: ScreenService,private screenService2: ScreenService, private moduleIdService: ModuleIdService,
              private commonService: CommonService) {
     screenService.getScreens();
    moduleService.getModules();
      screenService.screens.subscribe((data: any) => {
        this.dsScreens = new MatTableDataSource(data);
        this.dsScreens.paginator = this.paginator;
        this.dsScreens.sort = this.sort;
        this.isLoading = false;
      });
    moduleService.modules.subscribe((data: any) => {
      this.dsModules = new MatTableDataSource(data);
      this.dsModules.paginator = this.paginator;
      this.dsModules.sort = this.sort;
      this.dsModules.sortingDataAccessor = this.sortingDataAccessor;
      this.isLoading = false;
    });
  }

  ngOnInit() {
    setTimeout(() => {
      this.isLoading  =  false;
    }, 2000);
  }

  public applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dsModules.filter = filterValue;
  }

  updateUsername() {
    this.moduleIdService.changeModuleId(this.moduleId);
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


    const dialogRef = this.dialog.open(ModuleScreenOperationsComponent, {data: this.dsModules.filteredData.find(module => module.id === index)});

    dialogRef.afterClosed().subscribe(result => {});
  }


  public bindScreenTomodule(index: number) {

    this.moduleIdService.changeModuleId(index);
    //this.dsScreens2 = this.dsScreens;


    this.moduleIdService.moduleId.subscribe(result => {
      this.moduleId = result; // this set's the username to the default observable value
    });


    console.log( "I am the module Id "+ this.moduleId);

    const dialogRef = this.dialog.open(ModuleBindScreenOperationsComponent);
    dialogRef.afterClosed().subscribe(result => {});
  }

  public showBinded(id: number){

    console.log(id);
    this.screenService2.getModuleScreens(id);
     this.screenService2.screens2.subscribe((data: any) => {
       this.dsScreens2 = new MatTableDataSource(data);
       this.dsScreens2.paginator = this.paginator2;
       this.dsScreens2.sort = this.sort2;
       this.isLoading = false;
     });
    this.modId = id;
    console.log(this.modId);
    console.log(this.dsScreens2);
    console.log("BINDED");

  }


  confirmDialog(id: number): void {
    const message = `Bu modül kaydını silmeye emin misiniz?`;
    console.log(id);

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
