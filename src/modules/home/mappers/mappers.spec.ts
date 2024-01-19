import {
  PostApiResponse,
  PostCommentApiResponse,
  UserApiResponse
} from '../types/content-wall.api.types';
import { Post, PostComment, User } from '../types/content-wall.types';
import {
  mapArrayComment,
  mapArrayPost,
  mapArrayUser,
  mapSingleComment,
  mapSinglePost,
  mapSingleUser,
  mapper,
  registerMappers
} from './mappers';
describe('Mappers', () => {
  beforeEach(() => {
    registerMappers();
  });

  it('should be defined', () => {
    expect(mapper).toBeDefined();
  });

  it('should map PostApiResponse to Post and add map new fields', () => {
    const postApiResponse: PostApiResponse = {
      id: 1,
      userId: 1,
      title: 'title',
      body: 'body'
    };
    const post: Post = mapSinglePost(postApiResponse);
    expect(post.createdAt).toBeInstanceOf(Date);
  });

  it('should map array of PostApiResponse to Post and map new fields', () => {
    const postApiResponse: PostApiResponse[] = [
      {
        id: 1,
        userId: 1,
        title: 'title',
        body: 'body'
      },
      {
        id: 2,
        userId: 2,
        title: 'title',
        body: 'body'
      }
    ];
    const posts: Post[] = mapArrayPost(postApiResponse);

    expect(posts.length).toBe(2);

    for (const post of posts) {
      expect(post.createdAt).toBeInstanceOf(Date);
    }
  });

  it('should map PostCommentApiResponse to Comment and add map new fields', () => {
    const commentsApiResponse: PostCommentApiResponse = {
      postId: 1,
      id: 1,
      name: 'name',
      email: 'mock@mail.com',
      body: 'body'
    };
    const comment: PostComment = mapSingleComment(commentsApiResponse);
    expect(comment.createdAt).toBeInstanceOf(Date);
  });

  it('should map array of PostCommentApiResponse to Comment and map new fields', () => {
    const commentsApiResponse: PostCommentApiResponse[] = [
      {
        postId: 1,
        id: 1,
        name: 'name',
        email: 'mock-1@mail.com',
        body: 'body'
      },
      {
        postId: 2,
        id: 2,
        name: 'name',
        email: 'mock-2@mail.com',
        body: 'body'
      }
    ];
    const comments: PostComment[] = mapArrayComment(commentsApiResponse);

    expect(comments.length).toBe(2);

    for (const comment of comments) {
      expect(comment.createdAt).toBeInstanceOf(Date);
      expect(comment.avatar).toBeInstanceOf(String);
    }
  });

  it('should map UserApiResponse to Comment and add map new fields', () => {
    const usersApiResponse: UserApiResponse = {
      id: 1,
      name: 'Fake Name 1',
      username: 'fake_username_1',
      email: 'fakeuser1@mail.com',
      address: {
        street: 'fake street',
        suite: 'fake suite',
        city: 'fake city',
        zipcode: 'fake zipcode',
        geo: {
          lat: '14.35',
          lng: '35.98'
        }
      },
      phone: '1234567890',
      website: 'fake.com',
      company: {
        name: 'fake company',
        catchPhrase: 'fake catch phrase',
        bs: 'fake bs'
      }
    };
    const user: User = mapSingleUser(usersApiResponse);
    expect(user.avatar).toBeInstanceOf(String);
  });

  it('should map array of PostCommentApiResponse to Comment and map new fields', () => {
    const usersApiResponse: UserApiResponse[] = [
      {
        id: 2,
        name: 'Fake Name 2',
        username: 'fake_username_2',
        email: 'fakeuser2@mail.com',
        address: {
          street: 'fake street',
          suite: 'fake suite',
          city: 'fake city',
          zipcode: 'fake zipcode',
          geo: {
            lat: '15.35',
            lng: '36.98'
          }
        },
        phone: '1234597890',
        website: 'fake.com',
        company: {
          name: 'fake company',
          catchPhrase: 'fake catch phrase',
          bs: 'fake bs'
        }
      },
      {
        id: 3,
        name: 'Fake Name 3',
        username: 'fake_username_3',
        email: 'fakeuser3@mail.com',
        address: {
          street: 'fake street',
          suite: 'fake suite',
          city: 'fake city',
          zipcode: 'fake zipcode',
          geo: {
            lat: '19.35',
            lng: '74.98'
          }
        },
        phone: '1234568890',
        website: 'fake.com',
        company: {
          name: 'fake company',
          catchPhrase: 'fake catch phrase',
          bs: 'fake bs'
        }
      }
    ];
    const users: User[] = mapArrayUser(usersApiResponse);

    expect(users.length).toBe(2);

    for (const user of users) {
      expect(user.avatar).toBeInstanceOf(String);
    }
  });
});
