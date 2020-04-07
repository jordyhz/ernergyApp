import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Subject} from 'rxjs';
import { Metric } from '../model/metric';

@Injectable({
  providedIn: 'root'
})
export class MetricService {

  /*
  headers = new HttpHeaders({
        'Accept': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*'
        
    });



        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
*/
  public serviceUrl ; 
  public metrics = new Subject;
  public metric: Metric

  constructor(private http: HttpClient) { }

  getMetrics() {
     this.serviceUrl = environment.baseUrlMetric + '/metrics/sql/all';

   //this.http.get(this.baseUrl,{headers: this.headers} ).subscribe((res: any) => {
    return this.http.get<Metric>(this.serviceUrl) ;


  }


  getMetricsOld() {
     this.serviceUrl = environment.baseUrlMetric + '/metrics/sql/all';

   //this.http.get(this.baseUrl,{headers: this.headers} ).subscribe((res: any) => {
    this.http.get(this.serviceUrl).subscribe((res: any) => {
   
      this.metrics.next();
      this.metrics.next(res);

    });
  }

  addMetric(metric: Metric) {
   /* metric.id = 2999;
    metric.metricName = "metric name" ;
    metric.sqlStatement = "metric sql" ;
    metric.metricDesc = "metric desc" ;
*/

    this.serviceUrl =  environment.baseUrlMetric + '/metrics/sql/save';
    console.log(this.serviceUrl) ;
    return this.http.post(this.serviceUrl,
      {
        'id': metric.id,
        'metricName': metric.metricName,
        'sqlStatement': metric.sqlStatement,
        'metricDesc': metric.metricDesc
      });
  }

  /*
  deleteAttribute(id: number) {
    return this.http.delete(this.baseUrl + '/attributes/delete/' + id);
  }

  updateAttribute(attr: Attribute) {
    return this.http.put(this.baseUrl + '/attributes/update/' + attr.id,
      {
        'name': attr.name,
        'desc': attr.desc,
        'type': attr.type,
        'unit': attr.unit,
        'calcMethod': attr.calcMethod
      });
  }

  */

}
