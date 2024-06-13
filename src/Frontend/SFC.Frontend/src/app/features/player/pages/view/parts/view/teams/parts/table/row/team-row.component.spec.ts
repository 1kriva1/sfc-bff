import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ShareModule } from "@share/share.module";
import { ENUM_SERVICE } from "@test/stubs";
import { ComponentSize, getCssLikeValue, NgxSfcCommonModule, Position, UIConstants } from "ngx-sfc-common";
import { NgxSfcComponentsModule } from "ngx-sfc-components";
import { TeamsTableConstants } from "../teams-table.constants";
import { TeamRowComponent } from "./team-row.component";
import { TeamRowConstants } from "./team-row.constants";
import { ITeamRowModel } from "./team-row.model";
import { CommonConstants as ApplicationCommonConstants } from '@core/constants/common.constants';
import { DebugElement } from "@angular/core";
import { TeamRowLocalization } from "./team-row.localization";
import { RoutKey } from "@core/enums";
import { ActivatedRoute, RouterModule } from "@angular/router";

describe('Features.Player.Page:View.Part.Table:TeamRow', () => {
    let component: TeamRowComponent;
    let fixture: ComponentFixture<TeamRowComponent>;
    let activateRouteMock = { snapshot: { data: {} } };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                RouterModule,
                FontAwesomeModule,
                NoopAnimationsModule,
                NgxSfcCommonModule,
                NgxSfcComponentsModule,
                ShareModule
            ],
            declarations: [TeamRowComponent],
            providers:[
                { provide: ActivatedRoute, useValue: activateRouteMock },
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(TeamRowComponent);
        component = fixture.componentInstance;
        component.model = buildTeamRowModel();
        component.columns = TeamsTableConstants.COLUMNS.map(column => ({
            ...column,
            calculatedWidth: getCssLikeValue(column.width!, UIConstants.CSS_PERCENTAGE)
        }));
        fixture.detectChanges();
    });

    describe('General', () => {
        fit('Should create component', () => {
            expect(component).toBeTruthy();
        });

        fit('Should have main elements', () => {
            expect(fixture.nativeElement.querySelector('.container')).toBeTruthy();
        });

        fit('Should have defined status class', () => {
            component.model.status = ENUM_SERVICE.enums?.teamStatuses[2]!;
            fixture.detectChanges();

            expect(fixture.nativeElement.className)
                .toContain(`${TeamRowConstants.STATUS_CLASS_PART}${component.model.status.key}`);
        });
    });

    describe('Columns', () => {
        fit('Should have defined column', () => {
            expect(component.columns.length).toEqual(TeamsTableConstants.COLUMNS.length);
        });

        fit('Should all columns have width', () => {
            fixture.nativeElement.querySelectorAll('.column')
                .forEach((columnEl: any) => expect(columnEl.style['width']).not.toBeNull());
        });

        describe('Logo', () => {
            fit('Should have defined image', () => {
                component.model.logo = 'test.png';
                fixture.detectChanges();

                expect(fixture.debugElement.query(By.css('.column.logo > img')).nativeElement.src)
                    .toContain(component.model.logo);
            });

            fit('Should have default image', () => {
                expect(fixture.debugElement.query(By.css('.column.logo > img')).nativeElement.src)
                    .toContain(ApplicationCommonConstants.DEFAULT_TEAM_B_IMAGE_PATH);
            });

            fit('Should stars has defined values', () => {
                const starsEl: DebugElement = fixture.debugElement.query(By.css('.column.logo > sfc-stars'));

                expect(starsEl.componentInstance.value).toEqual(component.model.raiting);
                expect(starsEl.attributes['ng-reflect-size']).toEqual(ComponentSize.Small);
            });
        });

        describe('Name', () => {
            fit('Should have defined values', () => {
                component.model.name = { full: 'Team A', short: "tma" };
                fixture.detectChanges();

                expect(fixture.nativeElement.querySelector('.column.name > span.full').innerText)
                    .toEqual(component.model.name.full);
                expect(fixture.nativeElement.querySelector('.column.name > span.short').innerText)
                    .toEqual(`(${component.model.name.short.toUpperCase()})`);
                expect(fixture.nativeElement.querySelector('.column.name > span.city').innerText)
                    .toEqual('City • 5/25/2024');
            });
        });

        describe('Status', () => {
            fit('Should have point', () => {
                expect(fixture.nativeElement.querySelector('.column.status > .point')).toBeTruthy();
            });

            fit('Should have defined text', () => {
                expect(fixture.nativeElement.querySelector('.column.status').innerText)
                    .toEqual(component.model.status.value);
            });
        });

        describe('Schema', () => {
            fit('Should have defined value', () => {
                expect(fixture.nativeElement.querySelector('.column.schema').innerText)
                    .toEqual(component.model.schema);
            });

            fit('Should have icon with tooltip', () => {
                expect(fixture.nativeElement.querySelector('.column.schema fa-icon svg').classList)
                    .toContain('fa-circle-question');
                expect(fixture.debugElement.query(By.css('.column.schema > span')).componentInstance.value)
                    .toEqual(TeamRowLocalization.COLUMN.SCHEMA.TOOLTIP);
            });
        });

        describe('Coach', () => {
            fit('Should have link', () => {
                component.model.coach = { id: 0, firstName: 'Name', lastName: 'Surname', photo: null };
                fixture.detectChanges();

                expect(fixture.nativeElement.querySelector('.column.coach > a'))
                    .toBeTruthy();
                expect(fixture.nativeElement.querySelector('.column.coach sfc-no-data'))
                    .toBeNull();
            });

            fit('Should not have link', () => {
                component.model.coach = null;
                fixture.detectChanges();

                expect(fixture.nativeElement.querySelector('.column.coach > a'))
                    .toBeNull();
                expect(fixture.nativeElement.querySelector('.column.coach sfc-no-data'))
                    .toBeTruthy();
            });

            fit('Should link navigate to player view page', () => {
                component.model.coach = { id: 0, firstName: 'Name', lastName: 'Surname', photo: null };
                fixture.detectChanges();
                
                expect(fixture.debugElement.query(By.css('.column.coach > a')).attributes['href'])
                    .toEqual(`/${RoutKey.Players}/${component.model.coach?.id}`);
            });

            fit('Should player info panel has defined attributes', () => {
                component.model.coach = { id: 0, firstName: 'Name', lastName: 'Surname', photo: null };
                fixture.detectChanges();

                const playerInfoPanelEl = fixture.debugElement.query(By.css('.column.coach > a > sfc-player-info-panel')),
                    playerInfoPanelComponent = playerInfoPanelEl.componentInstance;

                expect(playerInfoPanelComponent.radius).toEqual(TeamRowConstants.COACH_AVATAR_RADIUS);
                expect(playerInfoPanelComponent.model).toEqual({
                    photo: component.model.coach.photo,
                    firstName: component.model.coach.firstName,
                    lastName: component.model.coach.lastName,
                    city: 'Konotop',
                    age: 31
                });
                expect(playerInfoPanelComponent.info).toBeTrue();
                expect(playerInfoPanelComponent.avatar).toBeTrue();
                expect(playerInfoPanelEl.attributes['ng-reflect-custom-size']).toEqual('0.9');
            });
        });

        describe('Actions', () => {
            fit('Should dropdown menu has appropriate attributes', () => {
                const dropdownMenuEl: DebugElement = fixture.debugElement.query(By.css('.column.actions > sfc-dropdown-menu'));

                expect(dropdownMenuEl.componentInstance.bordered).toBeFalse();
                expect(dropdownMenuEl.componentInstance.filled).toBeTrue();
                expect(dropdownMenuEl.componentInstance.items).toEqual(component.ACTION_ITEMS);
                expect(dropdownMenuEl.componentInstance.position).toEqual([Position.Bottom, Position.Center]);
                expect(dropdownMenuEl.attributes['ng-reflect-custom-size']).toEqual('0.9');
            });
        });
    });

    function buildTeamRowModel(): ITeamRowModel {
        return {
            city: 'City',
            coach: null,
            createdDate: new Date(2024, 4, 25),
            logo: null,
            raiting: 3,
            schema: '4-4-2',
            name: { short: 'NAM', full: 'Name' },
            status: ENUM_SERVICE.enums?.teamStatuses[0]!
        };
    }
});