import {Component, OnInit} from '@angular/core';
import {Auth, Hub} from 'aws-amplify';
import {ApiService} from './api.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {CommonService} from './shared/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private api: ApiService, private router: Router, private toast: ToastrService , private common: CommonService) {}
  ngOnInit() {

    const listener = (data) => {
      switch (data.payload.event) {
        case 'signIn':
           this.saveUser();
          break;
        case 'signUp':
          console.log('now the user signed up');
          break;
        case 'signOut':
          console.log('now the user is signed out');
          break;
        case 'signIn_failure':
          console.log('now the user is sign in failed');
          break;
        case 'configured':
          console.log('the Auth module is configured');

      }
    };
    Hub.listen('auth', listener);
  }

  saveUser() {
    Auth.currentUserInfo()
      .then(res => {
        this.api.saveLogIn().subscribe(
          data => {
            console.log('POST Request is successful ', data);
            return this.router.navigate(['/home']);
          }
        );
      });
  }
}
