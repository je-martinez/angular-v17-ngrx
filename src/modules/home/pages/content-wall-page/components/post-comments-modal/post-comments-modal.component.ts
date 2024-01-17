import { Component } from '@angular/core';
import { Flowbite } from '@infrastructure/decorators/flowbite';

@Component({
  selector: 'post-comments-modal',
  standalone: true,
  imports: [],
  templateUrl: './post-comments-modal.component.html',
  styleUrl: './post-comments-modal.component.scss'
})
@Flowbite()
export class PostCommentsModalComponent {}
