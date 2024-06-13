import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { MediaLimits, ResizeService } from 'ngx-sfc-common';
import { Observable, Subscription } from 'rxjs';
import { HeaderService } from './services/header.service';
import { IdentityService } from '@share/services/identity/identity.service';

@Component({
  selector: 'sfc-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements AfterViewInit, OnDestroy {

  public authenticated$: Observable<boolean> = this.identityService.getIsAuthenticated();

  public anonymous$: Observable<boolean> = this.identityService.getIsAnonymous();

  private _resizeSubscription?: Subscription;

  constructor(
    public identityService: IdentityService,
    private resizeService: ResizeService,
    private headerService: HeaderService
  ) { }

  ngAfterViewInit(): void {
    this._resizeSubscription = this.resizeService.onResize$
      .subscribe(window => {
        if (window.innerWidth > MediaLimits.MobileLarge && this.headerService.open)
          this.headerService.toggleByValue(false);
      });
  }

  ngOnDestroy(): void {
    this._resizeSubscription?.unsubscribe();
  }
}