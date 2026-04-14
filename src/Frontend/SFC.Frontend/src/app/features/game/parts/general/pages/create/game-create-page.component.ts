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
import { GameCreatePageFormModel } from "./game-create-page-form.model";
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
    addGameTeamsEditControl,
    GameFinalEditConstants,
    GameFinancialProfileEditConstants,
    GameGeneralProfileEditConstants,
    GameInventaryProfileEditConstants,
    GameTeamsEditConstants
} from "../../components";

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
            key: GameTeamsEditConstants.PROGRESS_KEY,
            name: GameCreatePageLocalization.PROGRESS.STEP.TEAMS.NAME,
            icon: faPeopleGroup,
            color: Color.Green_0,
            command: GameTeamsEditConstants.PROGRESS_CREATE_COMMAND
        },
        {
            key: GameGeneralProfileEditConstants.PROGRESS_KEY,
            name: GameCreatePageLocalization.PROGRESS.STEP.GENERAL.NAME,
            icon: faInfo,
            color: Color.Blue_0,
            command: GameGeneralProfileEditConstants.PROGRESS_CREATE_COMMAND
        },
        {
            key: GameInventaryProfileEditConstants.PROGRESS_KEY,
            name: GameCreatePageLocalization.PROGRESS.STEP.INVENTARY.NAME,
            icon: faBoxesStacked,
            color: Color.Blue_0,
            command: GameInventaryProfileEditConstants.PROGRESS_CREATE_COMMAND
        },
        {
            key: GameFinancialProfileEditConstants.PROGRESS_KEY,
            name: GameCreatePageLocalization.PROGRESS.STEP.FINANCIAL.NAME,
            icon: faCoins,
            color: Color.Blue_0,
            command: GameFinancialProfileEditConstants.PROGRESS_CREATE_COMMAND
        },
        {
            key: GameFinalEditConstants.PROGRESS_KEY,
            name: GameCreatePageLocalization.PROGRESS.STEP.FINAL.NAME,
            icon: faFlagCheckered,
            color: Color.Yellow_0,
            command: GameFinalEditConstants.PROGRESS_CREATE_COMMAND,
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

    public get value(): GameCreatePageFormModel { return this.form.value; }

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