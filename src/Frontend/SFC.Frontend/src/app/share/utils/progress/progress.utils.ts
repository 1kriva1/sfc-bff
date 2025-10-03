import { map, Observable } from "rxjs";
import { any, CommonConstants, isNullOrEmptyString, isObject } from "ngx-sfc-common";
import { isValueModel } from "@core/utils";
import { IMapProgressModel } from "./models/progress.model";

export function mapProgress(value$: Observable<any>): Observable<IMapProgressModel> {
    return value$.pipe(
        map((value: any) => {
            const properties = _getControlsCount(value),
                filled = _getControlsCount(value, (item: any) =>
                    Array.isArray(item) ? any(item) : !isNullOrEmptyString(item));
            return {
                progress: {
                    properties: properties,
                    filled: filled,
                    percentage: Math.ceil(filled / properties * CommonConstants.FULL_PERCENTAGE)
                },
                value: value
            };
        })
    );

    function _getControlsCount(value: any,
        predicate: ((value: any) => boolean) | null = null): number {
        let count = 0;

        if (isObject(value) && !isValueModel(value)) {
            Object.values(value).forEach(prop =>
                count += _getControlsCount(prop, predicate));

            return count;
        }

        return predicate ? predicate(value) ? 1 : 0 : 1;
    }
}