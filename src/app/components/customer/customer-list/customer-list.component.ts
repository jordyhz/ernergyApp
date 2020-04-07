import {AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort} from '@angular/material';
import {Customer} from '../../../model/customer';
import {CustomerService} from '../../../shared/customer.service';
import {ConfirmDialogComponent} from '../../confirm-dialog/confirm-dialog.component';
import {ConfirmDialogModel} from '../../../model/confirmDialogModel';
import {ToastrService} from 'ngx-toastr';
import {CustomerOperationsComponent} from '../customer-operations/customer-operations.component';
import { CustomerAddressOperationsComponent } from '../customer-address/customer-address-operations/customer-address-operations.component';

declare var kendo: any;

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit, AfterViewInit {

  @Output() onUpdate = new EventEmitter();
  @Output() onDelete = new EventEmitter();
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild('treeList', {static: false}) el: ElementRef;
  isLoading: boolean;

  dsCustomers: [Customer];
  customers: Customer[];

  constructor(private toast: ToastrService,
              public dialog: MatDialog, private customerService: CustomerService) {
    Window['myComponent'] = this;
  }

  ngOnInit() {
    this.isLoading = true;
    setInterval(() =>
        this.addEvent(),
      1000);
    setTimeout(() => {
      this.isLoading  =  false;
    }, 5000);
  }

  ngAfterViewInit(): void {
    this.customerService.getCustomers();
    this.customerService.customers.subscribe((data: any) => {
      if (data) {
        this.dsCustomers = data;
        this.isLoading = false;
        (this.el.nativeElement as HTMLDivElement).innerHTML = '';
        kendo.jQuery(this.el.nativeElement).kendoTreeList({
          dataSource: {
            data: this.dsCustomers
          },
          height: 540,
          filterable: true,
          sortable: true,
          columns: [
            {field: 'cusCode', title: 'Müşteri Kodu'},
            {field: 'cusName', title: 'Müşteri Adı'},
            {field: 'cusLevel', title: 'Müşteri Seviyesi'},
            {field: 'sector.value', title: 'Sektör'},
            {field: 'active', title: 'Aktiflik Durumu'},
            {
              field: 'deleteOperation', width: '300px' , title: 'Düzenle', template: (row) => {
                return `
            <button class="btn btn-sm add-operation-button" color="warn"  data-placement="top" title="Ekle" data-id="${row.id}">
                <i class="material-icons mat-18">
                  add
                </i>
            </button>
            <button class="btn btn-sm update-operation-button" color="warn" data-placement="top" title="Güncelle" data-id="${row.id}">
                <i class="material-icons mat-18">
                  system_update
                </i>
            </button>
            <button class="btn btn-sm address-operation-button" color="warn" data-placement="top" title="Adres Ekle" data-id="${row.id}">
                <i class="material-icons mat-18">
                  where_to_vote
                </i>
            </button>
            <button class="btn btn-sm remove-operation-button" color="warn" data-placement="top" title="Sil" data-id="${row.id}">
                <i class="material-icons mat-18">
                  delete
                </i>
            </button>
`;
              }
            }
          ],
          pageable: {
            pageSize: 15,
            pageSizes: true
          },
          dataBinding : function(e) {
            window.addEvent = true;
        }
        });
      }
    });
  }

  public addEvent() {
    if (window.addEvent === true) {
      window.addEvent = false;
      document.querySelectorAll('.add-operation-button').forEach(item => {
        item.addEventListener('click', (event) => {
          this.addCustomer(Number((event.currentTarget as HTMLInputElement).dataset.id));
        });
      });
      document.querySelectorAll('.update-operation-button').forEach(item => {
        item.addEventListener('click', (event) => {
          this.updateCustomer(Number((event.currentTarget as HTMLInputElement).dataset.id));
        });
      });
      document.querySelectorAll('.remove-operation-button').forEach(item => {
        item.addEventListener('click', (event) => {
          this.deleteCustomer(Number((event.currentTarget as HTMLInputElement).dataset.id));
        });
      });
      document.querySelectorAll('.address-operation-button').forEach(item => {
        item.addEventListener('click', (event) => {
          this.addAddress(Number((event.currentTarget as HTMLInputElement).dataset.id));
        });
      });
    }
  }

  public addCustomer(id: number) {
    const customer = {} as Customer;
    customer.parent = this.dsCustomers.find(cus => cus.id === id);
    const dialogRef = this.dialog.open(CustomerOperationsComponent, {data: customer}); // todo
    dialogRef.afterClosed().subscribe(result => {
    });
  }
  public updateCustomer(id: number) {
    const dialogRef = this.dialog.open(CustomerOperationsComponent, {data: this.dsCustomers.find(customer => customer.id === id)}); // todo
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openDialog(): void {

    const dialogRef = this.dialog.open(CustomerOperationsComponent);

    dialogRef.afterClosed().subscribe(result => {});
  }

  public deleteCustomer(id: number): void {
    const message = `Bu müşteri kaydını silmeye emin misiniz?`;

    const dialogData = new ConfirmDialogModel('Onay', message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      maxHeight: '240px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.customerService.getChildren(id).subscribe((res: any) => {
            this.customers = res.responseBody;
          if (this.customers.length > 0) {
            this.toast.success('Önce bağlı müşteriler silinmeli!', 'Uyarı');
          } else {
            this.customerService.deleteCustomer(id).subscribe(data => {
                this.customerService.getCustomers();
                this.toast.success('Başarıyla Silindi!', 'Kayıt İşlemi');
              },
              err => {
                console.log(err);
                this.toast.error(err.error.errorMessage, 'Kayıt İşlemi');
              },
            );
          }
          },
          err => {
            console.log(err);
            this.toast.error(err.error.errorMessage, 'Kayıt İşlemi');
          },
        );
      }
    });
  }

  public addAddress(id: number) {
    const dialogRef = this.dialog.open(CustomerAddressOperationsComponent,
      {data: this.dsCustomers.find(customer => customer.id === id)}); // todo
    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
