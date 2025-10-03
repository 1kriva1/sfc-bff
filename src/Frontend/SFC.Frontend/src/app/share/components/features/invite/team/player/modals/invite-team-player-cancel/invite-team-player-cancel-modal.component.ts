import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Observable, tap, EMPTY, filter } from "rxjs";
import {
    empty, IDefaultModalFooterModel, IDefaultModalHeaderModel,
    ModalService, ModalTemplate, NotificationType, ReloadService
} from "ngx-sfc-common";
import { BaseErrorResponse } from "@core/models";
import { INotification, NotificationService } from "@core/services";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { MessageSeverity } from "@core/services/message/message-severity.enum";
import { InviteTeamPlayerCancelModalLocalization } from "./invite-team-player-cancel-modal.localization";
import { InviteTeamPlayerModal } from "../invite-team-player-modal.enum";
import { ITeamPlayerInviteModel } from "../../../../../../../models/invite/team-player-invite.model";
import { ICancelTeamPlayerInviteResponse, InviteTeamPlayerService } from "../../../../../../../services";
import { IPlayerModel } from "../../../../../../../models/player/player.model";

@Component({
    selector: 'sfc-invite-team-player-cancel-modal',
    templateUrl: './invite-team-player-cancel-modal.component.html',
    styleUrls: ['./invite-team-player-cancel-modal.component.scss']
})
export class InviteTeamPlayerCancelModalComponent {

    // icons
    faTriangleExclamation = faTriangleExclamation;

    // ngx-sfc-common
    ModalTemplate = ModalTemplate;
    NotificationType = NotificationType;

    // components
    InviteTeamPlayerModal = InviteTeamPlayerModal;
    Localization = InviteTeamPlayerCancelModalLocalization;

    /* Inputs */

    @Input()
    action: string | empty;

    /* End Inputs */

    /* Outputs */

    @Output()
    canceled: EventEmitter<ITeamPlayerInviteModel> = new EventEmitter<ITeamPlayerInviteModel>();

    /* End Outputs */

    /* Fields */

    public headerModel: IDefaultModalHeaderModel = {
        text: InviteTeamPlayerCancelModalLocalization.MODAL.HEADER.TITLE,
        showCloseIcon: true
    };

    public footerModel: IDefaultModalFooterModel = {
        applyButtonText: InviteTeamPlayerCancelModalLocalization.MODAL.FOOTER.BUTTON.APPLY,
        cancelButtonText: InviteTeamPlayerCancelModalLocalization.MODAL.FOOTER.BUTTON.CANCEL,
        onApply: () => this.cancel(),
        onCancel: () => this.modalService.close(InviteTeamPlayerModal.Cancel)
    }

    /* Fields */

    /* Observables */

    public result$: Observable<BaseErrorResponse> | null = EMPTY;

    /* End Observables */

    constructor(
        public modalService: ModalService,
        private inviteTeamPlayerService: InviteTeamPlayerService,
        private notificationService: NotificationService,
        private reloadService: ReloadService) {
    }

    private cancel(): void {
        const invite: ITeamPlayerInviteModel = this.modalService.args;

        this.result$ = this.inviteTeamPlayerService.cancel(invite.id, invite.team.id, invite.player.id).pipe(
            filter((response: ICancelTeamPlayerInviteResponse) => response.Success),
            tap((_: ICancelTeamPlayerInviteResponse) => this.postAction(invite))
        );
    }

    private postAction(invite: ITeamPlayerInviteModel): void {
        if (this.action) {
            this.reloadService.reload(this.action);
        }

        this.modalService.close(InviteTeamPlayerModal.Cancel);
        this.result$ = null;
        this.notify(invite.player);
        this.canceled.emit(invite);
    }

    private notify(model: IPlayerModel): void {
        const notification: INotification = {
            severity: MessageSeverity.INFO,
            value: InviteTeamPlayerCancelModalLocalization.NOTIFICATION.CANCELED.VALUE,
            title: `${model.general.firstName} ${model.general.lastName}`
        };

        this.notificationService.notify(notification);
    }
}