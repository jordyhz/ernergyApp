import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {Auth} from 'aws-amplify';
import { from } from 'rxjs';
import {switchMap} from 'rxjs/operators';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    return from(
      Auth.currentSession().then(
        result => {
          return result.getIdToken().getJwtToken();
        })
    ).pipe(
        switchMap(token => {
          const headers = request.headers
            .set('Authorization', 'Bearer ' + token)
            .append('Content-Type', 'application/json');
          const req = request.clone({headers});
          return next.handle(req);
        })
      );
  }


}
