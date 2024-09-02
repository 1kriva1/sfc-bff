import { Component, HostBinding, Input } from '@angular/core';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Direction, UIClass } from 'ngx-sfc-common';

@Component({
    selector: 'sfc-tab-label',
    templateUrl: './tab-label.component.html',
    styleUrls: ['./tab-label.component.scss']
})
export class TabLabelComponent {

    Direction = Direction;
    
    @Input()
    label?: string;

    @Input()
    icon?: IconDefinition;

    @Input()
    image: string | null = null;

    @Input()
    @HostBinding('class.' + UIClass.Selected)
    selected = false;

    @Input()
    delimeters: boolean = false;
}