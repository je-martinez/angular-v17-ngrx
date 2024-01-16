import { Component } from '@angular/core';
import { Flowbite } from '@infrastructure/decorators/flowbite';

@Component({
  selector: 'content-card-skeleton',
  standalone: true,
  imports: [],
  templateUrl: './content-card-skeleton.component.html',
  styleUrl: './content-card-skeleton.component.scss'
})
@Flowbite()
export class ContentCardSkeletonComponent {}
