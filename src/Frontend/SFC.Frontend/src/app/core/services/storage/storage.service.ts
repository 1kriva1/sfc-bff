import { Injectable } from '@angular/core';
import { isJsonString, isNullOrEmptyString, isObject } from 'ngx-sfc-common';
import { CoreConstants } from '../../constants';

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    set<T>(key: string, value: T | null): void {
        localStorage.setItem(this.keyValue(key), this.stringify(value));
    }

    get<T>(key: string, defaultValue: T | null = null): T | null {
        const value: string | null = localStorage.getItem(this.keyValue(key));
        return isNullOrEmptyString(value) ? defaultValue : this.parse<T>(value!);
    }

    getWithDefault<T>(key: string, defaultValue: T): T {
        const value: string | null = localStorage.getItem(this.keyValue(key));
        return isNullOrEmptyString(value) ? defaultValue : this.parse<T>(value!);
    }

    remove(key: string): void {
        localStorage.removeItem(this.keyValue(key));
    }

    private keyValue(key: string): string {
        return `${CoreConstants.APPLICATION_PREFIX}-${key}`;
    }

    private stringify<T>(value: T | null): string {
        return isObject(value) ? JSON.stringify(value) : `${value}`;
    }

    private parse<T>(value: string): T {
        return isJsonString(value) ? JSON.parse(value) : value;
    }
}