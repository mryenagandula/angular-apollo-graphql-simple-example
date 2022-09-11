import { query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
export const GET_POST_BY_ID = gql`
  query getPosts {
    post(id: 1) {
      id
      title
      body
    }
  }
`;

export const GET_POSTS = gql`
  query (
    $options: PageQueryOptions
  ) {
    posts(options: $options) {
      data {
        id
        title,
        body
      }
      meta {
        totalCount
      }
    }
  }
`;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public posts=[];

  constructor(private apolloClient: Apollo){}

  ngOnInit(): void {
    this.apolloClient.watchQuery({
      query: GET_POSTS,
      variables:{
        options: {
          paginate: {
            page: 1,
            limit: 10
          }
        }
      }
    })
    .valueChanges.subscribe((result: any) => {
      this.posts = result?.data?.posts?.data || [];
      console.log(this.posts)
    });
  }
}
