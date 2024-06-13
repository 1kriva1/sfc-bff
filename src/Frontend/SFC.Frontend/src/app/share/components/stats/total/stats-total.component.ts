import { Component, Input } from '@angular/core';
import { getProgressColorDynamicallyFunc } from 'ngx-sfc-components';
import { ComponentSize, Direction } from 'ngx-sfc-common';

@Component({
    selector: 'sfc-stats-total',
    templateUrl: './stats-total.component.html',
    styleUrls: ['./stats-total.component.scss']
})
export class StatsTotalComponent {

    ComponentSize = ComponentSize;
    Direction = Direction;

    getProgressColorDynamicallyFunc = getProgressColorDynamicallyFunc;

    @Input()
    progress: number = 0;

    @Input()
    value: number = 0;

    @Input()
    total: number = 0;

    @Input()
    delimeter: boolean = false;    
}