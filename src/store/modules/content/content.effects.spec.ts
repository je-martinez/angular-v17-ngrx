import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, take } from 'rxjs';

import { generateMockLogger } from '@mocks/core/logger.mock';
import { generateMockContentService } from '@mocks/services/content.service.mock';
import { ContentService } from '@modules/home/services/content.service';
import { LoggerModule, NGXLogger, NgxLoggerLevel } from 'ngx-logger';
import { ContentActions } from './content.actions';
import { ContentEffects } from './content.effects';

describe('ContentEffects', () => {
  let actions$: Observable<any>;

  const setup = async ({
    onErrorGetPostsFromApi = false,
    onErrorGetCommentsFromApi = false,
    onErrorGetUsersFromApi = false
  }) => {
    const service = generateMockContentService({
      onErrorGetPostsFromApi,
      onErrorGetCommentsFromApi,
      onErrorGetUsersFromApi
    });
    const logger = generateMockLogger();
    const mockActions = provideMockActions(() => actions$);

    await TestBed.configureTestingModule({
      imports: [
        LoggerModule.forRoot({
          level: NgxLoggerLevel.DEBUG,
          serverLogLevel: NgxLoggerLevel.ERROR
        })
      ],
      providers: [
        ContentEffects,
        {
          provide: ContentService,
          useValue: service
        },
        {
          provide: NGXLogger,
          useValue: logger
        },
        mockActions
      ]
    });

    const effects = TestBed.inject(ContentEffects);

    return { effects, service, logger };
  };

  it('should be created', async () => {
    const { effects } = await setup({});
    expect(effects).toBeTruthy();
  });

  it('should executed get posts actions workflow [Success]', fakeAsync(async () => {
    const { effects, service, logger } = await setup({});

    actions$ = of(ContentActions.getPosts());

    effects.getPosts$.pipe(take(1)).subscribe();

    tick(1500);

    expect(service.getPostsFromApi).toHaveBeenCalled();
    expect(logger.error).not.toHaveBeenCalled();
  }));

  it('should executed get posts actions workflow [Failure]', fakeAsync(async () => {
    const { effects, service, logger } = await setup({
      onErrorGetPostsFromApi: true
    });

    actions$ = of(ContentActions.getPosts());

    effects.getPosts$.pipe(take(1)).subscribe();

    tick(1500);

    expect(service.getPostsFromApi).toHaveBeenCalled();
    expect(logger.error).toHaveBeenCalled();
  }));

  it('should executed get comments actions workflow [Success]', fakeAsync(async () => {
    const { effects, service, logger } = await setup({});

    actions$ = of(ContentActions.getComments());

    effects.getComments$.pipe(take(1)).subscribe();

    tick(1500);

    expect(service.getCommentsFromApi).toHaveBeenCalled();
    expect(logger.error).not.toHaveBeenCalled();
  }));

  it('should executed get comments actions workflow [Failure]', fakeAsync(async () => {
    const { effects, service, logger } = await setup({
      onErrorGetCommentsFromApi: true
    });

    actions$ = of(ContentActions.getComments());

    effects.getComments$.pipe(take(1)).subscribe();

    tick(1500);

    expect(service.getCommentsFromApi).toHaveBeenCalled();
    expect(logger.error).toHaveBeenCalled();
  }));

  it('should executed get users actions workflow [Success]', fakeAsync(async () => {
    const { effects, service, logger } = await setup({});

    actions$ = of(ContentActions.getUsers());

    effects.getUsers$.pipe(take(1)).subscribe();

    tick(1500);

    expect(service.getUsersFromApi).toHaveBeenCalled();
    expect(logger.error).not.toHaveBeenCalled();
  }));

  it('should executed get users actions workflow [Failure]', fakeAsync(async () => {
    const { effects, service, logger } = await setup({
      onErrorGetUsersFromApi: true
    });

    actions$ = of(ContentActions.getUsers());

    effects.getUsers$.pipe(take(1)).subscribe();

    tick(1500);

    expect(service.getUsersFromApi).toHaveBeenCalled();
    expect(logger.error).toHaveBeenCalled();
  }));
});
