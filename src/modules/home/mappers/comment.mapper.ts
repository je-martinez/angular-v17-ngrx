import { PojosMetadataMap } from '@automapper/pojos';
import { PostCommentApiResponse } from '../types/content-wall.api.types';
import { PostComment } from '../types/content-wall.types';
import { MapperKeys } from './mappers.keys';

export function createPostCommentMetadata() {
  PojosMetadataMap.create<PostCommentApiResponse>(
    MapperKeys.PostCommentApiResponse,
    {
      postId: Number,
      id: Number,
      name: String,
      email: String,
      body: String
    }
  );

  PojosMetadataMap.create<PostComment>(MapperKeys.PostComment, {
    postId: Number,
    id: Number,
    name: String,
    email: String,
    body: String,
    createdAt: Date
  });
}
