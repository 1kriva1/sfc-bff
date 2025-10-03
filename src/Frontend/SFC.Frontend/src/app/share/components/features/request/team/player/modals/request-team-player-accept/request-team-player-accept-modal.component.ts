import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Observable, tap, EMPTY, filter } from "rxjs";
import {
    empty,
    IDefaultModalFooterModel, IDefaultModalHeaderModel, ModalService, ModalTemplate, NotificationType, ReloadService
} from "ngx-sfc-common";
import { BaseErrorResponse } from "@core/models";
import { INotification, NotificationService } from "@core/services";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { MessageSeverity } from "@core/services/message/message-severity.enum";
import { RequestTeamPlayerAcceptModalLocalization } from "./request-team-player-accept-modal.localization";
import { RequestTeamPlayerModal } from "../request-team-player-modal.enum";
import { IPlayerModel } from "../../../../../../../models/player/player.model";
import { ITeamPlayerRequestModel } from "../../../../../../../models/request/team-player-request.model";
import { IAcceptTeamPlayerRequestResponse, RequestTeamPlayerService } from "../../../../../../../services";

@Component({
    selector: 'sfc-request-team-player-accept-modal',
    templateUrl: './request-team-player-accept-modal.component.html',
    styleUrls: ['./request-team-player-accept-modal.component.scss']
})
export class RequestTeamPlayerAcceptModalComponent {

    // icons
    faTriangleExclamation = faTriangleExclamation;

    // ngx-sfc-common
    ModalTemplate = ModalTemplate;
    NotificationType = NotificationType;

    // components
    RequestTeamPlayerModal = RequestTeamPlayerModal;
    Localization = RequestTeamPlayerAcceptModalLocalization;

    /* Inputs */

    @Input()
    actions: string[] = [];

    /* End Inputs */

    /* Outputs */

    @Output()
    accepted: EventEmitter<ITeamPlayerRequestModel> = new EventEmitter<ITeamPlayerRequestModel>();

    /* End Outputs */

    /* Fields */

    public headerModel: IDefaultModalHeaderModel = {
        text: RequestTeamPlayerAcceptModalLocalization.MODAL.HEADER.TITLE,
        showCloseIcon: true
    };

    public footerModel: IDefaultModalFooterModel = {
        applyButtonText: RequestTeamPlayerAcceptModalLocalization.MODAL.FOOTER.BUTTON.APPLY,
        cancelButtonText: RequestTeamPlayerAcceptModalLocalization.MODAL.FOOTER.BUTTON.CANCEL,
        onApply: () => this.accept(),
        onCancel: () => this.modalService.close(RequestTeamPlayerModal.Accept)
    }

    /* Fields */

    /* Observables */

    public result$: Observable<BaseErrorResponse> | null = EMPTY;

    /* End Observables */

    constructor(
        public modalService: ModalService,
        private requestTeamPlayerService: RequestTeamPlayerService,
        private notificationService: NotificationService,
        private reloadService: ReloadService) {
    }

    private accept(): void {
        const request: ITeamPlayerRequestModel = this.modalService.args;

        this.result$ = this.requestTeamPlayerService.accept(request.id, request.team.id, request.player.id).pipe(
            filter((response: IAcceptTeamPlayerRequestResponse) => response.Success),
            tap((_: IAcceptTeamPlayerRequestResponse) => this.postAction(request))
        );
    }

    private postAction(request: ITeamPlayerRequestModel): void {
        this.actions.forEach(action => this.reloadService.reload(action));
        this.modalService.close(RequestTeamPlayerModal.Accept);
        this.result$ = null;
        this.notify(request.player);
        this.accepted.emit(request);
    }

    private notify(model: IPlayerModel): void {
        const notification: INotification = {
            severity: MessageSeverity.INFO,
            value: RequestTeamPlayerAcceptModalLocalization.NOTIFICATION.ACCEPTED.VALUE,
            title: `${model.general.firstName} ${model.general.lastName}`
        };

        this.notificationService.notify(notification);
    }
}