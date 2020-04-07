import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Customer} from '../model/customer';
import {Subject} from 'rxjs';
import {CustomerAddress} from '../model/customerAddress';
import {Equipment} from '../model/equipment';
import {Attribute} from '../model/attribute';
import {MeasurementPoint} from '../model/measurementPoint';

@Injectable({
  providedIn: 'root'
})
export class MeasurementpointService {

  baseUrl = environment.baseUrl;
  public mpoints = new Subject;
  constructor(private http: HttpClient) { }

  getMeasurementPoints() {
    this.http.get(this.baseUrl + '/mpoints').subscribe((res: any) => {
      this.mpoints.next();
      this.mpoints.next(res.responseBody);
    });
  }


  addMeasurementPoint(mPoint: MeasurementPoint) {
    return this.http.post(this.baseUrl + '/mpoints/add',
      {
        'name': mPoint.name,
        'desc': mPoint.desc,
        'level': mPoint.level,
        'equipment': mPoint.equipment
      });
  }

  deleteMeasurementPoint(id: number) {
    return this.http.delete(this.baseUrl + '/mpoints/delete/' + id);
  }

  updateMeasurementPoint(mPoint: MeasurementPoint) {
    return this.http.put(this.baseUrl + '/mpoints/update/' + mPoint.id,
      {
        'name': mPoint.name,
        'desc': mPoint.desc,
        'level': mPoint.level,
        'equipment': mPoint.equipment
      });
  }

}
