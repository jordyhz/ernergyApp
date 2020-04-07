import {Injectable} from '@angular/core';
import {Auth} from 'aws-amplify';
import {Router} from '@angular/router';
import {ApiService} from '../api.service';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient, private router: Router, private apiService: ApiService) {
  }

  logOut() {
        this.apiService.saveLogOut().subscribe(
          data => {
            console.log('POST Request is successful');
          }
        );
        Auth.signOut({global: true})
          .then(data => {
            return this.router.navigate(['/login']);
          });
  }

  getSectors() {
    return this.http.get(this.baseUrl + '/attributes/listofvalues/Sector');
  }

  getCountries() {
    return this.http.get(this.baseUrl + '/attributes/listofvalues/Country');
  }

  getCities() {
    return this.http.get(this.baseUrl + '/attributes/listofvalues/City');
  }

  getNotChecks() {
    return this.http.get(this.baseUrl + '/attributes/listofvalues/Notification Check');
  }
  
  getNotLevels() {
    return this.http.get(this.baseUrl + '/attributes/listofvalues/Notification Level');
  }

  getKpiChecks() {
    return this.http.get(this.baseUrl + '/attributes/listofvalues/KPI Check');
  }
  
  getKpiLevels() {
    return this.http.get(this.baseUrl + '/attributes/listofvalues/KPI Level');
  }

  getFrequencies() {
    return this.http.get(this.baseUrl + '/attributes/listofvalues/KPI Frequency');
  }

  getStatuses() {
    return this.http.get(this.baseUrl + '/attributes/listofvalues/KPI Status');
  }
}
