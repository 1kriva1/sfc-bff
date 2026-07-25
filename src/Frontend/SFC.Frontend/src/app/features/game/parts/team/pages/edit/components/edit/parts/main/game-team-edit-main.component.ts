import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, ControlContainer, FormBuilder, FormGroupDirective } from '@angular/forms';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { Observable, startWith, EMPTY, switchMap, filter, tap } from 'rxjs';
import { empty, nameof, Direction, ButtonType, NotificationType } from 'ngx-sfc-common';
import { CoreConstants } from '@core/constants';
import { buildPreviewValue, convertFileToBase64StringAsync, getClickObservableFromElementReference, getControl, getDataFromRouteRecursively } from '@core/utils';
import { CoreLocalization } from '@core/localization';
import { EnumService } from '@share/services';
import { formatDate } from '@angular/common';
import { Locale, RouteKey } from '@core/enums';
import { StorageService } from '@core/services';
import { getPlayersRaiting } from '@share/utils';
import { GameTeamEditMainConstants } from './game-team-edit-main.constants';
import { IGameTeamInfoModel } from '@share/components';
import { ActivatedRoute } from '@angular/router';
import { faCalendar, faClock } from '@fortawesome/free-regular-svg-icons';
import { CommonConstants } from 'ngx-sfc-common';
import { GameRoute } from '@share/enums';
import { IGameTeamEditMainViewModel } from './models/game-team-edit-main-view.model';
import { BaseErrorResponse } from '@core/models';
import { ITeamPlayerModel } from '@share/models';
import { IGameTeamEditPageFormModel } from '../../../../models/game-team-edit-page-form.model';
import { GameTeamEditPageEditComponent } from '../../game-team-edit-page-edit.component';
import { GameTeamEditMainLocalization } from './game-team-edit-main.localization';
import { GameTeamEditPageConstants } from '../../../../game-team-edit-page.constants';
import { IGameTeamGeneralProfileEditFormModel } from '../../../../../../components/edit/parts/profile/parts/general/game-team-general-profile-edit-form.model';
import { IGameTeamProfileEditFormModel } from '../../../../../../components/edit/parts/profile/game-team-profile-edit-form.model';
import { IGameTeamEditPageModel } from '../../../../models/game-team-edit-page.model';

@Component({
    selector: 'sfc-game-team-edit-main',
    templateUrl: './game-team-edit-main.component.html',
    styleUrls: ['./game-team-edit-main.component.scss'],
    viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class GameTeamEditMainComponent<TFormValue extends IGameTeamEditPageFormModel, TResponse extends BaseErrorResponse>
    extends GameTeamEditPageEditComponent<TFormValue, TResponse>
    implements OnInit, AfterViewInit {

    // icons
    faLink = faLink;
    faCalendar = faCalendar;
    faClock = faClock;

    // ngx-sfc-common
    Direction = Direction;
    ButtonType = ButtonType;
    NotificationType = NotificationType;

    // component
    Constants = GameTeamEditMainConstants;
    Localization = GameTeamEditMainLocalization;

    /* Inputs */

    @Input()
    submitDisabled: boolean = false;

    @Input()
    submitButtonText: string = CommonConstants.EMPTY_STRING;

    @Input()
    buildSubmitObservable: (value: TFormValue) => Observable<TResponse> = () => EMPTY;

    /* End Inputs */

    /* Outputs */

    @Output()
    postSubmit: EventEmitter<TResponse> = new EventEmitter<TResponse>();

    /* End Outputs */

    /* Fields */

    private locale!: Locale;

    public viewModel!: IGameTeamEditMainViewModel;

    public gameLink: string = CommonConstants.EMPTY_STRING;

    /* End Fields */

    /* Properties */

    public get model(): IGameTeamEditPageModel {
        return getDataFromRouteRecursively<IGameTeamEditPageModel>(this.route, GameTeamEditPageConstants.RESOLVE_KEY)!;
    };

    /* End Properties */

    /* Observables */

    public gameTeamInfoModel$: Observable<IGameTeamInfoModel> = EMPTY;

    public result$: Observable<BaseErrorResponse> = EMPTY;

    /* End Observables */

    /* View */

    @ViewChild('submitButton', { static: false, read: ElementRef })
    private submitButton: ElementRef | undefined;

    /* End View */

    constructor(
        private route: ActivatedRoute,
        private enumService: EnumService,
        private storageService: StorageService,
        parent: FormGroupDirective,
        formBuilder: FormBuilder) {
        super(parent, formBuilder);
        this.locale = this.storageService.get<Locale>(CoreConstants.LOCALE_KEY, Locale.English)!;
    }

    ngOnInit(): void {
        const generalProfileControl: AbstractControl | empty = getControl(nameof<IGameTeamProfileEditFormModel>('general'), this.controls);

        if (generalProfileControl) {
            this.gameTeamInfoModel$ = generalProfileControl.valueChanges.pipe(startWith(this.value.profile.general)).pipe(
                switchMap((value: IGameTeamGeneralProfileEditFormModel) => {
                    return this.buildTeamInfoModel(value, this.model.gameTeam.gameTeam.team?.players!);
                })
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

        this.gameLink = `/${GameRoute.Games}/${this.model.game.game.id}/${RouteKey.Edit}`;
    }

    ngAfterViewInit(): void {
        if (this.submitButton) {
            const formValueChanges: Observable<TFormValue> = this.form.valueChanges.pipe(startWith(this.value)),
                submit$: Observable<InputEvent> = getClickObservableFromElementReference(this.submitButton);

            this.result$ = formValueChanges.pipe(
                switchMap((value: TFormValue) => {
                    return submit$.pipe(
                        filter(() => this.form.valid),
                        switchMap(() => this.buildSubmitObservable(value)),
                        tap((result) => this.postSubmit.emit(result))
                    );
                }));
        }
    }

    private async buildTeamInfoModel(value: IGameTeamGeneralProfileEditFormModel, players: ITeamPlayerModel[])
        : Promise<IGameTeamInfoModel> {
        const rating: number = getPlayersRaiting(players.map(item => item.player));

        return {
            name: buildPreviewValue(value.name, CoreLocalization.NOMENCLATURE),
            logo: await convertFileToBase64StringAsync(value.logo),
            tags: value.tags,
            status: this.model.gameTeam.gameTeam.status,
            raiting: rating
        };
    }
}