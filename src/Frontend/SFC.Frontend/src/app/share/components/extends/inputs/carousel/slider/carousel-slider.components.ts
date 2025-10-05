import { Component, HostBinding, Input } from '@angular/core';
import { UIClass, Select } from 'ngx-sfc-common';

@Component({
    selector: 'sfc-carousel-slider',
    templateUrl: './carousel-slider.component.html',
    styleUrls: ['./carousel-slider.component.scss']
})
export class CarouselSliderComponent {

    /* Inputs */

    @Input()
    @HostBinding('class.' + Select.Multiple)
    multiple: boolean = false;

    @Input()
    @HostBinding('class.' + UIClass.Active)
    active: boolean = false;

    /* End Inputs */
}