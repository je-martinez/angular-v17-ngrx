import { Router } from '@angular/router';

export const generateMockRouter = () => {
  const mockRouter = jasmine.createSpyObj<Router>('Router', ['navigate']);
  mockRouter.navigate.and.returnValue(Promise.resolve(true));
  return mockRouter;
};
