import { ContentService } from '@modules/home/services/content.service';
import { of, throwError } from 'rxjs';

export const generateMockContentService = ({
  onErrorGetPostsFromApi = false,
  onErrorGetCommentsFromApi = false,
  onErrorGetUsersFromApi = false
}): ContentService => {
  const service = jasmine.createSpyObj<ContentService>('ContentService', [
    'getPostsFromApi',
    'getCommentsFromApi',
    'getUsersFromApi'
  ]);
  if (onErrorGetPostsFromApi) {
    service.getPostsFromApi.and.returnValue(
      throwError(() => new Error('Oops! Something went wrong.'))
    );
  } else {
    service.getPostsFromApi.and.returnValue(of([]));
  }

  if (onErrorGetCommentsFromApi) {
    service.getCommentsFromApi.and.returnValue(
      throwError(() => new Error('Oops! Something went wrong.'))
    );
  } else {
    service.getCommentsFromApi.and.returnValue(of([]));
  }

  if (onErrorGetUsersFromApi) {
    service.getUsersFromApi.and.returnValue(
      throwError(() => new Error('Oops! Something went wrong.'))
    );
  } else {
    service.getUsersFromApi.and.returnValue(of([]));
  }

  return service;
};
