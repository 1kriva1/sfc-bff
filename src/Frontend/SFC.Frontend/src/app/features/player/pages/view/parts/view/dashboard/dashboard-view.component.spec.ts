import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ThemeService } from "@share/components/theme-toggler/services/theme/theme.service";
import { EnumService } from "@share/services";
import { ShareModule } from "@share/share.module";
import { ENUM_SERVICE } from "@test/stubs";
import { ComponentSize, NgxSfcCommonModule, Theme } from "ngx-sfc-common";
import { NgxSfcComponentsModule } from "ngx-sfc-components";
import { DashboardViewComponent } from "./dashboard-view.component";
import { DashboardViewLocalization } from "./dashboard-view.localization";

describe('Features.Player.Page:View.Part.View:Dashboard', () => {
    let component: DashboardViewComponent;
    let fixture: ComponentFixture<DashboardViewComponent>;
    let themeServiceMock: Partial<ThemeService> = { theme: Theme.Default };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                FontAwesomeModule,
                NgxSfcCommonModule,
                NgxSfcComponentsModule,
                ShareModule
            ],
            declarations: [
                DashboardViewComponent
            ],
            providers: [
                { provide: EnumService, useValue: ENUM_SERVICE },
                { provide: ThemeService, useValue: themeServiceMock }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(DashboardViewComponent);
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
            expect(fixture.nativeElement.querySelector('.content')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('.content > .panels')).toBeTruthy();
            expect(fixture.nativeElement.querySelectorAll('.content > .charts').length).toEqual(2);
            expect(fixture.nativeElement.querySelectorAll('.content > .charts > .chart').length).toEqual(5);
            expect(fixture.nativeElement.querySelectorAll('.content > .charts > .chart > sfc-title').length).toEqual(5);
            expect(fixture.nativeElement.querySelectorAll('.content > .charts > .chart > .chart-container').length).toEqual(5);
            expect(fixture.nativeElement.querySelectorAll('.content > .charts > .chart > .chart-container > sfc-chart').length).toEqual(5);
        });

        fit('Should title have appropriate attributes', () => {
            const titleEl: DebugElement = fixture.debugElement.query(By.css('.title > sfc-title'));

            expect(titleEl.componentInstance.label).toEqual(DashboardViewLocalization.TITLE.LABEL);
            expect(titleEl.componentInstance.description).toEqual(DashboardViewLocalization.TITLE.DESCRIPTION);
            expect(titleEl.componentInstance.tooltip).toEqual(DashboardViewLocalization.TITLE.TOOLTIP);
            expect(titleEl.componentInstance.delimeter).toBeFalse();
            expect(titleEl.attributes['ng-reflect-size']).toEqual(ComponentSize.Medium);
        });
    });

    describe('Content', () => {
        describe('Panels', () => {
            fit('Should have defined items', () => {
                expect(fixture.nativeElement.querySelectorAll('.content > .panels > sfc-info-panel').length)
                    .toEqual(component.dataModels.length);
            });

            fit('Should every panel has defined model ', () => {
                fixture.debugElement.queryAll(By.css('.content > .panels > sfc-info-panel'))
                    .forEach((panel, index) =>
                        expect(panel.componentInstance.model).toEqual(component.dataModels[index]));
            });
        });

        describe('Charts', () => {
            describe('Games', () => {
                fit('Should title have appropriate attributes', () => {
                    const titleEl: DebugElement = fixture.debugElement.queryAll(
                        By.css('.content > .charts > .chart > sfc-title')
                    )[0];

                    expect(titleEl.componentInstance.label).toEqual(DashboardViewLocalization.CHART.GAMES.TITLE.LABEL);
                    expect(titleEl.componentInstance.description).toEqual(DashboardViewLocalization.CHART.GAMES.TITLE.DESCRIPTION);
                    expect(titleEl.componentInstance.tooltip).toEqual(DashboardViewLocalization.CHART.GAMES.TITLE.TOOLTIP);
                    expect(titleEl.componentInstance.delimeter).toBeFalse();
                    expect(titleEl.attributes['ng-reflect-size']).toEqual(ComponentSize.Medium);
                });

                fit('Should chart has appropriate attributes', () => {
                    const chartEl: DebugElement = fixture.debugElement.queryAll(
                        By.css('.content > .charts > .chart > .chart-container > sfc-chart')
                    )[0];

                    expect(chartEl.componentInstance.theme).toEqual(component.themeService.theme);
                    expect(chartEl.componentInstance.type).toEqual('line');
                    expect(chartEl.componentInstance.data).toEqual(component.gamesChartData);
                    expect(chartEl.componentInstance.options).toEqual(component.gamesChartOptions);
                    expect(chartEl.componentInstance.chartOptions.defaultColors).toBeFalse();
                });
            });

            describe('Activities', () => {
                fit('Should title have appropriate attributes', () => {
                    const titleEl: DebugElement = fixture.debugElement.queryAll(
                        By.css('.content > .charts > .chart > sfc-title')
                    )[1];

                    expect(titleEl.componentInstance.label).toEqual(DashboardViewLocalization.CHART.ACTIVITIES.TITLE.LABEL);
                    expect(titleEl.componentInstance.description).toEqual(DashboardViewLocalization.CHART.ACTIVITIES.TITLE.DESCRIPTION);
                    expect(titleEl.componentInstance.tooltip).toEqual(DashboardViewLocalization.CHART.ACTIVITIES.TITLE.TOOLTIP);
                    expect(titleEl.componentInstance.delimeter).toBeFalse();
                    expect(titleEl.attributes['ng-reflect-size']).toEqual(ComponentSize.Medium);
                });

                fit('Should chart has appropriate attributes', () => {
                    const chartEl: DebugElement = fixture.debugElement.queryAll(
                        By.css('.content > .charts > .chart > .chart-container > sfc-chart')
                    )[1];

                    expect(chartEl.componentInstance.theme).toEqual(component.themeService.theme);
                    expect(chartEl.componentInstance.type).toEqual('bar');
                    expect(chartEl.componentInstance.data).toEqual(component.activitiesChartData);
                    expect(chartEl.componentInstance.options).toEqual(component.activitiesChartOptions);
                    expect(chartEl.componentInstance.chartOptions.defaultColors).toBeFalse();
                });
            });

            describe('Fouls', () => {
                fit('Should title have appropriate attributes', () => {
                    const titleEl: DebugElement = fixture.debugElement.queryAll(
                        By.css('.content > .charts > .chart > sfc-title')
                    )[2];

                    expect(titleEl.componentInstance.label).toEqual(DashboardViewLocalization.CHART.FOULS.TITLE.LABEL);
                    expect(titleEl.componentInstance.description).toEqual(DashboardViewLocalization.CHART.FOULS.TITLE.DESCRIPTION);
                    expect(titleEl.componentInstance.tooltip).toEqual(DashboardViewLocalization.CHART.FOULS.TITLE.TOOLTIP);
                    expect(titleEl.componentInstance.delimeter).toBeFalse();
                    expect(titleEl.attributes['ng-reflect-size']).toEqual(ComponentSize.Medium);
                });

                fit('Should chart has appropriate attributes', () => {
                    const chartEl: DebugElement = fixture.debugElement.queryAll(
                        By.css('.content > .charts > .chart > .chart-container > sfc-chart')
                    )[2];

                    expect(chartEl.componentInstance.theme).toEqual(component.themeService.theme);
                    expect(chartEl.componentInstance.type).toEqual('pie');
                    expect(chartEl.componentInstance.data).toEqual(component.foulsChartData);
                    expect(chartEl.componentInstance.options).toEqual(component.foulsChartOptions);
                    expect(chartEl.componentInstance.chartOptions.defaultColors).toBeFalse();
                });
            });

            describe('Positions', () => {
                fit('Should title have appropriate attributes', () => {
                    const titleEl: DebugElement = fixture.debugElement.queryAll(
                        By.css('.content > .charts > .chart > sfc-title')
                    )[3];

                    expect(titleEl.componentInstance.label).toEqual(DashboardViewLocalization.CHART.POSITIONS.TITLE.LABEL);
                    expect(titleEl.componentInstance.description).toEqual(DashboardViewLocalization.CHART.POSITIONS.TITLE.DESCRIPTION);
                    expect(titleEl.componentInstance.tooltip).toEqual(DashboardViewLocalization.CHART.POSITIONS.TITLE.TOOLTIP);
                    expect(titleEl.componentInstance.delimeter).toBeFalse();
                    expect(titleEl.attributes['ng-reflect-size']).toEqual(ComponentSize.Medium);
                });

                fit('Should chart has appropriate attributes', () => {
                    const chartEl: DebugElement = fixture.debugElement.queryAll(
                        By.css('.content > .charts > .chart > .chart-container > sfc-chart')
                    )[3];

                    expect(chartEl.componentInstance.theme).toEqual(component.themeService.theme);
                    expect(chartEl.componentInstance.type).toEqual('polarArea');
                    expect(chartEl.componentInstance.data).toEqual(component.positionsChartData);
                    expect(chartEl.componentInstance.options).toEqual(component.positionsChartOptions);
                    expect(chartEl.componentInstance.chartOptions.defaultColors).toBeFalse();
                });
            });

            describe('Actions', () => {
                fit('Should title have appropriate attributes', () => {
                    const titleEl: DebugElement = fixture.debugElement.queryAll(
                        By.css('.content > .charts > .chart > sfc-title')
                    )[4];

                    expect(titleEl.componentInstance.label).toEqual(DashboardViewLocalization.CHART.ACTIONS.TITLE.LABEL);
                    expect(titleEl.componentInstance.description).toEqual(DashboardViewLocalization.CHART.ACTIONS.TITLE.DESCRIPTION);
                    expect(titleEl.componentInstance.tooltip).toEqual(DashboardViewLocalization.CHART.ACTIONS.TITLE.TOOLTIP);
                    expect(titleEl.componentInstance.delimeter).toBeFalse();
                    expect(titleEl.attributes['ng-reflect-size']).toEqual(ComponentSize.Medium);
                });

                fit('Should chart has appropriate attributes', () => {
                    const chartEl: DebugElement = fixture.debugElement.queryAll(
                        By.css('.content > .charts > .chart > .chart-container > sfc-chart')
                    )[4];

                    expect(chartEl.componentInstance.theme).toEqual(component.themeService.theme);
                    expect(chartEl.componentInstance.type).toEqual('doughnut');
                    expect(chartEl.componentInstance.data).toEqual(component.actionsChartData);
                    expect(chartEl.componentInstance.options).toEqual(component.actionsChartOptions);
                    expect(chartEl.componentInstance.chartOptions.defaultColors).toBeFalse();
                });
            });
        });
    });
});