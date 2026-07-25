import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { faLink, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { map, Observable, startWith, EMPTY, switchMap, combineLatest } from 'rxjs';
import { empty, nameof, Direction } from 'ngx-sfc-common';
import { CoreConstants } from '@core/constants';
import { buildPreviewValue, convertFileToBase64StringAsync, getControl, getDataFromRouteRecursively } from '@core/utils';
import { CoreLocalization } from '@core/localization';
import { EnumService } from '@share/services';
import { formatDate } from '@angular/common';
import { Locale, RouteKey } from '@core/enums';
import { StorageService } from '@core/services';
import { GameTeamPreviewLocalization } from './game-team-preview.localization';
import { IGameTeamPreviewViewModel } from './game-team-preview-view.model';
import { getTeamTemporaryStatusEnum, getPlayersRaiting } from '@share/utils';
import { GameTeamPreviewConstants } from './game-team-preview.constants';
import { IGamePlayerSearchTableModel, IGameTeamInfoModel } from '@share/components';
import { ActivatedRoute } from '@angular/router';
import { faCalendar, faClock } from '@fortawesome/free-regular-svg-icons';
import { CommonConstants } from 'ngx-sfc-common';
import { Route } from '@share/enums';
import { IGameTeamCreatePageModel } from '../../models/game-team-create-page.model';
import { GameTeamCreatePageConstants } from '../../game-team-create-page.constants';
import { IGameTeamGeneralProfileEditFormModel } from '../../../../components/edit/parts/profile/parts/general/game-team-general-profile-edit-form.model';
import { IGameTeamProfileEditFormModel } from '../../../../components/edit/parts/profile/game-team-profile-edit-form.model';
import { GameTeamPlayersCurrentEditStoreService } from '../edit/parts/players/components/current/services/game-team-players-current-edit-store.service';

@Component({
    selector: 'sfc-game-team-preview',
    templateUrl: './game-team-preview.component.html',
    styleUrls: ['./game-team-preview.component.scss'],
})
export class GameTeamPreviewComponent
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
    Constants = GameTeamPreviewConstants;
    Localization = GameTeamPreviewLocalization;

    /* Inputs */

    @Input()
    form!: FormGroup;

    /* End Inputs */

    /* Fields */

    private locale!: Locale;

    public get model(): IGameTeamCreatePageModel {
        return getDataFromRouteRecursively<IGameTeamCreatePageModel>(this.route, GameTeamCreatePageConstants.RESOLVE_KEY)!;
    };

    public viewModel!: IGameTeamPreviewViewModel;

    public gameLink: string = CommonConstants.EMPTY_STRING;

    /* End Fields */

    /* Observables */

    public name$: Observable<string> = EMPTY;

    public gameTeamInfoModel$: Observable<IGameTeamInfoModel> = EMPTY;

    /* End Observables */

    constructor(
        private gameTeamPlayersCurrentEditStoreService: GameTeamPlayersCurrentEditStoreService,
        private route: ActivatedRoute,
        private enumService: EnumService,
        private storageService: StorageService) {
        this.locale = this.storageService.get<Locale>(CoreConstants.LOCALE_KEY, Locale.English)!;
    }

    ngOnInit(): void {
        const nameControl: AbstractControl | empty = getControl(nameof<IGameTeamGeneralProfileEditFormModel>('name'), this.form.controls);

        if (nameControl) {
            this.name$ = nameControl.valueChanges.pipe(
                startWith(this.form.value.profile.general.name),
                map((value: string) => buildPreviewValue(value, CoreLocalization.NOMENCLATURE))
            );
        }

        const generalProfileControl: AbstractControl | empty = getControl(nameof<IGameTeamProfileEditFormModel>('general'), this.form.controls);

        if (generalProfileControl) {
            this.gameTeamInfoModel$ = combineLatest(
                [
                    generalProfileControl.valueChanges.pipe(startWith(this.form.value.profile.general)),
                    this.gameTeamPlayersCurrentEditStoreService.value$
                ]).pipe(
                    switchMap(([value, players]) => this.buildTeamInfoModel(value, players))
                );
        }

        this.viewModel = {
            game: {
                name: this.model.game.game.profile.general.name,
                date: formatDate(this.model.game.game.profile.general.date, 'fullDate', this.locale),
                from: this.model.game.game.profile.general.from,
                to: this.model.game.game.profile.general.to,
            }
        };

        this.gameLink = `/${Route.Games}/${this.model.game.game.id}/${RouteKey.Edit}`;
    }

    private async buildTeamInfoModel(value: IGameTeamGeneralProfileEditFormModel, players: IGamePlayerSearchTableModel[])
        : Promise<IGameTeamInfoModel> {
        const rating: number = getPlayersRaiting(players.map(item => item.gamePlayer.player!));

        return {
            name: buildPreviewValue(value.name, CoreLocalization.NOMENCLATURE),
            logo: await convertFileToBase64StringAsync(value.logo),
            tags: value.tags,
            status: getTeamTemporaryStatusEnum(this.enumService.enums).key,
            raiting: rating
        };
    }
}