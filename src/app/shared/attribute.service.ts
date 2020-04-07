import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Customer} from '../model/customer';
import {Subject} from 'rxjs';
import {CustomerAddress} from '../model/customerAddress';
import {Equipment} from '../model/equipment';
import {Attribute} from '../model/attribute';

@Injectable({
  providedIn: 'root'
})
export class AttributeService {

  baseUrl = environment.baseUrl;
  public attributes = new Subject;
  constructor(private http: HttpClient) { }
  public tags = new Subject;

  getAttributes() {
    this.http.get(this.baseUrl + '/attributes').subscribe((res: any) => {
      this.attributes.next();
      this.attributes.next(res.responseBody);
    });
  }


  addAttribute(attribute: Attribute) {
    return this.http.post(this.baseUrl + '/attributes/add',
      {
        'name': attribute.name,
        'desc': attribute.desc,
        'type': attribute.type,
        'unit': attribute.unit,
        'calcMethod': attribute.calcMethod
      });
  }

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

}
