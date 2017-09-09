import { Apollo } from 'apollo-angular';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { userQuery } from '../user_gql';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class TokenGuard implements CanActivate {
    constructor(private auth: AuthService,
                // private router: Router,
                private apollo: Apollo) {
    }

    /**
     * Check for token, pre-activate
     * @return true always
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        return this.apollo.query({
            query: userQuery,
            fetchPolicy: 'network-only' // do not cache
        })
            .toPromise()
            .then((result: any) => {
                const valid = !!(result.data.user && result.data.user.id);
                if (!valid) {
                    this.auth.setLoggedIn(false);
                }
                return true;
            })
            .catch((e) => {
                console.error(e);
                return false;
            });
    }
}
