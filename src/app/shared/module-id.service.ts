import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class ModuleIdService {

  private moduleIdSource = new BehaviorSubject<number>(0);
  moduleId = this.moduleIdSource.asObservable()

  constructor() { }

  
  changeModuleId(moduleId) {
    this.moduleIdSource.next(moduleId);
  }
}
