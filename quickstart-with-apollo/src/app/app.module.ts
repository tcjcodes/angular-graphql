import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ApolloModule } from 'apollo-angular';

import { AppComponent } from './app.component';
import { FeedComponent } from './feed.component';
import { NewPostComponent } from './new-post.component';
import { routes } from './routes';
import { provideClient } from './client';
import { SignupComponent } from './user/signup.component';
import { LoginComponent } from './user/login.component';
import { AuthService } from './auth/auth.service';

@NgModule({
    declarations: [
        AppComponent,
        FeedComponent,
        NewPostComponent,
        SignupComponent,
        LoginComponent,
    ],
    entryComponents: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot(routes),
        ApolloModule.forRoot(provideClient)
    ],
    bootstrap: [AppComponent],
    providers: [AuthService]
})
export class AppModule {
}
