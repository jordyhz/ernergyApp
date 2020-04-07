import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }


  getMesPoints(customerId: number) {
    return this.http.get(this.baseUrl + '/customers/ ' + customerId + '/mespoints');
  }

  getTransactions(customerId: number) {
    return this.http.get(this.baseUrl + '/customers/ ' + customerId + '/transactions');
  }


}
