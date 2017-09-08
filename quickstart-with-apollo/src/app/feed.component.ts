import { Component, OnInit, OnDestroy } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs/Subscription';

import 'rxjs/add/operator/toPromise';
import { AuthService } from './auth/auth.service';
import gql from 'graphql-tag';

const AllPostsQuery = gql`
  query allPosts {
      allPosts {
          id
          description
          imageUrl
      }
  }
`;

@Component({
    selector: 'app-feed',
    template: `
        <div *ngIf="!auth.loggedIn" class="fixed top-0 right-0 pa4">
            <a routerLink="/signup" class=" bg-white  ttu dim black no-underline">Sign Up</a>
            <span>&nbsp;|&nbsp;</span>
            <a routerLink="/login" class="bg-white ttu dim black no-underline">Log In</a>
        </div>
        <div *ngIf="auth.loggedIn" class="fixed top-0 right-0 pa4">
            <a routerLink="/create" class="bg-white ttu dim black no-underline">+ New Post</a>
            <span>&nbsp;|&nbsp;</span>
            <a (click)="auth.logOut();" class="bg-white ttu dim black no-underline">Log Out</a>
        </div>
        <div class="w-100" style="max-width: 400px;">
            <h1>Feed</h1>

            <div class="pa3 bg-black-05 ma3" *ngFor="let post of allPosts">
                <div class="w-100" [ngStyle]="setImage(post.imageUrl)"></div>
                <div class="pt3">
                    {{post.description}}&nbsp;
                    <span class='red f6 pointer dim' (click)="handleDelete(post.id)">Delete</span>
                </div>
            </div>
            <!--<div class="pa3 bg-black-05 ma3" *ngFor="let user of allPosts">
                <div class="w-100" [ngStyle]="setImage(post.imageUrl)"></div>
                <div class="pt3">
                    {{post.description}}&nbsp;
                    <span class='red f6 pointer dim' (click)="handleDelete(post.id)">Delete</span>
                </div>
            </div>-->
        </div>
    `,
    host: { 'style': 'width: 100%; display: flex; justify-content: center;' }
})
export class FeedComponent implements OnInit, OnDestroy {

    loading = true;
    allPosts: any;
    allPostsSub: Subscription;

    constructor(private apollo: Apollo,
                public auth: AuthService) {
    }

    setImage(url: string) {
        const styles = {
            'background-image': `url(${url})`,
            'background-size': 'cover',
            'padding-bottom': '100%',
        };
        return styles;
    }

    handleDelete(id: string) {
        this.apollo.mutate({
            mutation: gql`
        mutation ($id: ID!) {
          deletePost(id: $id) {
            id
          }
        }
      `,
            variables: {
                id: id,
            },
            updateQueries: {
                allPosts: (prev: any) => {
                    const allPosts = prev.allPosts.filter(post => post.id !== id);

                    return {
                        allPosts: [...allPosts]
                    };
                }
            }
        }).toPromise();
    }

    ngOnInit() {
        this.allPostsSub = this.apollo.watchQuery({
            query: AllPostsQuery
        }).subscribe(({ data, loading }: any) => {
            this.allPosts = data.allPosts;
            this.loading = loading;
        });
    }

    ngOnDestroy() {
        this.allPostsSub.unsubscribe();
    }
}
