import { Component, Input, OnInit } from '@angular/core';
import { CommonConstants } from 'ngx-sfc-common';
import { EMPTY, map, Observable } from 'rxjs';
import { IFormProgressModel, IMapProgressModel, mapProgress } from '@share/utils/progress';
import { InviteTeamPlayerInformationProgressLocalization } from './invite-team-player-information-progress.localization';
import { IInviteTeamPlayerEditFormModel } from '../../edit/invite-team-player-edit-form.model';

@Component({
    selector: 'sfc-invite-team-player-information-progress',
    templateUrl: './invite-team-player-information-progress.component.html',
    styleUrls: ['./invite-team-player-information-progress.component.scss']
})
export class InviteTeamPlayerInformationProgressComponent implements OnInit {

    // ngx-sfc-common
    CommonConstants = CommonConstants;

    // component
    Localization = InviteTeamPlayerInformationProgressLocalization;

    /* Inputs */

    @Input()
    value$: Observable<IInviteTeamPlayerEditFormModel> = EMPTY;

    /* End Inputs */

    /* Observables */

    public progress$: Observable<IFormProgressModel> = EMPTY;

    /* End Observables */

    ngOnInit(): void {
        this.progress$ = mapProgress(this.value$).pipe(map((model: IMapProgressModel) => model.progress));
    }
}