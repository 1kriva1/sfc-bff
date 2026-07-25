import { inject, Injectable } from '@angular/core';
import { Router, CanActivateFn, ActivatedRouteSnapshot } from '@angular/router';
import { buildPath, getRouteId, replaceRouteIdInPath } from '@core/utils';
import { HomeRoute } from '@share/enums';

@Injectable({
    providedIn: 'root'
})
export class OneTimeAccessService {
    private allowedUrl: string | null = null;

    constructor(private router: Router) { }

    public grantAccess(url: string): void {
        this.allowedUrl = url;
    }

    public canActivate(route: ActivatedRouteSnapshot): boolean {
        // Build current URL from route
        const currentUrl = '/' + route.pathFromRoot
            .filter(v => v.url.length > 0)
            .map(v => v.url.map(segment => segment.path).join('/'))
            .join('/');

        // Check if this URL was explicitly allowed
        if (this.allowedUrl === currentUrl) {
            // Clear the flag immediately (one-time use)
            this.allowedUrl = null;
            return true;
        }

        // Not allowed - redirect
        let redirectUrl = route.data['redirectUrl'];

        if (redirectUrl) {
            const routeId: number = getRouteId(route);
            redirectUrl = replaceRouteIdInPath(redirectUrl, routeId)
        }

        this.router.navigate([redirectUrl || buildPath(HomeRoute.Home)]);

        return false;
    }
}

export const CanActivateOnlyOneTimeAccess: CanActivateFn =
    (route: ActivatedRouteSnapshot) =>
        inject(OneTimeAccessService).canActivate(route);