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
import { mapDeclineTeamPlayerRequestRequest } from "./request-team-player-decline-modal.mapper";
import { MessageSeverity } from "@core/services/message/message-severity.enum";
import { ValidationLocalization } from "@share/localization";
import { RequestTeamPlayerDeclineModalLocalization } from "./request-team-player-decline-modal.localization";
import { IRequestTeamPlayerDeclineModalFormModel } from "./request-team-player-decline-modal-form.model";
import { ActivatedRoute } from "@angular/router";
import { RequestTeamPlayerModal } from "../request-team-player-modal.enum";
import { ITeamPlayerRequestModel } from "../../../../../../../models/request/team-player-request.model";
import { IDeclineTeamPlayerRequestRequest, IDeclineTeamPlayerRequestResponse, RequestTeamPlayerService } from "../../../../../../../services/request/team/player";

@Component({
    selector: 'sfc-request-team-player-decline-modal',
    templateUrl: './request-team-player-decline-modal.component.html',
    styleUrls: ['./request-team-player-decline-modal.component.scss']
})
export class RequestTeamPlayerDeclineModalComponent implements OnDestroy {

    // icons
    faTriangleExclamation = faTriangleExclamation;

    // ngx-sfc-common
    ButtonType = ButtonType;
    ModalTemplate = ModalTemplate;
    NotificationType = NotificationType;

    // share
    ValidationLocalization = ValidationLocalization;

    // components
    RequestTeamPlayerModal = RequestTeamPlayerModal;
    Localization = RequestTeamPlayerDeclineModalLocalization;

    /* Inputs */

    @Input()
    action: string | empty;

    /* End Inputs */

    /* Outputs */

    @Output()
    declined: EventEmitter<ITeamPlayerRequestModel> = new EventEmitter<ITeamPlayerRequestModel>();

    /* End Outputs */

    /* Fields */

    public headerModel: IDefaultModalHeaderModel = {
        text: RequestTeamPlayerDeclineModalLocalization.MODAL.HEADER.TITLE,
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
            const formValueChanges: Observable<IRequestTeamPlayerDeclineModalFormModel> = this.form.valueChanges.pipe(startWith(this.form.value)),
                submit$: Observable<InputEvent> = getClickObservableFromElementReference(element);

            this.result$ = formValueChanges.pipe(
                switchMap((value: IRequestTeamPlayerDeclineModalFormModel) => {
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
        private requestTeamPlayerService: RequestTeamPlayerService,
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
        const controls: IForm<IRequestTeamPlayerDeclineModalFormModel> = {
            comment: [null, [Validators.required, Validators.maxLength(250)]]
        };

        return this.formBuilder.group(controls);
    }

    private buildModalCloseSubscription(): Subscription {
        return this.modalService.modal$
            .pipe(filter((modal: IModalEvent) => !modal.open))
            .subscribe(() => this.form.reset());
    }

    private decline(value: IRequestTeamPlayerDeclineModalFormModel): Observable<IDeclineTeamPlayerRequestResponse> {
        const model: ITeamPlayerRequestModel = this.modalService.args,
            request: IDeclineTeamPlayerRequestRequest = mapDeclineTeamPlayerRequestRequest(value);

        return this.requestTeamPlayerService.decline(model.id, model.team.id, model.player.id, request).pipe(
            filter((response: IDeclineTeamPlayerRequestResponse) => response.Success),
            tap((_: IDeclineTeamPlayerRequestResponse) => this.postAction(model))
        );
    }

    private postAction(request: ITeamPlayerRequestModel): void {
        if (this.action) {
            this.reloadService.reload(this.action);
        }

        this.modalService.close(RequestTeamPlayerModal.Decline);
        this.notify(request);
        this.declined.emit(request);
    }

    private notify(request: ITeamPlayerRequestModel): void {
        const notification: INotification = {
            severity: MessageSeverity.INFO,
            value: RequestTeamPlayerDeclineModalLocalization.NOTIFICATION.DECLINED.VALUE,
            title: `${request.player.general.firstName} ${request.player.general.lastName}`
        };

        this.notificationService.notify(notification);
    }
}