import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutConstants, RouteConstants } from '@core/constants';
import { CanMatchOnlyAnonymous, CanMatchOnlyAuthenticated } from '@core/guards';
import { NotFoundPageComponent } from '@core/pages';
import { buildFallbackRoute, buildPath } from '@core/utils';
import {
  HomeRoute, InviteRoute, PlayerRoute, ProfileRoute,
  RequestRoute, SchemeRoute, TeamRoute, WelcomeRoute
} from '@share/enums';
import { HomePageComponent } from './features/home/pages/home/home.page.component';
import { WelcomePageComponent } from './features/welcome/pages';

const routes: Routes = [
  {
    path: WelcomeRoute.Welcome,
    component: WelcomePageComponent,
    data: {
      layout: LayoutConstants.FULL_LAYOUT_MODEL,
      theme: { enabled: false }
    },
    canMatch: [CanMatchOnlyAnonymous]
  },
  {
    path: HomeRoute.Home,
    component: HomePageComponent,
    data: { layout: LayoutConstants.ONLY_HEADER_LAYOUT_MODEL },
    canMatch: [CanMatchOnlyAuthenticated]
  },
  {
    path: ProfileRoute.Profiles,
    loadChildren: () => import('./features/profile/profile.module').then(m => m.ProfileModule),
    data: { layout: LayoutConstants.ONLY_HEADER_LAYOUT_MODEL },
    canMatch: [CanMatchOnlyAuthenticated]
  },
  {
    path: PlayerRoute.Players,
    loadChildren: () => import('./features/player/player.module').then(m => m.PlayerModule),
    data: { layout: LayoutConstants.ONLY_HEADER_LAYOUT_MODEL },
    canMatch: [CanMatchOnlyAuthenticated]
  },
  {
    path: TeamRoute.Teams,
    loadChildren: () => import('./features/team/team.module').then(m => m.TeamModule),
    data: { layout: LayoutConstants.ONLY_HEADER_LAYOUT_MODEL },
    canMatch: [CanMatchOnlyAuthenticated]
  },
  {
    path: InviteRoute.Invites,
    loadChildren: () => import('./features/invite/invite.module').then(m => m.InviteModule),
    data: { layout: LayoutConstants.ONLY_HEADER_LAYOUT_MODEL },
    canMatch: [CanMatchOnlyAuthenticated]
  },
  {
    path: RequestRoute.Requests,
    loadChildren: () => import('./features/request/request.module').then(m => m.RequestModule),
    data: { layout: LayoutConstants.ONLY_HEADER_LAYOUT_MODEL },
    canMatch: [CanMatchOnlyAuthenticated]
  },
  {
    path: SchemeRoute.Schemes,
    loadChildren: () => import('./features/scheme/scheme.module').then(m => m.SchemeModule),
    data: { layout: LayoutConstants.ONLY_HEADER_LAYOUT_MODEL },
    canMatch: [CanMatchOnlyAuthenticated]
  },
  buildFallbackRoute(buildPath(WelcomeRoute.Welcome)),
  {
    path: RouteConstants.NOT_FOUND_ROUTE_PATH,
    component: NotFoundPageComponent,
    data: {
      layout: LayoutConstants.ONLY_CONTENT_LAYOUT_MODEL,
      theme: { enabled: false }
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
    onSameUrlNavigation: 'reload',
    scrollOffset: [0, 64],
    enableTracing: false
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
