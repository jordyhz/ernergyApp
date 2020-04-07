import {AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort} from '@angular/material';
import {Customer} from '../../../model/customer';
import {CustomerService} from '../../../shared/customer.service';
import {ToastrService} from 'ngx-toastr';
import {CustomerEquipmentOperationsComponent} from '../customer-equipment-operations/customer-equipment-operations.component';
import {CustomerEquipmentAttributeOperationsComponent} from '../customer-equipment-attribute-operations/customer-equipment-attribute-operations.component';

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
        console.log(this.dsCustomers);
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
            <button class="btn btn-sm add-equipment-button" color="warn"  data-placement="top"
             title="Ekipman Ekle" data-id="${row.id}">
                <i class="material-icons mat-18">
                  add
                </i>
            </button>
            <button class="btn btn-sm add-equipment-attribute-button" color="warn"  data-placement="top"
             title="Ekipman Özellik Ekle" data-id="${row.id}">
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
      document.querySelectorAll('.add-equipment-button').forEach(item => {
        item.addEventListener('click', (event) => {
          this.addEquipment(Number((event.currentTarget as HTMLInputElement).dataset.id));
        });
      });
      document.querySelectorAll('.add-equipment-attribute-button').forEach(item => {
        item.addEventListener('click', (event) => {
          this.addEquipmentAttribute(Number((event.currentTarget as HTMLInputElement).dataset.id));
        });
      });
    }
  }

  public addEquipment(id: number) {
    const dialogRef = this.dialog.open(CustomerEquipmentOperationsComponent,
      {data: this.dsCustomers.find(customer => customer.id === id,
        console.log(id))}); // todo
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  public addEquipmentAttribute(id: number) {
    const dialogRef = this.dialog.open(CustomerEquipmentAttributeOperationsComponent,
      {data: this.dsCustomers.find(customer => customer.id === id)}); // todo
    dialogRef.afterClosed().subscribe(result => {
    });
  }


}
