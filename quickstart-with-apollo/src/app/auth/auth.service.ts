import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Apollo } from 'apollo-angular';
import { createUser, signinUser } from '../user_gql';

@Injectable()
export class AuthService {
    // Url to redirect to (after an authorization succeeds)
    redirectUrl: string;

    loggedIn: boolean;
    loggedIn$ = new BehaviorSubject(<boolean>(this.loggedIn));

    constructor(private router: Router,
                private apollo: Apollo) {
        this.setLoggedIn(!!localStorage.getItem('graphcoolToken'));
    }

    logIn({ email, password }) {
        this.apollo.mutate({
            mutation: signinUser,
            variables: { email, password }
        })
            .toPromise()
            .then((response: any) => {
                localStorage.setItem('graphcoolToken', response.data.signinUser.token);
                this.setLoggedIn(true);
                this.router.navigate([this.redirectUrl || '/']);
                this.redirectUrl = null;
            })
            .catch((e) => console.error(e))
    }

    logOut() {
        localStorage.removeItem('graphcoolToken');
        this.setLoggedIn(false);
        this.router.navigate(['/']);
    }

    private setLoggedIn(value: boolean) {
        this.loggedIn$.next(value);
        this.loggedIn = value;
    }

    createUser({ email, password, name }) {
        this.apollo.mutate({
            mutation: createUser,
            variables: { email, password, name },
        })
            .toPromise()
            .then(() => {
                this.logIn({ email, password });
            })
            .catch((e) => console.error(e));
    }
}