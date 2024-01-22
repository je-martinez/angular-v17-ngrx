import { mockComments } from '@mocks/data/comments.mock';
import { mockContent } from '@mocks/data/content.mock';
import { mockUsers } from '@mocks/data/users.mock';
import { ContentFacade } from '@store/modules/content/content.facade';
import { of } from 'rxjs';

export const generateMockContentFacade = ({
  loading = false
}): ContentFacade => {
  const facade = jasmine.createSpyObj<ContentFacade>(
    'ContentFacade',
    [
      'getPosts',
      'getComments',
      'getUsers',
      'getContentById',
      'clearContentById'
    ],
    [
      'loadingGetPosts$',
      'loadingGetComments$',
      'loadingGetUsers$',
      'posts$',
      'comments$',
      'users$',
      'content$',
      'showLoadingContent$',
      'contentById$'
    ]
  );
  Object.defineProperty(facade, 'content$', {
    value: of(mockContent)
  });
  Object.defineProperty(facade, 'comments$', {
    value: of(mockComments)
  });
  Object.defineProperty(facade, 'users$', {
    value: of(mockUsers)
  });
  Object.defineProperty(facade, 'contentById$', {
    value: of({ ...mockContent })
  });
  Object.defineProperty(facade, 'showLoadingContent$', {
    value: of(loading)
  });
  facade.getPosts.and.returnValue();
  facade.getComments.and.returnValue();
  facade.getUsers.and.returnValue();
  facade.getContentById.and.returnValue();
  facade.clearContentById.and.returnValue();
  return facade;
};
