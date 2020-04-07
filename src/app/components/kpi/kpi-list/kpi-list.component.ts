import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';
import { DataService } from 'src/app/shared/data.service';
import { Kpi } from 'src/app/model/kpi';
import { KpiService } from 'src/app/shared/kpi.service';

@Component({
  selector: 'app-kpi-list',
  templateUrl: './kpi-list.component.html',
  styleUrls: ['./kpi-list.component.scss']
})
export class KpiListComponent implements OnInit {

  displayedColumns = ['id', 'kpiName', 'kpiContact', 'customerId', 'customerTag', 'kpiCheck', 'thresholdValue', 'frequency', 'status', 'kpiLevel', 'kpiDesc', 'active', 'deleted', 'update'];
  dsKpis: MatTableDataSource<Kpi>;
  isLoading  =  true;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @Output() onUpdate  = new EventEmitter();


  constructor(
    public kpiService : KpiService,
    private router : Router,
    public dataService : DataService
  ) { }

  ngOnInit() {
    this.kpiService.getKPIs();
    this.kpiService.kpis.subscribe((data: any) => {
      this.dsKpis = new MatTableDataSource(data);
      this.dsKpis.paginator = this.paginator;
      this.dsKpis.sort = this.sort;
      this.isLoading = false;
    });

  }

  public applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dsKpis.filter = filterValue;
  }

  sendData(kppId : number){
    let data = kppId;

    this.dataService.changeKpiId(data);
    this.router.navigate(['/kpi/kpi-operations']);
    console.log(data);
  }


}
