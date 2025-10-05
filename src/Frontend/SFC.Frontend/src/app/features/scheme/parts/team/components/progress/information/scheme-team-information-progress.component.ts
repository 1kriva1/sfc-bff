import { Component, Input, OnInit } from '@angular/core';
import { CommonConstants } from 'ngx-sfc-common';
import { SchemeTeamInformationProgressLocalization } from './scheme-team-information-progress.localization';
import { EMPTY, map, Observable } from 'rxjs';
import { IFormProgressModel, IMapProgressModel, mapProgress } from '@share/utils/progress';
import { ISchemeTeamEditFormModel } from '../../edit/scheme-team-edit-form.model';

@Component({
    selector: 'sfc-scheme-team-information-progress',
    templateUrl: './scheme-team-information-progress.component.html',
    styleUrls: ['./scheme-team-information-progress.component.scss']
})
export class SchemeTeamInformationProgressComponent implements OnInit {

    // ngx-sfc-common
    CommonConstants = CommonConstants;

    // component
    Localization = SchemeTeamInformationProgressLocalization;

    /* Inputs */

    @Input()
    value$: Observable<ISchemeTeamEditFormModel> = EMPTY;

    /* End Inputs */

    /* Observables */

    public progress$: Observable<IFormProgressModel> = EMPTY;

    /* End Observables */

    ngOnInit(): void {
        this.progress$ = mapProgress(this.value$).pipe(map((model: IMapProgressModel) => model.progress));
    }
}