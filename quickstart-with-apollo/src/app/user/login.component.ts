import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  template: `
      <div>
          <h1>Log In</h1>
          <hr>
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
                  (click)="submit()"
          >Submitl</button>
      </div>
  `,
  styles: []
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(private AuthService: AuthService) { }

  ngOnInit() {
  }

  submit() {
      if (this.email && this.password) {
          this.AuthService.logIn({
              email: this.email,
              password: this.password,
          });
      }
  }

}
