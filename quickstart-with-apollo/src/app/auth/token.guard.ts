import { Apollo } from 'apollo-angular';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { userQuery } from '../user_gql';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class TokenGuard implements CanActivate {
    constructor(private auth: AuthService,
                private router: Router,
                private apollo: Apollo) {
    }

    /**
     * Check for token
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        return this.apollo.query({
            query: userQuery,
            fetchPolicy: 'network-only' // do not cache
        })
            .toPromise()
            .then((result: any) => {
                const valid = !!(result.data.user && result.data.user.id);
                if (valid) {
                    return true;
                }
                this.auth.redirectUrl = state.url;
                this.router.navigate(['/login']);
                return false;
            })
            .catch((e) => {
                console.error(e);
                return false;
            });
    }
}
