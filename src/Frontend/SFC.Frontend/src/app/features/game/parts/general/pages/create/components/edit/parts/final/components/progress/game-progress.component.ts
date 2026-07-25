import { Component, Input, OnInit } from '@angular/core';
import { CommonConstants } from 'ngx-sfc-common';
import { EMPTY, map, Observable } from 'rxjs';
import { mapProgressValue } from '@share/utils/progress';
import { GameProgressLocalization } from './game-progress.localization';
import { IGameProgressViewModel } from './game-progress-view.model';
import { IGameCreatePageFormModel } from '../../../../../../game-create-page-form.model';

@Component({
    selector: 'sfc-game-progress',
    templateUrl: './game-progress.component.html',
    styleUrls: ['./game-progress.component.scss']
})
export class GameProgressComponent implements OnInit {

    // ngx-sfc-common
    CommonConstants = CommonConstants;

    // component
    Localization = GameProgressLocalization;

    /* Inputs */

    @Input()
    value$: Observable<IGameCreatePageFormModel> = EMPTY;

    /* End Inputs */

    /* Observables */

    public progress$: Observable<IGameProgressViewModel> = EMPTY;

    /* End Observables */

    ngOnInit(): void {
        this.progress$ = this.value$.pipe(map((value: IGameCreatePageFormModel) => {
            return {
                teams: mapProgressValue(value.teams),
                general: mapProgressValue(value.profile.general),
                inventary: mapProgressValue(value.profile.inventary),
                financial: mapProgressValue(value.profile.financial)
            }
        }));
    }
}