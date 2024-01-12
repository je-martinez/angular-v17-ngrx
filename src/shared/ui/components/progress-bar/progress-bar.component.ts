import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'progress-bar',
  standalone: true,
  imports: [NgClass],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss'
})
export class ProgressBarComponent {
  @Input({ required: true }) color: string = 'bg-neutral-500';
}
