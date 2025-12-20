import { empty, isDefined, isNullOrEmptyString, isObject } from "ngx-sfc-common";
import { IPredicateMapModel, IPredicateMetadataModel } from "./predicate.model";
import { MapPredicateModelFunction } from "./predicate.type";

export function mapPredicateMetadataModels(value: any, map: MapPredicateModelFunction, enums?: any | empty): IPredicateMetadataModel[] {
    if (!isDefined(value)) {
        return [];
    }

    let result: IPredicateMetadataModel[] = [];

    Object.keys(value).forEach(key => {
        const propertyValue = value[key];

        if (isObject(propertyValue)) {
            pushPredicateMetadataModels(propertyValue, map, result, enums);
        } else if (Array.isArray(propertyValue)) {
            propertyValue.map((value: any) => {
                if (isObject(value)) {
                    mapPredicateMetadataModel(value, map, enums);
                } else {
                    pushPredicateMetadataModel(key, value, map, result, enums);
                }
            });
        } else {
            if (isDefined(value[key]) && !isNullOrEmptyString(propertyValue)) {
                pushPredicateMetadataModel(key, propertyValue, map, result, enums);
            }
        }
    });

    return result;
}

function pushPredicateMetadataModels(value: any, map: MapPredicateModelFunction, result: IPredicateMetadataModel[], enums?: any | empty): void {
    const model: IPredicateMetadataModel[] = mapPredicateMetadataModels(value, map, enums);
    result.push(...model);
}

function pushPredicateMetadataModel(key: string, value: any, map: MapPredicateModelFunction, result: IPredicateMetadataModel[], enums?: any | empty): void {
    const model: IPredicateMetadataModel = mapPredicateMetadataModel(key, value, map, enums);
    result.push(model);
}

function mapPredicateMetadataModel(key: string, value: any, map: MapPredicateModelFunction, enums?: any | empty): IPredicateMetadataModel {
    const mapResult: IPredicateMapModel = map(key, value, enums);

    return {
        key: key,
        value: value,
        mapValue: isDefined(mapResult.value) ? mapResult.value : value,
        label: mapResult.label,
        icon: mapResult.icon,
        image: mapResult.image,
        debounce: mapResult.debounce
    };
}