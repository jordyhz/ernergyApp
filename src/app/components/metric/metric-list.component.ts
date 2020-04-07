import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { Metric } from 'src/app/model/metric';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { MetricService } from 'src/app/shared/metric.service';
import { ToastrService } from 'ngx-toastr';
import { MetricOperationsComponent } from './metric-operations.component';


@Component({
  selector: 'app-metric-list',
  templateUrl: './metric-list.component.html',
  styleUrls: ['./metric-list.component.scss']
})
export class MetricListComponent implements OnInit {

  @Output() onUpdate  = new EventEmitter();
  @Output() onDelete  = new EventEmitter();

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  displayedColumns = ['id', 'metricName', 'sqlStatement', 'metricDesc', 'update', 'delete'];
  dsMetric: MatTableDataSource<Metric>;
  isLoading  =  true;

   dataTemp = [
    {id:3,metricName:"metric 3",sqlStatement:"denemee",metricDesc:"All Attiribute list"},
    {id:4,metricName:"metric 4",sqlStatement:"deneme2",metricDesc:"All xxx list"}

];

  constructor(private toast: ToastrService,
    public dialog: MatDialog, private metricService: MetricService) { }

    ngOnInit() {
    /*  this.dsMetric =
     new MatTableDataSource(this.dataTemp);
      this.dsMetric.paginator = this.paginator;
      this.dsMetric.sort = this.sort;
      this.isLoading = true;
*/
   
/*
      this.metricService.getMetrics();
      this.metricService.metrics.subscribe((data: any) => {
        this.dsMetric = new MatTableDataSource(data);
        this.dsMetric.paginator = this.paginator;
        this.dsMetric.sort = this.sort;
        this.isLoading = false;
      });
      
 */
      this.metricService.getMetrics().subscribe((data:any) => {
        this.dsMetric = new MatTableDataSource(data);
        this.dsMetric.paginator = this.paginator;
        this.dsMetric.sort = this.sort;
        this.isLoading = false;
      } ) ;
 
      setTimeout(() => {
        this.isLoading  =  false;
      }, 2000);
    }


    public applyFilter(filterValue: string) {
      filterValue = filterValue.trim();
      filterValue = filterValue.toLowerCase();
      this.dsMetric.filter = filterValue;
  
  
    }
  
    openDialog(): void {
      const dialogRef = this.dialog.open(MetricOperationsComponent);
  
      dialogRef.afterClosed().subscribe(result => {});
    }

}
