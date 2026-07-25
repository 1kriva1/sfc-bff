import { Component, Input } from '@angular/core';
import { CommonConstants, empty } from 'ngx-sfc-common';
import { LinkLocalization } from './link.localization';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'sfc-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss']
})
export class LinkComponent {

  // component
  Localization = LinkLocalization;

  /* Inputs */

  @Input()
  url: string = CommonConstants.EMPTY_STRING;

  @Input()
  label: string = LinkLocalization.DEFAULT_LABEL;

  @Input()
  icon?: IconDefinition | empty = null;

  /* End Inputs */
}
