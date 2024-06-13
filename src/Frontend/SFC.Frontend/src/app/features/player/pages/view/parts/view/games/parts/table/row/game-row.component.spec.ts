import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faSun } from "@fortawesome/free-solid-svg-icons";
import { ShareModule } from "@share/share.module";
import { ComponentSize, getCssLikeValue, NgxSfcCommonModule, Position, UIConstants } from "ngx-sfc-common";
import { NgxSfcComponentsModule } from "ngx-sfc-components";
import { GamesTableConstants } from "../games-table.constants";
import { GameRowComponent } from "./game-row.component";
import { GameRowConstants } from "./game-row.constants";
import { IGameRowModel } from "./game-row.model";
import { DebugElement } from "@angular/core";
import { CommonConstants as ApplicationCommonConstants } from '@core/constants/common.constants';
import { ENUM_SERVICE } from "@test/stubs";

describe('Features.Player.Page:View.Part.Table:GameRow', () => {
    let component: GameRowComponent;
    let fixture: ComponentFixture<GameRowComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                FontAwesomeModule,
                NoopAnimationsModule,
                NgxSfcCommonModule,
                NgxSfcComponentsModule,
                ShareModule
            ],
            declarations: [GameRowComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(GameRowComponent);
        component = fixture.componentInstance;
        component.model = buildGameRowModel();
        component.columns = GamesTableConstants.COLUMNS.map(column => ({
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
            component.model.status = ENUM_SERVICE.enums?.gameStatuses[2]!;
            fixture.detectChanges();

            expect(fixture.nativeElement.className)
                .toContain(`${GameRowConstants.STATUS_CLASS_PART}${component.model.status.key}`);
        });
    });

    describe('Columns', () => {
        fit('Should have defined column', () => {
            expect(component.columns.length).toEqual(GamesTableConstants.COLUMNS.length);
        });

        fit('Should all columns have width', () => {
            fixture.nativeElement.querySelectorAll('.column')
                .forEach((columnEl: any) => expect(columnEl.style['width']).not.toBeNull());
        });

        describe('Location', () => {
            fit('Should have defined image', () => {
                component.model.location.field.photo = 'test.png';
                fixture.detectChanges();

                expect(fixture.debugElement.query(By.css('.column.location > img')).nativeElement.src)
                    .toContain(component.model.location.field.photo);
            });

            fit('Should have default image', () => {
                expect(fixture.debugElement.query(By.css('.column.location > img')).nativeElement.src)
                    .toContain(ApplicationCommonConstants.DEFAULT_FIELD_IMAGE_PATH);
            });

            fit('Should info has defined values', () => {
                const starsEl: DebugElement = fixture.debugElement.query(By.css('.column.location > .info > sfc-stars'));

                expect(fixture.nativeElement.querySelector('.column.location > .info > p > .field').innerText)
                    .toEqual(component.model.location.field.name);
                expect(fixture.nativeElement.querySelector('.column.location > .info > p > .city').innerText)
                    .toEqual(component.model.location.city);
                expect(starsEl.componentInstance.value).toEqual(component.model.location.field.raiting);
                expect(starsEl.attributes['ng-reflect-size']).toEqual(ComponentSize.Small);
            });
        });

        describe('Name', () => {
            fit('Should have defined value', () => {
                expect(fixture.nativeElement.querySelector('.column.name').innerText)
                    .toEqual(component.model.name);
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

        describe('DateTime', () => {
            describe('Date', () => {
                fit('Should have title with defined text and icon', () => {
                    expect(fixture.nativeElement.querySelector('.column.date-time > .date > span.title').innerText)
                        .toEqual(' Date:');
                    expect(fixture.nativeElement.querySelector('.column.date-time > .date > span.title > fa-icon svg').classList)
                        .toContain('fa-calendar');
                });

                fit('Should have defined content', () => {
                    expect(fixture.nativeElement.querySelector('.column.date-time > .date > .content').innerText)
                        .toEqual('5/14/2024');
                });
            });

            describe('Time', () => {
                fit('Should have title with defined text and icon', () => {
                    expect(fixture.nativeElement.querySelector('.column.date-time > .time > span.title').innerText)
                        .toEqual(' Time:');
                    expect(fixture.nativeElement.querySelector('.column.date-time > .time > span.title > fa-icon svg').classList)
                        .toContain('fa-clock');
                });

                fit('Should have defined content', () => {
                    expect(fixture.nativeElement.querySelector('.column.date-time > .time > .content').innerText)
                        .toEqual('From - 18:00, To - 21:00');
                });
            });
        });

        describe('Free play', () => {
            fit('Should have defined icon', () => {
                expect(fixture.nativeElement.querySelector('.column.free-play > fa-icon svg').classList)
                    .toContain('fa-circle-check');
            });
        });

        describe('Result', () => {
            describe('Team one', () => {
                fit('Should have defined image', () => {
                    component.model.result.scoreOne.team.emblem = 'test.png';
                    fixture.detectChanges();

                    expect(fixture.debugElement.query(By.css('.column.result > .team.one img')).nativeElement.src)
                        .toContain(component.model.result.scoreOne.team.emblem);
                });

                fit('Should have default image', () => {
                    expect(fixture.debugElement.query(By.css('.column.result > .team.one img')).nativeElement.src)
                        .toContain(ApplicationCommonConstants.DEFAULT_TEAM_A_IMAGE_PATH);
                });

                fit('Should have defined info values', () => {
                    expect(fixture.nativeElement.querySelector('.column.result > .team.one > span.small').innerText)
                        .toEqual(component.model.result.scoreOne.team.shortName);
                    expect(fixture.nativeElement.querySelector('.column.result > .team.one > span.full').innerText)
                        .toEqual(component.model.result.scoreOne.team.fullName);
                });
            });

            describe('Score', () => {
                fit('Should have values for played game', () => {
                    expect(fixture.nativeElement.querySelectorAll('.column.result > .score > span').length)
                        .toEqual(3);

                    component.model.result.scoreOne.value = 1;
                    component.model.result.scoreTwo.value = 2;
                    fixture.detectChanges();

                    expect(fixture.nativeElement.querySelector('.column.result > .score > span.lose').innerText)
                        .toContain(component.model.result.scoreOne.value);
                    expect(fixture.nativeElement.querySelector('.column.result > .score > span.win').innerText)
                        .toContain(component.model.result.scoreTwo.value);

                    component.model.result.scoreOne.value = 2;
                    component.model.result.scoreTwo.value = 1;
                    fixture.detectChanges();

                    expect(fixture.nativeElement.querySelector('.column.result > .score > span.win').innerText)
                        .toContain(component.model.result.scoreOne.value);
                    expect(fixture.nativeElement.querySelector('.column.result > .score > span.lose').innerText)
                        .toContain(component.model.result.scoreTwo.value);
                });

                fit('Should have values for not started game', () => {
                    component.model.result.scoreOne.value = null;
                    component.model.result.scoreTwo.value = null;
                    fixture.detectChanges();

                    const elements = fixture.nativeElement.querySelectorAll('.column.result > .score > span');

                    expect(elements[0].innerText).toContain('-');
                    expect(elements[1].innerText).toContain(':');
                    expect(elements[2].innerText).toContain('-');
                });
            });

            describe('Team two', () => {
                fit('Should have defined image', () => {
                    component.model.result.scoreTwo.team.emblem = 'test.png';
                    fixture.detectChanges();

                    expect(fixture.debugElement.query(By.css('.column.result > .team.two img')).nativeElement.src)
                        .toContain(component.model.result.scoreTwo.team.emblem);
                });

                fit('Should have default image', () => {
                    expect(fixture.debugElement.query(By.css('.column.result > .team.two img')).nativeElement.src)
                        .toContain(ApplicationCommonConstants.DEFAULT_TEAM_B_IMAGE_PATH);
                });

                fit('Should have defined info values', () => {
                    expect(fixture.nativeElement.querySelector('.column.result > .team.two > span.small').innerText)
                        .toEqual(component.model.result.scoreTwo.team.shortName);
                    expect(fixture.nativeElement.querySelector('.column.result > .team.two > span.full').innerText)
                        .toEqual(component.model.result.scoreTwo.team.fullName);
                });
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

    function buildGameRowModel(): IGameRowModel {
        return {
            name: 'Name 0',
            date: { date: new Date(2024, 4, 14), end: new Date(2024, 4, 14, 21, 0), start: new Date(2024, 4, 14, 18, 0) },
            freePlay: true,
            location: { city: 'City', field: { name: 'Field', photo: null, raiting: 3 } },
            result: {
                scoreOne: { team: { fullName: 'Team A', shortName: 'TMA', emblem: null }, value: 1 },
                scoreTwo: { team: { fullName: 'Team A', shortName: 'TMA', emblem: null }, value: 2 }
            },
            status: { key: 0, value: 'New', icon: faSun }
        };
    }
});