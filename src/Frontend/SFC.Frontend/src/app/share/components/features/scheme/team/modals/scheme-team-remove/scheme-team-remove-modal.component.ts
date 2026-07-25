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
import { ISchemeTeamModel } from "@share/models/scheme/team/scheme-team.model";
import { SchemeTeamModal } from "../scheme-team-modal.enum";
import { SchemeTeamRemoveModalLocalization } from "./scheme-team-remove-modal.localization";
import { IRemoveTeamSchemeResponse, SchemeTeamService } from "@share/services";

@Component({
    selector: 'sfc-scheme-team-remove-modal',
    templateUrl: './scheme-team-remove-modal.component.html',
    styleUrls: ['./scheme-team-remove-modal.component.scss']
})
export class SchemeTeamRemoveModalComponent {

    // icons
    faTriangleExclamation = faTriangleExclamation;

    // ngx-sfc-common
    ModalTemplate = ModalTemplate;
    NotificationType = NotificationType;

    // components
    SchemeTeamModal = SchemeTeamModal;
    Localization = SchemeTeamRemoveModalLocalization;

    /* Inputs */

    @Input()
    actions: string[] = [];

    /* End Inputs */

    /* Outputs */

    @Output()
    removed: EventEmitter<ISchemeTeamModel> = new EventEmitter<ISchemeTeamModel>();

    /* End Outputs */

    /* Fields */

    public headerModel: IDefaultModalHeaderModel = {
        text: SchemeTeamRemoveModalLocalization.MODAL.HEADER.TITLE,
        showCloseIcon: true
    };

    public footerModel: IDefaultModalFooterModel = {
        applyButtonText: SchemeTeamRemoveModalLocalization.MODAL.FOOTER.BUTTON.APPLY,
        cancelButtonText: SchemeTeamRemoveModalLocalization.MODAL.FOOTER.BUTTON.CANCEL,
        onApply: () => this.remove(),
        onCancel: () => this.modalService.close(SchemeTeamModal.Remove)
    }

    /* Fields */

    /* Observables */

    public result$: Observable<BaseErrorResponse> | null = EMPTY;

    /* End Observables */

    constructor(
        public modalService: ModalService,
        private schemeTeamService: SchemeTeamService,
        private notificationService: NotificationService,
        private reloadService: ReloadService) {
    }

    private remove(): void {
        const scheme: ISchemeTeamModel = this.modalService.args;

        this.result$ = this.schemeTeamService.remove(scheme.id, scheme.team.id).pipe(
            filter((response: IRemoveTeamSchemeResponse) => response.Success),
            tap((_: IRemoveTeamSchemeResponse) => this.postAction(scheme))
        );
    }

    private postAction(scheme: ISchemeTeamModel): void {
        this.actions.forEach(action => this.reloadService.reload(action));
        this.modalService.close(SchemeTeamModal.Remove);
        this.result$ = null;
        this.notify(scheme);
        this.removed.emit(scheme);
    }

    private notify(scheme: ISchemeTeamModel): void {
        const notification: INotification = {
            severity: MessageSeverity.INFO,
            value: SchemeTeamRemoveModalLocalization.NOTIFICATION.REMOVED.VALUE,
            title: `${scheme.profile.general.name}`
        };

        this.notificationService.notify(notification);
    }
}