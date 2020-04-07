import {Component, AfterViewInit, EventEmitter, OnInit, Inject, Output, ViewChild, forwardRef} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Customer} from '../../../model/customer';
import {ToastrService} from 'ngx-toastr';
import {CustomerService} from '../../../shared/customer.service';
import {CommonService} from '../../../shared/common.service';
import {ConfirmDialogModel} from '../../../model/confirmDialogModel';
import {ConfirmDialogComponent} from '../../../components/confirm-dialog/confirm-dialog.component';
import {ScreenService} from '../../../shared/screen.service';
import {ModuleScreenListComponent} from '../module-screen-list/module-screen-list.component';
import {ModuleIdService} from '../../../shared/module-id.service';
import {ModuleScreenService} from '../../../shared/module-screen.service';
import {MAT_DIALOG_DATA} from '@angular/material';
import { MatDialogRef} from '@angular/material/dialog';
import { Module } from 'src/app/model/module';
import { Screen } from 'src/app/model/screen';



@Component({
  selector: 'app-module-bind-screen-operations',
  //template: `<app-module-screen-list ()></app-module-screen-list>`,
  templateUrl: './module-bind-screen-operations.component.html',
  styleUrls: ['./module-bind-screen-operations.component.scss']
})
export class ModuleBindScreenOperationsComponent implements OnInit , AfterViewInit{

  @Output() onUpdate  = new EventEmitter();
  @Output() onDelete  = new EventEmitter();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;


  displayedColumns = ['id', 'cusCode', 'cusName', 'createdDate', 'updatedDate', 'bind'];
  dsScreens: MatTableDataSource<Customer>;
  dsScreens2: [Screen];
  isLoading  =  true;
  moduleId : number;
  screenId: number;


  constructor(private toast: ToastrService,
              public dialog: MatDialog, private screenService: ScreenService,private screenService2: ModuleScreenService,
              private moduleIdService: ModuleIdService,
              private commonService: CommonService,
              @Inject(MAT_DIALOG_DATA) public updateScreenData, public dialogRef: MatDialogRef< ModuleScreenListComponent>) {

    screenService.getScreens();

    screenService.screens.subscribe((data: any) => {
      this.dsScreens = new MatTableDataSource(data);

      this.dsScreens.paginator = this.paginator;
      this.dsScreens.sort = this.sort;
      this.isLoading = false;
    });



    this.moduleIdService.moduleId.subscribe(result => {
      this.moduleId = result;
    });




    // screenService2.getModuleScreens(this.moduleId);
    // screenService2.screens.subscribe((data: any) => {
    //   this.dsScreens2 = data;


    // });

    // console.log(this.dsScreens2);
    console.log(this.moduleId);




  }


  ngOnInit() {

    this.updateScreenData = this.dsScreenForm();

    setTimeout(() => {
      this.isLoading  =  false;
    }, 2000);
  }

  dsScreenForm(){
      this.dsScreens = new MatTableDataSource();
      this.dsScreens.paginator = this.paginator;
      this.dsScreens.sort = this.sort;
      this.isLoading = false;

  }



  ngAfterViewInit() {


  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  public applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dsScreens.filter = filterValue;
  }

  getScreen(){
    console.log(this.dsScreens);
  }
  // getModuleId(){
  //   this.moduleIdService.moduleId.subscribe(result => {
  //     this.moduleId = result;
  //   });

  //   console.log(this.moduleId);
  // }

  bindModuleToScreen(index : number){
    const module = {} as any;
    const screen = {} as any;
    this.screenId = index;

    module.id = this.moduleId;
    screen.id = this.screenId;

    console.log(module);
    console.log(screen);

    console.log("Module ID = "+ module.id + "  Screen Id = "+ screen.id);


    this.screenService.module_screen(module, screen).subscribe(
      data => {
        this.screenService.getScreens();
        this.toast.success('Başarıyla Güncellendi!', 'Kayıt İşlemi');
      },
      error => {
        this.toast.error('Kayıt Hatası!', 'Kayıt İşlemi');
      }
    );
  }

}
