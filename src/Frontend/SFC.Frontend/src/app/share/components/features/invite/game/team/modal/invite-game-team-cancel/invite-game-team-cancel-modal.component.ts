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
import { IInviteGameTeamCancelResponse, InviteGameTeamService } from "../../../../../../../services";
import { InviteGameTeamModal } from "../invite-game-team-modal.enum";
import { InviteGameTeamCancelModalLocalization } from "./invite-game-team-cancel-modal.localization";
import { ITeamModel } from "@share/models";
import { IInviteGameTeamModel } from "@share/models/invite/invite-game-team.model";

@Component({
    selector: 'sfc-invite-game-team-cancel-modal',
    templateUrl: './invite-game-team-cancel-modal.component.html',
    styleUrls: ['./invite-game-team-cancel-modal.component.scss']
})
export class InviteGameTeamCancelModalComponent {

    // icons
    faTriangleExclamation = faTriangleExclamation;

    // ngx-sfc-common
    ModalTemplate = ModalTemplate;
    NotificationType = NotificationType;

    // components
    InviteGameTeamModal = InviteGameTeamModal;
    Localization = InviteGameTeamCancelModalLocalization;

    /* Inputs */

    @Input()
    actions: string[] = [];

    /* End Inputs */

    /* Outputs */

    @Output()
    canceled: EventEmitter<IInviteGameTeamModel> = new EventEmitter<IInviteGameTeamModel>();

    /* End Outputs */

    /* Fields */

    public headerModel: IDefaultModalHeaderModel = {
        text: InviteGameTeamCancelModalLocalization.MODAL.HEADER.TITLE,
        showCloseIcon: true
    };

    public footerModel: IDefaultModalFooterModel = {
        applyButtonText: InviteGameTeamCancelModalLocalization.MODAL.FOOTER.BUTTON.APPLY,
        cancelButtonText: InviteGameTeamCancelModalLocalization.MODAL.FOOTER.BUTTON.CANCEL,
        onApply: () => this.cancel(),
        onCancel: () => this.modalService.close(InviteGameTeamModal.Cancel)
    }

    /* Fields */

    /* Observables */

    public result$: Observable<BaseErrorResponse> | null = EMPTY;

    /* End Observables */

    constructor(
        public modalService: ModalService,
        private inviteGameTeamService: InviteGameTeamService,
        private notificationService: NotificationService,
        private reloadService: ReloadService) {
    }

    private cancel(): void {
        const invite: IInviteGameTeamModel = this.modalService.args;

        this.result$ = this.inviteGameTeamService.cancel(invite.id, invite.game.game.id, invite.team.id).pipe(
            filter((response: IInviteGameTeamCancelResponse) => response.Success),
            tap((_: IInviteGameTeamCancelResponse) => this.postAction(invite))
        );
    }

    private postAction(invite: IInviteGameTeamModel): void {
        this.actions.forEach(action => this.reloadService.reload(action));
        this.modalService.close(InviteGameTeamModal.Cancel);
        this.result$ = null;
        this.notify(invite.team);
        this.canceled.emit(invite);
    }

    private notify(model: ITeamModel): void {
        const notification: INotification = {
            severity: MessageSeverity.INFO,
            value: InviteGameTeamCancelModalLocalization.NOTIFICATION.CANCELED.VALUE,
            title: `${model.profile.general.name}`
        };

        this.notificationService.notify(notification);
    }
}