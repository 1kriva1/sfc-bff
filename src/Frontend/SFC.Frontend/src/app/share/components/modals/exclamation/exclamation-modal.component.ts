import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import {
    IDefaultModalFooterModel, IDefaultModalHeaderModel, ModalService, ModalTemplate, NotificationType
} from "ngx-sfc-common";
import { faTriangleExclamation, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { CoreLocalization } from "@core/localization";

@Component({
    selector: 'sfc-exclamation-modal',
    templateUrl: './exclamation-modal.component.html',
    styleUrls: ['./exclamation-modal.component.scss']
})
export class ExclamationModalComponent implements OnInit {

    // ngx-sfc-common
    ModalTemplate = ModalTemplate;
    NotificationType = NotificationType;

    // core
    CoreLocalization = CoreLocalization;

    /* Inputs */

    @Input()
    id!: string;

    @Input()
    icon: IconDefinition = faTriangleExclamation;

    @Input()
    title: string | null = null;

    @Input()
    text: string | null = null;

    @Input()
    applyLabel: string = CoreLocalization.OK;

    @Input()
    cancelLabel: string = CoreLocalization.CANCEL;

    /* End Inputs */

    /* Outputs */

    @Output()
    apply: EventEmitter<any> = new EventEmitter<any>();

    /* End Outputs */

    /* Fields */

    public headerModel!: IDefaultModalHeaderModel;

    public footerModel!: IDefaultModalFooterModel;

    /* Fields */

    constructor(public modalService: ModalService) { }

    ngOnInit(): void {
        this.headerModel = {
            text: this.title!,
            showCloseIcon: true
        };

        this.footerModel = {
            applyButtonText: this.applyLabel,
            cancelButtonText: this.cancelLabel,
            onApply: () => this.onApply(),
            onCancel: () => this.modalService.close(this.id)
        }
    }

    private onApply(): void {
        this.apply.emit(this.modalService.args);
        this.modalService.close(this.id);
    }
}