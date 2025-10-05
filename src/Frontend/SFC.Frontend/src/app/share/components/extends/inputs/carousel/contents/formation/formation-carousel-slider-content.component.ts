import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { IFormationEnumModel } from '@share/services/enum/models/enum/formation-enum.model';
import { UIClass } from 'ngx-sfc-common';

@Component({
    selector: 'sfc-formation-carousel-slider-content',
    templateUrl: './formation-carousel-slider-content.component.html',
    styleUrls: ['./formation-carousel-slider-content.component.scss']
})
export class FormationCarouselSliderContentComponent implements OnInit {

    /* Inputs */

    @Input()
    formation!: IFormationEnumModel;

    @Input()
    @HostBinding('class.' + UIClass.Active)
    active: boolean = false;

    /* End Inputs */

    /* Properties */

    public rows: number[] = [];

    /* End Properties */

    ngOnInit(): void {
        this.rows = this.formation.value
            .slice(1)
            .map((value: number[]) => value.length);
    }
}