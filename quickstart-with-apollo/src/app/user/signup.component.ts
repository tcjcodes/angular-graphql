import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';

import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'app-signup',
    template: `
        <div>
            <h1>Sign Up</h1>
            <hr>
            <input
                    type="text"
                    class="form-control"
                    placeholder="Name"
                    [(ngModel)]="name"
                    name="name"
                    required
            />
            <input
                    type="text"
                    class="form-control"
                    placeholder="E-mail"
                    [(ngModel)]="email"
                    name="email"
                    required
            />
            <input
                    type="password"
                    class=""
                    [(ngModel)]="password"
                    name="password"
                    required
            />
            <button
                    (click)="signUp()"
            >Submit</button>
        </div>
    `
})
export class SignupComponent {
    name: string;
    email: string;
    password: string;
    // emailSubscription = true;

    constructor(
        private router: Router,
        private AuthService: AuthService,
        private apollo: Apollo
    ) { }

    signUp(): void {
        this.AuthService.createUser({
            email: this.email,
            password: this.password,
            name: this.name
        });
    }
}
