import { CommonConstants, empty, isDefined, isNullOrEmptyString, isObject, nameof } from "ngx-sfc-common";
import { isSelectValue, isRangeLimitValue, IRangeLimitValueModel } from "ngx-sfc-inputs";
import { IPredicateMapModel, IPredicateMetadataModel } from "./predicate.model";
import { MapPredicateModelFunction } from "./predicate.type";

export function mapPredicateMetadataModels(value: any, map: MapPredicateModelFunction, enums?: any | empty, parentPath: string = ''): IPredicateMetadataModel[] {
    if (!isDefined(value)) {
        return [];
    }

    let result: IPredicateMetadataModel[] = [];

    Object.keys(value).forEach(key => {
        const path: string = parentPath ? `${parentPath}.${key}` : key,
            propertyValue = value[key];

        if (isObject(propertyValue) && isExcludedObjectType(propertyValue)) {
            pushPredicateMetadataModels(path, propertyValue, map, result, enums);
        } else if (Array.isArray(propertyValue)) {
            propertyValue.map((value: any) => {
                if (isObject(value)) {
                    mapPredicateMetadataModel(value, path, map, enums);
                } else {
                    pushPredicateMetadataModel(key, path, value, map, result, enums);
                }
            });
        } else {
            if (!isExcludedValue(key, propertyValue, value)) {
                pushPredicateMetadataModel(key, path, propertyValue, map, result, enums);
            }
        }
    });

    return result;
}

function isExcludedObjectType(value: any): boolean {
    return !isSelectValue(value);
}

function isExcludedValue(key: string, propertyValue: any, value: any): boolean {
    if (isNullOrEmptyString(propertyValue)) {
        return true;
    }

    if (isRangeLimitValue(value)) {
        const rangeLimitValue: IRangeLimitValueModel = value as IRangeLimitValueModel;

        switch (key) {
            case nameof<IRangeLimitValueModel>('from'):
                return rangeLimitValue.from == CommonConstants.LOW_PERCENTAGE;
            case nameof<IRangeLimitValueModel>('to'):
                return rangeLimitValue.to == CommonConstants.FULL_PERCENTAGE;
        }
    }

    return false;
}

function pushPredicateMetadataModels(path: string, value: any, map: MapPredicateModelFunction, result: IPredicateMetadataModel[], enums?: any | empty): void {
    const model: IPredicateMetadataModel[] = mapPredicateMetadataModels(value, map, enums, path);
    result.push(...model);
}

function pushPredicateMetadataModel(key: string, path: string, value: any, map: MapPredicateModelFunction, result: IPredicateMetadataModel[], enums?: any | empty): void {
    const model: IPredicateMetadataModel = mapPredicateMetadataModel(key, path, value, map, enums);
    result.push(model);
}

function mapPredicateMetadataModel(key: string, path: string, value: any, map: MapPredicateModelFunction, enums?: any | empty): IPredicateMetadataModel {
    const mapResult: IPredicateMapModel = map({ key, path, value, enums });

    return {
        key: key,
        path: path,
        value: value,
        mapValue: isDefined(mapResult.value) ? mapResult.value : value,
        label: mapResult.label,
        icon: mapResult.icon,
        image: mapResult.image,
        debounce: mapResult.debounce
    };
}