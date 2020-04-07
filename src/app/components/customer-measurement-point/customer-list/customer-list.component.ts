import {AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild, Input} from '@angular/core';
import {MatDialog, MatPaginator, MatSort} from '@angular/material';
import {Customer} from '../../../model/customer';
import {CustomerService} from '../../../shared/customer.service';
import {ToastrService} from 'ngx-toastr';
import {CustomerMeasurementPointOperationsComponent} from '../customer-measurement-point-operations/customer-measurement-point-operations.component';
import {CustomerMeasurementPointAttributeOperationsComponent} from '../customer-measurement-point-attribute-operations/customer-measurement-point-attribute-operations.component';

declare var kendo: any;

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit, AfterViewInit {
  @Output() onUpdate = new EventEmitter();
  @Output() onDelete = new EventEmitter();
  
  @Output() onSendId = new EventEmitter();
  customerId : Number;
 

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild('treeList', {static: false}) el: ElementRef;
  isLoading: boolean;

  dsCustomers: [Customer];
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
            <button class="btn btn-sm add-measurement-point-button" color="warn"  data-placement="top"
             title="Ölçüm Noktası Ekle" data-id="${row.id}">
                <i class="material-icons mat-18">
                  add
                </i>
            </button>
             <button class="btn btn-sm add-measurement-point-attribute-button" color="warn"  data-placement="top"
             title="Ölçüm Noktası Özellik Ekle" data-id="${row.id}">
                <i class="material-icons mat-18">
                  add
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
      document.querySelectorAll('.add-measurement-point-button').forEach(item => {
        item.addEventListener('click', (event) => {
          this.addMeasurementPoint(Number((event.currentTarget as HTMLInputElement).dataset.id));
        });
      });
      document.querySelectorAll('.add-measurement-point-attribute-button').forEach(item => {
        item.addEventListener('click', (event) => {
          this.addMeasurementPointAttribute(Number((event.currentTarget as HTMLInputElement).dataset.id));
        });
      });
    }
  }

  public addMeasurementPoint(id: number) {
    const dialogRef = this.dialog.open(CustomerMeasurementPointOperationsComponent,
      {data:  this.dsCustomers.find(customer => customer.id === id)}); // todo
    dialogRef.afterClosed().subscribe(result => {
    });
  }


  public addMeasurementPointAttribute(id: number) {
    const dialogRef = this.dialog.open(CustomerMeasurementPointAttributeOperationsComponent,
      {data: this.dsCustomers.find(customer => customer.id === id)}); // todo
    dialogRef.afterClosed().subscribe(result => {
    });
  }


}
