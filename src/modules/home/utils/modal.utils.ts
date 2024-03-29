import { Modal } from 'flowbite';
import type { ModalOptions } from 'flowbite';

const getModalInstancebyId = (id: string, options?: ModalOptions) => {
  const $targetEl = document.getElementById(id);
  if ($targetEl) {
    const instanceOptions = {
      id: id,
      override: true
    };
    return new Modal($targetEl, options ?? {}, instanceOptions);
  }
  return null;
};

export const ModalUtils = {
  getModalInstancebyId
};
