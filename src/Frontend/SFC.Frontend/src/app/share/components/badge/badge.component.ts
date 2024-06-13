import { Component, HostBinding, Input } from '@angular/core';
import { IEnumModel } from '@core/types';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { BadgeConstants } from './badge.constants';

@Component({
  selector: 'sfc-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss']
})
export class BadgeComponent {

  @Input()
  model: IEnumModel<number> = { key: 0, value: 'Type', icon: faStar };

  @HostBinding('class')
  private get _type(): string {
    return `${BadgeConstants.TYPE_CLASS_PART}${this.model.key}`;
  }
}