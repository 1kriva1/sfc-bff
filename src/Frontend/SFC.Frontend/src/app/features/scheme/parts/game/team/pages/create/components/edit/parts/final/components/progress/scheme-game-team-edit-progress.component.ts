import { Component, Input, OnInit } from '@angular/core';
import { CommonConstants } from 'ngx-sfc-common';
import { EMPTY, map, Observable } from 'rxjs';
import { mapArrayItemProgressValue, mapProgressValue } from '@share/utils/progress';
import { SchemeGameTeamEditProgressLocalization } from './scheme-game-team-edit-progress.localization';
import { ISchemeGameTeamEditProgressViewModel } from './scheme-game-team-edit-progress-view.model';
import { ISchemeGameTeamCreatePageFormModel } from '../../../../../../models/scheme-game-team-create-page-form.model';

@Component({
    selector: 'sfc-scheme-game-team-edit-progress',
    templateUrl: './scheme-game-team-edit-progress.component.html',
    styleUrls: ['./scheme-game-team-edit-progress.component.scss']
})
export class SchemeGameTeamEditProgressComponent implements OnInit {

    // ngx-sfc-common
    CommonConstants = CommonConstants;

    // component
    Localization = SchemeGameTeamEditProgressLocalization;

    /* Inputs */

    @Input()
    value$: Observable<ISchemeGameTeamCreatePageFormModel> = EMPTY;

    /* End Inputs */

    /* Observables */

    public progress$: Observable<ISchemeGameTeamEditProgressViewModel> = EMPTY;

    /* End Observables */

    ngOnInit(): void {
        this.progress$ = this.value$.pipe(map((value: ISchemeGameTeamCreatePageFormModel) => {
            return {
                general: mapProgressValue(value.profile.general),
                formation: mapArrayItemProgressValue(value.formation.field.players, (item) => item.player)
            }
        }));
    }
}