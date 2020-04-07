import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ToastrService} from 'ngx-toastr';
import {ConfirmDialogModel} from '../../../model/confirmDialogModel';
import {ConfirmDialogComponent} from '../../confirm-dialog/confirm-dialog.component';
import {Equipment} from '../../../model/equipment';
import {EquipmentService} from '../../../shared/equipment.service';
import {EquipmentOperationsComponent} from '../equipment-operations/equipment-operations.component';
import {EquipmentAttributeOperationsComponent} from '../equipment-attribute-operations/equipment-attribute-operations.component';

@Component({
  selector: 'app-equipment-list',
  templateUrl: './equipment-list.component.html',
  styleUrls: ['./equipment-list.component.scss']
})
export class EquipmentListComponent implements OnInit {

  @Output() onUpdate  = new EventEmitter();
  @Output() onDelete  = new EventEmitter();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  displayedColumns = ['id', 'name', 'desc', 'createdDateTime', 'updatedDateTime', 'update', 'delete', 'attribute'];
  dsEquipment: MatTableDataSource<Equipment>;
  isLoading  =  true;




  constructor(private toast: ToastrService,
              public dialog: MatDialog, private equipmentService: EquipmentService) {

  }


  ngOnInit() {
    this.equipmentService.getEquipments();
    this.equipmentService.equipments.subscribe((data: any) => {
      this.dsEquipment = new MatTableDataSource(data);
      this.dsEquipment.paginator = this.paginator;
      this.dsEquipment.sort = this.sort;
      this.isLoading = false;
    });
    setTimeout(() => {
      this.isLoading  =  false;
    }, 2000);
  }


  public applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dsEquipment.filter = filterValue;


  }

  openDialog(): void {
    const dialogRef = this.dialog.open(EquipmentOperationsComponent);

    dialogRef.afterClosed().subscribe(result => {});
  }

  public deleteEquipment(id: number) {
    this.equipmentService.deleteEquipment(id).subscribe(data => {

        this.equipmentService.getEquipments();
        console.log('Deleted Successfully');
        this.toast.success('Başarıyla Silindi!', 'Kayıt İşlemi');
      },
      err => {
        console.log(err);
        this.toast.error(err.error.errorMessage, 'Kayıt İşlemi');
      },
    );
  }

  public updateEquipment(index: number) {
    const dialogRef = this.dialog.open(EquipmentOperationsComponent,
      {data: this.dsEquipment.filteredData.find(equipment => equipment.id === index)});
    dialogRef.afterClosed().subscribe(result => {});
  }

  public addAttribute(index: number) {
    const dialogRef = this.dialog.open(EquipmentAttributeOperationsComponent,
      {data: this.dsEquipment.filteredData.find(equipment => equipment.id === index)});
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
        this.deleteEquipment(id);
      }
    });
  }

}
