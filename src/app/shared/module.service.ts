import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject} from 'rxjs';
//import { Module } from '../model/module';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {
  
  baseUrl = environment.baseUrl;
  modules = new Subject();
  constructor(private http: HttpClient) { }



getModules() {
  this.http.get(this.baseUrl + '/modules').subscribe((res: any) => {
    this.modules.next(res.responseBody);
    console.log("GEtting modules");
  });
}

 addModule(module : any) {
  return this.http.post(this.baseUrl + '/modules/add',
    {
      'moduleCode' : module.moduleCode,
      'moduleName' : module.moduleName
    });
}

 deleteModule(id: number) {
  return this.http.delete(this.baseUrl + '/modules/delete/' + id);
}

updateModule(module: any) {
  return this.http.put(this.baseUrl + '/modules/update/' + module.id,
    {
      'moduleName': module.moduleName,
      'moduleCode': module.moduleCode
    });
}


}
