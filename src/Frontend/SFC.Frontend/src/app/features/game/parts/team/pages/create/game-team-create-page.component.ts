import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { INotification, NotificationService } from "@core/services";
import { IGameTeamCreatePageFormModel } from "./models/game-team-create-page-form.model";
import { FormProgressService, IFormProgressParameters, IFormProgressStepModel } from "@share/components";
import { addGameTeamGeneralProfileEditControlAsync, addGameTeamInventaryProfileEditControl, addGameTeamProfileEditControl, getGameTeamGeneralProfileProgressParameters } from "../../components/edit";
import { IGameTeamCreatePageModel } from "./models/game-team-create-page.model";
import { GameTeamCreatePageConstants } from "./game-team-create-page.constants";
import { GameTeamCreatePageLocalization } from "./game-team-create-page.localization";
import { faInfo, faBoxesStacked, faPeopleGroup, faFlagCheckered } from "@fortawesome/free-solid-svg-icons";
import { getGameTeamInventaryProfileProgressParameters } from "../../components/edit/parts/profile/parts/inventary/game-team-inventary-profile-edit.utils";
import { addGameTeamPlayersEditControl, getGameTeamPlayersProgressParameters } from "./components/edit/parts/players/game-team-players-edit.utils";
import { filter, from, map, Observable, of, switchMap, tap } from "rxjs";
import { GameTeamPlayerService, GameTeamService, ICreateGameTeamRequest, ICreateGameTeamResponse, ICreatesGameTeamPlayerRequest, ICreateTeamRequest, ICreateTeamResponse, TeamService } from "@share/services";
import { Route } from "@share/enums";
import { MessageSeverity } from "@core/services/message/message-severity.enum";
import { RouteKey } from "@core/enums";
import { mapCreateGameTeamRequest, mapCreatesGameTeamPlayerRequest, mapCreateTeamRequestAsync } from "./game-team-create-page.mapper";
import { Color, any } from "ngx-sfc-common";
import { getGameTeamFinalProgressParameters } from "./components/edit/parts/final/game-team-final-edit.utils";
import { GameTeamPlayersCurrentEditSelectService } from "./components/edit/parts/players/components/current/services/game-team-players-current-edit-select.service";

@Component({
    templateUrl: './game-team-create-page.component.html',
    styleUrls: ['./game-team-create-page.component.scss']
})
export class GameTeamCreatePageComponent implements OnInit {

    /* Fields */

    public form!: FormGroup;

    public steps: IFormProgressStepModel[] = [];

    public create = (): Observable<ICreateGameTeamResponse> => {
        const createTeamRequest$: Observable<ICreateTeamRequest> = from(mapCreateTeamRequestAsync(this.value));

        return createTeamRequest$.pipe(
            switchMap((createTeamRequest: ICreateTeamRequest) => this.teamService.create(createTeamRequest)),
            filter((createTeamResponse: ICreateTeamResponse) => createTeamResponse.Success),
            switchMap((createTeamResponse: ICreateTeamResponse) => {
                const createGameTeamRequest: ICreateGameTeamRequest = mapCreateGameTeamRequest(createTeamResponse.Team.Id);
                return this.gameTeamService.create(this.model.game.game.id, createGameTeamRequest).pipe(
                    filter((createGameTeamResponse: ICreateGameTeamResponse) => createGameTeamResponse.Success),
                    switchMap((createGameTeamResponse: ICreateGameTeamResponse) => {
                        if (any(this.value.players.ids)) {
                            const playersRequest: ICreatesGameTeamPlayerRequest =
                                mapCreatesGameTeamPlayerRequest(this.value.players.ids);

                            return this.gameTeamPlayerService.creates(
                                this.model.game.game.id,
                                createTeamResponse.Team.Id,
                                playersRequest
                            ).pipe(
                                tap(() => this.onCreated(createGameTeamResponse)),
                                map(() => createGameTeamResponse)
                            );
                        }

                        return of(createGameTeamResponse).pipe(
                            tap(() => this.onCreated(createGameTeamResponse))
                        );
                    })
                );
            })
        );
    };    

