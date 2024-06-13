import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchPageComponent } from './pages/search/search.page.component';
import { SearchPageLocalization } from './pages/search/search.page.localization';
import { buildTitle } from '@core/utils';
import { LayoutConstants, RouteConstants } from '@core/constants';
import {
    BadgesViewComponent, DashboardViewComponent, GamesViewComponent,
    GeneralViewComponent, StatsViewComponent, TeamsViewComponent, ViewPageComponent
} from './pages/view';
import { ViewPagePart } from './pages/view/enums/view-page-part.enum';
import { ViewPageResolver } from './pages/view/resolver/view.page.resolver';
import { ViewPageConstants } from './pages/view/view.page.constants';

const routes: Routes = [
    {
        path: RouteConstants.DEFAULT_ROUTE_PATH,
        component: SearchPageComponent,
        title: buildTitle(SearchPageLocalization.ROUTER.TITLE.SEARCH)
    },
    {
        path: `:id`,
        component: ViewPageComponent,
        resolve: { [ViewPageConstants.RESOLVE_KEY]: ViewPageResolver },
        children: [
            {
                path: RouteConstants.DEFAULT_ROUTE_PATH,
                redirectTo: ViewPagePart.General,
                pathMatch: 'full'
            },
            {
                path: ViewPagePart.General,
                data: { layout: LayoutConstants.ONLY_HEADER_LAYOUT_MODEL },
                component: GeneralViewComponent
            },
            {
                path: ViewPagePart.Stats,
                data: { layout: LayoutConstants.ONLY_HEADER_LAYOUT_MODEL },
                component: StatsViewComponent
            },
            {
                path: ViewPagePart.Dashboard,
                data: { layout: LayoutConstants.ONLY_HEADER_LAYOUT_MODEL },
                component: DashboardViewComponent
            },
            {
                path: ViewPagePart.Games,
                data: { layout: LayoutConstants.ONLY_HEADER_LAYOUT_MODEL },
                component: GamesViewComponent
            },
            {
                path: ViewPagePart.Teams,
                data: { layout: LayoutConstants.ONLY_HEADER_LAYOUT_MODEL },
                component: TeamsViewComponent
            },
            {
                path: ViewPagePart.Badges,
                data: { layout: LayoutConstants.ONLY_HEADER_LAYOUT_MODEL },
                component: BadgesViewComponent
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PlayerRoutingModule { }
