import { registerLocaleData } from '@angular/common';
import { APP_INITIALIZER, Injectable, LOCALE_ID } from '@angular/core';
import { loadTranslations } from '@angular/localize';
import { CommonConstants, isNullOrEmptyString, mergeDeep } from 'ngx-sfc-common';
import { Locale } from '../../enums';
import { StorageService, CookieService } from '../../services';
import { CoreConstants } from '../../constants';
import { Feature, InviteFeature, RequestFeature, SchemeFeature, TeamFeature } from '@share/enums';

@Injectable({
    providedIn: 'root',
})
class I18nInitializer {
    public locale = Locale.English;

    public async setLocale(storageService: StorageService, cookieService: CookieService): Promise<void> {
        const userLocale = storageService.get<Locale>(CoreConstants.LOCALE_KEY);

        if (userLocale) {
            this.locale = userLocale;
        }

        cookieService.set(CoreConstants.LOCALE_KEY, this.locale);

        await import(
            /* webpackInclude: /\b(en-GB|ru-UA)\.mjs/ */
            `/node_modules/@angular/common/locales/${this.locale}`)
            .then(localeModule => registerLocaleData(localeModule.default))
            .catch(() => console.warn(`Missing locale: ${this.locale}`));

        const coreTranslationsModule = await this.loadPartTranslationsAsync('core'),
            shareTranslationsModule = await this.loadPartTranslationsAsync('share'),
            homeTranslations = await this.loadFeatureTranslationsAsync(Feature.Home),
            welcomeTranslations = await this.loadFeatureTranslationsAsync(Feature.Welcome),
            profileTranslations = await this.loadFeatureTranslationsAsync(Feature.Profile),
            playerTranslations = await this.loadFeatureTranslationsAsync(Feature.Player),
            teamTranslations = await this.loadFeatureTranslationsAsync(Feature.Team),
            teamGeneralTranslations = await this.loadFeatureTranslationsAsync(Feature.Team, this.buildFeaturePath(TeamFeature.General)),
            teamPlayerTranslations = await this.loadFeatureTranslationsAsync(Feature.Team, this.buildFeaturePath(TeamFeature.Player)),
            inviteTranslations = await this.loadFeatureTranslationsAsync(Feature.Invite),
            inviteTeamPlayerTranslations = await this.loadFeatureTranslationsAsync(Feature.Invite, this.buildFeaturePath(InviteFeature.Team, InviteFeature.Player)),
            requestTranslations = await this.loadFeatureTranslationsAsync(Feature.Request),
            requestTeamPlayerTranslations = await this.loadFeatureTranslationsAsync(Feature.Request, this.buildFeaturePath(RequestFeature.Team, RequestFeature.Player)),
            schemeTranslations = await this.loadFeatureTranslationsAsync(Feature.Scheme),
            schemeTeamTranslations = await this.loadFeatureTranslationsAsync(Feature.Scheme, this.buildFeaturePath(SchemeFeature.Team));

        const translations = mergeDeep(
            coreTranslationsModule,
            shareTranslationsModule,
            homeTranslations,
            welcomeTranslations,
            profileTranslations,
            playerTranslations,
            // team
            teamTranslations,
            teamGeneralTranslations,
            teamPlayerTranslations,
            // invite
            inviteTranslations,
            inviteTeamPlayerTranslations,
            // request
            requestTranslations,
            requestTeamPlayerTranslations,
            // scheme
            schemeTranslations,
            schemeTeamTranslations);

        loadTranslations(translations);
    }

    private async loadPartTranslationsAsync(part: string): Promise<{}> {
        const featureTranslations = await import(`src/app/${part}/assets/i18n/${this.locale}.json`),
            translations = featureTranslations.default;

        return Object.keys(translations).reduce((a, c) => ((a as any)[`${part}.${c}`] = translations[c], a), {});
    }

    private async loadFeatureTranslationsAsync(featureKey: string, path: string | null = null): Promise<{}> {
        const featureTranslations = await import(`src/app/features/${featureKey}${isNullOrEmptyString(path) ? CommonConstants.EMPTY_STRING : `/${path}`}/assets/i18n/${this.locale}.json`),
            translations = featureTranslations.default;

        return Object.keys(translations).reduce((a, c) => ((a as any)[`feature.${featureKey}.${c}`] = translations[c], a), {});
    }

    private buildFeaturePath(...parts: string[]): string { return `parts/${parts.join('/')}`; }
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