import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { MediaLimits, ResizeService } from 'ngx-sfc-common';
import { Observable, Subscription } from 'rxjs';
import { HeaderService } from './services/header.service';
import { IdentityService } from '@share/services/identity/identity.service';

@Component({
  selector: 'sfc-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {

  public authenticated$!: Observable<boolean>;

  public anonymous$!: Observable<boolean>;

  private _resizeSubscription?: Subscription;

  constructor(
    public identityService: IdentityService,
    private resizeService: ResizeService,
    private headerService: HeaderService
  ) { }

  ngOnInit(): void {
    this.authenticated$ = this.identityService.getIsAuthenticated();
    this.anonymous$ = this.identityService.getIsAnonymous();
  }

  ngAfterViewInit(): void {
    this._resizeSubscription = this.resizeService.onResize$
      .subscribe(window => {
        if (window.innerWidth > MediaLimits.MobileLarge && this.headerService.open)
          this.headerService.set(false);
      });
  }

  ngOnDestroy(): void {
    this._resizeSubscription?.unsubscribe();
  }
}