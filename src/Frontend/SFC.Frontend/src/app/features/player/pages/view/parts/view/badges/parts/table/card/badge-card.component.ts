import { Component, HostBinding, Input } from "@angular/core";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { IBadgeCardModel } from "./badge-card.model";
import { BadgeCardConstants } from "./badge-card.constants";
import { BadgeStatus } from "../../../enums/badge-status.enum";
import { BadgeCardLocalization } from "./badge-card.localization";

@Component({
    selector: 'sfc-badge-card',
    templateUrl: './badge-card.component.html',
    styleUrls: ['./badge-card.component.scss']
})
export class BadgeCardComponent {

    faPlus = faPlus;

    Localization = BadgeCardLocalization;

    @Input()
    model!: IBadgeCardModel;

    @HostBinding('class')
    private get _status(): string {
        return `${BadgeCardConstants.STATUS_CLASS_PART}${this.status}`;
    }

    private get status(): BadgeStatus {
        if (this.model.progress == 0)
            return BadgeStatus.NotStarted;
        else if (this.model.progress == this.model.total)
            return BadgeStatus.Completed;
        else
            return BadgeStatus.Active;
    }
}