import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {Equipment} from '../model/equipment';
import {Attribute} from '../model/attribute';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {

  baseUrl = environment.baseUrl + '/equipments';
  public equipments = new Subject;
  public attributes = new Subject;
  constructor(private http: HttpClient) { }

  getEquipments() {
    this.http.get(this.baseUrl).subscribe((res: any) => {
      this.equipments.next();
      this.equipments.next(res.responseBody);
    });
  }

  getActiveAttributesEquipment(id: number) {
    return this.http.get(this.baseUrl + '/' + id + '/activeAttributes');
  }

  addAttributesEquipment(equipment: Equipment, attribute: Attribute) {
    return this.http.post(this.baseUrl + '/attribute/add',
      {
        'equipment': equipment,
        'attribute': attribute
      });
  }

  addEquipment(equipment: Equipment) {
    return this.http.post(this.baseUrl + '/add',
      {
        'name': equipment.name,
        'desc': equipment.desc
      });
  }

  deleteEquipment(id: number) {
    return this.http.delete(this.baseUrl + '/delete/' + id);
  }


  makeAttributesInactive(id: number) {
    return this.http.post(this.baseUrl + '/' + id + '/inactiveAttributes', null);
  }

  updateEquipment(equipment: Equipment) {
    return this.http.put(this.baseUrl + '/update/' + equipment.id,
      {
        'name': equipment.name,
        'desc': equipment.desc
      });
  }

}
