import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service'
import { User } from 'src/app/models/User';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptService  implements HttpInterceptor{

  private currentUser;

  constructor(private authenticationService:AuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    this.currentUser =  <User>this.authenticationService.currentUserValue;
    if (this.currentUser && this.currentUser.token) {
        request = request.clone({
            setHeaders: { 
                Authorization: `Bearer ${this.currentUser.token}`
            }
        });
    }

    return next.handle(request);
}
}
