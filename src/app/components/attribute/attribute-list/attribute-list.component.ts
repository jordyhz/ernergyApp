import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ToastrService} from 'ngx-toastr';
import {ConfirmDialogModel} from '../../../model/confirmDialogModel';
import {ConfirmDialogComponent} from '../../confirm-dialog/confirm-dialog.component';
import {Attribute} from '../../../model/attribute';
import {AttributeOperationsComponent} from '../attribute-operations/attribute-operations.component';
import {AttributeService} from '../../../shared/attribute.service';

@Component({
  selector: 'app-attribute-list',
  templateUrl: './attribute-list.component.html',
  styleUrls: ['./attribute-list.component.scss']
})
export class AttributeListComponent implements OnInit {

  @Output() onUpdate  = new EventEmitter();
  @Output() onDelete  = new EventEmitter();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  attributeTypeEnum = {1: 'Ekipman Özelliği', 2: 'Ölçüm Noktası Özelliği' };
  calcMethodEnum = {1: 'Yöntem 1', 2: 'Yöntem 2' };
  displayedColumns = ['id', 'name', 'desc', 'unit', 'type', 'calcMethod', 'createdDateTime', 'updatedDateTime', 'update', 'delete'];
  dsAttribute: MatTableDataSource<Attribute>;
  isLoading  =  true;




  constructor(private toast: ToastrService,
              public dialog: MatDialog, private attributeService: AttributeService) {

  }


  ngOnInit() {
    this.attributeService.getAttributes();
    this.attributeService.attributes.subscribe((data: any) => {
      this.dsAttribute = new MatTableDataSource(data);
      this.dsAttribute.paginator = this.paginator;
      this.dsAttribute.sort = this.sort;
      this.isLoading = false;
    });
    setTimeout(() => {
      this.isLoading  =  false;
    }, 2000);
  }


  public applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dsAttribute.filter = filterValue;


  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AttributeOperationsComponent);

    dialogRef.afterClosed().subscribe(result => {});
  }

  public deleteAttribute(id: number) {
    this.attributeService.deleteAttribute(id).subscribe(data => {
        this.attributeService.getAttributes();
        console.log('Deleted Successfully');
        this.toast.success('Başarıyla Silindi!', 'Kayıt İşlemi');
      },
    );
  }

  public updateAttribute(index: number) {
    const dialogRef = this.dialog.open(AttributeOperationsComponent,
      {data: this.dsAttribute.filteredData.find(module => module.id === index)});
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
        this.deleteAttribute(id);
      }
    });
  }


}
