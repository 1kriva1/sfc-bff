import { registerLocaleData } from '@angular/common';
import { APP_INITIALIZER, Injectable, LOCALE_ID } from '@angular/core';
import { loadTranslations } from '@angular/localize';
import { Feature, Locale } from '../../enums';
import { CommonConstants as Constants } from '../../constants';
import { mergeDeep } from 'ngx-sfc-common';
import { StorageService, CookieService } from '../../services';

@Injectable({
    providedIn: 'root',
})
class I18nInitializer {
    public locale = Locale.English;

    public async setLocale(storageService: StorageService, cookieService: CookieService): Promise<void> {
        const userLocale = storageService.get<Locale>(Constants.LOCALE_KEY);

        if (userLocale) {
            this.locale = userLocale;
        }

        cookieService.set(Constants.LOCALE_KEY, this.locale);

        await import(
            /* webpackInclude: /\b(en-GB|ru-UA)\.mjs/ */
            `/node_modules/@angular/common/locales/${this.locale}`)
            .then(localeModule => registerLocaleData(localeModule.default))
            .catch(() => console.warn(`Missing locale: ${this.locale}`));

        const coreTranslationsModule = await this.loadTranslations('core'),
            shareTranslationsModule = await this.loadTranslations('share'),
            homeTranslations = await this.loadFeatureTranslations(Feature.Home),
            welcomeTranslations = await this.loadFeatureTranslations(Feature.Welcome),
            profileTranslations = await this.loadFeatureTranslations(Feature.Profile),
            playerTranslations = await this.loadFeatureTranslations(Feature.Player);

        const translations = mergeDeep(
            coreTranslationsModule,
            shareTranslationsModule,
            homeTranslations,
            welcomeTranslations,
            profileTranslations,
            playerTranslations);

        loadTranslations(translations);
    }

    private async loadFeatureTranslations(featureKey: string): Promise<{}> {
        const featureTranslations = await import(`src/app/features/${featureKey}/assets/i18n/${this.locale}.json`),
            translations = featureTranslations.default;

        return Object.keys(translations).reduce((a, c) => ((a as any)[`feature.${featureKey}.${c}`] = translations[c], a), {});
    }

    private async loadTranslations(part: string): Promise<{}> {
        const featureTranslations = await import(`src/app/${part}/assets/i18n/${this.locale}.json`),
            translations = featureTranslations.default;

        return Object.keys(translations).reduce((a, c) => ((a as any)[`${part}.${c}`] = translations[c], a), {});
    }
}

function setLocale() {
    return {
        provide: APP_INITIALIZER,
        useFactory: (i18n: I18nInitializer, storageService: StorageService, cookieService: CookieService) =>
            () => i18n.setLocale(storageService, cookieService),
        deps: [I18nInitializer, StorageService, CookieService],
        multi: true,
    };
}

function setLocaleId() {
    return {
        provide: LOCALE_ID,
        useFactory: (i18n: I18nInitializer) => i18n.locale,
        deps: [I18nInitializer],
    };
}

export const I18nModule = {
    setLocale: setLocale,
    setLocaleId: setLocaleId
};