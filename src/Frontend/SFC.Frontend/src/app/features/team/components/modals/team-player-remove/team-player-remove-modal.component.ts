import { Component, ElementRef, OnDestroy, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable, Subscription, tap, startWith, EMPTY, filter, switchMap } from "rxjs";
import {
    ButtonType, IDefaultModalHeaderModel, IModalEvent,
    ModalService, ModalTemplate, NotificationType, ReloadService
} from "ngx-sfc-common";
import { BaseErrorResponse } from "@core/models";
import { IForm } from "@core/types";
import { getClickObservableFromElementReference, getRouteId } from "@core/utils";
import { INotification, NotificationService } from "@core/services";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { mapRemoveTeamPlayerRequest } from "./team-player-remove-modal.mapper";
import { MessageSeverity } from "@core/services/message/message-severity.enum";
import { ValidationLocalization } from "@share/localization";
import { TeamPlayerRemoveModalLocalization } from "./team-player-remove-modal.localization";
import { ITeamPlayerRemoveModalFormModel } from "./team-player-remove-modal-form.model";
import { ActivatedRoute } from "@angular/router";
import { TeamModal } from "src/app/features/team/components/modals/team-modal.enum";
import { TeamAction } from "@share/enums";
import { IRemoveTeamPlayerRequest, IRemoveTeamPlayerResponse, TeamPlayerService } from "@share/services";
import { IPlayersTableModel } from "@share/components/features/player";

@Component({
    selector: 'sfc-team-player-remove-modal',
    templateUrl: './team-player-remove-modal.component.html',
    styleUrls: ['./team-player-remove-modal.component.scss']
})
export class TeamPlayerRemoveModalComponent implements OnDestroy {

    // icons
    faTriangleExclamation = faTriangleExclamation;

    // ngx-sfc-common
    ButtonType = ButtonType;
    ModalTemplate = ModalTemplate;
    NotificationType = NotificationType;

    // share
    ValidationLocalization = ValidationLocalization;

    // components
    TeamModal = TeamModal;
    Localization = TeamPlayerRemoveModalLocalization;

    /* Fields */

    private teamId: number;

    public headerModel: IDefaultModalHeaderModel = {
        text: TeamPlayerRemoveModalLocalization.MODAL.HEADER.TITLE,
        showCloseIcon: true
    };

    public form: FormGroup;

    /* Fields */

    /* Observables */

    public result$: Observable<BaseErrorResponse> = EMPTY;

    /* End Observables */

    /* View */

    @ViewChild('submitButton', { static: false, read: ElementRef })
    set submitButton(element: ElementRef) {
        if (element) {
            const formValueChanges: Observable<ITeamPlayerRemoveModalFormModel> = this.form.valueChanges.pipe(startWith(this.form.value)),
                submit$: Observable<InputEvent> = getClickObservableFromElementReference(element);

            this.result$ = formValueChanges.pipe(
                switchMap((value: ITeamPlayerRemoveModalFormModel) => {
                    return submit$.pipe(
                        filter(() => this.form.valid),
                        switchMap(() => this.remove(value))
                    );
                }));
        }
    }

    /* End View */

    /* Subscriptions */

    private _modalClosedSubscription: Subscription;

    /* End Subscriptions */

    constructor(
        public modalService: ModalService,
        private teamPlayerService: TeamPlayerService,
        private formBuilder: FormBuilder,
        private notificationService: NotificationService,
        private reloadService: ReloadService,
        route: ActivatedRoute) {
        this.teamId = getRouteId(route.snapshot);
        this.form = this.buildForm();
        this._modalClosedSubscription = this.buildModalCloseSubscription();
    }

    ngOnDestroy(): void {
        this._modalClosedSubscription.unsubscribe();
    }

    private buildForm(): FormGroup {
        const controls: IForm<ITeamPlayerRemoveModalFormModel> = {
            comment: [null, [Validators.required, Validators.maxLength(250)]]
        };

        return this.formBuilder.group(controls);
    }

    private buildModalCloseSubscription(): Subscription {
        return this.modalService.modal$
            .pipe(filter((modal: IModalEvent) => !modal.open))
            .subscribe(() => this.form.reset());
    }

    private remove(value: ITeamPlayerRemoveModalFormModel): Observable<IRemoveTeamPlayerResponse> {
        const player: IPlayersTableModel = this.modalService.args,
            request: IRemoveTeamPlayerRequest = mapRemoveTeamPlayerRequest(value);

        return this.teamPlayerService.remove(this.teamId, player.id, request).pipe(
            filter((response: IRemoveTeamPlayerResponse) => response.Success),
            tap((_: IRemoveTeamPlayerResponse) => this.onRemoved(player))
        );
    }

    private onRemoved(player: IPlayersTableModel): void {
        this.reloadService.reload(TeamAction.Player);
        this.modalService.close(TeamModal.TeamPlayerRemove);
        this.notify(player);
    }

    private notify(model: IPlayersTableModel): void {
        const notification: INotification = {
            severity: MessageSeverity.INFO,
            value: TeamPlayerRemoveModalLocalization.NOTIFICATION.REMOVED.VALUE,
            title: `${model.general.firstName} ${model.general.lastName}`
        };

        this.notificationService.notify(notification);
    }
}