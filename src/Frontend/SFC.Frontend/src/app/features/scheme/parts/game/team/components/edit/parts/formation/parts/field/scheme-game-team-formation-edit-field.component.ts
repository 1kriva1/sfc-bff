import { Component, OnInit } from "@angular/core";
import { empty, firstOrDefault, nameof, sum } from "ngx-sfc-common";
import { EnumService, IFormationEnumModel, IFormationPositionEnumModel } from "@share/services";
import { FormArray, FormBuilder, FormGroupDirective } from "@angular/forms";
import { CoreConstants } from "@core/constants";
import { AvatarInputTemplate, IAvatarInputModalContextModel, IAvatarInputModalEventModel, IAvatarInputModel } from "ngx-sfc-inputs";
import { CoreLocalization } from "@core/localization";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { getControl, getRouteId } from "@core/utils";
import { ActivatedRoute } from "@angular/router";
import { SchemeGameTeamFormationEditFieldLocalization } from "./scheme-game-team-formation-edit-field.localization";
import { IForm } from "@core/types";
import { BaseErrorResponse } from "@core/models";
import { EMPTY, map, Observable, tap } from "rxjs";
import { IGameTeamPlayerModel, ISchemeGameTeamFormationPlayerModel } from "@share/models";
import { GameConstants, TeamConstants } from "@share/constants";
import { getEnum, getRaiting, getStars } from "@share/utils";
import { SchemeGameTeamEditComponent } from "../../../../scheme-game-team-edit.component";
import { ISchemeGameTeamEditFormModel } from "../../../../scheme-game-team-edit-form.model";
import { SchemeGameTeamFormationEditFieldConstants } from "./scheme-game-team-formation-edit-field.constants";
import { SchemeGameTeamFormationFieldEditPart } from "./scheme-game-team-formation-edit-field-part.enum";
import { ISchemeGameTeamFormationEditFieldModel } from "./models/scheme-game-team-formation-edit-field.model";
import { SchemeGameTeamFormationEditFieldService } from "./scheme-game-team-formation-edit-field.service";
import { ISchemeGameTeamFormationEditFieldFormModel, ISchemeGameTeamFormationPlayerEditFieldFormModel } from "./models/scheme-game-team-formation-edit-field-form.model";
import { IAvatarInputGameTeamPlayerModalBodyEventModel } from "@share/components/extends/inputs/avatar/modal/body/game/team/player/avatar-input-game-team-player-modal-body-event.model";
import { buildSchemeGameTeamFormationPlayerEditFieldFormModels, getFormationControlChanges } from "../../scheme-game-team-formation-edit.utils";
import { SchemeGameTeamFormationEditPart } from "../../scheme-game-team-formation-edit-part.enum";

