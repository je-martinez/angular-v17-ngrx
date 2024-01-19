import { TestBed } from '@angular/core/testing';
import { ContentService } from './content.service';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs';
import { environment } from '@env/environment';
import { mockPosts } from '@mocks/data/posts.mock';
import { registerMappers } from '../mappers/mappers';
import { mockComments } from '@mocks/data/comments.mock';
import { mockUsers } from '@mocks/data/users.mock';

describe('ContentService', () => {
  let httpClient: HttpClient;
  let service: ContentService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    registerMappers();
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpClient = TestBed.inject(HttpClient);
    service = TestBed.inject(ContentService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(httpClient).toBeTruthy();
    expect(service).toBeTruthy();
  });

  it('should get posts via getPostsFromApi method', () => {
    const request = service.getPostsFromApi();
    const url = `${environment.api.baseUrlJSONPlaceholder}/posts`;

    request.pipe(take(1)).subscribe((response) => {
      const responseData = response.map((post) => {
        post.createdAt = new Date('2022-01-01');
        return post;
      });
      const mockData = mockPosts.map((post) => {
        post.createdAt = new Date('2022-01-01');
        return post;
      });
      expect(responseData).toEqual(mockData);
    });

    const req = httpTestingController.expectOne(url);

    req.flush(mockPosts);
  });
  it('should get comments via getCommentsFromApi method', () => {
    const request = service.getCommentsFromApi();
    const url = `${environment.api.baseUrlJSONPlaceholder}/comments`;

    request.pipe(take(1)).subscribe((response) => {
      const responseData = response.map((comment) => {
        comment.createdAt = new Date('2022-01-01');
        return comment;
      });
      const mockData = mockComments.map((comment) => {
        comment.createdAt = new Date('2022-01-01');
        return comment;
      });
      expect(responseData).toEqual(mockData);
    });

    const req = httpTestingController.expectOne(url);

    req.flush(mockComments);
  });

  it('should get comments via getCommentsFromApi method', () => {
    const request = service.getUsersFromApi();
    const url = `${environment.api.baseUrlJSONPlaceholder}/users`;

    request.pipe(take(1)).subscribe((response) => {
      const responseData = response.map((user) => {
        return user;
      });
      const mockData = mockUsers.map((user) => {
        return user;
      });
      expect(responseData).toEqual(mockData);
    });

    const req = httpTestingController.expectOne(url);

    req.flush(mockUsers);
  });
});
