import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Observable, tap, EMPTY, filter } from "rxjs";
import {
    IDefaultModalFooterModel, IDefaultModalHeaderModel, ModalService, 
    ModalTemplate, NotificationType, ReloadService
} from "ngx-sfc-common";
import { BaseErrorResponse } from "@core/models";
import { INotification, NotificationService } from "@core/services";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { MessageSeverity } from "@core/services/message/message-severity.enum";
import { SchemeGameTeamModalRemoveLocalization } from "./scheme-game-team-modal-remove.localization";
import { ISchemeGameTeamRemoveResponse, SchemeGameTeamService } from "@share/services";
import { SchemeGameTeamModal } from "../scheme-game-team-modal.enum";
import { ISchemeGameTeamModel } from "@share/models";

@Component({
    selector: 'sfc-scheme-game-team-modal-remove',
    templateUrl: './scheme-game-team-modal-remove.component.html',
    styleUrls: ['./scheme-game-team-modal-remove.component.scss']
})
export class SchemeGameTeamModalRemoveComponent {

    // icons
    faTriangleExclamation = faTriangleExclamation;

    // ngx-sfc-common
    ModalTemplate = ModalTemplate;
    NotificationType = NotificationType;

    // components
    SchemeGameTeamModal = SchemeGameTeamModal;
    Localization = SchemeGameTeamModalRemoveLocalization;

    /* Inputs */

    @Input()
    actions: string[] = [];

    /* End Inputs */

    /* Outputs */

    @Output()
    removed: EventEmitter<ISchemeGameTeamModel> = new EventEmitter<ISchemeGameTeamModel>();

    /* End Outputs */

    /* Fields */

    public headerModel: IDefaultModalHeaderModel = {
        text: SchemeGameTeamModalRemoveLocalization.MODAL.HEADER.TITLE,
        showCloseIcon: true
    };

    public footerModel: IDefaultModalFooterModel = {
        applyButtonText: SchemeGameTeamModalRemoveLocalization.MODAL.FOOTER.BUTTON.APPLY,
        cancelButtonText: SchemeGameTeamModalRemoveLocalization.MODAL.FOOTER.BUTTON.CANCEL,
        onApply: () => this.remove(),
        onCancel: () => this.modalService.close(SchemeGameTeamModal.Remove)
    }

    /* Fields */

    /* Observables */

    public result$: Observable<BaseErrorResponse> | null = EMPTY;

    /* End Observables */

    constructor(
        public modalService: ModalService,
        private schemeGameTeamService: SchemeGameTeamService,
        private notificationService: NotificationService,
        private reloadService: ReloadService) {
    }

    private remove(): void {
        const scheme: ISchemeGameTeamModel = this.modalService.args;

        this.result$ = this.schemeGameTeamService.remove(scheme.id, scheme.game.game.id, scheme.team.id).pipe(
            filter((response: ISchemeGameTeamRemoveResponse) => response.Success),
            tap((_: ISchemeGameTeamRemoveResponse) => this.postAction(scheme))
        );
    }

    private postAction(scheme: ISchemeGameTeamModel): void {
        this.actions.forEach(action => this.reloadService.reload(action));
        this.modalService.close(SchemeGameTeamModal.Remove);
        this.result$ = null;
        this.notify(scheme);
        this.removed.emit(scheme);
    }

    private notify(scheme: ISchemeGameTeamModel): void {
        const notification: INotification = {
            severity: MessageSeverity.INFO,
            value: SchemeGameTeamModalRemoveLocalization.NOTIFICATION.REMOVED.VALUE,
            title: `${scheme.profile.general.name}`
        };

        this.notificationService.notify(notification);
    }
}