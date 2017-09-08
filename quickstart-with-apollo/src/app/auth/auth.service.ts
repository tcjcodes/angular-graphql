import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { createUser, signinUser } from '../user_gql';

@Injectable()
export class AuthService {

    loggedIn: boolean;
    loggedIn$ = new BehaviorSubject(<boolean>(this.loggedIn));

    constructor(private router: Router,
                private apollo: Apollo) {
        this.setLoggedIn(!!localStorage.getItem('graphcoolToken'));
        // if (this.tokenValid) {
        //     this.setLoggedIn(true);
        // } else if (!this.tokenValid) {
        //     this.logOut();
        // }
    }

    // private _setSession(result) {
    //     localStorage.setItem('graphcoolToken', result.graphcoolToken);
    //     this.setLoggedIn(true);
    // }

    // get tokenValid(): boolean {
    //     return true;
    // }

    logIn({ email, password }) {
        this.apollo.mutate({
            mutation: signinUser,
            variables: { email, password }
        })
            .toPromise()
            .then((response: any) => {
                localStorage.setItem('graphcoolToken', response.data.signinUser.token);
                this.setLoggedIn(true);
                this.router.navigate(['/']);
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
            .then((createResponse: any) => {
                this.logIn({ email, password });
            })
            .catch((e) => console.error(e));
    }
}