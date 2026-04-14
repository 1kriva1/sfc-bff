import { CommonConstants, sum, where } from "ngx-sfc-common";
import { getProgressColorDefaultFunc } from "ngx-sfc-components";
import { IEnumModel } from "@core/types";
import { StatsConstants } from "../../constants/stats.constants";
import { IStatsModel } from "../../models/common/stats/stats.model";
import { IPlayerModel, IStatsMetadataModel, IStatsTypeModel } from "../../models";
import { StatsValue } from "../../types";
import { IStatTypeEnumModel } from "../../services/enum/models/enum/stat-type-enum.model";
import { IPlayerStatValueModel } from "../../services";

export function getStars(value: number, total: number = CommonConstants.FULL_PERCENTAGE): number {
    return StatsConstants.MAX_STARS_VALUE * value / total;
}

export function getStatsStars(stats: StatsValue[]): number {
    const length: number = stats.length || 1,
        raitings: number[] = stats.map(value => getRaiting(value)),
        sum: number = raitings.reduce((a, b) => a + b, 0),
        total = StatsConstants.MAX_STAT_VALUE * length;

    return StatsConstants.MAX_STARS_VALUE * sum / total;
}

export function getPlayersStars(players: IPlayerModel[]): number {
    const stats: any = players.map(player => player.stats);
    return getStatsStars(stats);
}

export function getRaiting(value: StatsValue): number {
    const initial = { total: 0, value: 0 },
        result = Object.keys(value)
            .reduce((statsAccumulator: any, key: string) => {
                const valueStats: number[] = Object.values(value[+key]),
                    statsValue = sum(valueStats, (value: number) => value);
                return ({
                    total: statsAccumulator.total += valueStats.length * StatsConstants.MAX_STAT_VALUE,
                    value: statsAccumulator.value += statsValue
                });
            }, initial);

    return Math.ceil(result.value / (result.total || 1) * CommonConstants.FULL_PERCENTAGE);
}

export function getStatsRaiting(value: StatsValue[]): number {
    const length: number = value.length || 1,
        raitings: number[] = value.map(stats => getRaiting(stats)),
        sum: number = raitings.reduce((a, b) => a + b, 0);

    return Math.round((sum / length));
}

export function getPlayersRaiting(players: IPlayerModel[]): number {
    const stats: any = players.map(player => player.stats);
    return getStatsRaiting(stats);
}

export function getTypes(
    value: StatsValue,
    statTypes: IStatTypeEnumModel[],
    statSkills: IEnumModel<number>[]): IStatsTypeModel[] {
    const groupedSkills: any = statSkills.reduce((groups, skill) => {
        (groups as any)[skill.value] = where(statTypes, t => t.skill === skill.key)?.map(t => t.key)
        return groups;
    }, {});

    let allStatsList: { [key: string]: number } = {};

    Object.values(value).forEach((group: any) => {
        Object.keys(group).forEach(key => {
            allStatsList[key] = group[key];
        });
    });

    const result: IStatsTypeModel[] = [];

    Object.keys(groupedSkills).forEach(skill => {
        let value = 0;
        const skillTypes = groupedSkills[skill];
        skillTypes.forEach((type: string) => value += allStatsList[type]);

        result.push({
            label: skill,
            description: 'This is a test description. In future description will be defined on server side (with localization).',
            total: skillTypes.length * CommonConstants.FULL_PERCENTAGE,
            value: value
        });
    });

    return result;
}

export function getModel(types: IStatTypeEnumModel[],
    categories: IEnumModel<number>[]): IStatsModel[] {
    return categories.map(category => ({
        key: category.key,
        label: category.value,
        items: where(types, type => type.category === category.key)!.map(type => ({
            key: type.key,
            label: type.value,
            skill: type.skill
        }))
    }));
}

export function getMetadata(value: StatsValue): { [key: string]: IStatsMetadataModel } {
    return Object.keys(value)
        .reduce((statsAccumulator: any, key: string) => {
            const valueStats: any[] = Object.values((value as any)[key]),
                statValue = sum(valueStats, (value: number) => value),
                average = Math.ceil(statValue / valueStats.length);

            return ({
                ...statsAccumulator,
                [key]: {
                    total: valueStats.length * StatsConstants.MAX_STAT_VALUE,
                    value: statValue,
                    count: valueStats.length,
                    average: average,
                    color: getProgressColorDefaultFunc(average)
                }
            });
        }, {});
}

export function convertFromServerStats(
    stats: IPlayerStatValueModel[],
    statTypes: IStatTypeEnumModel[]): StatsValue {
    const result: StatsValue = {},
        categories = statTypes.reduce((r, a) => {
            r[a.category] = r[a.category] || [];
            r[a.category].push(a);
            return r;
        }, Object.create(null));

    Object.keys(categories).forEach((category: string) => {
        const types = categories[category].map((type: IStatTypeEnumModel) => type.key),
            categoryTypes = where(stats, stat => types.includes(stat.Type))!;

        result[+category] = categoryTypes.reduce((controlAccumulator: any, item: IPlayerStatValueModel) =>
            ({ ...controlAccumulator, [item.Type]: item.Value }), {})
    });

    return result;
}

export function getAverageStatsValue(values: StatsValue[]): StatsValue {
    const sums: Record<number, Record<number, number>> = {};
    const counts: Record<number, Record<number, number>> = {};

    for (const stats of values) {
        for (const catKey in stats) {
            const categoryId = Number(catKey);
            const types = stats[categoryId];
            if (!types) continue;

            if (!sums[categoryId]) sums[categoryId] = {};
            if (!counts[categoryId]) counts[categoryId] = {};

            for (const typeKey in types) {
                const typeId = Number(typeKey);
                const value = types[typeId];
                if (Number.isFinite(value)) {
                    sums[categoryId][typeId] = (sums[categoryId][typeId] ?? 0) + value;
                    counts[categoryId][typeId] = (counts[categoryId][typeId] ?? 0) + 1;
                }
            }
        }
    }

    // Build the averaged result in the original shape
    const result: StatsValue = {};
    
    for (const catKey in sums) {
        const categoryId = Number(catKey);
        result[categoryId] = {};
        for (const typeKey in sums[categoryId]) {
            const typeId = Number(typeKey);
            const count = counts[categoryId][typeId] ?? 0;
            result[categoryId][typeId] = count === 0 ? 0 : Math.ceil(sums[categoryId][typeId] / count);
        }
    }

    return result;
}