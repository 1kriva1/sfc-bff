import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Observable, tap, EMPTY, filter } from "rxjs";
import {
    IDefaultModalFooterModel, IDefaultModalHeaderModel,
    ModalService, ModalTemplate, NotificationType, ReloadService
} from "ngx-sfc-common";
import { BaseErrorResponse } from "@core/models";
import { INotification, NotificationService } from "@core/services";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { MessageSeverity } from "@core/services/message/message-severity.enum";
import { IInviteGamePlayerCancelResponse, InviteGamePlayerService } from "../../../../../../../services";
import { IPlayerModel } from "../../../../../../../models/player/player.model";
import { InviteGamePlayerModal } from "../invite-game-player-modal.enum";
import { InviteGamePlayerCancelModalLocalization } from "./invite-game-player-cancel-modal.localization";
import { IInviteGamePlayerModel } from "@share/models";

@Component({
    selector: 'sfc-invite-game-player-cancel-modal',
    templateUrl: './invite-game-player-cancel-modal.component.html',
    styleUrls: ['./invite-game-player-cancel-modal.component.scss']
})
export class InviteGamePlayerCancelModalComponent {

    // icons
    faTriangleExclamation = faTriangleExclamation;

    // ngx-sfc-common
    ModalTemplate = ModalTemplate;
    NotificationType = NotificationType;

    // components
    InviteTeamPlayerModal = InviteGamePlayerModal;
    Localization = InviteGamePlayerCancelModalLocalization;

    /* Inputs */

    @Input()
    actions: string[] = [];

    /* End Inputs */

    /* Outputs */

    @Output()
    canceled: EventEmitter<IInviteGamePlayerModel> = new EventEmitter<IInviteGamePlayerModel>();

    /* End Outputs */

    /* Fields */

    public headerModel: IDefaultModalHeaderModel = {
        text: InviteGamePlayerCancelModalLocalization.MODAL.HEADER.TITLE,
        showCloseIcon: true
    };

    public footerModel: IDefaultModalFooterModel = {
        applyButtonText: InviteGamePlayerCancelModalLocalization.MODAL.FOOTER.BUTTON.APPLY,
        cancelButtonText: InviteGamePlayerCancelModalLocalization.MODAL.FOOTER.BUTTON.CANCEL,
        onApply: () => this.cancel(),
        onCancel: () => this.modalService.close(InviteGamePlayerModal.Cancel)
    }

    /* Fields */

    /* Observables */

    public result$: Observable<BaseErrorResponse> | null = EMPTY;

    /* End Observables */

    constructor(
        public modalService: ModalService,
        private inviteGamePlayerService: InviteGamePlayerService,
        private notificationService: NotificationService,
        private reloadService: ReloadService) {
    }

    private cancel(): void {
        const invite: IInviteGamePlayerModel = this.modalService.args;

        this.result$ = this.inviteGamePlayerService.cancel(invite.id, invite.game.game.id, invite.player.id).pipe(
            filter((response: IInviteGamePlayerCancelResponse) => response.Success),
            tap((_: IInviteGamePlayerCancelResponse) => this.postAction(invite))
        );
    }

    private postAction(invite: IInviteGamePlayerModel): void {
        this.actions.forEach(action => this.reloadService.reload(action));
        this.modalService.close(InviteGamePlayerModal.Cancel);
        this.result$ = null;
        this.notify(invite.player);
        this.canceled.emit(invite);
    }

    private notify(model: IPlayerModel): void {
        const notification: INotification = {
            severity: MessageSeverity.INFO,
            value: InviteGamePlayerCancelModalLocalization.NOTIFICATION.CANCELED.VALUE,
            title: `${model.general.firstName} ${model.general.lastName}`
        };

        this.notificationService.notify(notification);
    }
}