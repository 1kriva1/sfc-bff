import { Component, HostBinding, Input } from '@angular/core';
import { IEnumModel } from '@core/types';
import { UIClass } from 'ngx-sfc-common';

@Component({
    selector: 'sfc-shirt-carousel-slider-content',
    templateUrl: './shirt-carousel-slider-content.component.html',
    styleUrls: ['./shirt-carousel-slider-content.component.scss']
})
export class ShirtCarouselSliderContentComponent {

    @Input()
    shirt!: IEnumModel<number>;

    @Input()
    @HostBinding('class.' + UIClass.Active)
    active: boolean = false;
}