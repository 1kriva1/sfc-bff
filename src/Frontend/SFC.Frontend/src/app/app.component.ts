import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { ActivationStart, Router } from '@angular/router';
import { isDefined, nameof, Theme } from 'ngx-sfc-common';
import { INotificationAutoCloseModel } from 'ngx-sfc-components';
import { Subscription } from 'rxjs';
import { IRouteDataModel, ILayoutModel, IThemeModel } from '@core/models';
import { NotificationService } from '@core/services';
import { ThemeService } from '@share/components/theme-toggler/services/theme/theme.service';
import { AppComponentConstants } from './app.component.constants';

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
    private router: Router) { }

  ngOnInit(): void {
    this._layoutSubscription = this.router.events.subscribe(data => {
      if (data instanceof ActivationStart) {
        const dataValue: IRouteDataModel = data.snapshot.data as IRouteDataModel,
          theme: IThemeModel = dataValue[nameof<IRouteDataModel>('theme')] as IThemeModel;

        this.layout = dataValue[nameof<IRouteDataModel>('layout')] as ILayoutModel;

        if (isDefined(theme)) {
          this.theme = theme;
        }
      }
    });
  }

  ngOnDestroy(): void {
    this._layoutSubscription.unsubscribe();
  }
}