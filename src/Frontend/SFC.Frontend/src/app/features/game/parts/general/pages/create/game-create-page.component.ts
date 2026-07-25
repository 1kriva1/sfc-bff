import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { RouteKey } from "@core/enums";
import { INotification, NotificationService } from "@core/services";
import { MessageSeverity } from "@core/services/message/message-severity.enum";
import { faBoxesStacked, faCoins, faFlagCheckered, faInfo, faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import { filter, from, map, Observable, switchMap, tap } from "rxjs";
import { GameCreatePageLocalization } from "./game-create-page.localization";
import { mapCreateGameRequestAsync, mapCreateGameTeamInvitesRequest } from "./game-create-page.mapper";
import { GameRoute } from "@share/enums";
import { ICreateGameTeamInvitesRequest, InviteGameTeamService } from "@share/services";
import { GameService, ICreateGameRequest, ICreateGameResponse } from "@share/services/game";
import { Color } from "ngx-sfc-common";
import { FormProgressService, IFormProgressStepModel } from "@share/components";
import { isDefined } from "ngx-sfc-common";
import {
    addGameFinancialProfileEditControl,
    addGameGeneralProfileEditControl,
    addGameInventaryProfileEditControl,
    addGameProfileEditControl,
    GameFinancialProfileEditConstants,
    GameGeneralProfileEditConstants,
    GameInventaryProfileEditConstants
} from "../../components";
import { GameTeamsEditConstants } from "./components/edit/parts/teams/game-teams-edit.constants";
import { addGameTeamsEditControl } from "./components/edit/parts/teams/game-teams-edit.utils";
import { GameFinalEditConstants } from "./components/edit/parts/final/game-final-edit.constants";
import { IGameCreatePageFormModel } from "./game-create-page-form.model";

@Component({
    templateUrl: './game-create-page.component.html',
    styleUrls: ['./game-create-page.component.scss']
})
export class GameCreatePageComponent implements OnInit {

    /* Fields */

    public form!: FormGroup;

    public create: () => Observable<ICreateGameResponse> = () => {
        const createGameRequest$: Observable<ICreateGameRequest> = from(mapCreateGameRequestAsync(this.value)),
            createGame$: Observable<ICreateGameResponse> = createGameRequest$.pipe(
                switchMap((request: ICreateGameRequest) => this.gameService.create(request)),
                tap((response: ICreateGameResponse) => this.onCreated(response))
            );

        if (isDefined(this.value.teams.teamAId) || isDefined(this.value.teams.teamBId)) {
            return createGame$.pipe(
                filter((createGameResponse: ICreateGameResponse) => createGameResponse.Success),
                switchMap((createGameResponse: ICreateGameResponse) => {
                    const createTeamPlayersRequest: ICreateGameTeamInvitesRequest = mapCreateGameTeamInvitesRequest(this.value.teams);
                    return this.inviteGameTeamService.createRange(createGameResponse.Game.Id, createTeamPlayersRequest).pipe(map(() => createGameResponse));
                })
            );
        }

        return createGame$;
    }

    public steps: IFormProgressStepModel[] = [
        {
            key: GameTeamsEditConstants.Progress.key,
            name: GameCreatePageLocalization.PROGRESS.STEP.TEAMS.NAME,
            icon: faPeopleGroup,
            color: Color.Green_0,
            command: GameTeamsEditConstants.Progress.url
        },
        {
            key: GameGeneralProfileEditConstants.Progress.key,
            name: GameCreatePageLocalization.PROGRESS.STEP.GENERAL.NAME,
            icon: faInfo,
            color: Color.Blue_0,
            command: GameGeneralProfileEditConstants.Progress.url
        },
        {
            key: GameInventaryProfileEditConstants.Progress.key,
            name: GameCreatePageLocalization.PROGRESS.STEP.INVENTARY.NAME,
            icon: faBoxesStacked,
            color: Color.Blue_0,
            command: GameInventaryProfileEditConstants.Progress.url
        },
        {
            key: GameFinancialProfileEditConstants.Progress.key,
            name: GameCreatePageLocalization.PROGRESS.STEP.FINANCIAL.NAME,
            icon: faCoins,
            color: Color.Blue_0,
            command: GameFinancialProfileEditConstants.Progress.url
        },
        {
            key: GameFinalEditConstants.Progress.key,
            name: GameCreatePageLocalization.PROGRESS.STEP.FINAL.NAME,
            icon: faFlagCheckered,
            color: Color.Yellow_0,
            command: GameFinalEditConstants.Progress.url,
            actions: {
                next: {
                    text: GameCreatePageLocalization.PROGRESS.STEP.FINAL.ACTION.NEXT.TEXT,
                    action: this.create
                }
            }
        }
    ];

    /* End Fields */

    /* Properties */

    public get value(): IGameCreatePageFormModel { return this.form.value; }

    /* End Properties */

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private gameService: GameService,
        private inviteGameTeamService: InviteGameTeamService,
        private notificationService: NotificationService,
        private formProgressService: FormProgressService) {
    }

    ngOnInit(): void {
        this.form = this.buildForm();
        this.formProgressService.init(this.steps);
    }

    private buildForm(): FormGroup {
        const form: FormGroup = this.formBuilder.group({});

        // teams
        addGameTeamsEditControl(this.formBuilder, form);

        // profile
        addGameProfileEditControl(this.formBuilder, form);
        addGameGeneralProfileEditControl(this.formBuilder, form);
        addGameInventaryProfileEditControl(this.formBuilder, form);
        addGameFinancialProfileEditControl(this.formBuilder, form);

        return form;
    }

    public onCreated(response: ICreateGameResponse): void {
        if (response.Success) {
            this.router.navigate([`${GameRoute.Games}/${response.Game.Id}/${RouteKey.Edit}`]);
            this.notify();
        }
    }

    private notify(): void {
        const notification: INotification = {
            severity: MessageSeverity.INFO,
            value: GameCreatePageLocalization.NOTIFICATION.CREATED.VALUE,
            title: GameCreatePageLocalization.NOTIFICATION.CREATED.TITLE
        };

        this.notificationService.notify(notification);
    }
}