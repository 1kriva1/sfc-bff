import { Directive, HostBinding, Input, OnInit } from "@angular/core";
import { Locale, RoutKey } from "@core/enums";
import { IDropdownMenuItemModel, ITagModel } from "ngx-sfc-components";
import { any, CommonConstants, ComponentSize, convertDateToTimestamp, empty, firstOrDefault, getAge, isDefined } from "ngx-sfc-common";
import { StorageService } from "@core/services";
import { CommonConstants as ApplicationCommonConstants } from '@core/constants/common.constants';
import { getWeekDays } from "@core/utils";
import { IEnumModel } from "@core/types";
import { IStatsTypeModel } from "@share/models";
import { getTypes } from "@share/utils";
import { IStatTypeEnumModel } from "@share/services/enum/models/enums.model";
import { EnumService } from "@share/services";
import { Router } from "@angular/router";
import { faUserPlus, faUser, faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import { BasePlayerItemLocalization } from "./base-player-item.localization";
import { IPlayersTableModel } from "../players-table.model";
import { UIConstants } from "@core/constants";

@Directive()
export abstract class BasePlayerItemComponent implements OnInit {

    ComponentSize = ComponentSize;
    Localization = BasePlayerItemLocalization;

    @Input()
    model!: IPlayersTableModel;

    @Input()
    actions!: IDropdownMenuItemModel[];

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
            click: () => this.router.navigate([`${RoutKey.Players}/${this.model.id}`])
        }
    ];

    protected locale: Locale;

    // public tableActions: IDropdownMenuItemModel[] = [];

    constructor(
        protected storageService: StorageService,
        protected enumService: EnumService,
        private router: Router) {
        this.locale = this.storageService.get<Locale>(ApplicationCommonConstants.LOCALE_KEY, Locale.English)!;
    }
    ngOnInit(): void {

        this.actions = isDefined(this.actions) ? this.actions : this.ACTION_ITEMS;

        // this.tableActions = this.model.actions;

        // this.actions.forEach(action=>{
        //     this.tableActions.push({
        //         label: action.label,
        //         delimeter: action.delimeter,
        //         icon: action.icon,
        //         image: action.image,
        //         value: this.model,
        //         click: action.click
        //     });
        // });
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
        return this.model?.general.photo || ApplicationCommonConstants.DEFAULT_AVATAR_PATH;
    }

    protected getPosition(positions: IEnumModel<number>[]): IEnumModel<number> | empty {
        return isDefined(this.model?.football.position)
            ? firstOrDefault(positions, p => p.key == this.model.football.position)
            : null;
    }

    protected getGameStyle(gameStyles: IEnumModel<number>[]): IEnumModel<number> | empty {
        return isDefined(this.model?.football.gameStyle)
            ? firstOrDefault(gameStyles, p => p.key == this.model.football.gameStyle)
            : null;
    }

    protected getWorkingFoot(workingFoots: IEnumModel<number>[]): IEnumModel<number> | empty {
        return isDefined(this.model?.football.workingFoot)
            ? firstOrDefault(workingFoots, p => p.key == this.model.football.workingFoot)
            : null;
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