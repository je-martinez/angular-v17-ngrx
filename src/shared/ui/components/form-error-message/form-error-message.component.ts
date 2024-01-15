import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'form-error-message',
  standalone: true,
  imports: [NgIf],
  templateUrl: './form-error-message.component.html',
  styleUrl: './form-error-message.component.scss'
})
export class FormErrorMessageComponent {
  @Input() message: string | undefined = undefined;
}
