import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { ActivationStart, Router, Scroll } from '@angular/router';
import { isDefined, nameof, Theme } from 'ngx-sfc-common';
import { INotificationAutoCloseModel } from 'ngx-sfc-components';
import { Subscription } from 'rxjs';
import { IRouteDataModel, ILayoutModel, IThemeModel, IScrollModel } from '@core/models';
import { NotificationService } from '@core/services';
import { ThemeService } from '@share/components/theme-toggler/services/theme/theme.service';
import { AppComponentConstants } from './app.component.constants';
import { ViewportScroller } from '@angular/common';
import { getDeepestRoute } from '@core/utils';

@Component({
  selector: 'sfc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  public layout: ILayoutModel = { header: false, footer: false };

  @HostBinding('class')
  public get themeValue(): Theme | null {
    return this.theme?.enabled ? this.theme.value || this.themeService.theme : null;
  }

  public notificationAutoCloseModel: INotificationAutoCloseModel = {
    enabled: true,
    interval: AppComponentConstants.NOTIFICATION_AUTO_CLOSE_INTERVAL
  };

  private theme: IThemeModel = { enabled: true };

  private _layoutSubscription!: Subscription;

  constructor(
    public notificationService: NotificationService,
    private themeService: ThemeService,
    private router: Router,
    private viewportScroller: ViewportScroller
  ) { }

  ngOnInit(): void {
    this._layoutSubscription = this.router.events.subscribe(event => {
      if (event instanceof ActivationStart) {
        const dataValue: IRouteDataModel = event.snapshot.data as IRouteDataModel,
          theme: IThemeModel = dataValue[nameof<IRouteDataModel>('theme')] as IThemeModel;

        this.layout = dataValue[nameof<IRouteDataModel>('layout')] as ILayoutModel;

        if (isDefined(theme)) {
          this.theme = theme;
        }
      }

      if (event instanceof Scroll) {
        // Back / forward navigation
        if (event.position) {
          this.viewportScroller.scrollToPosition(event.position);
          return;
        }

        // Anchor navigation
        if (event.anchor) {
          this.viewportScroller.scrollToAnchor(event.anchor);
          return;
        }

        const activeRoute = this.router.routerState.root,
          deepestRoute = getDeepestRoute(activeRoute),
          scroll = deepestRoute.snapshot.data?.[nameof<IRouteDataModel>('scroll')] as IScrollModel;

        // Normal navigation
        if (!scroll?.disableAutoScroll) {
          this.viewportScroller.scrollToPosition([0, 0]);
        }
      }
    });
  }

  ngOnDestroy(): void {
    this._layoutSubscription.unsubscribe();
  }
}