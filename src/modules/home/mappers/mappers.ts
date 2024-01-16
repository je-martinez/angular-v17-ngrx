import { createMap, createMapper } from '@automapper/core';
import { pojos } from '@automapper/pojos';
import {
  PostApiResponse,
  PostCommentApiResponse
} from '../types/content-wall.api.types';
import { createPostCommentMetadata } from './comment.mapper';
import { createPostMetadata } from './post.mapper';
import { Post, PostComment } from '../types/content-wall.types';
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
  createMap<PostCommentApiResponse, PostComment>(
    mapper,
    MapperKeys.UserApiResponse,
    MapperKeys.User
  );
};
