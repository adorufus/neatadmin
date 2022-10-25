import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.isLoggedIn()) {
      return true;
    }
    
    return false;
  }

  public isLoggedIn(): boolean {
    let status = false;

    if(this.authService.getUserUid() != "" && this.authService.getUserUid != null) {
      status = true;
    } else {
      status = false;
    }

    return status;
  }
  
}
