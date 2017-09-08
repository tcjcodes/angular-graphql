import { Routes } from '@angular/router';

import { FeedComponent } from './feed.component';
import { NewPostComponent } from './new-post.component';
import { SignupComponent } from './user/signup.component';
import { LoginComponent } from './user/login.component';

export const routes: Routes = [
    { path: '', component: FeedComponent },
    { path: 'create', component: NewPostComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'login', component: LoginComponent }
];
