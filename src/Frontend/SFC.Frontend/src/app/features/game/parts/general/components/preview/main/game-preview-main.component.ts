import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { map, Observable, startWith, EMPTY } from 'rxjs';
import { empty, nameof, convertDateToTimestamp, Direction } from 'ngx-sfc-common';
import { CoreConstants } from '@core/constants';
import { buildPreviewValue, getControl } from '@core/utils';
import { CoreLocalization } from '@core/localization';
import { IEnumModel } from '@core/types';
import { EnumService } from '@share/services';
import { formatDate } from '@angular/common';
import { Locale } from '@core/enums';
import { StorageService } from '@core/services';
import { GamePreviewMainLocalization } from './game-preview-main.localization';
import { getGameNewStatusEnum } from 'src/app/features/game/utils';
import { GamePreviewMainService } from './game-preview-main.service';
import { IGamePreviewMainModel } from './models/game-preview-main.model';
import { getTeamRaiting } from '@share/utils';
import { IGameGeneralProfileEditFormModel } from '../../edit/parts/profile/parts/general/game-general-profile-edit-form.model';
import { GamePreviewMainConstants } from './game-preview-main.constants';
import { ITeamInfoModel } from '@share/components';
import { ITeamModel } from '@share/models';
import { IGamePreviewMainViewModel } from './models/game-preview-main-view.model';

@Component({
    selector: 'sfc-game-preview-main',
    templateUrl: './game-preview-main.component.html',
    styleUrls: ['./game-preview-main.component.scss'],
})
export class GamePreviewMainComponent
    implements OnInit {

    // icons
    faQuestionCircle = faQuestionCircle;

    // ngx-sfc-common
    Direction = Direction;

    // core
    CoreLocalization = CoreLocalization;

    // component
    Constants = GamePreviewMainConstants;
    Localization = GamePreviewMainLocalization;

    /* Inputs */

    @Input()
    form!: FormGroup;

    /* End Inputs */

    /* Fields */

    public gameNewStatus: IEnumModel<number> = getGameNewStatusEnum(this.enumService.enums);

    private locale!: Locale;

    /* End Fields */

    /* Observables */

    public date$: Observable<string> = EMPTY;

    public from$: Observable<string> = EMPTY;

    public to$: Observable<string> = EMPTY;

    public teams$: Observable<IGamePreviewMainViewModel> = EMPTY;

    /* End Observables */

    constructor(
        public gamePreviewMainService: GamePreviewMainService,
        private enumService: EnumService,
        private storageService: StorageService) {
        this.locale = this.storageService.get<Locale>(CoreConstants.LOCALE_KEY, Locale.English)!;
    }

    ngOnInit(): void {
        const dateControl: AbstractControl | empty = getControl(nameof<IGameGeneralProfileEditFormModel>('date'), this.form.controls);

        if (dateControl) {
            this.date$ = dateControl.valueChanges.pipe(
                startWith(this.form.value.profile.general.date),
                map((value: Date) => buildPreviewValue(value ? formatDate(value, 'fullDate', this.locale) : value, CoreLocalization.Date))
            );
        }

        const fromControl: AbstractControl | empty = getControl(nameof<IGameGeneralProfileEditFormModel>('from'), this.form.controls);

        if (fromControl) {
            this.from$ = fromControl.valueChanges.pipe(
                startWith(this.form.value.profile.general.from),
                map((value: Date) => buildPreviewValue(value ? convertDateToTimestamp(value, this.locale) : value, CoreLocalization.FROM))
            );
        }

        const toControl: AbstractControl | empty = getControl(nameof<IGameGeneralProfileEditFormModel>('to'), this.form.controls);

        if (toControl) {
            this.to$ = toControl.valueChanges.pipe(
                startWith(this.form.value.profile.general.to),
                map((value: Date) => buildPreviewValue(value ? convertDateToTimestamp(value, this.locale) : value, CoreLocalization.TO))
            );
        }

        this.teams$ = this.gamePreviewMainService.value$.pipe(
            map((model: IGamePreviewMainModel) => {
                return {
                    teamA: this.buildTeamInfoModel(model.teamA),
                    teamB: this.buildTeamInfoModel(model.teamB)
                };
            })
        );
    }

    private buildTeamInfoModel(model: ITeamModel | empty): ITeamInfoModel {
        return {
            name: model?.profile.general.name,
            city: model?.profile.general.city,
            logo: model?.profile.general.logo,
            raiting: model ? getTeamRaiting(model) : 0
        };
    }
}