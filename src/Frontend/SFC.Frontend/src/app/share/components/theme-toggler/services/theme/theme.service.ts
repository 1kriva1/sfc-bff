import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Theme } from 'ngx-sfc-common';
import { StorageService } from '@core/services';
import { CoreConstants } from '@core/constants';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    private themeSubject: BehaviorSubject<Theme> =
        new BehaviorSubject<Theme>(this.storageService.get<Theme>(CoreConstants.THEME_KEY, Theme.Default) as Theme);

    public theme$: Observable<Theme> = this.themeSubject.asObservable();

    public get theme(): Theme {
        return this.themeSubject.value;
    }

    constructor(private storageService: StorageService) { }

    toggle(): void {
        const newTheme: Theme = this.theme === Theme.Default ? Theme.Dark : Theme.Default;
        this.storageService.set(CoreConstants.THEME_KEY, newTheme);
        this.themeSubject.next(newTheme);
    }
}