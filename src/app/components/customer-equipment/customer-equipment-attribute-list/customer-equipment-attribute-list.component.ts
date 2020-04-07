import {Component, EventEmitter, OnInit, Output, Input, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ToastrService} from 'ngx-toastr';
import {CustomerService} from '../../../shared/customer.service';
import {ConfirmDialogComponent} from '../../confirm-dialog/confirm-dialog.component';
import {ConfirmDialogModel} from '../../../model/confirmDialogModel';
import {CustomerEquipment} from '../../../model/customerEquipment';

@Component({
  selector: 'app-customer-equipment-attribute-list',
  templateUrl: './customer-equipment-attribute-list.component.html',
  styleUrls: ['./customer-equipment-attribute-list.component.scss']
})
export class CustomerEquipmentAttributeListComponent implements OnInit {

  @Output() onUpdate  = new EventEmitter();
  @Output() onDelete  = new EventEmitter();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @Input() customerId;
  displayedColumns = ['id', 'name', 'serialNumber', 'equipment', 'delete', 'update'];
  dsEquipmentList: MatTableDataSource<CustomerEquipment>;
  isLoading  =  true;


  constructor(private toast: ToastrService, private customerService: CustomerService, public dialog: MatDialog) {}

  ngOnInit() {
    this.getEquipmentList(this.customerId);
    setTimeout(() => {
      this.isLoading  =  false;
    }, 2000);
  }


  public applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dsEquipmentList.filter = filterValue;
  }

  public getEquipmentList(customerId: number) {
    this.customerService.getEquipments(customerId);
    this.customerService.equipmentList.subscribe((data: any) => {
        this.dsEquipmentList = new MatTableDataSource(data);
        this.dsEquipmentList.paginator = this.paginator;
        this.dsEquipmentList.sort = this.sort;
        this.isLoading = false;
      }
    );
  }


  private deleteEquipment(customerId: number, id: number) {
    this.customerService.deleteEquipment(id).subscribe(data => {
        this.customerService.getEquipments(customerId);
        console.log('Deleted Successfully');
        this.toast.success('Başarıyla Silindi!', 'Kayıt İşlemi');
      }
    );
  }

  private updateEquipment(index: number) {
    this.onUpdate.emit(this.dsEquipmentList.filteredData[index]);
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
        this.deleteEquipment(this.customerId, id);
      }
    });
  }

}
