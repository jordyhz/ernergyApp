import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Customer} from '../model/customer';
import {Subject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ModuleScreenService {

  baseUrl = environment.baseUrl;
  screens = new Subject();

  constructor(private http: HttpClient) { }

  getModuleScreens(id : number){
    this.http.get(this.baseUrl +'/modules/'+ id + '/screens').subscribe((res: any) => {
      this.screens.next(res.responseBody);
    });
  }
}
