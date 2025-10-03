import { Directive, HostBinding, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { faUserPlus, faUser, faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import { any, CommonConstants, ComponentSize, convertDateToTimestamp, getAge, isDefined } from "ngx-sfc-common";
import { IDropdownMenuItemModel, ITagModel } from "ngx-sfc-components";
import { Locale } from "@core/enums";
import { StorageService } from "@core/services";
import { CoreConstants, UIConstants } from "@core/constants";
import { getWeekDays } from "@core/utils";
import { IEnumModel } from "@core/types";
import { IStatsTypeModel } from "@share/models";
import { getTypes } from "@share/utils/stats";
import { EnumService } from "@share/services";
import { IStatTypeEnumModel } from "@share/services/enum/models/enum/stat-type-enum.model";
import { BasePlayerItemLocalization } from "./base-player-item.localization";
import { IPlayersTableModel } from "../models/players-table.model";
import { PlayerRoute } from "@share/enums";

@Directive()
export abstract class BasePlayerItemComponent implements OnInit {

    ComponentSize = ComponentSize;
    Localization = BasePlayerItemLocalization;

    @Input()
    model!: IPlayersTableModel;

    @HostBinding('class')
    protected get positionClass(): string {
        return isDefined(this.model?.football.position)
            ? `${UIConstants.POSITION_CLASS_PART}${this.model.football.position}`
            : CommonConstants.EMPTY_STRING;
    }

    public ACTION_ITEMS: IDropdownMenuItemModel[] = [
        {
            label: this.Localization.TABLE.ACTIONS.INVITE_TO_GAME,
            icon: faUserPlus
        },
        {
            label: this.Localization.TABLE.ACTIONS.ADD_TO_TEAM,
            icon: faPeopleGroup,
            delimeter: true
        },
        {
            label: this.Localization.TABLE.ACTIONS.OPEN_PROFILE,
            icon: faUser,
            click: () => this.router.navigate([`${PlayerRoute.Players}/${this.model.id}`])
        }
    ];

    protected locale: Locale;

    constructor(
        protected storageService: StorageService,
        protected enumService: EnumService,
        private router: Router) {
        this.locale = this.storageService.get<Locale>(CoreConstants.LOCALE_KEY, Locale.English)!;
    }

    ngOnInit(): void {
        if (!any(this.model.actions)) {
            this.model.actions = this.ACTION_ITEMS;
        }
    }

    protected get availableTime(): string {
        if (this.model?.general.availability.from && this.model.general.availability.to)
            return `${this.Localization.FROM} ${convertDateToTimestamp(this.model.general.availability.from, this.locale)} 
            ${this.Localization.TO} ${convertDateToTimestamp(this.model.general.availability.to, this.locale)}`
        else if (this.model?.general.availability.from)
            return `${this.Localization.FROM} ${convertDateToTimestamp(this.model.general.availability.from, this.locale)}`
        else if (this.model?.general.availability.to)
            return `${this.Localization.TO} ${convertDateToTimestamp(this.model.general.availability.to, this.locale)}`
        else
            return CommonConstants.EMPTY_STRING;
    }

    protected get days(): ITagModel[] {
        return any(this.model?.general.availability.days)
            ? (getWeekDays(this.model.general.availability.days) as IEnumModel<number>[]).map(d => ({ label: d.value }))
            : [];
    }

    protected get hasAvailableTime(): boolean {
        return isDefined(this.model?.general.availability.from)
            || isDefined(this.model?.general.availability.to);
    }

    protected get age(): number | null {
        return this.model?.general.birthday ? getAge(this.model.general.birthday) : null;
    }

    protected get hasSize(): boolean {
        return isDefined(this.model?.football.height) || isDefined(this.model?.football.weight);
    }

    protected get tags(): ITagModel[] {
        return this.model?.general.tags?.map(tag => ({ label: tag }))!;
    }

    protected get photo(): string {
        return this.model?.general.photo || CoreConstants.DEFAULT_AVATAR_PATH;
    }

    protected getTypes(statTypes: IStatTypeEnumModel[], statSkills: IEnumModel<number>[]): IStatsTypeModel[] {
        return this.model?.stats ? getTypes(this.model?.stats, statTypes, statSkills)
            .map(type => ({
                label: type.label,
                value: Math.ceil((type.value / type.total) * CommonConstants.FULL_PERCENTAGE),
                total: type.total
            })) : [];
    }
}