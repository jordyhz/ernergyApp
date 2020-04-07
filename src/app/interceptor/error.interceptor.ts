import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {Auth} from 'aws-amplify';
import {Router} from '@angular/router';
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(public toasterService: ToastrService, private router: Router) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        retry(1),
        catchError((error: HttpErrorResponse) => {
          let errorMessage = '';
          if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${error.error.message}`;
            this.toasterService.error(errorMessage, 'client-side error', { positionClass: 'toast-bottom-center' });
          } else {
            // server-side error
            errorMessage = `Error Status: ${error.status}\nMessage: ${error.message}`;
            this.toasterService.error(errorMessage, 'server-side error', { positionClass: 'toast-bottom-center' });
            if (error.status === 0) {
              Auth.signOut({global: true})
                .then(data => {
                  return this.router.navigate(['/login']);
                });
            }
          }
          console.log(errorMessage);
          return of(null);
        })
      );
  }


}
