import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import {
  PostApiResponse,
  PostCommentApiResponse,
  UserApiResponse
} from '../types/content-wall.api.types';
import { map } from 'rxjs';
import {
  mapArrayComment,
  mapArrayPost,
  mapArrayUser
} from '../mappers/mappers';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  constructor(private http: HttpClient) {}

  public getPostsFromApi() {
    return this.http
      .get<PostApiResponse[]>(`${environment.api.baseUrlJSONPlaceholder}/posts`)
      .pipe(map((posts) => mapArrayPost(posts)));
  }
  public getCommentsFromApi() {
    return this.http
      .get<PostCommentApiResponse[]>(
        `${environment.api.baseUrlJSONPlaceholder}/comments`
      )
      .pipe(map((comments) => mapArrayComment(comments)));
  }
  public getUsersFromApi() {
    return this.http
      .get<UserApiResponse[]>(`${environment.api.baseUrlJSONPlaceholder}/users`)
      .pipe(map((users) => mapArrayUser(users)));
  }
}
