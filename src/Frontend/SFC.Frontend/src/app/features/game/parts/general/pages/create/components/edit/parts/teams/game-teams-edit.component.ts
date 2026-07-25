import { Component, OnInit } from '@angular/core';
import { ControlContainer, FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';
import { faA, faB, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { nameof } from 'ngx-sfc-common';
import { AvatarInputTemplate, IAvatarInputModalContextModel, IAvatarInputModalEventModel, IAvatarInputModel } from 'ngx-sfc-inputs';
import { CoreConstants } from '@core/constants';
import { BaseErrorResponse } from '@core/models';
import { ValidationLocalization } from '@share/localization';
import { CoreLocalization } from '@core/localization';
import { ITeamModel } from '@share/models';
import { GameTeamsEditLocalization } from './game-teams-edit.localization';
import { GameTeamsEditConstants } from './game-teams-edit.constants';
import { getFormGroup } from '@core/utils';
import { IAvatarInputTeamsModalBodyEventModel } from '@share/components';
import { GameCreatePageEditComponent } from '../../game-create-page-edit.component';
import { IGameCreatePageFormModel } from '../../../../game-create-page-form.model';
import { GamePreviewService } from '../../../preview/game-preview.service';

@Component({
    selector: 'sfc-game-teams-edit',
    templateUrl: './game-teams-edit.component.html',
    styleUrls: ['./game-teams-edit.component.scss'],
    viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class GameTeamsEditComponent<TFormValue extends IGameCreatePageFormModel, TResponse extends BaseErrorResponse>
    extends GameCreatePageEditComponent<TFormValue, TResponse>
    implements OnInit {

    // icons
    faQuestionCircle = faQuestionCircle;
    faA = faA;
    faB = faB;

    // ngx-sfc-input
    AvatarInputTemplate = AvatarInputTemplate;

    // core
    CoreConstants = CoreConstants;
    CoreLocalization = CoreLocalization;

    // share
    ValidationLocalization = ValidationLocalization;

    // component
    Localization = GameTeamsEditLocalization;
    Constants = GameTeamsEditConstants;

    /* Fields */

    public teamAAvatarModel: IAvatarInputModel | null = null;

    public teamBAvatarModel: IAvatarInputModel | null = null;

    public teamsForm!: FormGroup;

    /* End Fields */

    constructor(
        parent: FormGroupDirective,
        formBuilder: FormBuilder,
        public gamePreviewService: GamePreviewService) {
        super(parent, formBuilder);
    }

    ngOnInit(): void {
        if (this.gamePreviewService.value.teamA) {
            this.teamAAvatarModel = this.buildTeamAvatarInputModel(this.gamePreviewService.value.teamA);
        }

        if (this.gamePreviewService.value.teamB) {
            this.teamBAvatarModel = this.buildTeamAvatarInputModel(this.gamePreviewService.value.teamB);
        }

        this.teamsForm = getFormGroup(nameof<IGameCreatePageFormModel>('teams'), this.form.controls)!;
    }

    public onSelectTeam(event: IAvatarInputTeamsModalBodyEventModel, context: IAvatarInputModalContextModel): void {
        if (event.team) {
            const eventModel: IAvatarInputModalEventModel = {
                avatarModel: this.buildTeamAvatarInputModel(event.team),
                model: event.team,
                value: event.team.id
            };

            context.onSelect(eventModel, event.selected);
        }
    }

    private buildTeamAvatarInputModel(model: ITeamModel): IAvatarInputModel {
        return {
            avatar: {
                firstName: model.profile.general.name,
                image: model.profile.general.logo ?? CoreConstants.DEFAULT_TEAM_A_IMAGE_PATH
            },
            progress: 0,
            stars: 0
        };
    }
}