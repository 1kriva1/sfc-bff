import { Component, Input, OnInit } from '@angular/core';
import { CommonConstants } from 'ngx-sfc-common';
import { EMPTY, map, Observable } from 'rxjs';
import { mapArrayProgressValue, mapProgressValue } from '@share/utils/progress';
import { GameTeamEditProgressLocalization } from './game-team-edit-progress.localization';
import { IGameTeamEditProgressViewModel } from './game-team-edit-progress-view.model';
import { IGameTeamCreatePageFormModel } from '../../../../../../models/game-team-create-page-form.model';

@Component({
    selector: 'sfc-game-team-edit-progress',
    templateUrl: './game-team-edit-progress.component.html',
    styleUrls: ['./game-team-edit-progress.component.scss']
})
export class GameTeamEditProgressComponent implements OnInit {

    // ngx-sfc-common
    CommonConstants = CommonConstants;

    // component
    Localization = GameTeamEditProgressLocalization;

    /* Inputs */

    @Input()
    value$: Observable<IGameTeamCreatePageFormModel> = EMPTY;

    /* End Inputs */

    /* Observables */

    public progress$: Observable<IGameTeamEditProgressViewModel> = EMPTY;

    /* End Observables */

    ngOnInit(): void {
        this.progress$ = this.value$.pipe(map((value: IGameTeamCreatePageFormModel) => {
            return {
                general: mapProgressValue(value.profile.general),
                inventary: mapProgressValue(value.profile.inventary),
                players: mapArrayProgressValue(value.players.ids || [])
            }
        }));
    }
}