@Component({
    selector: 'sfc-scheme-game-team-formation-edit-field',
    templateUrl: './scheme-game-team-formation-edit-field.component.html',
    styleUrls: ['./scheme-game-team-formation-edit-field.component.scss'],
    viewProviders: [CoreConstants.CONTROL_CONTAINER_PROVIDER]
})
export class SchemeGameTeamFormationEditFieldComponent<TFormValue extends ISchemeGameTeamEditFormModel, TResponse extends BaseErrorResponse>
    extends SchemeGameTeamEditComponent<TFormValue, TResponse>
    implements OnInit {

    //icons
    faUserPlus = faUserPlus;

    // ngx-sfc-inputs
    AvatarInputTemplate = AvatarInputTemplate;

    // core
    CoreConstants = CoreConstants;
    CoreLocalization = CoreLocalization;

    // component
    Constants = SchemeGameTeamFormationEditFieldConstants;
    Localization = SchemeGameTeamFormationEditFieldLocalization;
    SchemeFormationEditPart = SchemeGameTeamFormationEditPart;
    SchemeGameTeamFormationFieldEditPart = SchemeGameTeamFormationFieldEditPart;

    public teamId: number;

    public gameId: number;

    public field$: Observable<ISchemeGameTeamFormationEditFieldModel> = EMPTY;

    private get formationChanges$(): Observable<IFormationEnumModel> { return getFormationControlChanges(this.controls, this.enumService.enums.formations); }

    constructor(
        public schemeGameTeamFormationEditFieldService: SchemeGameTeamFormationEditFieldService,
        private enumService: EnumService,
        parent: FormGroupDirective,
        formBuilder: FormBuilder,
        route: ActivatedRoute) {
        super(route, parent, formBuilder);
        this.teamId = getRouteId(route.snapshot, TeamConstants.ID_ROUTE_PATH)!;
        this.gameId = getRouteId(route.snapshot, GameConstants.ID_ROUTE_PATH)!;
    }

    ngOnInit(): void {
        this.field$ = this.formationChanges$.pipe(
            tap(formation => this.setPlayersForm(formation)),
            map(formation => {
                const playerLines: ISchemeGameTeamFormationPlayerModel[][] = this.buildPlayersLines(formation);
                return { players: playerLines };
            })
        );
    }

    public getPlayerGroupName(playerIndex: number, lineIndex: number, lines: ISchemeGameTeamFormationPlayerModel[][]): number {
        const previousLines: ISchemeGameTeamFormationPlayerModel[][] = lines.slice(0, lineIndex),
            previousLinesSum = sum(previousLines, line => line.length);

        return playerIndex + previousLinesSum;
    }

    public buildPlayerAvatarInputModel(model: IGameTeamPlayerModel | empty): IAvatarInputModel | null {
        if (!model) return null;

        const rating: number = getRaiting(model.gameTeamPlayer.player!.stats);

        return {
            avatar: {
                firstName: model.gameTeamPlayer.player!.general.firstName,
                lastName: model.gameTeamPlayer.player!.general.lastName,
                image: model.gameTeamPlayer.player!.general.photo ?? CoreConstants.DEFAULT_AVATAR_PATH
            },
            progress: rating,
            stars: getStars(rating)
        };
    }

    public buildPlayerAvatarHeaderLabel(formationPosition: IFormationPositionEnumModel): string {
        return `${SchemeGameTeamFormationEditFieldLocalization.INPUT.PLAYER.HEADER_LABEL_PART_1} '${formationPosition.value}'`;
    }

    public onSelectPlayer(event: IAvatarInputGameTeamPlayerModalBodyEventModel, context: IAvatarInputModalContextModel): void {
        if (event.gameTeamPlayer) {
            const eventModel: IAvatarInputModalEventModel = {
                value: event.gameTeamPlayer.gameTeamPlayer.id,
                model: event.gameTeamPlayer,
                avatarModel: this.buildPlayerAvatarInputModel(event.gameTeamPlayer)
            };
            
            context.onSelect(eventModel, event.selected);
        }
    }

    public onChangePlayer(player: IGameTeamPlayerModel | null, fieldPlayer: ISchemeGameTeamFormationPlayerModel): void {
        fieldPlayer.gameTeamPlayer = player;
        this.schemeGameTeamFormationEditFieldService.toggle(fieldPlayer);
    }

    private buildPlayersLines(formation: IFormationEnumModel): ISchemeGameTeamFormationPlayerModel[][] {
        // [0]
        // [1, 3, 2]
        // [6, 8, 8, 7]
        // [11, 13, 12]
        const formationPositionsLines: number[][] = Object.assign([], formation.value),
            result: ISchemeGameTeamFormationPlayerModel[][] = [];

        formationPositionsLines.forEach((formationPositionLine: number[]) => {
            const playersLine: ISchemeGameTeamFormationPlayerModel[] = [];

            formationPositionLine.forEach((formationPositionId: number, index: number) => {
                // format position key(0) and value(GK)
                const selectedSchemePlayer: ISchemeGameTeamFormationPlayerModel | empty = firstOrDefault(this.schemeGameTeamFormationEditFieldService.players,
                    item => item.position.formationPosition.key === formationPositionId && item.position.index === index),
                    // index for distinguish CM and CM
                    schemePlayerModel: ISchemeGameTeamFormationPlayerModel = {
                        position: {
                            index: index,
                            formationPosition: getEnum(formationPositionId, this.enumService.enums.formationPositions) as IFormationPositionEnumModel
                        },
                        gameTeamPlayer: selectedSchemePlayer?.gameTeamPlayer!
                    };

                playersLine.push(schemePlayerModel);
            });

            result.push(playersLine);
        });

        return result;
    }

    private setPlayersForm(formation: IFormationEnumModel): void {
        const playersFormArray: FormArray = getControl(nameof<ISchemeGameTeamFormationEditFieldFormModel>('players'), this.parent.form.controls) as FormArray,
            playersConstrols: IForm<ISchemeGameTeamFormationPlayerEditFieldFormModel[]> =
                buildSchemeGameTeamFormationPlayerEditFieldFormModels(formation, this.schemeGameTeamFormationEditFieldService.players);

        playersFormArray.clear();

        playersConstrols.forEach((item) => {
            playersFormArray.push(this.formBuilder.group({
                gameTeamPlayerId: [item.gameTeamPlayerId],
                position: [item.position]
            }, {}));
        });

        playersFormArray.patchValue(playersConstrols);
    }
}