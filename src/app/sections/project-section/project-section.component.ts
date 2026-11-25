import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Project, UiLabels } from '../../data/portfolio.model';
import { ProjectCardComponent } from './project-card/project-card.component';

@Component({
  selector: 'app-project-section',
  imports: [ProjectCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './project-section.component.html',
  styleUrl: './project-section.component.css',
})
export class ProjectSectionComponent {
  readonly projects = input.required<Project[]>();
  readonly ui = input.required<UiLabels>();
}
