import { Component, Input } from '@angular/core';
import { faInfo } from '@fortawesome/free-solid-svg-icons';
import { Color, CommonConstants } from 'ngx-sfc-common';
import { IInfoPanelModel } from './info-panel.model';

@Component({
  selector: 'sfc-info-panel',
  templateUrl: './info-panel.component.html',
  styleUrls: ['./info-panel.component.scss']
})
export class InfoPanelComponent {

  /* Inputs */

  @Input()
  model: IInfoPanelModel = {
    background: Color.White_0,
    description: CommonConstants.EMPTY_STRING,
    icon: faInfo,
    iconBackground: Color.White_1,
    title: CommonConstants.EMPTY_STRING,
    value: 0
  };

  /* End Inputs */
}