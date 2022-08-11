import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router
  ){}
  canActivate() {
    if(this.auth.isLoggedIn()){
      // this.router.navigate(['/']);
      return true;
    }
    else{
      this.auth.logout();
      return false;
    }
  }
  
}
// import { Injectable } from '@angular/core';
// import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
// import { Observable } from 'rxjs';
// import {UserService} from '../services/user.service';
// import {User} from '../models/user';
// import { AuthService } from './auth.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {

//   //currentUser: User;
//   constructor(private router: Router, private auth: AuthService) {  }

//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//     const currentUser = this.auth.currentUserValue;
//     if(currentUser) {
//       return true;
//     }
//     this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
//     return false;
//   }
// }
