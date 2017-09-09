import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class LoggedInGuard implements CanActivate {
    constructor(private auth: AuthService,
                private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (!this.auth.loggedIn) {
            this.auth.redirectUrl = state.url;
            this.router.navigate(['/login']);
            return false;
        }
        return true;
    }
}