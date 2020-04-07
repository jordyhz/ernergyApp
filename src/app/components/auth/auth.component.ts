import { Component, OnInit } from '@angular/core';
import {Auth, I18n} from 'aws-amplify';
import {dict} from './AmplifyI18n';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
   signUpConfig = {
    hideAllDefaults: true,
    signUpFields: [
      {
        label: 'Kullanıcı',
        key: 'username',
        required: true,
        placeholder: 'Username',
        type: 'username',
        displayOrder: 1,
      },
      {
        label: 'Email',
        key: 'email',
        required: true,
        placeholder: 'Email',
        type: 'email',
        displayOrder: 2
      },
      {
        label: 'Şifre',
        key: 'password',
        required: true,
        placeholder: 'Password',
        type: 'password',
        displayOrder: 3
      }
    ]
  };

  constructor() { }


  ngOnInit() {
    I18n.putVocabularies(dict);
  }
}
