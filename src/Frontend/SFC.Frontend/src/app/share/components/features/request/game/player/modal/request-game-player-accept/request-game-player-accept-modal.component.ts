import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Observable, tap, EMPTY, filter } from "rxjs";
import {
    IDefaultModalFooterModel, IDefaultModalHeaderModel, ModalService, ModalTemplate, NotificationType, ReloadService
} from "ngx-sfc-common";
import { BaseErrorResponse } from "@core/models";
import { INotification, NotificationService } from "@core/services";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { MessageSeverity } from "@core/services/message/message-severity.enum";
import { IPlayerModel } from "../../../../../../../models/player/player.model";
import { IRequestGamePlayerModel } from "@share/models";
import { RequestGamePlayerAcceptModalLocalization } from "./request-game-player-accept-modal.localization";
import { RequestGamePlayerModal } from "../request-game-player-modal.enum";
import { IRequestGamePlayerAcceptResponse, RequestGamePlayerService } from "@share/services/request/game";

@Component({
    selector: 'sfc-request-game-player-accept-modal',
    templateUrl: './request-game-player-accept-modal.component.html',
    styleUrls: ['./request-game-player-accept-modal.component.scss']
})
export class RequestGamePlayerAcceptModalComponent {

    // icons
    faTriangleExclamation = faTriangleExclamation;

    // ngx-sfc-common
    ModalTemplate = ModalTemplate;
    NotificationType = NotificationType;

    // components
    RequestGamePlayerModal = RequestGamePlayerModal;
    Localization = RequestGamePlayerAcceptModalLocalization;

    /* Inputs */

    @Input()
    actions: string[] = [];

    /* End Inputs */

    /* Outputs */

    @Output()
    accepted: EventEmitter<IRequestGamePlayerModel> = new EventEmitter<IRequestGamePlayerModel>();

    /* End Outputs */

    /* Fields */

    public headerModel: IDefaultModalHeaderModel = {
        text: RequestGamePlayerAcceptModalLocalization.MODAL.HEADER.TITLE,
        showCloseIcon: true
    };

    public footerModel: IDefaultModalFooterModel = {
        applyButtonText: RequestGamePlayerAcceptModalLocalization.MODAL.FOOTER.BUTTON.APPLY,
        cancelButtonText: RequestGamePlayerAcceptModalLocalization.MODAL.FOOTER.BUTTON.CANCEL,
        onApply: () => this.accept(),
        onCancel: () => this.modalService.close(RequestGamePlayerModal.Accept)
    }

    /* Fields */

    /* Observables */

    public result$: Observable<BaseErrorResponse> | null = EMPTY;

    /* End Observables */

    constructor(
        public modalService: ModalService,
        private requestGamePlayerService: RequestGamePlayerService,
        private notificationService: NotificationService,
        private reloadService: ReloadService) {
    }

    private accept(): void {
        const request: IRequestGamePlayerModel = this.modalService.args;

        this.result$ = this.requestGamePlayerService.accept(request.id, request.game.game.id, request.player.id).pipe(
            filter((response: IRequestGamePlayerAcceptResponse) => response.Success),
            tap((_: IRequestGamePlayerAcceptResponse) => this.postAction(request))
        );
    }

    private postAction(request: IRequestGamePlayerModel): void {
        this.actions.forEach(action => this.reloadService.reload(action));
        this.modalService.close(RequestGamePlayerModal.Accept);
        this.result$ = null;
        this.notify(request.player);
        this.accepted.emit(request);
    }

    private notify(model: IPlayerModel): void {
        const notification: INotification = {
            severity: MessageSeverity.INFO,
            value: RequestGamePlayerAcceptModalLocalization.NOTIFICATION.ACCEPTED.VALUE,
            title: `${model.general.firstName} ${model.general.lastName}`
        };

        this.notificationService.notify(notification);
    }
}