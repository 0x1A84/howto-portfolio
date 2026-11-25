import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Project } from '../../../data/portfolio.model';

@Component({
  selector: 'app-project-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.css',
})
export class ProjectCardComponent {
  readonly project = input.required<Project>();
  readonly stackTitle = input.required<string>();
}
