import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MediaLimits, NgxSfcCommonModule, ResizeService, WINDOW } from 'ngx-sfc-common';
import { NgxSfcComponentsModule } from 'ngx-sfc-components';
import { of } from 'rxjs';
import { LogoComponent } from '@share/components';
import { IdentityService } from '@share/services';
import { BaseHeaderComponent } from './types/base/base-header.component';
import { LanguageTogglerComponent } from './parts/language-toggler/language-toggler.component';
import { AuthenticatedHeaderComponent } from './types/authenticated/authenticated-header.component';
import { WelcomeHeaderComponent } from './types/welcome/welcome-header.component';
import { HeaderComponent } from './header.component';
import { HeaderService } from './services/header.service';
import { HttpClientModule } from '@angular/common/http';

describe('Core.Component:Header', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let windowMock: any = <any>{ location: {} };
  let resizeServiceStub: Partial<ResizeService> = { onResize$: of(windowMock) };
  let identityServiceStub: Partial<IdentityService> = {
    getIsAuthenticated: () => of(false),
    getIsAnonymous: () => of(true)
  };
  let headerServiceStub: Partial<HeaderService> = { set: () => { } };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule, FontAwesomeModule,
        NoopAnimationsModule, NgxSfcCommonModule,
        NgxSfcComponentsModule
      ],
      declarations: [
        LogoComponent,
        HeaderComponent,
        BaseHeaderComponent,
        WelcomeHeaderComponent,
        AuthenticatedHeaderComponent,
        LanguageTogglerComponent
      ],
      providers: [
        { provide: IdentityService, useValue: identityServiceStub },
        { provide: ResizeService, useValue: resizeServiceStub },
        { provide: HeaderService, useValue: headerServiceStub },
        { provide: WINDOW, useFactory: (() => { return windowMock; }) }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('Should create component', () => {
    expect(component).toBeTruthy();
  });

  fit('Should have main elements', () => {
    expect(fixture.nativeElement.querySelector('.container')).toBeTruthy();
  });

  fit('Should show welcome header', () => {
    setAuthentication(false);

    expect(fixture.nativeElement.querySelector('sfc-welcome-header')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('sfc-authenticated-header')).toBeNull();
  });

  fit('Should show authenticated header', () => {
    setAuthentication(true);

    expect(fixture.nativeElement.querySelector('sfc-welcome-header')).toBeNull();
    expect(fixture.nativeElement.querySelector('sfc-authenticated-header')).toBeTruthy();
  });

  fit('Should toggle header when window width more than MobileLarge', () => {
    spyOn(headerServiceStub as any, 'set').and.callThrough();

    (headerServiceStub as any).open = true;

    windowMock.innerWidth = MediaLimits.MobileLarge + 1;
    (component as any).resizeService = resizeServiceStub;
    component.ngOnDestroy();
    component.ngAfterViewInit();

    window.dispatchEvent(new Event('resize'));
    fixture.detectChanges();

    expect(headerServiceStub.set).toHaveBeenCalledOnceWith(false);
  });

  fit('Should not toggle header when window width more than MobileLarge', () => {
    spyOn(headerServiceStub as any, 'set').and.callThrough();

    (headerServiceStub as any).open = true;

    windowMock.innerWidth = MediaLimits.MobileLarge;
    (component as any).resizeService = resizeServiceStub;
    component.ngOnDestroy();
    component.ngAfterViewInit();

    window.dispatchEvent(new Event('resize'));
    fixture.detectChanges();

    expect(headerServiceStub.set).not.toHaveBeenCalledOnceWith(false);
  });

  fit('Should not toggle header when not openned', () => {
    spyOn(headerServiceStub as any, 'set').and.callThrough();

    (headerServiceStub as any).open = false;

    windowMock.innerWidth = MediaLimits.MobileLarge + 1;
    (component as any).resizeService = resizeServiceStub;
    component.ngOnDestroy();
    component.ngAfterViewInit();

    window.dispatchEvent(new Event('resize'));
    fixture.detectChanges();

    expect(headerServiceStub.set).not.toHaveBeenCalledOnceWith(false);
  });

  fit('Should call unsubscribe on resize observable, when component destroyed', () => {
    const unsubscribeSpy = spyOn(
      (component as any)._resizeSubscription,
      'unsubscribe'
    ).and.callThrough();

    component?.ngOnDestroy();

    expect(unsubscribeSpy).toHaveBeenCalled();
  });

  function setAuthentication(isAuthenticated: boolean): void {
    identityServiceStub.getIsAuthenticated = () => of(isAuthenticated);
    identityServiceStub.getIsAnonymous = () => of(!isAuthenticated);
    component.ngOnInit();
    fixture.detectChanges();
  }
});