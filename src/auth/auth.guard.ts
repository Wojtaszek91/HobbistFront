import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(private readonly router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const gotToken = sessionStorage.getItem('token');
    const expirationDate = sessionStorage.getItem('expirationDate');

    if (gotToken) {
      if (expirationDate) {
        const fixedExpirationDate = new Date(expirationDate);
        const currentDate = new Date(Date.now());
        if (fixedExpirationDate.getTime() > currentDate.getTime()) {
          return true;
        }
      }
    }
    return localStorage.getItem('isFirstTime') === 'false' ? this.router.createUrlTree(['/login']) : this.router.createUrlTree(['/home']);
  }
}
