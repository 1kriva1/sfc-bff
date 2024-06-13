import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { By, Title } from "@angular/platform-browser";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { ActivatedRoute, NavigationExtras, Router, RouterModule } from "@angular/router";
import { HeaderService } from "@core/components";
import { buildTitle } from "@core/utils";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ShareModule } from "@share/share.module";
import { StatsValue } from "@share/types";
import { STATS } from "@test/stubs";
import { ComponentSize, NgxSfcCommonModule, Position } from "ngx-sfc-common";
import { NgxSfcComponentsModule } from "ngx-sfc-components";
import { NgxSfcInputsModule } from "ngx-sfc-inputs";
import { ViewPagePart } from "./enums/view-page-part.enum";
import { IPlayerModel } from "./mapper/models";
import { ViewPageComponent } from "./view.page.component";
import { ViewPageConstants } from "./view.page.constants";
import { ViewPageLocalization } from "./view.page.localization";

describe('Features.Player.Page:View', () => {
    let component: ViewPageComponent;
    let fixture: ComponentFixture<ViewPageComponent>;
    let routerMock = { navigate: (commands: any[], extras?: NavigationExtras) => { }, url: 'http://localhost:4200/players/1/general' };
    let activateRouteMock = { snapshot: { data: {} } };
    let headerServiceStub: Partial<HeaderService> = {};

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                FontAwesomeModule,
                RouterModule,
                NoopAnimationsModule,
                NgxSfcCommonModule, NgxSfcInputsModule,
                NgxSfcComponentsModule, ShareModule
            ],
            declarations: [
                ViewPageComponent
            ],
            providers: [
                { provide: Router, useValue: routerMock },
                { provide: ActivatedRoute, useValue: activateRouteMock },
                { provide: HeaderService, useValue: headerServiceStub }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(ViewPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    afterEach(() => {
        activateRouteMock = { snapshot: { data: {} } };
    });

    describe('General', () => {
        fit('Should create page', () => {
            expect(component).toBeTruthy();
        });

        fit('Should have main elements', () => {
            expect(fixture.nativeElement.querySelector('.container')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('.content')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('.title')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('.title > sfc-title')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('.main')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('.left')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('.left > .actions')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('.left > .actions > sfc-dropdown-menu')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('.left > .info-panel')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('.left > .info-panel > sfc-player-info-panel')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('.left > .menu')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('.left > .menu > sfc-navigation-menu')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('.right')).toBeTruthy();
        });

        fit('Should show side menu', () => {
            (headerServiceStub as any).open = false;
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('.container > .side')).toBeTruthy();
        });

        fit('Should hide side menu', () => {
            (headerServiceStub as any).open = true;
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('.container > .side')).toBeNull();
        });

        fit('Should have page title for player', () => {
            const model: IPlayerModel = buildPlayerModel();
            (activateRouteMock.snapshot.data as any)[ViewPageConstants.RESOLVE_KEY] = { result: model };
            component.ngOnInit();

            const titleService = TestBed.inject(Title);

            expect(titleService.getTitle()).toBe(buildTitle(`${model.general.firstName} ${model.general.lastName}`));
        });
    });

    describe('Content', () => {
        describe('Title', () => {
            fit('Should title have appropriate attributes', () => {
                const titleEl: DebugElement = fixture.debugElement.query(By.css('sfc-title'));

                expect(titleEl.componentInstance.label).toEqual(ViewPageLocalization.TITLE.LABEL);
                expect(titleEl.componentInstance.description).toEqual(ViewPageLocalization.TITLE.DESCRIPTION);
                expect(titleEl.componentInstance.tooltip).toEqual(ViewPageLocalization.TITLE.TOOLTIP);
                expect(titleEl.attributes['ng-reflect-size']).toEqual(ComponentSize.Large);
            });
        });

        describe('Left', () => {
            fit('Should actions dropdown menu has appropriate attributes', () => {
                const dropdownMenuEl: DebugElement = fixture.debugElement.query(By.css('.left > .actions > sfc-dropdown-menu'));

                expect(dropdownMenuEl.componentInstance.bordered).toBeFalse();
                expect(dropdownMenuEl.componentInstance.filled).toBeTrue();
                expect(dropdownMenuEl.componentInstance.items).toEqual(component.ACTION_ITEMS);
                expect(dropdownMenuEl.componentInstance.position).toEqual([Position.Bottom, Position.Center]);
                expect(dropdownMenuEl.attributes['ng-reflect-custom-size']).toEqual('0.9');
            });

            fit('Should player info panel has defined attributes', () => {
                const model: IPlayerModel = buildPlayerModel();
                (activateRouteMock.snapshot.data as any)[ViewPageConstants.RESOLVE_KEY] = { result: model };
                component.ngOnInit();
                fixture.detectChanges();

                const playerInfoPanelEl = fixture.debugElement.query(By.css('.left > .info-panel > sfc-player-info-panel')),
                    playerInfoPanelComponent = playerInfoPanelEl.componentInstance;

                expect(playerInfoPanelComponent.radius).toEqual(ViewPageConstants.AVATAR_RADIUS);
                expect(playerInfoPanelComponent.model).toEqual({
                    photo: model.general.photo,
                    firstName: model.general.firstName,
                    lastName: model.general.lastName,
                    city: model.general.city,
                    age: model.general.birthday,
                    raiting: 50
                });
                expect(playerInfoPanelEl.attributes['ng-reflect-custom-size']).toEqual('1.5');
            });

            describe('Navigation menu', () => {
                fit('Should have defined navigation items', () => {
                    expect(component.MENU.length).toEqual(6);
                });

                fit('Should have appropriate attributes', () => {
                    const navigationMenuEl: DebugElement = fixture.debugElement.query(By.css('.left > .menu > sfc-navigation-menu'));

                    expect(navigationMenuEl.componentInstance.items).toEqual(component.MENU);
                    expect(navigationMenuEl.attributes['ng-reflect-custom-size']).toEqual('0.9');
                });

                fit('Should be active first item', () => {
                    component.MENU.forEach((item, index) => {
                        if (index === 0)
                            expect(item.active).toBeTrue();
                        else
                            expect(item.active).toBeFalse();
                    });
                });

                fit('Should navigate on item click', () => {
                    spyOn(routerMock, 'navigate');

                    const statsItemEl = fixture.debugElement.queryAll(
                        By.css('.left > .menu > sfc-navigation-menu sfc-navigation-menu-item')
                    )[1];
                    statsItemEl.nativeElement.click();

                    expect(routerMock.navigate).toHaveBeenCalledOnceWith([ViewPagePart.Stats],
                        { relativeTo: TestBed.inject(ActivatedRoute) });
                });
            });
        });
    });

    function buildPlayerModel(): IPlayerModel {
        return {
            general: {
                firstName: 'First name',
                lastName: 'Last name',
                photo: null,
                biography: null,
                birthday: null,
                city: 'City',
                tags: null,
                freePlay: false,
                availability: {
                    from: null,
                    to: null,
                    days: null
                }
            },
            football: {
                height: null,
                weight: null,
                position: { key: 0, value: 'Goalkeeper' },
                additionalPosition: null,
                workingFoot: null,
                number: null,
                gameStyle: null,
                skill: null,
                weakFoot: null,
                physicalCondition: null,
            },
            stats: {
                value: STATS
            }
        };
    }
});