import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { faLink, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { map, Observable, startWith, EMPTY, combineLatest } from 'rxjs';
import { empty, nameof, Direction, where } from 'ngx-sfc-common';
import { CoreConstants } from '@core/constants';
import { buildPreviewValue, getControl, getDataFromRouteRecursively } from '@core/utils';
import { CoreLocalization } from '@core/localization';
import { Locale } from '@core/enums';
import { StorageService } from '@core/services';
import { SchemeGameTeamPreviewLocalization } from './scheme-game-team-preview.localization';
import { getPlayersRaiting } from '@share/utils';
import { SchemeGameTeamPreviewConstants } from './scheme-game-team-preview.constants';
import { ISchemeGameTeamInfoModel } from '@share/components';
import { ActivatedRoute } from '@angular/router';
import { faCalendar, faClock } from '@fortawesome/free-regular-svg-icons';
import { ISchemeGameTeamCreatePageModel } from '../../models/scheme-game-team-create-page.model';
import { ISchemeGameTeamGeneralProfileEditFormModel } from '../../../../components/edit/parts/profile/parts/general/scheme-game-team-general-profile-edit-form.model';
import { ISchemeGameTeamProfileEditFormModel } from '../../../../components/edit/parts/profile/scheme-game-team-profile-edit-form.model';
import { ISchemeGameTeamFormationEditFormModel } from '../../../../components/edit/parts/formation/scheme-game-team-formation-edit-form.model';
import { ISchemeGameTeamEditFormModel } from '../../../../components/edit/scheme-game-team-edit-form.model';
import { SchemeGameTeamConstants } from '../../../../constants/scheme-game-team.constants';

@Component({
    selector: 'sfc-scheme-game-team-preview',
    templateUrl: './scheme-game-team-preview.component.html',
    styleUrls: ['./scheme-game-team-preview.component.scss'],
})
export class SchemeGameTeamPreviewComponent
    implements OnInit {

    // icons
    faQuestionCircle = faQuestionCircle;
    faLink = faLink;
    faCalendar = faCalendar;
    faClock = faClock;

    // ngx-sfc-common
    Direction = Direction;

    // core
    CoreLocalization = CoreLocalization;

    // component
    Constants = SchemeGameTeamPreviewConstants;
    Localization = SchemeGameTeamPreviewLocalization;

    /* Inputs */

    @Input()
    form!: FormGroup;

    /* End Inputs */

    /* Fields */

    private locale!: Locale;

    public get model(): ISchemeGameTeamCreatePageModel {
        return getDataFromRouteRecursively<ISchemeGameTeamCreatePageModel>(this.route, SchemeGameTeamConstants.ResolveKey)!;
    };

    /* End Fields */

    /* Observables */

    public name$: Observable<string> = EMPTY;

    public schemeGameTeamInfoModel$: Observable<ISchemeGameTeamInfoModel> = EMPTY;

    /* End Observables */

    constructor(
        private route: ActivatedRoute,
        private storageService: StorageService) {
        this.locale = this.storageService.get<Locale>(CoreConstants.LOCALE_KEY, Locale.English)!;
    }

    ngOnInit(): void {
        const nameControl: AbstractControl | empty = getControl(nameof<ISchemeGameTeamGeneralProfileEditFormModel>('name'), this.form.controls);

        if (nameControl) {
            this.name$ = nameControl.valueChanges.pipe(
                startWith(this.form.value.profile.general.name),
                map((value: string) => buildPreviewValue(value, CoreLocalization.NOMENCLATURE))
            );
        }

        const generalProfileControl: AbstractControl | empty = getControl(nameof<ISchemeGameTeamProfileEditFormModel>('general'), this.form.controls),
            formationControl: AbstractControl | empty = getControl(nameof<ISchemeGameTeamEditFormModel>('formation'), this.form.controls);

        if (generalProfileControl && formationControl) {
            this.schemeGameTeamInfoModel$ = combineLatest(
                [
                    generalProfileControl.valueChanges.pipe(startWith(this.form.value.profile.general)),
                    formationControl.valueChanges.pipe(startWith(this.form.value.formation))
                ]).pipe(
                    map(([general, formation]) => this.buildSchemeGameTeamInfoModel(general, formation))
                );
        }
    }

    private buildSchemeGameTeamInfoModel(general: ISchemeGameTeamGeneralProfileEditFormModel, formation: ISchemeGameTeamFormationEditFormModel)
        : ISchemeGameTeamInfoModel {
        const rating: number = getPlayersRaiting([]);

        return {
            name: buildPreviewValue(general.name, CoreLocalization.NOMENCLATURE),
            raiting: rating,
            formation: formation.formation,
            players: where(formation.field.players, item => !!item.player)?.length || 0
        };
    }
}