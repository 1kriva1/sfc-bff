import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { INotification, NotificationService } from "@core/services";
import { ISchemeGameTeamCreatePageFormModel } from "./models/scheme-game-team-create-page-form.model";
import { FormProgressService, IFormProgressParameters, IFormProgressStepModel } from "@share/components";
import { ISchemeGameTeamCreatePageModel } from "./models/scheme-game-team-create-page.model";
import { SchemeGameTeamCreatePageLocalization } from "./scheme-game-team-create-page.localization";
import { faInfo, faPeopleGroup, faFlagCheckered } from "@fortawesome/free-solid-svg-icons";
import { Observable, tap } from "rxjs";
import { EnumService, ISchemeGameTeamCreateRequest, ISchemeGameTeamCreateResponse, SchemeGameTeamService } from "@share/services";
import { GameRoute, SchemeRoute, TeamRoute } from "@share/enums";
import { MessageSeverity } from "@core/services/message/message-severity.enum";
import { RouteKey } from "@core/enums";
import { Color } from "ngx-sfc-common";
import { addSchemeGameTeamFormationEditControl, getSchemeGameTeamFormationProgressParameters } from "../../components/edit/parts/formation/scheme-game-team-formation-edit.utils";
import { mapSchemeGameTeamRequestCreate } from "./scheme-game-team-create-page.mapper";
import { addSchemeGameTeamGeneralProfileEditControl, addSchemeGameTeamProfileEditControl, getSchemeGameTeamGeneralProfileProgressParameters } from "../../components/edit";
import { SchemeFormationEditFieldService } from "../../../../../components/edit/parts/formation/parts/field/scheme-formation-edit-field.service";
import { mapArrayItemProgressValue } from "@share/utils";
import { getSchemeGameTeamFinalProgressParameters } from "./components/edit/parts/final/scheme-game-team-final-edit.utils";
import { SchemeGameTeamConstants } from "../../constants/scheme-game-team.constants";

@Component({
    templateUrl: './scheme-game-team-create-page.component.html',
    styleUrls: ['./scheme-game-team-create-page.component.scss']
})
export class SchemeGameTeamCreatePageComponent implements OnInit, OnDestroy {

    /* Fields */

    public form!: FormGroup;

    public steps: IFormProgressStepModel[] = [];

    public create = (): Observable<ISchemeGameTeamCreateResponse> => {
        const request: ISchemeGameTeamCreateRequest = mapSchemeGameTeamRequestCreate(this.value);
        return this.schemeGameTeamService.create(this.model.game.game.id, this.model.team.id, request).pipe(
            tap((response: ISchemeGameTeamCreateResponse) => this.onCreated(response))
        );
    };

    /* End Fields */

    /* Properties */

    public get value(): ISchemeGameTeamCreatePageFormModel { return this.form.value; }

    public get model(): ISchemeGameTeamCreatePageModel { return this.route.snapshot.data[SchemeGameTeamConstants.ResolveKey].result; };

    /* End Properties */

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder,
        private notificationService: NotificationService,
        private formProgressService: FormProgressService,
        private schemeGameTeamService: SchemeGameTeamService,
        private schemeFormationEditFieldService: SchemeFormationEditFieldService,
        private enumService: EnumService) {
    }

    ngOnInit(): void {
        this.form = this.buildForm();
        this.steps = this.buildFormProgressStepModels();
        this.formProgressService.init(this.steps);
    }

    ngOnDestroy(): void {
        this.schemeFormationEditFieldService.clear();
    }

    private buildForm(): FormGroup {
        const form: FormGroup = this.formBuilder.group({});

        // profile
        addSchemeGameTeamProfileEditControl(this.formBuilder, form);
        addSchemeGameTeamGeneralProfileEditControl(this.formBuilder, form);

        // formations
        addSchemeGameTeamFormationEditControl(this.formBuilder, form, this.enumService);

        return form;
    }

    public onCreated(response: ISchemeGameTeamCreateResponse): void {
        if (response.Success) {
            this.router.navigate([`${SchemeRoute.Schemes}/${response.Scheme.Id}/${GameRoute.Games}/${this.model.game.game.id}/${TeamRoute.Teams}/${this.model.team.id}/${RouteKey.Edit}`]);
            this.notify();
        }
    }

    private notify(): void {
        const notification: INotification = {
            severity: MessageSeverity.INFO,
            value: SchemeGameTeamCreatePageLocalization.NOTIFICATION.CREATED.VALUE,
            title: SchemeGameTeamCreatePageLocalization.NOTIFICATION.CREATED.TITLE
        };

        this.notificationService.notify(notification);
    }

    private buildFormProgressStepModels(): IFormProgressStepModel[] {
        const generalProfileStepModel: IFormProgressParameters = getSchemeGameTeamGeneralProfileProgressParameters(this.model.game.game.id, this.model.team.id),
            progressStepModel: IFormProgressParameters = getSchemeGameTeamFormationProgressParameters(this.model.game.game.id, this.model.team.id),
            finalStepModel: IFormProgressParameters = getSchemeGameTeamFinalProgressParameters(this.model.game.game.id, this.model.team.id);

        return [
            {
                key: generalProfileStepModel.key,
                name: SchemeGameTeamCreatePageLocalization.PROGRESS.STEP.GENERAL.NAME,
                icon: faInfo,
                color: Color.Blue_0,
                command: generalProfileStepModel.url
            },
            {
                key: progressStepModel.key,
                name: SchemeGameTeamCreatePageLocalization.PROGRESS.STEP.FORMATION.NAME,
                icon: faPeopleGroup,
                color: Color.Green_0,
                command: progressStepModel.url,
                mapProgress: value => mapArrayItemProgressValue(value.field.players, (item) => item.player)
            },
            {
                key: finalStepModel.key,
                name: SchemeGameTeamCreatePageLocalization.PROGRESS.STEP.FINAL.NAME,
                icon: faFlagCheckered,
                color: Color.Yellow_0,
                command: finalStepModel.url,
                actions: {
                    next: {
                        text: SchemeGameTeamCreatePageLocalization.PROGRESS.STEP.FINAL.ACTION.NEXT.TEXT,
                        action: this.create
                    }
                }
            }
        ];
    }
}