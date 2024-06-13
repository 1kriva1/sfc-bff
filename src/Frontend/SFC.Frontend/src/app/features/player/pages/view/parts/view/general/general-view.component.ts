import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Locale } from "@core/enums";
import { StorageService } from "@core/services";
import { IEnumModel } from "@core/types";
import {
    faCakeCandles, faClock, faGamepad, faGift, faHeart, faMoneyBill1,
    faReceipt, faRulerVertical, faShirt, faSocks, faStreetView, faTag, faUserClock, faWallet, faWeightScale
} from "@fortawesome/free-solid-svg-icons";
import { any, CommonConstants, ComponentSize, convertDateToTimestamp, Direction, isDefined } from "ngx-sfc-common";
import { ITagModel } from "ngx-sfc-components";
import { map, Observable } from "rxjs";
import { GeneralViewLocalization } from "./general-view.localization";
import { IGeneralViewModel } from "./general-view.model";
import { CommonConstants as ApplicationCommonConstants } from '@core/constants/common.constants';
import { getMonths } from "@core/utils";
import { ViewPageConstants } from "../../../view.page.constants";
import { IPlayerModel } from "../../../mapper/models";

@Component({
    templateUrl: './general-view.component.html',
    styleUrls: ['../base/base-view.component.scss', './general-view.component.scss']
})
export class GeneralViewComponent implements OnInit {

    faReceipt = faReceipt;
    faTag = faTag;
    faCakeCandles = faCakeCandles;
    faMoneyBill1 = faMoneyBill1;
    faUserClock = faUserClock;
    faClock = faClock;
    faStreetView = faStreetView;
    faGamepad = faGamepad;
    faGift = faGift;
    faSocks = faSocks;
    faWeightScale = faWeightScale;
    faRulerVertical = faRulerVertical;
    faHeart = faHeart;
    faShirt = faShirt;

    ComponentSize = ComponentSize;
    Localization = GeneralViewLocalization;
    Direction = Direction;

    public vm$!: Observable<IGeneralViewModel>;

    private locale: Locale;

    constructor(
        private route: ActivatedRoute,
        private storageService: StorageService,
    ) {
        this.locale = this.storageService.get<Locale>(ApplicationCommonConstants.LOCALE_KEY, Locale.English)!;
    }

    ngOnInit(): void {
        if (this.route.parent) {
            this.vm$ = this.route.parent.data.pipe(
                map(data => {
                    const model: IPlayerModel = data[ViewPageConstants.RESOLVE_KEY].result,
                        days: ITagModel[] = model.general.availability.days
                            ? model.general.availability.days.map((d: IEnumModel<number>) => ({ label: d.value }))
                            : [],
                        hasAvailableDays: boolean = any(days),
                        hasAvailableTime = isDefined(model?.general.availability.from)
                            || isDefined(model?.general.availability.to);

                    return {
                        available: {
                            days: days,
                            time: this.getAvailableTime(model),
                            hasDays: hasAvailableDays,
                            hasTime: hasAvailableTime
                        },
                        birthday: model.general.birthday ? {
                            day: model.general.birthday.getDate(),
                            month: (getMonths(model.general.birthday?.getUTCMonth()!) as IEnumModel<number>).value,
                            year: model.general.birthday.getFullYear()
                        } : null,
                        biography: model.general.biography,
                        tags: model.general.tags?.map(tag => ({ label: tag })) || [],
                        freePlay: {
                            value: model.general.freePlay,
                            icon: model.general.freePlay ? faGift : faWallet,
                        },
                        position: {
                            main: model.football.position,
                            additional: model.football.additionalPosition
                        },
                        physicalCondition: model.football.physicalCondition || 0,
                        size: {
                            height: model.football.height,
                            weight: model.football.weight
                        },
                        gameStyle: model.football.gameStyle,
                        skill: model.football.skill || 0,
                        foots: {
                            working: model.football.workingFoot,
                            weekFoot: model.football.weakFoot
                        },
                        number: isDefined(model.football.number) ? model.football.number : null
                    };
                })
            )
        }
    }

    private getAvailableTime(model: IPlayerModel): string {
        if (model?.general.availability.from && model.general.availability.to)
            return `${this.Localization.AVAILABILITY.FROM} ${convertDateToTimestamp(model.general.availability.from, this.locale)} 
            ${this.Localization.AVAILABILITY.TO} ${convertDateToTimestamp(model.general.availability.to, this.locale)}`
        else if (model?.general.availability.from)
            return `${this.Localization.AVAILABILITY.FROM} ${convertDateToTimestamp(model.general.availability.from, this.locale)}`
        else if (model?.general.availability.to)
            return `${this.Localization.AVAILABILITY.TO} ${convertDateToTimestamp(model.general.availability.to, this.locale)}`
        else
            return CommonConstants.EMPTY_STRING;
    }
}
