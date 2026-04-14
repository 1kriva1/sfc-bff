import { Component, Input, OnInit } from '@angular/core';
import { CommonConstants } from 'ngx-sfc-common';
import { EMPTY, map, Observable } from 'rxjs';
import { mapProgressValue } from '@share/utils/progress';
import { GameEditProgressLocalization } from './game-edit-progress.localization';
import { IGameEditFormModel } from '../../edit/game-edit-form.model';
import { IGameEditProgressViewModel } from './game-edit-progress-view.model';

@Component({
    selector: 'sfc-game-edit-progress',
    templateUrl: './game-edit-progress.component.html',
    styleUrls: ['./game-edit-progress.component.scss']
})
export class GameEditProgressComponent implements OnInit {

    // ngx-sfc-common
    CommonConstants = CommonConstants;

    // component
    Localization = GameEditProgressLocalization;

    /* Inputs */

    @Input()
    value$: Observable<IGameEditFormModel> = EMPTY;

    /* End Inputs */

    /* Observables */

    public progress$: Observable<IGameEditProgressViewModel> = EMPTY;

    /* End Observables */

    ngOnInit(): void {
        this.progress$ = this.value$.pipe(map((value: IGameEditFormModel) => {
            return {
                teams: mapProgressValue(value.teams),
                general: mapProgressValue(value.profile.general),
                inventary: mapProgressValue(value.profile.inventary),
                financial: mapProgressValue(value.profile.financial)
            }
        }));
    }
}