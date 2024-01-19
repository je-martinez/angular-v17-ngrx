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
import { mapArrayPost, registerMappers } from '../mappers/mappers';

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
});
