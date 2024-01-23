import { createRootState } from '@mocks/store/state.mock';
import {
  selectComments,
  selectContent,
  selectContentById,
  selectContentId,
  selectContentState,
  selectEmptyData,
  selectLoadingContent,
  selectLoadingGetComments,
  selectLoadingGetPosts,
  selectLoadingGetUsers,
  selectPosts,
  selectShowLoadingContent,
  selectUsers
} from './content.selectors';
import { Content } from '@modules/home/types/content-wall.types';

describe('Content Selectors', () => {
  it('should select the feature state', () => {
    const state = createRootState();
    const result = selectContentState(state);
    expect(result).toEqual(state.content);
  });
  it('should select the loading get posts state', () => {
    const state = createRootState();
    const result = selectLoadingGetPosts(state);
    expect(result).toEqual(state.content.loadingGetPosts);
  });

  it('should select the loading get comments state', () => {
    const state = createRootState();
    const result = selectLoadingGetComments(state);
    expect(result).toEqual(state.content.loadingGetComments);
  });

  it('should select the loading get users state', () => {
    const state = createRootState();
    const result = selectLoadingGetUsers(state);
    expect(result).toEqual(state.content.loadingGetUsers);
  });

  it('should select the posts on the state', () => {
    const state = createRootState();
    const result = selectPosts(state);
    expect(result).toEqual(state.content.posts);
  });

  it('should select the comments on the state', () => {
    const state = createRootState();
    const result = selectComments(state);
    expect(result).toEqual(state.content.comments);
  });

  it('should select the users on the state', () => {
    const state = createRootState();
    const result = selectUsers(state);
    expect(result).toEqual(state.content.users);
  });

  it('should select the empty data on the state', () => {
    const state = createRootState();
    const { posts, comments, users } = state.content;
    const expected = !posts?.length || !comments?.length || !users?.length;
    const result = selectEmptyData(state);
    expect(result).toEqual(expected);
  });

  it('should select the loading content on the state', () => {
    const state = createRootState();
    const loadingGetPosts = selectLoadingGetPosts(state);
    const loadingGetComments = selectLoadingGetComments(state);
    const loadingGetUsers = selectLoadingGetUsers(state);
    const expected = loadingGetPosts || loadingGetComments || loadingGetUsers;
    const result = selectLoadingContent(state);
    expect(result).toEqual(expected);
  });

  it('should select show loading content on the state', () => {
    const state = createRootState();
    state.content.loadingGetComments = true;
    state.content.posts = [];
    state.content.comments = [];
    state.content.users = [];
    const emptyData = selectEmptyData(state);
    const loadingContent = selectLoadingContent(state);
    const expected = emptyData && loadingContent;
    const result = selectShowLoadingContent(state);
    expect(result).toEqual(expected);
  });

  it('should select content on the state', () => {
    const state = createRootState();
    const posts = selectPosts(state);
    const comments = selectComments(state);
    const users = selectUsers(state);

    const expected = posts
      ?.map((post) => {
        return {
          ...post,
          comments: comments?.filter((comment) => comment?.postId === post?.id),
          user: users.find((user) => user?.id === post?.userId)
        };
      })
      .sort(
        (a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)
      ) as Content[];

    const result = selectContent(state);

    expect(result).toEqual(expected);
  });

  it('should select content on the state', () => {
    const state = createRootState();
    state.content.contentId = state.content.posts[0]?.id;
    const result = selectContentId(state);
    expect(result).toEqual(state.content.contentId);
  });

  it('should select content by id on the state', () => {
    const state = createRootState();
    const posts = selectPosts(state);
    const comments = selectComments(state);
    const users = selectUsers(state);
    const id = posts[0]?.id;
    state.content.contentId = id;
    const expected = posts
      ?.map((post) => {
        return {
          ...post,
          comments: comments?.filter((comment) => comment?.postId === post?.id),
          user: users.find((user) => user?.id === post?.userId)
        };
      })
      .sort(
        (a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)
      ) as Content[];
    const content = expected.find((post) => post.id === id);
    const result = selectContentById(state);
    expect(result).toEqual(content);
  });
});
