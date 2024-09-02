import { Component, HostBinding, Input } from '@angular/core';
import { UIClass } from 'ngx-sfc-common';

@Component({
    selector: 'sfc-carousel-slider',
    templateUrl: './carousel-slider.component.html',
    styleUrls: ['./carousel-slider.component.scss']
})
export class CarouselSliderComponent {

    @Input()
    @HostBinding('class.' + UIClass.Active)
    active: boolean = false;

    @Input()
    @HostBinding('class.' + UIClass.Disabled)
    disabled: boolean = false;
}