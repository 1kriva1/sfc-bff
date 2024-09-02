import { Injectable } from "@angular/core";
import { isValueModel } from "@core/utils";
import { any, CommonConstants, isNullOrEmptyString, isObject } from "ngx-sfc-common";
import { map, Observable } from "rxjs";
import { ICreatePageModel } from "../../pages/create/models/create.page.model";
import { IProgressModel } from "./progress.model";

@Injectable({
    providedIn: 'root'
})
export class ProgressService {

    public get progress$(): Observable<IProgressModel> {
        return this.value$?.pipe(
            map((model: any) => {
                const properties = this.getControlsCount(model),
                    filled = this.getControlsCount(model, (value: any) =>
                        Array.isArray(value) ? any(value) : !isNullOrEmptyString(value));
                return {
                    properties: properties,
                    filled: filled,
                    percentage: Math.ceil(filled / properties * CommonConstants.FULL_PERCENTAGE)
                }
            })
        );
    }

    private value$!: Observable<any>

    public init(value$: Observable<any>): void {
        this.value$ = value$;
    }

    private getControlsCount(value: any,
        predicate: ((value: any) => boolean) | null = null): number {
        let count = 0;

        if (isObject(value) && !isValueModel(value)) {
            Object.values(value).forEach(prop =>
                count += this.getControlsCount(prop, predicate));

            return count;
        }

        return predicate ? predicate(value) ? 1 : 0 : 1;
    }
}