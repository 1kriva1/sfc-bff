import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutKey } from '@core/enums';
import { ChangesCheckGuard } from '@core/guards';
import { EditPageComponent } from './pages/edit/edit.page.component';
import { EditPageLocalization } from './pages/edit/edit.page.localization';
import { CanMatchOnlyNewProfile, CanActivateOnlyUserProfile } from './guards';
import { buildTitle } from '@core/utils';
import { RouteConstants } from '@core/constants';
import { EditPageConstants } from './pages/edit/edit.page.constants';
import { EditPageResolver } from './pages/edit/resolver/edit.page.resolver';

const routes: Routes = [
  {
    path: RoutKey.Create,
    component: EditPageComponent,
    title: buildTitle(EditPageLocalization.ROUTER.TITLE.CREATE),
    canMatch: [CanMatchOnlyNewProfile]
  },
  {
    path: `:id/${RoutKey.Edit}`,
    component: EditPageComponent,
    resolve: { [EditPageConstants.RESOLVE_KEY]: EditPageResolver },
    canActivate: [CanActivateOnlyUserProfile],
    canDeactivate: [ChangesCheckGuard]
  },
  {
    path: RouteConstants.DEFAULT_ROUTE_PATH,
    redirectTo: RoutKey.Create,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
