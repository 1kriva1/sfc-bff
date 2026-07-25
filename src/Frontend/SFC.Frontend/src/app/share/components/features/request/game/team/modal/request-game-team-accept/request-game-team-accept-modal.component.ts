import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Observable, tap, EMPTY, filter } from "rxjs";
import {
    IDefaultModalFooterModel, IDefaultModalHeaderModel, ModalService, ModalTemplate, NotificationType, ReloadService
} from "ngx-sfc-common";
import { BaseErrorResponse } from "@core/models";
import { INotification, NotificationService } from "@core/services";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { MessageSeverity } from "@core/services/message/message-severity.enum";
import { IRequestGameTeamModel, ITeamModel } from "@share/models";
import { IRequestGamePlayerAcceptResponse, RequestGameTeamService } from "@share/services/request/game";
import { RequestGameTeamModal } from "../request-game-team-modal.enum";
import { RequestGameTeamAcceptModalLocalization } from "./request-game-team-accept-modal.localization";

@Component({
    selector: 'sfc-request-game-team-accept-modal',
    templateUrl: './request-game-team-accept-modal.component.html',
    styleUrls: ['./request-game-team-accept-modal.component.scss']
})
export class RequestGameTeamAcceptModalComponent {

    // icons
    faTriangleExclamation = faTriangleExclamation;

    // ngx-sfc-common
    ModalTemplate = ModalTemplate;
    NotificationType = NotificationType;

    // components
    RequestGameTeamModal = RequestGameTeamModal;
    Localization = RequestGameTeamAcceptModalLocalization;

    /* Inputs */

    @Input()
    actions: string[] = [];

    /* End Inputs */

    /* Outputs */

    @Output()
    accepted: EventEmitter<IRequestGameTeamModel> = new EventEmitter<IRequestGameTeamModel>();

    /* End Outputs */

    /* Fields */

    public headerModel: IDefaultModalHeaderModel = {
        text: RequestGameTeamAcceptModalLocalization.MODAL.HEADER.TITLE,
        showCloseIcon: true
    };

    public footerModel: IDefaultModalFooterModel = {
        applyButtonText: RequestGameTeamAcceptModalLocalization.MODAL.FOOTER.BUTTON.APPLY,
        cancelButtonText: RequestGameTeamAcceptModalLocalization.MODAL.FOOTER.BUTTON.CANCEL,
        onApply: () => this.accept(),
        onCancel: () => this.modalService.close(RequestGameTeamModal.Accept)
    }

    /* Fields */

    /* Observables */

    public result$: Observable<BaseErrorResponse> | null = EMPTY;

    /* End Observables */

    constructor(
        public modalService: ModalService,
        private requestGameTeamService: RequestGameTeamService,
        private notificationService: NotificationService,
        private reloadService: ReloadService) {
    }

    private accept(): void {
        const request: IRequestGameTeamModel = this.modalService.args;

        this.result$ = this.requestGameTeamService.accept(request.id, request.game.game.id, request.team.id).pipe(
            filter((response: IRequestGamePlayerAcceptResponse) => response.Success),
            tap((_: IRequestGamePlayerAcceptResponse) => this.postAction(request))
        );
    }

    private postAction(request: IRequestGameTeamModel): void {
        this.actions.forEach(action => this.reloadService.reload(action));
        this.modalService.close(RequestGameTeamModal.Accept);
        this.result$ = null;
        this.notify(request.team);
        this.accepted.emit(request);
    }

    private notify(model: ITeamModel): void {
        const notification: INotification = {
            severity: MessageSeverity.INFO,
            value: RequestGameTeamAcceptModalLocalization.NOTIFICATION.ACCEPTED.VALUE,
            title: `${model.profile.general.name}`
        };

        this.notificationService.notify(notification);
    }
}