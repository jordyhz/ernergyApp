import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Customer} from '../model/customer';
import {Subject} from 'rxjs';
import { element } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class ScreenService {

  baseUrl = environment.baseUrl;
  screens = new Subject();
  screens2 = new Subject();
  object = new Subject();
  constructor(private http: HttpClient) { }

  getScreens() {
    this.http.get(this.baseUrl + '/screens').subscribe((res: any) => {
      this.screens.next(res.responseBody);
    });
  }


  module_screen(module:any, screen: any){
    return this.http.post(this.baseUrl+'/modules/screen/add',{
      'moduleId': module.id,
      'screenId': screen.id,
      
    });
  }

  module_screen_unbind(module:any, screenId: number){
    return this.http.post(this.baseUrl+'/modules/screen/'+ screenId,{
      'moduleId': module.moduleId,
      
      
    });
  }

  


  getModuleScreens(id : number){
    this.http.get(this.baseUrl +'/modules/'+ id + '/screens').subscribe((res: any) => {
      this.screens2.next(res.responseBody);
     
    });
  }

  addScreen(screen: any) {
    return this.http.post(this.baseUrl + '/screens/add',
      {
        'screenCode': screen.screenCode,
        'screenName': screen.screenName,
      });
  }

  deleteScreen(id: number) {
    return this.http.delete(this.baseUrl + '/screens/delete/' + id);
  }

  updateScreen(screen: any) {
    return this.http.put(this.baseUrl + '/screens/update/' + screen.id,
      {
        'screenName': screen.screenName,
        'screenCode': screen.screenCode,
      });
  }
}
