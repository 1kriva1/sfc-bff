import { IStatsMetadataModel } from "@share/models";
import { StatsValue } from "@share/types";
import { getMetadata, getStars } from "@share/utils";
import { CommonConstants } from "ngx-sfc-common";

export class EditPageRaitingViewModel {
    public model: { [key: string]: IStatsMetadataModel };

    public total: number = 0;

    public value: number = 0;

    public percentage: number = 0;

    public stars: number = 0;

    constructor(public stats: StatsValue) {
        this.model = getMetadata(stats);
        this.total = Object.values(this.model).reduce((accumulator: number, model: IStatsMetadataModel) =>
            accumulator += model.total, 0);
        this.value = Object.values(this.model).reduce((accumulator: number, model: IStatsMetadataModel) =>
            accumulator += model.value, 0);
        this.percentage = Math.ceil(this.value / this.total * CommonConstants.FULL_PERCENTAGE);
        this.stars = getStars(this.value, this.total);
    }
}