import { Component, Input, OnInit } from "@angular/core";
import { empty, firstOrDefault, nameof, sum } from "ngx-sfc-common";
import { EnumService } from "@share/services";
import { IFormationEnumModel } from "@share/services/enum/models/enum/formation-enum.model";
import { FormArray, FormBuilder, FormGroupDirective } from "@angular/forms";
import { CoreConstants } from "@core/constants";
import { AvatarInputTemplate, IAvatarInputModalContextModel, IAvatarInputModalEventModel, IAvatarInputModel } from "ngx-sfc-inputs";
import { CoreLocalization } from "@core/localization";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { getControl, getEnum, getRouteId } from "@core/utils";
import { IAvatarInputTeamPlayersModalBodyEventModel } from "@share/components/extends/inputs/avatar/modal/body/team/player/avatar-input-team-players-modal-body-event.model";
import { ActivatedRoute } from "@angular/router";
import { getRaiting, getStars } from "@share/utils/stats";
import { IPlayerModel } from "@share/models/player/player.model";
import { IFormationPositionEnumModel } from "@share/services/enum/models/enum/formation-position-enum.model";
import { SchemeTeamFormationEditFieldService } from "./scheme-team-formation-edit-field.service";
import { SchemeTeamFormationEditFieldLocalization } from "./scheme-team-formation-edit-field.localization";
import { SchemeTeamFormationEditFieldConstants } from "./scheme-team-formation-edit-field.constants";
import { SchemeTeamFormationEditPart } from "../../scheme-team-formation-edit-part.enum";
import { ISchemeTeamFormationEditFieldModel } from "./models/scheme-team-formation-edit-field.model";
import { ISchemeTeamFormationEditFieldFormModel, ISchemeTeamFormationPlayerEditFieldFormModel } from "./models/scheme-team-formation-edit-field-form.model";
import { IForm } from "@core/types";
import { ISchemeTeamEditFormModel } from "../../../scheme-team-edit-form.model";
import { BaseErrorResponse } from "@core/models";
import { SchemeTeamEditComponent } from "../../../scheme-team-edit.component";
import { EMPTY, map, Observable, tap } from "rxjs";
import { SchemeTeamFormationFieldEditPart } from "./scheme-team-formation-edit-field-part.enum";
import { ISchemeTeamFormationPlayerModel } from "@share/models/scheme/scheme-team.model";
import { TeamConstants } from "@share/constants";
import { buildSchemeTeamFormationPlayerEditFieldFormModels } from "../../../../../utils/scheme-team-form.utils";

