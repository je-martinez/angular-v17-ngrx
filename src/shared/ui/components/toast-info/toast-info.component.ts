import { Component, Input } from '@angular/core';

@Component({
  selector: 'toast-info',
  standalone: true,
  imports: [],
  templateUrl: './toast-info.component.html',
  styleUrl: './toast-info.component.scss'
})
export class ToastInfoComponent {
  @Input({ required: true }) public message: string = '';
}
