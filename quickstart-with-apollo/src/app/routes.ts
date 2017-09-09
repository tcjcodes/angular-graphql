import { Routes } from '@angular/router';

import { FeedComponent } from './feed.component';
import { NewPostComponent } from './new-post.component';
import { SignupComponent } from './user/signup.component';
import { LoginComponent } from './user/login.component';
import { LoggedInGuard } from './auth/logged-in.guard';
import { TokenGuard } from './auth/token.guard';

export const routes: Routes = [
    {
        path: '',
        canActivate: [TokenGuard],
        children: [
            { path: '', component: FeedComponent },
            { path: 'create', component: NewPostComponent, canActivate: [LoggedInGuard] },
        ]
    },
    { path: 'signup', component: SignupComponent },
    { path: 'login', component: LoginComponent }
];
