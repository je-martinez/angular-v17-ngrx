import { PojosMetadataMap } from '@automapper/pojos';
import { PostApiResponse } from '../types/content-wall.api.types';
import { Post } from '../types/content-wall.types';
import { MapperKeys } from './mappers.keys';

export function createPostMetadata() {
  PojosMetadataMap.create<PostApiResponse>(MapperKeys.PostApiResponse, {
    userId: Number,
    id: Number,
    title: String,
    body: String
  });

  PojosMetadataMap.create<Post>(MapperKeys.Post, {
    userId: Number,
    id: Number,
    title: String,
    body: String
  });
}
