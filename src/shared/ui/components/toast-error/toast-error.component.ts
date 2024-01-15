import { Component, Input } from '@angular/core';

@Component({
  selector: 'toast-error',
  standalone: true,
  imports: [],
  templateUrl: './toast-error.component.html',
  styleUrl: './toast-error.component.scss'
})
export class ToastErrorComponent {
  @Input({ required: true }) public message: string = '';
}
