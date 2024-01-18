import { Component, OnInit } from '@angular/core';
import { Flowbite } from './flowbite';
import { NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'mock-flowbite',
  // an existing module is imported directly into a standalone component
  imports: [NgIf],
  template: `
    ...
    <p class="text-xs text-gray-900 dark:text-white">Hi! I'm a component</p>

    @if (showModal) {
      <!-- Modal toggle -->
      <button
        data-modal-target="default-modal"
        data-modal-toggle="default-modal"
        class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button">
        Toggle modal
      </button>

      <!-- Main modal -->
      <div
        id="default-modal"
        tabindex="-1"
        aria-hidden="true"
        class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div class="relative p-4 w-full max-w-2xl max-h-full">
          <!-- Modal content -->
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <!-- Modal header -->
            <div
              class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"></div>
            <!-- Modal body -->
            <div class="p-4 md:p-5 space-y-4"></div>
            <!-- Modal footer -->
            <div
              class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600"></div>
          </div>
        </div>
      </div>
    }
  `
})
@Flowbite()
export class MockFlowbiteComponent implements OnInit {
  showModal: boolean = false;
  ngOnInit(): void {
    console.log('MockFlowbiteComponent.ngOnInit');
  }
}
