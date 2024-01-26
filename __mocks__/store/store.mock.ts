import { Store } from '@ngrx/store';
import { RootState } from '@store/modules/types/store.types';

export const generateMockStore = () => {
  const store = jasmine.createSpyObj<Store<RootState>>('Store', [
    'select',
    'dispatch'
  ]);
  store.select.and.returnValue(store);
  store.dispatch.and.returnValue();
  return store;
};
