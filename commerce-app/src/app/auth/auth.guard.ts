import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // let isLoggedIn: boolean;
    // if (localStorage.length > 0) {
    //   let user: User = JSON.parse(localStorage.getItem('user') || "{}");
    //   if (user) {
    //     isLoggedIn = true
    //   } else {
    //     isLoggedIn = false
    //   }
    //   return isLoggedIn;
    // }
    // return false;
    if (this.userService.checkUser.value) {
      return true;
    } else {
      this.router.navigate(['/home'])
      return false;
    }
  }

}
