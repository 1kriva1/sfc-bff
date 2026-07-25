import { Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable, Subscription, tap, startWith, EMPTY, filter, switchMap } from "rxjs";
import {
    ButtonType, empty, IDefaultModalHeaderModel, IModalEvent,
    ModalService, ModalTemplate, NotificationType, ReloadService
} from "ngx-sfc-common";
import { BaseErrorResponse } from "@core/models";
import { IForm } from "@core/types";
import { getClickObservableFromElementReference } from "@core/utils";
import { INotification, NotificationService } from "@core/services";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { MessageSeverity } from "@core/services/message/message-severity.enum";
import { ValidationLocalization } from "@share/localization";
import { ActivatedRoute } from "@angular/router";
import { IRequestGameTeamDeclineRequest, IRequestGameTeamDeclineResponse, RequestGameTeamService } from "@share/services/request/game";
import { IRequestGameTeamModel } from "@share/models";
import { RequestGameTeamModal } from "../request-game-team-modal.enum";
import { RequestGameTeamDeclineModalLocalization } from "./request-game-team-decline-modal.localization";
import { IRequestGameTeamDeclineModalFormModel } from "./request-game-team-decline-modal-form.model";
import { mapRequestGameTeamDeclineRequest } from "./request-game-team-decline-modal.mapper";

@Component({
    selector: 'sfc-request-game-team-decline-modal',
    templateUrl: './request-game-team-decline-modal.component.html',
    styleUrls: ['./request-game-team-decline-modal.component.scss']
})
export class RequestGameTeamDeclineModalComponent implements OnDestroy {

    // icons
    faTriangleExclamation = faTriangleExclamation;

    // ngx-sfc-common
    ButtonType = ButtonType;
    ModalTemplate = ModalTemplate;
    NotificationType = NotificationType;

    // share
    ValidationLocalization = ValidationLocalization;

    // components
    RequestGameTeamModal = RequestGameTeamModal;
    Localization = RequestGameTeamDeclineModalLocalization;

    /* Inputs */

    @Input()
    actions: string[] = [];

    /* End Inputs */

    /* Outputs */

    @Output()
    declined: EventEmitter<IRequestGameTeamModel> = new EventEmitter<IRequestGameTeamModel>();

    /* End Outputs */

    /* Fields */

    public headerModel: IDefaultModalHeaderModel = {
        text: RequestGameTeamDeclineModalLocalization.MODAL.HEADER.TITLE,
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
            const formValueChanges: Observable<IRequestGameTeamDeclineModalFormModel> = this.form.valueChanges.pipe(startWith(this.form.value)),
                submit$: Observable<InputEvent> = getClickObservableFromElementReference(element);

            this.result$ = formValueChanges.pipe(
                switchMap((value: IRequestGameTeamDeclineModalFormModel) => {
                    return submit$.pipe(
                        filter(() => this.form.valid),
                        switchMap(() => this.decline(value))
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
        private requestGameTeamService: RequestGameTeamService,
        private formBuilder: FormBuilder,
        private notificationService: NotificationService,
        private reloadService: ReloadService,
        route: ActivatedRoute) {
        this.form = this.buildForm();
        this._modalClosedSubscription = this.buildModalCloseSubscription();
    }

    ngOnDestroy(): void {
        this._modalClosedSubscription.unsubscribe();
    }

    private buildForm(): FormGroup {
        const controls: IForm<IRequestGameTeamDeclineModalFormModel> = {
            comment: [null, [Validators.required, Validators.maxLength(250)]]
        };

        return this.formBuilder.group(controls);
    }

    private buildModalCloseSubscription(): Subscription {
        return this.modalService.modal$
            .pipe(filter((modal: IModalEvent) => !modal.open))
            .subscribe(() => this.form.reset());
    }

    private decline(value: IRequestGameTeamDeclineModalFormModel): Observable<IRequestGameTeamDeclineResponse> {
        const model: IRequestGameTeamModel = this.modalService.args,
            request: IRequestGameTeamDeclineRequest = mapRequestGameTeamDeclineRequest(value);

        return this.requestGameTeamService.decline(model.id, model.team.id, model.team.id, request).pipe(
            filter((response: IRequestGameTeamDeclineResponse) => response.Success),
            tap((_: IRequestGameTeamDeclineResponse) => this.postAction(model))
        );
    }

    private postAction(request: IRequestGameTeamModel): void {
        this.actions.forEach(action => this.reloadService.reload(action));
        this.modalService.close(RequestGameTeamModal.Decline);
        this.notify(request);
        this.declined.emit(request);
    }

    private notify(request: IRequestGameTeamModel): void {
        const notification: INotification = {
            severity: MessageSeverity.INFO,
            value: RequestGameTeamDeclineModalLocalization.NOTIFICATION.DECLINED.VALUE,
            title: `${request.team.profile.general.name}`
        };

        this.notificationService.notify(notification);
    }
}