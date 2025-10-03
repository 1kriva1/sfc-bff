import { Component, Input } from '@angular/core';
import { IconDefinition } from '@fortawesome/free-regular-svg-icons';
import { CommonConstants, empty } from 'ngx-sfc-common';

@Component({
  selector: 'sfc-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent {

  // ngx-sfc-common
  CommonConstants = CommonConstants;

  /* Inputs */

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

  @Input()
  collapseExpand: boolean = false;

  /* End Inputs */

  /* Properties */

  public expand: boolean = true;

  /* End Properties */
}
