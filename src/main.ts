import 'hammerjs';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import Amplify from 'aws-amplify';
Amplify.configure({
  Auth: {
    // REQUIRED - Amazon Cognito Region
    region: environment.region,
    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: environment.userPoolId,
    // OPTIONAL - Amazon Cognito Web Client ID
    userPoolWebClientId: environment.userPoolWebClientId
  },
  Analytics: {
    // OPTIONAL - disable Analytics if true
    disabled: true
  }
});

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule).then(ref => {
  // Ensure Angular destroys itself on hot reloads.
  if (window['ngRef']) {
    window['ngRef'].destroy();
  }
  window['ngRef'] = ref;

  // Otherwise, log the boot error
}).catch(err => console.error(err));
