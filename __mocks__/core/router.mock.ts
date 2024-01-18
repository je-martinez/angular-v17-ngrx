import { Router } from '@angular/router';

export const mockRouter = jasmine.createSpyObj<Router>('this', ['navigate']);
mockRouter.navigate.and.returnValue(Promise.resolve(true));
