import { ActivatedRoute, ActivatedRouteSnapshot, Navigation, NavigationExtras, Route, Router } from "@angular/router";
import { IBackNavigationModel, IBuildActionParameters } from "@core/models";
import { isDefined, isNullOrEmptyString, isNumeric, where } from "ngx-sfc-common";
import { CoreConstants, RouteConstants } from "../../constants";
import { OneTimeAccessService } from "../../guards/allow-access/one-time-access.guard";

export function buildPath(key: string): string {
    return `/${key}`;
}

export function buildTitle(title: string): string {
    return `${CoreConstants.APPLICATION_PREFIX.toUpperCase()} - ${title}`;
}

export function getUrlSegment(url: string, index: number | null = null): string {
    const segments: string[] = url.split('?')[0].split('/');
    return index !== null ? segments[index] : segments.pop()!
}

export function getUrlSegments(url: string, start?: number, end?: number): string[] {
    const segments: string[] = url.split('?')[0].split('/');
    return segments.slice(start, end);
}

export function getPartUrlSegments(url: string): string[] {
    const segments: string[] = getUrlSegments(url);
    return where(segments, segment => !isNumeric(segment)) || [];
}

export function buildFallbackRoute(redirectTo: string): Route {
    return {
        path: RouteConstants.DEFAULT_ROUTE_PATH,
        redirectTo: redirectTo,
        pathMatch: 'full'
    }
}

export function getRouteId(route: ActivatedRouteSnapshot, idRoutePathName: string = RouteConstants.ID_ROUTE_PATH): number {
    const id: string | null = route.paramMap.get(idRoutePathName);

    if (isNullOrEmptyString(id) && route.parent) {
        return getRouteId(route.parent, idRoutePathName);
    }

    if (isNullOrEmptyString(id)) {
        throw new Error(`Route parameter: ${idRoutePathName} is missing.`);
    }

    return +id!;
}

export function buildNavigationExtras(key: string, value: any, navigationExtras: NavigationExtras | null = null): NavigationExtras {
    navigationExtras = navigationExtras ?? { state: {} };

    if (!navigationExtras.state) {
        navigationExtras.state = {};
    }

    navigationExtras.state[key] = value;

    return navigationExtras;
}

export function addNavigationExtras(value: [string, any][], navigationExtras: NavigationExtras | null = null): NavigationExtras {
    value.forEach(item => buildNavigationExtras(item[0], item[1], navigationExtras));
    return navigationExtras!;
}

export function getValueFromNavigationExtras(key: string, navigation: Navigation | null): any {
    return navigation?.extras.state ? navigation?.extras.state![key] : null;
}

export function buildBackNavigationExtras(url: string, label: string): NavigationExtras {
    const model: IBackNavigationModel = { url, label };

    return buildNavigationExtras(RouteConstants.BACK_NAVIGATION_ROUTE_PATH_STATE_VALUE_KEY, model)
}

export function getBackNavigationModel(navigation: Navigation | null): IBackNavigationModel | null {
    return getValueFromNavigationExtras(RouteConstants.BACK_NAVIGATION_ROUTE_PATH_STATE_VALUE_KEY, navigation);
}

export function getRouteData<T>(snapshot: ActivatedRouteSnapshot, key: string, defaultValue: T | null = null): T | null {
    return snapshot.data[key]?.result || defaultValue;
}

export function getDataFromRoute<T>(route: ActivatedRoute, key: string, defaultValue: T | null = null): T | null {
    return route.snapshot.data[key]?.result || defaultValue;
}

export function getDataFromParentRoute<T>(route: ActivatedRoute, key: string, defaultValue: T | null = null): T | null {
    if (route.parent) {
        return route.parent!.snapshot.data[key]?.result || defaultValue;
    }

    return defaultValue;
}

export function getDataFromRouteRecursively<T>(route: ActivatedRoute, key: string): T | null {
    let data: T | null = getDataFromRoute<T>(route, key);

    if (isDefined(data)) {
        return data;
    }

    if (route.parent) {
        return getDataFromRouteRecursively<T>(route.parent, key);
    }

    return data;
}

export function buildActionParameters(router: Router, state: any = undefined): IBuildActionParameters {
    return { router, state }
}

export function getDeepestRoute(route: ActivatedRoute): ActivatedRoute {
    while (route.firstChild) {
        route = route.firstChild;
    }

    return route;
}

export function navigateWithOneTimeAccess(router: Router, oneTimeAccessService: OneTimeAccessService, command: string): Promise<boolean> {
    oneTimeAccessService.grantAccess(command);
    return router.navigate([command]);
}