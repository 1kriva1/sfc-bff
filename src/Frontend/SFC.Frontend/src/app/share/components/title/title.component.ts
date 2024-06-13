import { Component, Input } from '@angular/core';
import { IconDefinition } from '@fortawesome/free-regular-svg-icons';
import { empty } from 'ngx-sfc-common';

@Component({
  selector: 'sfc-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent {

  @Input()
  label!: string;

  @Input()
  description!: string;

  @Input()
  tooltip: string | empty;

  @Input()
  icon: IconDefinition | null = null;

  @Input()
  delimeter: boolean = true;
}
