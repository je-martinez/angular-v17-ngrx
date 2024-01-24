import { ContentService } from '@modules/home/services/content.service';
import { of } from 'rxjs';

export const generateMockContentService = (): ContentService => {
  const service = jasmine.createSpyObj<ContentService>('ContentService', [
    'getPostsFromApi',
    'getCommentsFromApi',
    'getUsersFromApi'
  ]);
  service.getPostsFromApi.and.returnValue(of([]));
  service.getCommentsFromApi.and.returnValue(of([]));
  service.getUsersFromApi.and.returnValue(of([]));
  return service;
};
