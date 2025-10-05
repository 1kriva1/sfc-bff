import { Component, Input, OnInit } from '@angular/core';
import { CommonConstants } from 'ngx-sfc-common';
import { TeamInformationProgressLocalization } from './team-information-progress.localization';
import { ITeamEditFormModel } from '../../edit/team-edit-form.model';
import { EMPTY, map, Observable } from 'rxjs';
import { IFormProgressModel, IMapProgressModel, mapProgress } from '@share/utils/progress';

@Component({
    selector: 'sfc-team-information-progress',
    templateUrl: './team-information-progress.component.html',
    styleUrls: ['./team-information-progress.component.scss']
})
export class TeamInformationProgressComponent implements OnInit {

    // ngx-sfc-common
    CommonConstants = CommonConstants;

    // component
    Localization = TeamInformationProgressLocalization;

    /* Inputs */

    @Input()
    value$: Observable<ITeamEditFormModel> = EMPTY;

    /* End Inputs */

    /* Observables */

    public progress$: Observable<IFormProgressModel> = EMPTY;

    /* End Observables */

    ngOnInit(): void {
        this.progress$ = mapProgress(this.value$).pipe(map((model: IMapProgressModel) => model.progress));
    }
}