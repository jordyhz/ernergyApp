import {Component, EventEmitter, OnInit, Output, Input,ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ToastrService} from 'ngx-toastr';
import {CommonService} from '../../../../shared/common.service';
import {CustomerService} from '../../../../shared/customer.service';
import {ConfirmDialogComponent} from '../../../confirm-dialog/confirm-dialog.component';
import {ConfirmDialogModel} from '../../../../model/confirmDialogModel';
import {CustomerAddress} from '../../../../model/customerAddress';

@Component({
  selector: 'app-customer-address-list',
  templateUrl: './customer-address-list.component.html',
  styleUrls: ['./customer-address-list.component.scss']
})
export class CustomerAddressListComponent implements OnInit {

  @Output() onUpdate  = new EventEmitter();
  @Output() onDelete  = new EventEmitter();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @Input() customerId;
  addressTypeEnum = {1: 'Ev Adresi', 2: 'İş Adresi' };
  displayedColumns = ['id', 'addressType', 'addressLine', 'country', 'city', 'phone', 'delete', 'update'];
  dsAddressList: MatTableDataSource<CustomerAddress>;
  isLoading  =  true;


  constructor(private toast: ToastrService, private customerService: CustomerService, public dialog: MatDialog) {}

  ngOnInit() {
    this.getAddressList(this.customerId);
    setTimeout(() => {
      this.isLoading  =  false;
    }, 2000);
  }


  public applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dsAddressList.filter = filterValue;
  }

  public getAddressList(customerId: number) {
    this.customerService.getAddresses(customerId);
    this.customerService.addressList.subscribe((data: any) => {
        this.dsAddressList = new MatTableDataSource(data);
        this.dsAddressList.paginator = this.paginator;
        this.dsAddressList.sort = this.sort;
        this.isLoading = false;
        console.log( this.dsAddressList);
      },
      err => {console.log(err); },
    );
  }


  private deleteAddress(customerId: number, id: number) {
    this.customerService.deleteAddress(id).subscribe(data => {
        this.customerService.getAddresses(customerId);
        console.log('Deleted Successfully');
        this.toast.success('Başarıyla Silindi!', 'Kayıt İşlemi');
      },
      err => {
        console.log(err);
        this.toast.error( err.error.errorMessage, 'Kayıt İşlemi');
      },
    );
  }

  private updateAddress(index: number) {
    this.onUpdate.emit(this.dsAddressList.filteredData[index]);
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
        this.deleteAddress(this.customerId,id);
      }
    });
  }


}
