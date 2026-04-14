import { Routes } from "@angular/router";
import { RouteKey } from "../enums";
import { IScrollModel } from "../models";

export class RouteConstants {
    static DEFAULT_ROUTE_PATH: string = '';
    static NOT_FOUND_ROUTE_PATH: string = '**';
    static ID_ROUTE_PATH: string = 'id';
    static BACK_NAVIGATION_ROUTE_PATH_STATE_VALUE_KEY: string = 'back-navigation';
    static DEFAULT_ROUTE_FALLBACK: Routes = [{
        path: RouteConstants.DEFAULT_ROUTE_PATH,
        redirectTo: RouteKey.Create,
        pathMatch: 'full'
    }];
    static DISABLED_AUTO_SCROLL_MODEL: IScrollModel = { disableAutoScroll: true };
}