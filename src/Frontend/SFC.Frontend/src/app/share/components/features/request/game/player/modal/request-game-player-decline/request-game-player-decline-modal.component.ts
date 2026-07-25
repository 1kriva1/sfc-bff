import { Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable, Subscription, tap, startWith, EMPTY, filter, switchMap } from "rxjs";
import {
    ButtonType, IDefaultModalHeaderModel, IModalEvent,
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
import { IDeclineTeamPlayerRequestResponse } from "../../../../../../../services/request/team/player";
import { RequestGamePlayerDeclineModalLocalization } from "./request-game-player-decline-modal.localization";
import { RequestGamePlayerModal } from "../request-game-player-modal.enum";
import { IRequestGamePlayerDeclineModalFormModel } from "./request-game-player-decline-modal-form.model";
import { mapRequestGamePlayerDeclineRequest } from "./request-game-player-decline-modal.mapper";
import { IRequestGamePlayerDeclineRequest, IRequestGamePlayerDeclineResponse, RequestGamePlayerService } from "@share/services/request/game";
import { IRequestGamePlayerModel } from "@share/models";

@Component({
    selector: 'sfc-request-game-player-decline-modal',
    templateUrl: './request-game-player-decline-modal.component.html',
    styleUrls: ['./request-game-player-decline-modal.component.scss']
})
export class RequestGamePlayerDeclineModalComponent implements OnDestroy {

    // icons
    faTriangleExclamation = faTriangleExclamation;

    // ngx-sfc-common
    ButtonType = ButtonType;
    ModalTemplate = ModalTemplate;
    NotificationType = NotificationType;

    // share
    ValidationLocalization = ValidationLocalization;

    // components
    RequestGamePlayerModal = RequestGamePlayerModal;
    Localization = RequestGamePlayerDeclineModalLocalization;

    /* Inputs */

    @Input()
    actions: string[] = [];

    /* End Inputs */

    /* Outputs */

    @Output()
    declined: EventEmitter<IRequestGamePlayerModel> = new EventEmitter<IRequestGamePlayerModel>();

    /* End Outputs */

    /* Fields */

    public headerModel: IDefaultModalHeaderModel = {
        text: RequestGamePlayerDeclineModalLocalization.MODAL.HEADER.TITLE,
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
            const formValueChanges: Observable<IRequestGamePlayerDeclineModalFormModel> = this.form.valueChanges.pipe(startWith(this.form.value)),
                submit$: Observable<InputEvent> = getClickObservableFromElementReference(element);

            this.result$ = formValueChanges.pipe(
                switchMap((value: IRequestGamePlayerDeclineModalFormModel) => {
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
        private requestGamePlayerService: RequestGamePlayerService,
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
        const controls: IForm<IRequestGamePlayerDeclineModalFormModel> = {
            comment: [null, [Validators.required, Validators.maxLength(250)]]
        };

        return this.formBuilder.group(controls);
    }

    private buildModalCloseSubscription(): Subscription {
        return this.modalService.modal$
            .pipe(filter((modal: IModalEvent) => !modal.open))
            .subscribe(() => this.form.reset());
    }

    private decline(value: IRequestGamePlayerDeclineModalFormModel): Observable<IRequestGamePlayerDeclineResponse> {
        const model: IRequestGamePlayerModel = this.modalService.args,
            request: IRequestGamePlayerDeclineRequest = mapRequestGamePlayerDeclineRequest(value);

        return this.requestGamePlayerService.decline(model.id, model.game.game.id, model.player.id, request).pipe(
            filter((response: IDeclineTeamPlayerRequestResponse) => response.Success),
            tap((_: IDeclineTeamPlayerRequestResponse) => this.postAction(model))
        );
    }

    private postAction(request: IRequestGamePlayerModel): void {
        this.actions.forEach(action => this.reloadService.reload(action));

        this.modalService.close(RequestGamePlayerModal.Decline);
        this.notify(request);
        this.declined.emit(request);
    }

    private notify(request: IRequestGamePlayerModel): void {
        const notification: INotification = {
            severity: MessageSeverity.INFO,
            value: RequestGamePlayerDeclineModalLocalization.NOTIFICATION.DECLINED.VALUE,
            title: `${request.player.general.firstName} ${request.player.general.lastName}`
        };

        this.notificationService.notify(notification);
    }
}