import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '../../services/authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {

  constructor(private router:Router,private authservice:AuthenticationService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
      console.log(this.authservice.currentUserValue)
      let userCurrent = this.authservice.currentUserValue

      if(userCurrent){
        return true
      }

      this.router.navigate(['/authentication/login'],{queryParams:{returnUrl:state.url}})
      return false
  }

}
