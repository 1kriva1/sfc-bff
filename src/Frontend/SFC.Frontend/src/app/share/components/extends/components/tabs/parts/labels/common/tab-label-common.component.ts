import { Component, HostBinding, Input } from '@angular/core';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { UIClass } from 'ngx-sfc-common';

@Component({
    selector: 'sfc-tab-label-common',
    templateUrl: './tab-label-common.component.html',
    styleUrls: ['./tab-label-common.component.scss']
})
export class TabLabelCommonComponent {
    
    /* Inputs */

    @Input()
    label!: string;

    @Input()
    icon: IconDefinition | null = null;

    @Input()
    image: string | null = null;

    @Input()
    @HostBinding('class.' + UIClass.Selected)
    selected = false;

    /* End Inputs */
}