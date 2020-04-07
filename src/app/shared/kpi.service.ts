import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Kpi } from '../model/kpi';


@Injectable({
  providedIn: 'root'
})
export class KpiService {

  baseUrl = environment.baseUrl;

  public kpis = new Subject;

  constructor( private http: HttpClient) { }

  getKPIs() {
    return this.http.get(this.baseUrl + '/kpi').
  subscribe((res: any) => {
    this.kpis.next();
    this.kpis.next(res.responseBody);
  }); 
  }

  getKpiById(id : number) {
    return this.http.get(this.baseUrl + '/kpi/'+ id).subscribe((res: any) => {
    
      this.kpis.next(res.responseBody);
  
      console.log(res.responseBody);
  
      
    });    

  }

  

  addKPI (kpi: Kpi) {
    console.log(kpi);

    return this.http.post(this.baseUrl + '/kpi/add',
    {
      'kpiName': kpi.kpiName,
      'kpiContact': kpi.kpiContact,
      'customerId': kpi.customerId.id,
      'customerTag': {
          "id": kpi.customerTag.id,
      },
      'kpiCheck': {
          "id": kpi.kpiCheck.id
      },
      'thresholdValue': kpi.thresholdValue,
      'frequency': {
          "id": kpi.frequency.id
      },
      'kpiLevel': {
          "id": kpi.kpiLevel.id
      },
      'kpiDesc': kpi.kpiDesc,
      'status': {
          "id": kpi.status.id
   },
      'active': kpi.active,
      'deleted': kpi.deleted,
    }
    )

  }

  updateKPI(kpi: Kpi) {

    return this.http.put(this.baseUrl + '/kpi/update/' + kpi.id,
    {
      'kpiName': kpi.kpiName,
      'kpiContact': kpi.kpiContact,
      'customerId': kpi.customerId.id,
      'customerTag': {
          "id": kpi.customerTag.id,
      },
      'kpiCheck': {
          "id": kpi.kpiCheck.id
      },
      'thresholdValue': kpi.thresholdValue,
      'frequency': {
          "id": kpi.frequency.id
      },
      'kpiLevel': {
          "id": kpi.kpiLevel.id
      },
      'kpiDesc': kpi.kpiDesc,
      'status': {
          "id": kpi.status.id
   },
      'active': kpi.active,
      'deleted': kpi.deleted
    }
    )
  }


}
