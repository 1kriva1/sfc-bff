import { Component, HostBinding, Input, OnInit } from "@angular/core";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faRulerVertical, faWeightScale } from "@fortawesome/free-solid-svg-icons";
import { any, Position, UIClass } from "ngx-sfc-common";
import { AvatarBadgePosition, ITableColumnExtendedModel, ITagModel } from "ngx-sfc-components";
import { IPlayerRowModel } from "./player-row.model";
import { getRaiting, getStars } from "@share/utils";
import { BasePlayerItemComponent } from "../base/base-player-item.component";
import { PlayerRowConstants } from "./player-row.constants";
import { PlayerRowLocalization } from "./player-row.localization";

@Component({
    selector: 'sfc-player-row',
    templateUrl: './player-row.component.html',
    styleUrls: ['./player-row.component.scss']
})
export class PlayerRowComponent
    extends BasePlayerItemComponent
    implements OnInit {

    faClock = faClock;
    faWeightScale = faWeightScale;
    faRulerVertical = faRulerVertical;

    Constants = PlayerRowConstants;
    Position = Position;
    AvatarBadgePosition = AvatarBadgePosition;
    PlayersRowLocalization = PlayerRowLocalization;

    @Input()
    columns: ITableColumnExtendedModel[] = [];

    @Input()
    @HostBinding(`class.` + UIClass.Expanded)
    expanded: boolean = false;

    public vm!: IPlayerRowModel;

    override ngOnInit(): void {
        super.ngOnInit();

        const days: ITagModel[] = this.days,
            hasAvailableDays: boolean = any(days),
            raiting = getRaiting(this.model.stats);

        this.vm = {
            age: this.age,
            availableTime: this.availableTime,
            city: this.model.general.city,
            raiting: raiting,
            days: days,
            hasAvailableDays: hasAvailableDays,
            hasAvailableTime: this.hasAvailableTime,
            hasNoAvailableData: !hasAvailableDays && !this.hasAvailableTime,
            hasSize: this.hasSize,
            position: this.getPosition(this.enumService.enums.footballPositions),
            height: this.model.football.height,
            weight: this.model.football.weight,
            firstName: this.model.general.firstName,
            lastName: this.model.general.lastName,
            photo: this.photo,
            physicalCondition: this.model.football.physicalCondition || 0,
            stars: getStars(raiting)
        };
    }
}