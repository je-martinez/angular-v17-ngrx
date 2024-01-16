import { createMap, createMapper } from '@automapper/core';
import { pojos } from '@automapper/pojos';
import {
  AddressApiResponse,
  CompanyApiResponse,
  GeoApiResponse,
  PostApiResponse,
  PostCommentApiResponse,
  UserApiResponse
} from '../types/content-wall.api.types';
import { createPostCommentMetadata } from './comment.mapper';
import { createPostMetadata } from './post.mapper';
import {
  Address,
  Company,
  Geo,
  Post,
  PostComment,
  User
} from '../types/content-wall.types';
import { MapperKeys } from './mappers.keys';
import { createUserMetadata } from './user.mapper';

export const mapper = createMapper({ strategyInitializer: pojos() });
export const registerMappers = () => {
  //Post Mapper
  createPostMetadata();
  createMap<PostApiResponse, Post>(
    mapper,
    MapperKeys.PostApiResponse,
    MapperKeys.Post
  );
  //Comment Mapper
  createPostCommentMetadata();
  createMap<PostCommentApiResponse, PostComment>(
    mapper,
    MapperKeys.PostCommentApiResponse,
    MapperKeys.PostComment
  );
  // User Mapper
  createUserMetadata();
  createMap<GeoApiResponse, Geo>(
    mapper,
    MapperKeys.GeoApiResponse,
    MapperKeys.Geo
  );
  createMap<CompanyApiResponse, Company>(
    mapper,
    MapperKeys.CompanyApiResponse,
    MapperKeys.Company
  );
  createMap<AddressApiResponse, Address>(
    mapper,
    MapperKeys.AddressApiResponse,
    MapperKeys.Address
  );
  createMap<UserApiResponse, User>(
    mapper,
    MapperKeys.UserApiResponse,
    MapperKeys.User
  );
};

export const mapSinglePost = (post: PostApiResponse): Post => {
  return mapper.map(post, MapperKeys.PostApiResponse, MapperKeys.Post);
};

export const mapArrayPost = (posts: PostApiResponse[]): Post[] => {
  return mapper.mapArray(posts, MapperKeys.PostApiResponse, MapperKeys.Post);
};

export const mapSingleComment = (
  comment: PostCommentApiResponse
): PostComment => {
  return mapper.map(
    comment,
    MapperKeys.PostCommentApiResponse,
    MapperKeys.PostComment
  );
};

export const mapArrayComment = (
  comments: PostCommentApiResponse[]
): PostComment[] => {
  return mapper.mapArray(
    comments,
    MapperKeys.PostCommentApiResponse,
    MapperKeys.PostComment
  );
};

export const mapSingleUser = (user: UserApiResponse): User => {
  return mapper.map(user, MapperKeys.UserApiResponse, MapperKeys.User);
};

export const mapArrayUser = (users: UserApiResponse[]): User[] => {
  return mapper.mapArray(users, MapperKeys.UserApiResponse, MapperKeys.User);
};