@Component({
    selector: 'sfc-scheme-team-formation-edit-field',
    templateUrl: './scheme-team-formation-edit-field.component.html',
    styleUrls: ['./scheme-team-formation-edit-field.component.scss'],
    viewProviders: [CoreConstants.CONTROL_CONTAINER_PROVIDER]
})
export class SchemeTeamFormationEditFieldComponent<TFormValue extends ISchemeTeamEditFormModel, TResponse extends BaseErrorResponse>
    extends SchemeTeamEditComponent<TFormValue, TResponse>
    implements OnInit {

    //icons
    faUserPlus = faUserPlus;

    // ngx-sfc-inputs
    AvatarInputTemplate = AvatarInputTemplate;

    // core
    CoreConstants = CoreConstants;
    CoreLocalization = CoreLocalization;

    // component
    Constants = SchemeTeamFormationEditFieldConstants;
    Localization = SchemeTeamFormationEditFieldLocalization;
    SchemeTeamFormationEditPart = SchemeTeamFormationEditPart;
    SchemeTeamFormationFieldEditPart = SchemeTeamFormationFieldEditPart;

    public teamId: number;

    public field$: Observable<ISchemeTeamFormationEditFieldModel> = EMPTY;

    constructor(
        public schemeTeamFormationEditFieldService: SchemeTeamFormationEditFieldService,
        parent: FormGroupDirective,
        formBuilder: FormBuilder,
        enumService: EnumService,
        route: ActivatedRoute) {
        super(parent, formBuilder, enumService);
        this.teamId = getRouteId(route.snapshot, TeamConstants.ID_ROUTE_PATH)!;
    }

    ngOnInit(): void {
        this.field$ = this.formationChanges$.pipe(
            tap(formation => this.setPlayersForm(formation)),
            map(formation => {
                const playerLines: ISchemeTeamFormationPlayerModel[][] = this.buildPlayersLines(formation);
                return { players: playerLines };
            })
        );
    }

    public getPlayerGroupName(playerIndex: number, lineIndex: number, lines: ISchemeTeamFormationPlayerModel[][]): number {
        const previousLines: ISchemeTeamFormationPlayerModel[][] = lines.slice(0, lineIndex),
            previousLinesSum = sum(previousLines, line => line.length);

        return playerIndex + previousLinesSum;
    }

    public buildPlayerAvatarInputModel(model: IPlayerModel | empty): IAvatarInputModel | null {
        if (!model) return null;

        const rating: number = getRaiting(model.stats);

        return {
            avatar: {
                firstName: model.general.firstName,
                lastName: model.general.lastName,
                image: model.general.photo ?? CoreConstants.DEFAULT_AVATAR_PATH
            },
            progress: rating,
            stars: getStars(rating)
        };
    }

    public buildPlayerAvatarHeaderLabel(formationPosition: IFormationPositionEnumModel): string {
        return `${SchemeTeamFormationEditFieldLocalization.INPUT.PLAYER.HEADER_LABEL_PART_1} '${formationPosition.value}'`;
    }

    public onSelectPlayer(event: IAvatarInputTeamPlayersModalBodyEventModel, context: IAvatarInputModalContextModel): void {
        if (event.player) {
            const eventModel: IAvatarInputModalEventModel = {
                value: event.player.id,
                model: event.player,
                avatarModel: this.buildPlayerAvatarInputModel(event.player)
            };
            context.onSelect(eventModel, event.selected);
        }
    }

    public onChangePlayer(player: IPlayerModel | null, fieldPlayer: ISchemeTeamFormationPlayerModel): void {
        fieldPlayer.player = player;
        this.schemeTeamFormationEditFieldService.toggle(fieldPlayer);
    }

    private buildPlayersLines(formation: IFormationEnumModel): ISchemeTeamFormationPlayerModel[][] {
        // [0]
        // [1, 3, 2]
        // [6, 8, 8, 7]
        // [11, 13, 12]
        const formationPositionsLines: number[][] = Object.assign([], formation.value),
            result: ISchemeTeamFormationPlayerModel[][] = [];

        formationPositionsLines.forEach((formationPositionLine: number[]) => {
            const playersLine: ISchemeTeamFormationPlayerModel[] = [];

            formationPositionLine.forEach((formationPositionId: number, index: number) => {
                // format position key(0) and value(GK)
                const selectedSchemePlayer: ISchemeTeamFormationPlayerModel | empty = firstOrDefault(this.schemeTeamFormationEditFieldService.players,
                    item => item.position.formationPosition.key === formationPositionId && item.position.index === index),
                    // index for distinguish CM and CM
                    schemePlayerModel: ISchemeTeamFormationPlayerModel = {
                        position: {
                            index: index,
                            formationPosition: getEnum(formationPositionId, this.enumService.enums.formationPositions) as IFormationPositionEnumModel
                        },
                        player: selectedSchemePlayer?.player!
                    };

                playersLine.push(schemePlayerModel);
            });

            result.push(playersLine);
        });

        return result;
    }

    private setPlayersForm(formation: IFormationEnumModel): void {
        const playersFormArray: FormArray = getControl(nameof<ISchemeTeamFormationEditFieldFormModel>('players'), this.parent.form.controls) as FormArray,
            playersConstrols: IForm<ISchemeTeamFormationPlayerEditFieldFormModel[]> =
                buildSchemeTeamFormationPlayerEditFieldFormModels(formation, this.schemeTeamFormationEditFieldService.players);

        playersFormArray.clear();

        playersConstrols.forEach((item) => {
            playersFormArray.push(this.formBuilder.group({
                player: [item.player],
                position: [item.position]
            }, {}));
        });

        playersFormArray.patchValue(playersConstrols);
    }
}