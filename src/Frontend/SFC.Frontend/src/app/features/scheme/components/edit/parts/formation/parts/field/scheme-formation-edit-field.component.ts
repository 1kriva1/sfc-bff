import { Component, Input, OnInit } from "@angular/core";
import { empty, firstOrDefault, nameof, sum } from "ngx-sfc-common";
import { EnumService, IFormationEnumModel, IFormationPositionEnumModel } from "@share/services";
import { FormArray, FormBuilder, FormGroupDirective } from "@angular/forms";
import { CoreConstants } from "@core/constants";
import { AvatarInputTemplate, IAvatarInputModalContextModel, IAvatarInputModalEventModel, IAvatarInputModel } from "ngx-sfc-inputs";
import { CoreLocalization } from "@core/localization";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { getControl, getEnum, getRouteId } from "@core/utils";
import { ActivatedRoute } from "@angular/router";
import { SchemeFormationEditFieldService } from "./scheme-formation-edit-field.service";
import { SchemeFormationEditFieldLocalization } from "./scheme-formation-edit-field.localization";
import { SchemeFormationEditFieldConstants } from "./scheme-formation-edit-field.constants";
import { ISchemeTeamFormationEditFieldModel } from "./models/scheme-formation-edit-field.model";
import { ISchemeFormationEditFieldFormModel, ISchemeFormationPlayerEditFieldFormModel } from "./models/scheme-formation-edit-field-form.model";
import { IForm } from "@core/types";
import { BaseErrorResponse } from "@core/models";
import { EMPTY, map, Observable, tap } from "rxjs";
import { SchemeFormationFieldEditPart } from "./scheme-formation-edit-field-part.enum";
import { IPlayerModel, ISchemeTeamFormationPlayerModel } from "@share/models";
import { TeamConstants } from "@share/constants";
import { SchemeEditComponent } from "../../../../scheme-edit.component";
import { ISchemeEditFormModel } from "../../../../scheme-edit-form.model";
import { SchemeFormationEditPart } from "../../scheme-formation-edit-part.enum";
import { buildSchemeTeamFormationPlayerEditFieldFormModels, getFormationControlChanges } from "../../scheme-formation-edit.utils";
import { getRaiting, getStars } from "@share/utils";
import { IAvatarInputTeamPlayersModalBodyEventModel } from "@share/components";

@Component({
    selector: 'sfc-scheme-formation-edit-field',
    templateUrl: './scheme-formation-edit-field.component.html',
    styleUrls: ['./scheme-formation-edit-field.component.scss'],
    viewProviders: [CoreConstants.CONTROL_CONTAINER_PROVIDER]
})
export class SchemeFormationEditFieldComponent<TFormValue extends ISchemeEditFormModel, TResponse extends BaseErrorResponse>
    extends SchemeEditComponent<TFormValue, TResponse>
    implements OnInit {

    //icons
    faUserPlus = faUserPlus;

    // ngx-sfc-inputs
    AvatarInputTemplate = AvatarInputTemplate;

    // core
    CoreConstants = CoreConstants;
    CoreLocalization = CoreLocalization;

    // component
    Constants = SchemeFormationEditFieldConstants;
    Localization = SchemeFormationEditFieldLocalization;
    SchemeFormationEditPart = SchemeFormationEditPart;
    SchemeFormationFieldEditPart = SchemeFormationFieldEditPart;

    public teamId: number;

    public field$: Observable<ISchemeTeamFormationEditFieldModel> = EMPTY;

    private get formationChanges$(): Observable<IFormationEnumModel> { return getFormationControlChanges(this.controls, this.enumService.enums.formations); }

    constructor(
        public schemeFormationEditFieldService: SchemeFormationEditFieldService,
        private enumService: EnumService,
        parent: FormGroupDirective,
        formBuilder: FormBuilder,
        route: ActivatedRoute) {
        super(parent, formBuilder);
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
        return `${SchemeFormationEditFieldLocalization.INPUT.PLAYER.HEADER_LABEL_PART_1} '${formationPosition.value}'`;
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
        this.schemeFormationEditFieldService.toggle(fieldPlayer);
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
                const selectedSchemePlayer: ISchemeTeamFormationPlayerModel | empty = firstOrDefault(this.schemeFormationEditFieldService.players,
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
        const playersFormArray: FormArray = getControl(nameof<ISchemeFormationEditFieldFormModel>('players'), this.parent.form.controls) as FormArray,
            playersConstrols: IForm<ISchemeFormationPlayerEditFieldFormModel[]> =
                buildSchemeTeamFormationPlayerEditFieldFormModels(formation, this.schemeFormationEditFieldService.players);

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