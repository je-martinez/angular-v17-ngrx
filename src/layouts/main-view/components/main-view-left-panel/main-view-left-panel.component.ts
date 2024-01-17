import { Component } from '@angular/core';
import { Flowbite } from '@infrastructure/decorators/flowbite';

@Component({
  selector: 'main-view-left-panel',
  standalone: true,
  imports: [],
  templateUrl: './main-view-left-panel.component.html',
  styleUrl: './main-view-left-panel.component.scss'
})
@Flowbite()
export class MainViewLeftPanelComponent {}
