import { Component, Input } from '@angular/core';
import { IBackNavigationModel } from '@core/models';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { CommonConstants, empty } from 'ngx-sfc-common';
import { BackLocalization } from './back.localization';

@Component({
  selector: 'sfc-back',
  templateUrl: './back.component.html',
  styleUrls: ['./back.component.scss']
})
export class BackComponent {

  // icons
  faArrowLeft = faArrowLeft;

  // component
  Localization = BackLocalization;

  /* Inputs */

  @Input()
  model: IBackNavigationModel = {
    url: CommonConstants.EMPTY_STRING,
    label: BackLocalization.DEFAULT_LABEL
  };

  /* End Inputs */
}
