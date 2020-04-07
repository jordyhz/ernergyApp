import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  saveLogIn() {
    return this.http.post(this.baseUrl + '/users/saveLogIn', null);
  }

  saveLogOut() {
    return this.http.post(this.baseUrl + '/users/saveLogOut', null);
  }

  getUserLog() {
    return this.http.get(this.baseUrl + '/users/userLog/list');
  }

  checkServerStatus() {
    return this.http.get(this.baseUrl + '/actuator/health');
  }

  uploadFile(file: File) {
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    formdata.append('key', 'image');
    return this.http.post(this.baseUrl + '/uploadFile',
      formdata);
  }

}
