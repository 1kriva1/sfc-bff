import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ThemeService } from "@share/components/theme-toggler/services/theme/theme.service";
import { EnumService } from "@share/services";
import { ShareModule } from "@share/share.module";
import { StatsValue } from "@share/types";
import { ENUM_SERVICE, STATS } from "@test/stubs";
import { ComponentSize, NgxSfcCommonModule, Theme, where } from "ngx-sfc-common";
import { NgxSfcComponentsModule } from "ngx-sfc-components";
import { of } from "rxjs";
import { IPlayerModel } from "../../../mapper/models";
import { ViewPageConstants } from "../../../view.page.constants";
import { StatsViewComponent } from "./stats-view.component";
import { StatsViewConstants } from "./stats-view.constants";
import { StatsViewLocalization } from "./stats-view.localization";

describe('Features.Player.Page:View.Part.View:Stats', () => {
    let component: StatsViewComponent;
    let fixture: ComponentFixture<StatsViewComponent>;
    let themeServiceMock: Partial<ThemeService> = { theme: Theme.Default };
    let activateRouteMock = { parent: { data: of({ [ViewPageConstants.RESOLVE_KEY]: { result: getPlayerModel() } }) } };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                FontAwesomeModule,
                NgxSfcCommonModule,
                NgxSfcComponentsModule,
                ShareModule
            ],
            declarations: [
                StatsViewComponent
            ],
            providers: [
                { provide: EnumService, useValue: ENUM_SERVICE },
                { provide: ThemeService, useValue: themeServiceMock },
                { provide: ActivatedRoute, useValue: activateRouteMock }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(StatsViewComponent);
        component = fixture.componentInstance;
        (themeServiceMock as any).theme = Theme.Default;
        fixture.detectChanges();
    });

    describe('General', () => {
        fit('Should create view', () => {
            expect(component).toBeTruthy();
        });

        fit('Should have main elements', () => {
            expect(fixture.nativeElement.querySelector('.container')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('.title')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('.title > sfc-title')).toBeTruthy();
        });

        fit('Should title have appropriate attributes', () => {
            const titleEl: DebugElement = fixture.debugElement.query(By.css('.title > sfc-title'));

            expect(titleEl.componentInstance.label).toEqual(StatsViewLocalization.TITLE.LABEL);
            expect(titleEl.componentInstance.description).toEqual(StatsViewLocalization.TITLE.DESCRIPTION);
            expect(titleEl.componentInstance.tooltip).toEqual(StatsViewLocalization.TITLE.TOOLTIP);
            expect(titleEl.componentInstance.delimeter).toBeFalse();
            expect(titleEl.attributes['ng-reflect-size']).toEqual(ComponentSize.Medium);
        });
    });

    describe('Content', () => {
        describe('Additional', () => {
            describe('Radar chart', () => {
                fit('Should title have appropriate attributes', () => {
                    const titleEl: DebugElement = fixture.debugElement.query(By.css('.content > .additional > .chart > sfc-title'));

                    expect(titleEl.componentInstance.label).toEqual(StatsViewLocalization.CHART.RADAR.LABEL);
                    expect(titleEl.componentInstance.description).toEqual(StatsViewLocalization.CHART.RADAR.DESCRIPTION);
                    expect(titleEl.componentInstance.delimeter).toBeTrue();
                    expect(titleEl.attributes['ng-reflect-size']).toEqual(ComponentSize.Medium);
                });

                fit('Should chart has appropriate attributes', () => {
                    const chartEl: DebugElement = fixture.debugElement.query(
                        By.css('.content > .additional > .chart > .chart-content > sfc-chart')
                    );

                    expect(chartEl.componentInstance.theme).toEqual(component.themeService.theme);
                    expect(chartEl.componentInstance.type).toEqual('radar');
                    expect(chartEl.componentInstance.data.labels).toEqual([
                        ['Pace'], ['Shooting'], ['Passing'],
                        ['Dribling'], ['Defending'], ['Physicality']
                    ]);
                    expect(chartEl.componentInstance.data.datasets).toEqual([{
                        data: [50, 50, 50, 50, 50, 50],
                        label: StatsViewLocalization.CHART.RADAR.TITLE,
                        borderColor: '#FFCE54',
                        backgroundColor: StatsViewConstants.RADAR_CHART_BACKGROUND_COLOR,
                        pointBackgroundColor: '#FFCE54',
                        pointBorderColor: '#FFCE54'
                    }]);
                    expect(chartEl.componentInstance.options).toEqual(component.radarChartOptions);
                    expect(chartEl.componentInstance.chartOptions.defaultColors).toBeFalse();
                });
            });

            describe('Avarage', () => {
                fit('Should title have appropriate attributes', () => {
                    const titleEl: DebugElement = fixture.debugElement.query(By.css('.content > .additional > .avarage > sfc-title'));

                    expect(titleEl.componentInstance.label).toEqual(StatsViewLocalization.AVARAGE.LABEL);
                    expect(titleEl.componentInstance.description).toEqual(StatsViewLocalization.AVARAGE.DESCRIPTION);
                    expect(titleEl.componentInstance.delimeter).toBeTrue();
                    expect(titleEl.attributes['ng-reflect-size']).toEqual(ComponentSize.Medium);
                });

                fit('Should stat skills have appropriate attributes', () => {
                    const stats: StatsValue = getPlayerModel().stats.value;
                    expect(fixture.debugElement.query(By.css('.content > .additional > .avarage > sfc-stats-skills'))
                        .componentInstance.value).toEqual(stats);
                });
            });

            describe('Total', () => {
                fit('Should title have appropriate attributes', () => {
                    const titleEl: DebugElement = fixture.debugElement.query(By.css('.content > .additional > .total > sfc-title'));

                    expect(titleEl.componentInstance.label).toEqual(StatsViewLocalization.TOTAL.LABEL);
                    expect(titleEl.componentInstance.description).toEqual(StatsViewLocalization.TOTAL.DESCRIPTION);
                    expect(titleEl.componentInstance.delimeter).toBeTrue();
                    expect(titleEl.attributes['ng-reflect-size']).toEqual(ComponentSize.Medium);
                });

                fit('Should total has appropriate attributes', () => {
                    const statsTotalEl: DebugElement = fixture.debugElement.query(By.css('.content > .additional > .total > sfc-stats-total'));

                    expect(statsTotalEl.componentInstance.progress).toEqual(50);
                    expect(statsTotalEl.componentInstance.value).toEqual(1450);
                    expect(statsTotalEl.componentInstance.total).toEqual(2900);
                    expect(statsTotalEl.componentInstance.delimeter).toBeFalse();
                });
            });
        });

        describe('Stats', () => {
            fit('Should title have appropriate attributes', () => {
                const titleEl: DebugElement = fixture.debugElement.query(By.css('.content > .stats > sfc-title'));

                expect(titleEl.componentInstance.label).toEqual(StatsViewLocalization.TYPES.LABEL);
                expect(titleEl.componentInstance.description).toEqual(StatsViewLocalization.TYPES.DESCRIPTION);
                expect(titleEl.componentInstance.delimeter).toBeTrue();
                expect(titleEl.attributes['ng-reflect-size']).toEqual(ComponentSize.Medium);
            });

            fit('Should pace has appropriate content', () => expectStat(0));

            fit('Should shooting has appropriate content', () => expectStat(1));

            fit('Should passing has appropriate content', () => expectStat(2));

            fit('Should dribling has appropriate content', () => expectStat(3));

            fit('Should defending has appropriate content', () => expectStat(4));

            fit('Should physicality has appropriate content', () => expectStat(5));
        });
    });

    function getPlayerModel(): IPlayerModel {
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

    function expectStat(index: number): void {
        const partEl: DebugElement = fixture.debugElement.queryAll(By.css('.items .item'))[index],
            titleEl = partEl.query(By.css('.header .title span')),
            progressEls = partEl.queryAll(By.css('.lines .line sfc-progress-line')),
            categoryTypes = where(ENUM_SERVICE.enums?.statTypes!, type => type.category === index);

        expect(partEl.query(By.css('.header .title h3')).nativeElement.innerText)
            .toEqual(ENUM_SERVICE.enums?.statCategories[index].value.toUpperCase());
        expect(titleEl.nativeElement.innerText).toEqual('50');
        expect(titleEl.nativeElement.style['color']).toEqual('rgb(255, 206, 84)');

        progressEls.forEach((progressEl: DebugElement, statIndex: number) => {
            expect(progressEl.componentInstance.progress).toEqual(50);
            expect(progressEl.componentInstance.labelStart).toEqual(categoryTypes![statIndex].value);
            expect(progressEl.componentInstance.hideEnd).toBeFalse();
        });
    }
});