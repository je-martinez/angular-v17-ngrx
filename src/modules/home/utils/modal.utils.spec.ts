import { ModalUtils } from './modal.utils';

describe('getModalInstancebyId', () => {
  it('should return the correct modal instance', () => {
    const dummyElement = document.createElement('div');
    const documentSpy = spyOn(document, 'getElementById').and.returnValue(
      dummyElement
    );
    const modalInstance = ModalUtils.getModalInstancebyId('dummy-id');
    expect(modalInstance).toBeTruthy();
    documentSpy.calls.reset();
  });

  it('should return null if no modal instance is found', () => {
    const documentSpy = spyOn(document, 'getElementById').and.returnValue(null);
    const modalInstance = ModalUtils.getModalInstancebyId('dummy-id');
    expect(modalInstance).toBeNull();
    documentSpy.calls.reset();
  });
});
