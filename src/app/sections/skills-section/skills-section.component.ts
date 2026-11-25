import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Skill, UiLabels } from '../../data/portfolio.model';

@Component({
  selector: 'app-skills-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './skills-section.component.html',
  styleUrl: './skills-section.component.css',
})
export class SkillsSectionComponent {
  readonly skills = input.required<Skill[]>();
  readonly interestNote = input.required<string>();
  readonly ui = input.required<UiLabels>();
}
