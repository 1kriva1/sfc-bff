import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Router } from "@angular/router";
import { CoreConstants } from "@core/constants";
import { IChangesCheck, IChangesCheckGuardModel } from "@core/guards/changes-check/changes-check.model";
import { ChangesCheckService } from "@core/guards/changes-check/changes-check.service";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { CommonConstants, IDefaultModalFooterModel, IDefaultModalHeaderModel, isEqual, ModalTemplate } from "ngx-sfc-common";
import { BehaviorSubject, map, Observable } from "rxjs";
import { ChangesCheckModalLocalization } from "./changes-check-modal.localization";

@Component({
    selector: 'sfc-changes-check-modal',
    templateUrl: './changes-check-modal.component.html',
    styleUrls: ['./changes-check-modal.component.scss']
})
export class ChangesCheckModalComponent {

    // icons
    faTriangleExclamation = faTriangleExclamation;

    // ngx-sfc-common
    ModalTemplate = ModalTemplate;

    // core
    CoreConstants = CoreConstants;

    /* Inputs */

    @Input()
    label: string = ChangesCheckModalLocalization.LABEL;

    /* End Inputs */

    /* Modal */

    public headerModel: IDefaultModalHeaderModel = {
        showCloseIcon: true,
        text: ChangesCheckModalLocalization.TITLE
    };

    public footerModel: IDefaultModalFooterModel = {
        applyButton: true,
        cancelButton: true,
        applyButtonText: ChangesCheckModalLocalization.BUTTONS.YES_DISCARD_CHANGES,
        cancelButtonText: ChangesCheckModalLocalization.BUTTONS.NO,
        onApply: (url: string) => {
            this.changesCheckService.discard();
            this.router.navigate([url]);
        }
    }

    /* End Modal */

    constructor(private changesCheckService: ChangesCheckService, private router: Router){}
}