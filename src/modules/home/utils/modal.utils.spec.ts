import { ModalUtils } from './modal.utils';

describe('getModalInstancebyId', () => {
  it('should return the correct modal instance', () => {
    const dummyElement = document.createElement('div');
    document.getElementById = jasmine
      .createSpy('HTML Element')
      .and.returnValue(dummyElement);
    const modalInstance = ModalUtils.getModalInstancebyId('dummy-id');
    expect(modalInstance).toBeTruthy();
  });

  it('should return null if no modal instance is found', () => {
    document.getElementById = jasmine
      .createSpy('HTML Element')
      .and.returnValue(null);
    const modalInstance = ModalUtils.getModalInstancebyId('dummy-id');
    expect(modalInstance).toBeNull();
  });
});
