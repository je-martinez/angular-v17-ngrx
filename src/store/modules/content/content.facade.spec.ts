import { TestBed } from '@angular/core/testing';
import { generateMockStore } from '@mocks/store/store.mock';
import { Store } from '@ngrx/store';
import { RootState } from '../types/store.types';
import { ContentActions } from './content.actions';
import { ContentFacade } from './content.facade';

describe('ContentFacade', () => {
  let service: ContentFacade;
  // eslint-disable-next-line @ngrx/no-typed-global-store
  let store: Store<RootState>;
  beforeEach(() => {
    store = generateMockStore();
    TestBed.configureTestingModule({
      providers: [
        ContentFacade,
        {
          provide: Store<RootState>,
          useValue: store
        }
      ]
    });
    service = TestBed.inject(ContentFacade);
  });
  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should dispatch get post actions', () => {
    service.getPosts();
    expect(store.dispatch).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith(ContentActions.getPosts());
  });

  it('should dispatch get comments action', () => {
    service.getComments();
    expect(store.dispatch).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith(ContentActions.getComments());
  });

  it('should dispatch get users action', () => {
    service.getUsers();
    expect(store.dispatch).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith(ContentActions.getUsers());
  });

  it('should dispatch get content by id action', () => {
    const input = 1;
    service.getContentById(input);
    expect(store.dispatch).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith(
      ContentActions.getContentById({ data: input })
    );
  });

  it('should dispatch sign out', () => {
    service.clearContentById();
    expect(store.dispatch).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith(
      ContentActions.clearContentId()
    );
  });
});
