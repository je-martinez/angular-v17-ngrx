import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import {
  PostApiResponse,
  PostCommentApiResponse,
  UserApiResponse
} from '../types/content-wall.api.types';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  constructor(private http: HttpClient) {}

  public getPostsFromApi() {
    return this.http.get<PostApiResponse[]>(
      `${environment.api.baseUrlJSONPlaceholder}/posts`
    );
  }
  public getCommentsFromApi() {
    return this.http.get<PostCommentApiResponse[]>(
      `${environment.api.baseUrlJSONPlaceholder}/comments`
    );
  }
  public getUsersFromApi() {
    return this.http.get<UserApiResponse[]>(
      `${environment.api.baseUrlJSONPlaceholder}/users`
    );
  }
}