    /* End Fields */

    /* Properties */

    public get value(): IGameTeamCreatePageFormModel { return this.form.value; }

    public get model(): IGameTeamCreatePageModel { return this.route.snapshot.data[GameTeamCreatePageConstants.RESOLVE_KEY].result; };

    /* End Properties */

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder,
        private notificationService: NotificationService,
        private formProgressService: FormProgressService,
        private teamService: TeamService,
        private gameTeamService: GameTeamService,
        private gameTeamPlayerService: GameTeamPlayerService,
        private gameTeamPlayersCurrentEditSelectService: GameTeamPlayersCurrentEditSelectService) {
    }

    async ngOnInit(): Promise<void> {
        this.form = await this.buildFormAsync();
        this.steps = this.buildFormProgressStepModels();
        this.formProgressService.init(this.steps);
    }

    private async buildFormAsync(): Promise<FormGroup> {
        const form: FormGroup = this.formBuilder.group({});

        // profile
        addGameTeamProfileEditControl(this.formBuilder, form);
        await addGameTeamGeneralProfileEditControlAsync(this.formBuilder, form);
        addGameTeamInventaryProfileEditControl(this.formBuilder, form);

        // players
        addGameTeamPlayersEditControl(this.formBuilder, form);

        return form;
    }

    public onCreated(response: ICreateGameTeamResponse): void {
        if (response.Success) {
            this.router.navigate([`${Route.Games}/${this.model.game.game.id}/${Route.Teams}/${response.Team.Id}/${RouteKey.Edit}`]);
            this.notify();
        }

        this.gameTeamPlayersCurrentEditSelectService.clear();
    }

    private notify(): void {
        const notification: INotification = {
            severity: MessageSeverity.INFO,
            value: GameTeamCreatePageLocalization.NOTIFICATION.CREATED.VALUE,
            title: GameTeamCreatePageLocalization.NOTIFICATION.CREATED.TITLE
        };

        this.notificationService.notify(notification);
    }

    private buildFormProgressStepModels(): IFormProgressStepModel[] {
        const generalProfileStepModel: IFormProgressParameters = getGameTeamGeneralProfileProgressParameters(this.model.game.game.id),
            inventaryProfileStepModel: IFormProgressParameters = getGameTeamInventaryProfileProgressParameters(this.model.game.game.id),
            playersStepModel: IFormProgressParameters = getGameTeamPlayersProgressParameters(this.model.game.game.id),
            finalStepModel: IFormProgressParameters = getGameTeamFinalProgressParameters(this.model.game.game.id);

        return [
            {
                key: generalProfileStepModel.key,
                name: GameTeamCreatePageLocalization.PROGRESS.STEP.GENERAL.NAME,
                icon: faInfo,
                color: Color.Blue_0,
                command: generalProfileStepModel.url
            },
            {
                key: inventaryProfileStepModel.key,
                name: GameTeamCreatePageLocalization.PROGRESS.STEP.INVENTARY.NAME,
                icon: faBoxesStacked,
                color: Color.Blue_0,
                command: inventaryProfileStepModel.url
            },
            {
                key: playersStepModel.key,
                name: GameTeamCreatePageLocalization.PROGRESS.STEP.PLAYERS.NAME,
                icon: faPeopleGroup,
                color: Color.Green_0,
                command: playersStepModel.url
            },
            {
                key: finalStepModel.key,
                name: GameTeamCreatePageLocalization.PROGRESS.STEP.FINAL.NAME,
                icon: faFlagCheckered,
                color: Color.Yellow_0,
                command: finalStepModel.url,
                actions: {
                    next: {
                        text: GameTeamCreatePageLocalization.PROGRESS.STEP.FINAL.ACTION.NEXT.TEXT,
                        action: this.create
                    }
                }
            }
        ];
    }
}