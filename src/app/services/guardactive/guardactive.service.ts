import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class GuardactiveService {

  constructor(private router:Router,private authservice:AuthenticationService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    
      let userCurrent = this.authservice.currentUserValue
      
      if(userCurrent.meta.is_active){
        return true
      }
     
      this.router.navigate(['/confirmemail'],{queryParams:{returnUrl:state.url}})
      return false
  }
  

}
