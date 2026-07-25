import { Component, OnInit } from '@angular/core';
import { ControlContainer, FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';
import { faAnglesLeft, faAnglesRight, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { any, ButtonType, CommonConstants, nameof, ReloadService } from 'ngx-sfc-common';
import { BaseErrorResponse } from '@core/models';
import { GameTeamPlayersEditLocalization } from './game-team-players-edit.localization';
import { getDataFromRouteRecursively, getFormGroup } from '@core/utils';
import { IGamePlayerSearchTableModel } from '@share/components';
import { GameTeamPlayersEditConstants } from './game-team-players-edit.constants';
import { IGameTeamCreatePageModel } from '../../../../models/game-team-create-page.model';
import { ActivatedRoute } from '@angular/router';
import { GameAction } from '@share/enums';
import { IGameTeamCreatePageFormModel } from '../../../../models/game-team-create-page-form.model';
import { GameTeamCreatePageEditComponent } from '../../game-team-create-page-edit.component';
import { GameTeamCreatePageConstants } from '../../../../game-team-create-page.constants';
import { GameTeamPlayersCurrentEditStoreService } from './components/current/services/game-team-players-current-edit-store.service';
import { GameTeamPlayersCurrentEditSelectService } from './components/current/services/game-team-players-current-edit-select.service';
import { IGameTeamPlayersEditFormModel } from './game-team-players-edit-form.model';
import { GameTeamPlayersGameSelectService } from '../../../../../../components/players/parts/game/game-team-players-game-select.service';
import { buildGameTeamPlayersFilterFormGroup } from '../../../../../../components/players/game-team-players.utils';

@Component({
    selector: 'sfc-game-team-players-edit',
    templateUrl: './game-team-players-edit.component.html',
    styleUrls: ['./game-team-players-edit.component.scss'],
    viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class GameTeamPlayersEditComponent<TFormValue extends IGameTeamCreatePageFormModel, TResponse extends BaseErrorResponse>
    extends GameTeamCreatePageEditComponent<TFormValue, TResponse>
    implements OnInit {

    // icons
    faQuestionCircle = faQuestionCircle;
    faAnglesLeft = faAnglesLeft;
    faAnglesRight = faAnglesRight;

    ButtonType = ButtonType;

    CommonConstants = CommonConstants;

    // component
    Localization = GameTeamPlayersEditLocalization;
    Constants = GameTeamPlayersEditConstants;

    /* Fields */

    public playersForm!: FormGroup;

    public predicateForm!: FormGroup;

    /* End Fields */

    /* Properties */

    public get model(): IGameTeamCreatePageModel {
        return getDataFromRouteRecursively<IGameTeamCreatePageModel>(this.route, GameTeamCreatePageConstants.RESOLVE_KEY)!;
    };

    public get actionDisabled(): boolean {
        return !any(this.gameTeamPlayersGameSelectService.value) && !any(this.gameTeamPlayersCurrentEditSelectService.selected);
    }

    /* End Properties */

    constructor(
        private route: ActivatedRoute,
        private reloadService: ReloadService,
        private gameTeamPlayersGameSelectService: GameTeamPlayersGameSelectService,
        private gameTeamPlayersCurrentEditSelectService: GameTeamPlayersCurrentEditSelectService,
        private gameTeamPlayersCurrentEditStoreService: GameTeamPlayersCurrentEditStoreService,
        parent: FormGroupDirective,
        formBuilder: FormBuilder) {
        super(parent, formBuilder);
    }

    ngOnInit(): void {
        this.predicateForm = buildGameTeamPlayersFilterFormGroup(this.formBuilder);
        this.playersForm = getFormGroup(nameof<IGameTeamCreatePageFormModel>('players'), this.form.controls)!;
    }

    public togglePlayers(): void {
        const gamePlayersSelected: IGamePlayerSearchTableModel[] = this.gameTeamPlayersGameSelectService.value,
            currentPlayersSelected: IGamePlayerSearchTableModel[] = this.gameTeamPlayersCurrentEditSelectService.selected;

        if (any(gamePlayersSelected)) {
            this.onAddPlayers(gamePlayersSelected);
        }

        if (any(currentPlayersSelected)) {
            this.onRemovePlayers(currentPlayersSelected);
        }
    }

    public onAddPlayers(models: IGamePlayerSearchTableModel[]): void {
        this.gameTeamPlayersCurrentEditStoreService.add(models);
        this.setPlayersFormValue();
        this.gameTeamPlayersGameSelectService.clear();
        this.reloadService.reload(GameAction.GamePlayer);
    }

    public onRemovePlayers(models: IGamePlayerSearchTableModel[]): void {
        this.gameTeamPlayersCurrentEditStoreService.remove(models);
        this.setPlayersFormValue();
        this.gameTeamPlayersCurrentEditSelectService.clear();
        this.reloadService.reload(GameAction.GamePlayer);
    }

    private setPlayersFormValue(): void {
        const formValue: IGameTeamPlayersEditFormModel = {
            ids: this.gameTeamPlayersCurrentEditStoreService.value.map(item => item.gamePlayer.id)
        };

        this.playersForm.setValue(formValue);
    }
}