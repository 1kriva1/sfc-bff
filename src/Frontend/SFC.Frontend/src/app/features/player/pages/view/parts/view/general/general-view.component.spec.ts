import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { Locale } from "@core/enums";
import { StorageService } from "@core/services";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import {
    faCakeCandles, faGamepad, faHeart, faMoneyBill1, faReceipt, faShirt,
    faSocks, faStreetView, faTag, faUserClock, faWeightScale
} from "@fortawesome/free-solid-svg-icons";
import { ShareModule } from "@share/share.module";
import { ENUM_SERVICE, STATS } from "@test/stubs";
import { ComponentSize, Direction, NgxSfcCommonModule } from "ngx-sfc-common";
import { NgxSfcComponentsModule } from "ngx-sfc-components";
import { of } from "rxjs";
import { IPlayerModel } from "../../../mapper/models";
import { ViewPageConstants } from "../../../view.page.constants";
import { ViewInfoPanelComponent } from "../../info-panel/view-info-panel.component";
import { GeneralViewComponent } from "./general-view.component";
import { GeneralViewLocalization } from "./general-view.localization";

describe('Features.Player.Page:View.Part.View:General', () => {
    let component: GeneralViewComponent;
    let fixture: ComponentFixture<GeneralViewComponent>;
    let activateRouteMock = { parent: { data: of({ [ViewPageConstants.RESOLVE_KEY]: { result: getPlayerModel() } }) } };
    let storageServiceStub: Partial<StorageService> = {
        set: () => { },
        get: () => Locale.English as any
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                FontAwesomeModule,
                NgxSfcCommonModule,
                NgxSfcComponentsModule,
                ShareModule
            ],
            declarations: [
                ViewInfoPanelComponent,
                GeneralViewComponent
            ],
            providers: [
                { provide: ActivatedRoute, useValue: activateRouteMock },
                { provide: StorageService, useValue: storageServiceStub }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(GeneralViewComponent);
        component = fixture.componentInstance;
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

            expect(titleEl.componentInstance.label).toEqual(GeneralViewLocalization.TITLE.LABEL);
            expect(titleEl.componentInstance.description).toEqual(GeneralViewLocalization.TITLE.DESCRIPTION);
            expect(titleEl.componentInstance.tooltip).toEqual(GeneralViewLocalization.TITLE.TOOLTIP);
            expect(titleEl.componentInstance.delimeter).toBeFalse();
            expect(titleEl.attributes['ng-reflect-size']).toEqual(ComponentSize.Medium);
        });
    });

    describe('Content', () => {
        describe('Panels', () => {
            fit('Should exist defined count', () => {
                expect(fixture.nativeElement.querySelectorAll('.content > sfc-view-info-panel').length)
                    .toEqual(12);
            });

            describe('Availability', () => {
                fit('Should have appropriate attributes', () => {
                    const panelEl: DebugElement = fixture.debugElement.query(By.css('.content > sfc-view-info-panel.availability'));

                    expect(panelEl.componentInstance.label).toEqual(GeneralViewLocalization.AVAILABILITY.LABEL);
                    expect(panelEl.componentInstance.description).toEqual(GeneralViewLocalization.AVAILABILITY.DESCRIPTION);
                    expect(panelEl.componentInstance.icon).toEqual(faUserClock);
                });

                fit('Should no data component exist', () => {
                    expect(fixture.nativeElement.querySelector('sfc-view-info-panel.availability .content > sfc-no-data'))
                        .toBeTruthy();
                });

                fit('Should no data component does not exist', () => {
                    const model: IPlayerModel = getPlayerModel();
                    model.general.availability.days = [{ key: 0, value: 'Monday' }, { key: 2, value: 'Wednesday' }];
                    updateModel(model);

                    expect(fixture.nativeElement.querySelector('sfc-view-info-panel.availability .content > sfc-no-data'))
                        .toBeNull();
                });

                describe('Days', () => {
                    fit('Should not exist', () => {
                        const model: IPlayerModel = getPlayerModel();
                        model.general.availability.days = [];
                        updateModel(model);

                        expect(fixture.nativeElement.querySelector('sfc-view-info-panel.availability .content .days'))
                            .toBeNull();
                    });

                    fit('Should exist', () => {
                        const model: IPlayerModel = getPlayerModel();
                        model.general.availability.days = [{ key: 0, value: 'Monday' }, { key: 2, value: 'Wednesday' }];
                        updateModel(model);

                        expect(fixture.nativeElement.querySelector('sfc-view-info-panel.availability .content .days'))
                            .toBeTruthy();
                    });

                    fit('Should title has defined text', () => {
                        const model: IPlayerModel = getPlayerModel();
                        model.general.availability.days = [{ key: 0, value: 'Monday' }, { key: 2, value: 'Wednesday' }];
                        updateModel(model);

                        expect(fixture.nativeElement.querySelector('sfc-view-info-panel.availability .content .days span.title')
                            .innerText).toEqual('Days:');
                    });

                    fit('Should tags have valid attributes', () => {
                        const model: IPlayerModel = getPlayerModel();
                        model.general.availability.days = [{ key: 0, value: 'Monday' }, { key: 2, value: 'Wednesday' }];
                        updateModel(model);

                        const tagsEl: DebugElement = fixture.debugElement.query(
                            By.css('sfc-view-info-panel.availability .content .days sfc-tags')
                        );

                        expect(tagsEl.componentInstance.tags).toEqual([{ label: 'Monday' }, { label: 'Wednesday' }]);
                        expect(tagsEl.attributes['ng-reflect-custom-size']).toEqual('0.7');
                    });
                });

                describe('Time', () => {
                    fit('Should not exist', () => {
                        expect(fixture.nativeElement.querySelector('sfc-view-info-panel.availability .content > .time'))
                            .toBeNull();
                    });

                    fit('Should exist when from has value', () => {
                        const model: IPlayerModel = getPlayerModel();
                        model.general.availability.from = new Date();
                        updateModel(model);

                        expect(fixture.nativeElement.querySelector('sfc-view-info-panel.availability .content > .time'))
                            .toBeTruthy();
                    });

                    fit('Should exist when to has value', () => {
                        const model: IPlayerModel = getPlayerModel();
                        model.general.availability.to = new Date();
                        updateModel(model);

                        expect(fixture.nativeElement.querySelector('sfc-view-info-panel.availability .content > .time'))
                            .toBeTruthy();
                    });

                    fit('Should title has defined text', () => {
                        const model: IPlayerModel = getPlayerModel();
                        model.general.availability.from = new Date();
                        updateModel(model);

                        expect(fixture.nativeElement.querySelector('sfc-view-info-panel.availability .content > .time > span.title').innerText)
                            .toEqual('Hours:');
                    });

                    fit('Should have defined content', () => {
                        const model: IPlayerModel = getPlayerModel();
                        model.general.availability.from = new Date(2024, 2, 20, 16, 25, 0);
                        model.general.availability.to = new Date(2024, 2, 20, 18, 25, 0);
                        updateModel(model);

                        expect(fixture.nativeElement
                            .querySelector('sfc-view-info-panel.availability .content > .time > .icon-content fa-icon svg')
                            .classList)
                            .toContain('fa-clock');
                        expect(fixture.nativeElement.querySelector('sfc-view-info-panel.availability .content > .time > .icon-content p').innerText)
                            .toEqual('From 16:25 To 18:25');

                        model.general.availability.from = new Date(2024, 2, 20, 16, 25, 0);
                        model.general.availability.to = null;
                        updateModel(model);

                        expect(fixture.nativeElement.querySelector('sfc-view-info-panel.availability .content > .time > .icon-content p').innerText)
                            .toEqual('From 16:25');

                        model.general.availability.from = null;
                        model.general.availability.to = new Date(2024, 2, 20, 18, 25, 0);
                        updateModel(model);

                        expect(fixture.nativeElement.querySelector('sfc-view-info-panel.availability .content > .time > .icon-content p').innerText)
                            .toEqual('To 18:25');
                    });
                });
            });

            describe('Birthday', () => {
                fit('Should have appropriate attributes', () => {
                    const panelEl: DebugElement = fixture.debugElement.query(By.css('.content > sfc-view-info-panel.birthday'));

                    expect(panelEl.componentInstance.label).toEqual(GeneralViewLocalization.BIRTHDAY.LABEL);
                    expect(panelEl.componentInstance.description).toEqual(GeneralViewLocalization.BIRTHDAY.DESCRIPTION);
                    expect(panelEl.componentInstance.icon).toEqual(faCakeCandles);
                });

                fit('Should no data component exist', () => {
                    expect(fixture.nativeElement.querySelector('sfc-view-info-panel.birthday .content > sfc-no-data'))
                        .toBeTruthy();
                });

                fit('Should no data component does not exist', () => {
                    const model: IPlayerModel = getPlayerModel();
                    model.general.birthday = new Date();
                    updateModel(model);

                    expect(fixture.nativeElement.querySelector('sfc-view-info-panel.birthday .content > sfc-no-data'))
                        .toBeNull();
                });

                fit('Should have defined content', () => {
                    const model: IPlayerModel = getPlayerModel();
                    model.general.birthday = new Date(1992, 12, 4);
                    updateModel(model);

                    const partsEl = fixture.nativeElement.querySelectorAll('sfc-view-info-panel.birthday .content > .parts > .part');

                    expect(partsEl[0].querySelectorAll('span')[0].innerText).toEqual('1993');
                    expect(partsEl[0].querySelectorAll('span')[1].innerText).toEqual('year');
                    expect(partsEl[1].querySelectorAll('span')[0].innerText).toEqual('4');
                    expect(partsEl[1].querySelectorAll('span')[1].innerText).toEqual('of');
                    expect(partsEl[1].querySelectorAll('span')[2].innerText).toEqual('January');
                });
            });

            describe('Biography', () => {
                fit('Should have appropriate attributes', () => {
                    const panelEl: DebugElement = fixture.debugElement.query(By.css('.content > sfc-view-info-panel.biography'));

                    expect(panelEl.componentInstance.label).toEqual(GeneralViewLocalization.BIOGRAPHY.LABEL);
                    expect(panelEl.componentInstance.description).toEqual(GeneralViewLocalization.BIOGRAPHY.DESCRIPTION);
                    expect(panelEl.componentInstance.icon).toEqual(faReceipt);
                });

                fit('Should no data component exist', () => {
                    expect(fixture.nativeElement.querySelector('sfc-view-info-panel.biography .content > sfc-no-data'))
                        .toBeTruthy();
                });

                fit('Should no data component does not exist', () => {
                    const model: IPlayerModel = getPlayerModel();
                    model.general.biography = 'bio';
                    updateModel(model);

                    expect(fixture.nativeElement.querySelector('sfc-view-info-panel.biography .content > sfc-no-data'))
                        .toBeNull();
                });

                fit('Should have defined content', () => {
                    const model: IPlayerModel = getPlayerModel();
                    model.general.biography = 'bio';
                    updateModel(model);

                    expect(fixture.nativeElement.querySelector('sfc-view-info-panel.biography .content > span').innerText)
                        .toEqual(model.general.biography);

                });
            });

            describe('Tags', () => {
                fit('Should have appropriate attributes', () => {
                    const panelEl: DebugElement = fixture.debugElement.query(By.css('.content > sfc-view-info-panel.tags'));

                    expect(panelEl.componentInstance.label).toEqual(GeneralViewLocalization.TAGS.LABEL);
                    expect(panelEl.componentInstance.description).toEqual(GeneralViewLocalization.TAGS.DESCRIPTION);
                    expect(panelEl.componentInstance.icon).toEqual(faTag);
                });

                fit('Should no data component exist', () => {
                    expect(fixture.nativeElement.querySelector('sfc-view-info-panel.tags .content > sfc-no-data'))
                        .toBeTruthy();
                });

                fit('Should no data component does not exist', () => {
                    const model: IPlayerModel = getPlayerModel();
                    model.general.tags = ['tag1', 'tag2'];
                    updateModel(model);

                    expect(fixture.nativeElement.querySelector('sfc-view-info-panel.tags .content > sfc-no-data'))
                        .toBeNull();
                });

                fit('Should tags not exist', () => {
                    const model: IPlayerModel = getPlayerModel();
                    model.general.tags = [];
                    updateModel(model);

                    expect(fixture.nativeElement.querySelector('sfc-view-info-panel.tags .content > sfc-tags'))
                        .toBeNull();
                });

                fit('Should tags exist', () => {
                    const model: IPlayerModel = getPlayerModel();
                    model.general.tags = ['tag1', 'tag2'];
                    updateModel(model);

                    const tagsEl: DebugElement = fixture.debugElement.query(
                        By.css('sfc-view-info-panel.tags .content > sfc-tags')
                    );

                    expect(tagsEl.componentInstance.tags).toEqual([{ label: 'tag1' }, { label: 'tag2' }]);
                    expect(tagsEl.attributes['ng-reflect-custom-size']).toEqual('0.7');
                });
            });

            describe('Financial', () => {
                fit('Should have appropriate attributes', () => {
                    const panelEl: DebugElement = fixture.debugElement.query(By.css('.content > sfc-view-info-panel.financial'));

                    expect(panelEl.componentInstance.label).toEqual(GeneralViewLocalization.FINANCIAL.LABEL);
                    expect(panelEl.componentInstance.description).toEqual(GeneralViewLocalization.FINANCIAL.DESCRIPTION);
                    expect(panelEl.componentInstance.icon).toEqual(faMoneyBill1);
                });

                fit('Should have defined content', () => {
                    expect(fixture.nativeElement
                        .querySelector('sfc-view-info-panel.financial .content > fa-icon svg')
                        .classList)
                        .toContain('fa-wallet');

                    expect(fixture.nativeElement
                        .querySelector('sfc-view-info-panel.financial .content > span')
                        .innerText)
                        .toEqual('All games accepted');

                    const model: IPlayerModel = getPlayerModel();
                    model.general.freePlay = true;
                    updateModel(model);

                    expect(fixture.nativeElement
                        .querySelector('sfc-view-info-panel.financial .content > fa-icon svg')
                        .classList)
                        .toContain('fa-gift');

                    expect(fixture.nativeElement
                        .querySelector('sfc-view-info-panel.financial .content > span')
                        .innerText)
                        .toEqual('Only free games');
                });
            });

            describe('Positions', () => {
                fit('Should have appropriate attributes', () => {
                    const panelEl: DebugElement = fixture.debugElement.query(By.css('sfc-view-info-panel.positions'));

                    expect(panelEl.componentInstance.label).toEqual(GeneralViewLocalization.POSITIONS.LABEL);
                    expect(panelEl.componentInstance.description).toEqual(GeneralViewLocalization.POSITIONS.DESCRIPTION);
                    expect(panelEl.componentInstance.icon).toEqual(faStreetView);
                });

                fit('Should no data component exist', () => {
                    const model: IPlayerModel = getPlayerModel();
                    model.football.position = null;
                    model.football.additionalPosition = null;
                    updateModel(model);

                    expect(fixture.nativeElement.querySelector('sfc-view-info-panel.positions .content > sfc-no-data'))
                        .toBeTruthy();
                });

                fit('Should no data component does not exist', () => {
                    const model: IPlayerModel = getPlayerModel();
                    model.football.position = ENUM_SERVICE.enums?.footballPositions[0];
                    updateModel(model);

                    expect(fixture.nativeElement.querySelector('sfc-view-info-panel.positions .content > sfc-no-data'))
                        .toBeNull();
                });

                fit('Should delimeter component exist', () => {
                    const model: IPlayerModel = getPlayerModel();
                    model.football.position = ENUM_SERVICE.enums?.footballPositions[0];
                    model.football.additionalPosition = ENUM_SERVICE.enums?.footballPositions[1];
                    updateModel(model);

                    expect(fixture.nativeElement.querySelectorAll('sfc-view-info-panel.positions .content > sfc-delimeter').length)
                        .toEqual(2);
                });

                fit('Should delimeter component does not exist', () => {
                    const model: IPlayerModel = getPlayerModel();
                    model.football.position = ENUM_SERVICE.enums?.footballPositions[0];
                    model.football.additionalPosition = null;
                    updateModel(model);

                    expect(fixture.nativeElement.querySelectorAll('sfc-view-info-panel.positions .content > sfc-delimeter').length)
                        .toEqual(0);
                });

                fit('Should delimeters have appropriate attributes', () => {
                    const model: IPlayerModel = getPlayerModel();
                    model.football.position = ENUM_SERVICE.enums?.footballPositions[0];
                    model.football.additionalPosition = ENUM_SERVICE.enums?.footballPositions[1];
                    updateModel(model);

                    const delimeterEls: DebugElement[] = fixture.debugElement.queryAll(By.css('sfc-view-info-panel.positions .content > sfc-delimeter'));

                    expect(delimeterEls[0].componentInstance.direction).toEqual(Direction.Vertical);
                    expect(delimeterEls[1].componentInstance.direction).toEqual(Direction.Horizontal);
                });

                describe('Main', () => {
                    fit('Should not exist', () => {
                        const model: IPlayerModel = getPlayerModel();
                        model.football.position = null;
                        updateModel(model);

                        expect(fixture.nativeElement.querySelector('sfc-view-info-panel.positions .content > .main'))
                            .toBeNull();
                    });

                    fit('Should exist', () => {
                        const model: IPlayerModel = getPlayerModel();
                        model.football.position = ENUM_SERVICE.enums?.footballPositions[0];
                        updateModel(model);

                        expect(fixture.nativeElement.querySelector('sfc-view-info-panel.positions .content > .main'))
                            .toBeTruthy();
                    });

                    fit('Should title has defined text', () => {
                        const model: IPlayerModel = getPlayerModel();
                        model.football.position = ENUM_SERVICE.enums?.footballPositions[0];
                        updateModel(model);

                        expect(fixture.nativeElement.querySelector('sfc-view-info-panel.positions .content > .main > span.title').innerText)
                            .toEqual('Main:');
                    });

                    fit('Should have defined image', () => {
                        const model: IPlayerModel = getPlayerModel();
                        model.football.position = ENUM_SERVICE.enums?.footballPositions[2];
                        updateModel(model);

                        const iconEl = fixture.debugElement.query(By.css('sfc-view-info-panel.positions .content > .main > .mark.image > sfc-icon'));

                        expect(iconEl.query(By.css('img')).nativeElement.src).toContain(ENUM_SERVICE.enums?.footballPositions[2].image);
                        expect(iconEl.attributes['ng-reflect-size']).toEqual(ComponentSize.Large);
                    });

                    fit('Should have defined text', () => {
                        const model: IPlayerModel = getPlayerModel();
                        model.football.position = ENUM_SERVICE.enums?.footballPositions[2];
                        updateModel(model);

                        expect(fixture.nativeElement.querySelector('sfc-view-info-panel.positions .content > .main > .mark.image > span').innerText)
                            .toEqual(model.football.position?.value);
                    });
                });

                describe('Additional', () => {
                    fit('Should not exist', () => {
                        const model: IPlayerModel = getPlayerModel();
                        model.football.additionalPosition = null;
                        updateModel(model);

                        expect(fixture.nativeElement.querySelector('sfc-view-info-panel.positions .content > .additional'))
                            .toBeNull();
                    });

                    fit('Should exist', () => {
                        const model: IPlayerModel = getPlayerModel();
                        model.football.additionalPosition = ENUM_SERVICE.enums?.footballPositions[0];
                        updateModel(model);

                        expect(fixture.nativeElement.querySelector('sfc-view-info-panel.positions .content > .additional'))
                            .toBeTruthy();
                    });

                    fit('Should title has defined text', () => {
                        const model: IPlayerModel = getPlayerModel();
                        model.football.additionalPosition = ENUM_SERVICE.enums?.footballPositions[0];
                        updateModel(model);

                        expect(fixture.nativeElement.querySelector('sfc-view-info-panel.positions .content > .additional > span.title').innerText)
                            .toEqual('Additional:');
                    });

                    fit('Should have defined image', () => {
                        const model: IPlayerModel = getPlayerModel();
                        model.football.additionalPosition = ENUM_SERVICE.enums?.footballPositions[2];
                        updateModel(model);

                        const iconEl = fixture.debugElement.query(By.css('sfc-view-info-panel.positions .content > .additional > .mark.image > sfc-icon'));

                        expect(iconEl.query(By.css('img')).nativeElement.src).toContain(ENUM_SERVICE.enums?.footballPositions[2].image);
                        expect(iconEl.attributes['ng-reflect-size']).toEqual(ComponentSize.Large);
                    });

                    fit('Should have defined text', () => {
                        const model: IPlayerModel = getPlayerModel();
                        model.football.additionalPosition = ENUM_SERVICE.enums?.footballPositions[2];
                        updateModel(model);

                        expect(fixture.nativeElement.querySelector('sfc-view-info-panel.positions .content > .additional > .mark.image > span').innerText)
                            .toEqual(model.football.additionalPosition?.value);
                    });
                });
            });

            describe('Physical condition', () => {
                fit('Should have appropriate attributes', () => {
                    const panelEl: DebugElement = fixture.debugElement.query(By.css('sfc-view-info-panel.physical-condition'));

                    expect(panelEl.componentInstance.label).toEqual(GeneralViewLocalization.PHYSICAL_CONDITION.LABEL);
                    expect(panelEl.componentInstance.description).toEqual(GeneralViewLocalization.PHYSICAL_CONDITION.DESCRIPTION);
                    expect(panelEl.componentInstance.icon).toEqual(faHeart);
                });

                fit('Should description has defined text', () => {
                    expect(fixture.nativeElement.querySelector('sfc-view-info-panel.physical-condition .content > p').innerText)
                        .toEqual('This value is defined by player itself.');
                });

                fit('Should stars have valid attributes', () => {
                    const model: IPlayerModel = getPlayerModel();
                    model.football.physicalCondition = 2;
                    updateModel(model);

                    const starsEl: DebugElement = fixture.debugElement.query(By.css('sfc-view-info-panel.physical-condition .content > sfc-stars'));

                    expect(starsEl.componentInstance.value).toEqual(model.football.physicalCondition);
                    expect(starsEl.attributes['ng-reflect-custom-size']).toEqual('0.8');
                });
            });

            describe('Size', () => {
                fit('Should have appropriate attributes', () => {
                    const panelEl: DebugElement = fixture.debugElement.query(By.css('sfc-view-info-panel.size'));

                    expect(panelEl.componentInstance.label).toEqual(GeneralViewLocalization.SIZE.LABEL);
                    expect(panelEl.componentInstance.description).toEqual(GeneralViewLocalization.SIZE.DESCRIPTION);
                    expect(panelEl.componentInstance.icon).toEqual(faWeightScale);
                });

                fit('Should no data component exist', () => {
                    const model: IPlayerModel = getPlayerModel();
                    model.football.height = null;
                    model.football.weight = null;
                    updateModel(model);

                    expect(fixture.nativeElement.querySelector('sfc-view-info-panel.size .content > sfc-no-data'))
                        .toBeTruthy();
                });

                fit('Should no data component does not exist', () => {
                    const model: IPlayerModel = getPlayerModel();
                    model.football.height = 180;
                    updateModel(model);

                    expect(fixture.nativeElement.querySelector('sfc-view-info-panel.size .content > sfc-no-data'))
                        .toBeNull();
                });

                fit('Should delimeter component exist', () => {
                    const model: IPlayerModel = getPlayerModel();
                    model.football.height = 180;
                    model.football.weight = 65;
                    updateModel(model);

                    expect(fixture.nativeElement.querySelectorAll('sfc-view-info-panel.size .content > sfc-delimeter').length)
                        .toEqual(2);
                });

                fit('Should delimeter component does not exist', () => {
                    const model: IPlayerModel = getPlayerModel();
                    model.football.height = 180;
                    model.football.weight = null;
                    updateModel(model);

                    expect(fixture.nativeElement.querySelectorAll('sfc-view-info-panel.size .content > sfc-delimeter').length)
                        .toEqual(0);
                });

                fit('Should delimeters have appropriate attributes', () => {
                    const model: IPlayerModel = getPlayerModel();
                    model.football.height = 180;
                    model.football.weight = 65;
                    updateModel(model);

                    const delimeterEls: DebugElement[] = fixture.debugElement.queryAll(By.css('sfc-view-info-panel.size .content > sfc-delimeter'));

                    expect(delimeterEls[0].componentInstance.direction).toEqual(Direction.Vertical);
                    expect(delimeterEls[1].componentInstance.direction).toEqual(Direction.Horizontal);
                });

                describe('Height', () => {
                    fit('Should not exist', () => {
                        const model: IPlayerModel = getPlayerModel();
                        model.football.height = null;
                        updateModel(model);

                        expect(fixture.nativeElement.querySelector('sfc-view-info-panel.size .content > .height'))
                            .toBeNull();
                    });

                    fit('Should exist', () => {
                        const model: IPlayerModel = getPlayerModel();
                        model.football.height = 180;
                        updateModel(model);

                        expect(fixture.nativeElement.querySelector('sfc-view-info-panel.size .content > .height'))
                            .toBeTruthy();
                    });

                    fit('Should title has defined text', () => {
                        const model: IPlayerModel = getPlayerModel();
                        model.football.height = 180;
                        updateModel(model);

                        expect(fixture.nativeElement.querySelector('sfc-view-info-panel.size .content > .height > span.title').innerText)
                            .toEqual('height:');
                    });

                    fit('Should have defined image', () => {
                        const model: IPlayerModel = getPlayerModel();
                        model.football.height = 180;
                        updateModel(model);

                        const iconEl = fixture.debugElement.query(By.css('sfc-view-info-panel.size .content > .height > .mark.image > sfc-icon'));

                        expect(iconEl.query(By.css('fa-icon svg')).nativeElement.classList).toContain('fa-ruler-vertical');
                        expect(iconEl.attributes['ng-reflect-size']).toEqual(ComponentSize.Large);
                    });

                    fit('Should have defined text', () => {
                        const model: IPlayerModel = getPlayerModel();
                        model.football.height = 180;
                        updateModel(model);

                        expect(fixture.nativeElement.querySelector('sfc-view-info-panel.size .content > .height > .mark.image > span').innerText)
                            .toEqual(`${model.football.height} cm`);
                    });
                });

                describe('Weight', () => {
                    fit('Should not exist', () => {
                        const model: IPlayerModel = getPlayerModel();
                        model.football.weight = null;
                        updateModel(model);

                        expect(fixture.nativeElement.querySelector('sfc-view-info-panel.size .content > .weight'))
                            .toBeNull();
                    });

                    fit('Should exist', () => {
                        const model: IPlayerModel = getPlayerModel();
                        model.football.weight = 65;
                        updateModel(model);

                        expect(fixture.nativeElement.querySelector('sfc-view-info-panel.size .content > .weight'))
                            .toBeTruthy();
                    });

                    fit('Should title has defined text', () => {
                        const model: IPlayerModel = getPlayerModel();
                        model.football.weight = 65;
                        updateModel(model);

                        expect(fixture.nativeElement.querySelector('sfc-view-info-panel.size .content > .weight > span.title').innerText)
                            .toEqual('weight:');
                    });

                    fit('Should have defined image', () => {
                        const model: IPlayerModel = getPlayerModel();
                        model.football.weight = 65;
                        updateModel(model);

                        const iconEl = fixture.debugElement.query(By.css('sfc-view-info-panel.size .content > .weight > .mark.image > sfc-icon'));

                        expect(iconEl.query(By.css('fa-icon svg')).nativeElement.classList).toContain('fa-weight-scale');
                        expect(iconEl.attributes['ng-reflect-size']).toEqual(ComponentSize.Large);
                    });

                    fit('Should have defined text', () => {
                        const model: IPlayerModel = getPlayerModel();
                        model.football.weight = 65;
                        updateModel(model);

                        expect(fixture.nativeElement.querySelector('sfc-view-info-panel.size .content > .weight > .mark.image > span').innerText)
                            .toEqual(`${model.football.weight} kg`);
                    });
                });
            });

            describe('Game style', () => {
                fit('Should have appropriate attributes', () => {
                    const panelEl: DebugElement = fixture.debugElement.query(By.css('sfc-view-info-panel.game-style'));

                    expect(panelEl.componentInstance.label).toEqual(GeneralViewLocalization.GAME_STYLE.LABEL);
                    expect(panelEl.componentInstance.description).toEqual(GeneralViewLocalization.GAME_STYLE.DESCRIPTION);
                    expect(panelEl.componentInstance.icon).toEqual(faGamepad);
                });

                fit('Should not exist', () => {
                    expect(fixture.nativeElement.querySelector('sfc-view-info-panel.game-style .content > .mark.image'))
                        .toBeNull();
                });

                fit('Should exist', () => {
                    const model: IPlayerModel = getPlayerModel();
                    model.football.gameStyle = ENUM_SERVICE.enums?.gameStyles[2];
                    updateModel(model);

                    expect(fixture.nativeElement.querySelector('sfc-view-info-panel.game-style .content > .mark.image'))
                        .toBeTruthy();
                });

                fit('Should have defined image', () => {
                    const model: IPlayerModel = getPlayerModel();
                    model.football.gameStyle = ENUM_SERVICE.enums?.gameStyles[2];
                    updateModel(model);

                    const iconEl = fixture.debugElement.query(By.css('sfc-view-info-panel.game-style .content > .mark.image > sfc-icon'));

                    expect(iconEl.query(By.css('img')).nativeElement.src).toContain(ENUM_SERVICE.enums?.gameStyles[2].image);
                    expect(iconEl.attributes['ng-reflect-size']).toEqual(ComponentSize.Large);
                });

                fit('Should have defined text', () => {
                    const model: IPlayerModel = getPlayerModel();
                    model.football.gameStyle = ENUM_SERVICE.enums?.gameStyles[2];
                    updateModel(model);

                    expect(fixture.nativeElement.querySelector('sfc-view-info-panel.game-style .content > .mark.image > span').innerText)
                        .toEqual(model.football.gameStyle?.value);
                });

                fit('Should no data component exist', () => {
                    const model: IPlayerModel = getPlayerModel();
                    model.football.gameStyle = null;
                    updateModel(model);

                    expect(fixture.nativeElement.querySelector('sfc-view-info-panel.game-style .content > sfc-no-data'))
                        .toBeTruthy();
                });

                fit('Should no data component does not exist', () => {
                    const model: IPlayerModel = getPlayerModel();
                    model.football.gameStyle = ENUM_SERVICE.enums?.gameStyles[2];
                    updateModel(model);

                    expect(fixture.nativeElement.querySelector('sfc-view-info-panel.game-style .content > sfc-no-data'))
                        .toBeNull();
                });
            });

            describe('Skill', () => {
                fit('Should have appropriate attributes', () => {
                    const panelEl: DebugElement = fixture.debugElement.query(By.css('sfc-view-info-panel.skill'));

                    expect(panelEl.componentInstance.label).toEqual(GeneralViewLocalization.SKILL.LABEL);
                    expect(panelEl.componentInstance.description).toEqual(GeneralViewLocalization.SKILL.DESCRIPTION);
                    expect(panelEl.componentInstance.icon).toEqual(faGamepad);
                });

                fit('Should description has defined text', () => {
                    expect(fixture.nativeElement.querySelector('sfc-view-info-panel.skill .content > p').innerText)
                        .toEqual('This value is defined by player itself.');
                });

                fit('Should stars have valid attributes', () => {
                    const model: IPlayerModel = getPlayerModel();
                    model.football.skill = 2;
                    updateModel(model);

                    const starsEl: DebugElement = fixture.debugElement.query(By.css('sfc-view-info-panel.skill .content > sfc-stars'));

                    expect(starsEl.componentInstance.value).toEqual(model.football.skill);
                    expect(starsEl.attributes['ng-reflect-custom-size']).toEqual('0.8');
                });
            });

            describe('Working foot', () => {
                fit('Should have appropriate attributes', () => {
                    const panelEl: DebugElement = fixture.debugElement.query(By.css('sfc-view-info-panel.working-foot'));

                    expect(panelEl.componentInstance.label).toEqual(GeneralViewLocalization.WORKING_FOOT.LABEL);
                    expect(panelEl.componentInstance.description).toEqual(GeneralViewLocalization.WORKING_FOOT.DESCRIPTION);
                    expect(panelEl.componentInstance.icon).toEqual(faSocks);
                });

                fit('Should no data component exist', () => {
                    const model: IPlayerModel = getPlayerModel();
                    model.football.workingFoot = null;
                    model.football.weakFoot = null;
                    updateModel(model);

                    expect(fixture.nativeElement.querySelector('sfc-view-info-panel.working-foot .content > sfc-no-data'))
                        .toBeTruthy();
                });

                fit('Should no data component does not exist', () => {
                    const model: IPlayerModel = getPlayerModel();
                    model.football.workingFoot = ENUM_SERVICE.enums?.workingFoots[0];
                    updateModel(model);

                    expect(fixture.nativeElement.querySelector('sfc-view-info-panel.working-foot .content > sfc-no-data'))
                        .toBeNull();
                });

                fit('Should delimeter component exist', () => {
                    const model: IPlayerModel = getPlayerModel();
                    model.football.workingFoot = ENUM_SERVICE.enums?.workingFoots[0];
                    model.football.weakFoot = 3;
                    updateModel(model);

                    expect(fixture.nativeElement.querySelectorAll('sfc-view-info-panel.working-foot .content > sfc-delimeter').length)
                        .toEqual(2);
                });

                fit('Should delimeter component does not exist', () => {
                    const model: IPlayerModel = getPlayerModel();
                    model.football.workingFoot = ENUM_SERVICE.enums?.workingFoots[0];
                    model.football.weakFoot = null;
                    updateModel(model);

                    expect(fixture.nativeElement.querySelectorAll('sfc-view-info-panel.working-foot .content > sfc-delimeter').length)
                        .toEqual(0);
                });

                fit('Should delimeters have appropriate attributes', () => {
                    const model: IPlayerModel = getPlayerModel();
                    model.football.workingFoot = ENUM_SERVICE.enums?.workingFoots[0];
                    model.football.weakFoot = 3;
                    updateModel(model);

                    const delimeterEls: DebugElement[] = fixture.debugElement.queryAll(By.css('sfc-view-info-panel.working-foot .content > sfc-delimeter'));

                    expect(delimeterEls[0].componentInstance.direction).toEqual(Direction.Vertical);
                    expect(delimeterEls[1].componentInstance.direction).toEqual(Direction.Horizontal);
                });

                describe('Working', () => {
                    fit('Should not exist', () => {
                        const model: IPlayerModel = getPlayerModel();
                        model.football.workingFoot = null;
                        updateModel(model);

                        expect(fixture.nativeElement.querySelector('sfc-view-info-panel.working-foot .content > .mark.image'))
                            .toBeNull();
                    });

                    fit('Should exist', () => {
                        const model: IPlayerModel = getPlayerModel();
                        model.football.workingFoot = ENUM_SERVICE.enums?.workingFoots[0];
                        updateModel(model);

                        expect(fixture.nativeElement.querySelector('sfc-view-info-panel.working-foot .content > .mark.image'))
                            .toBeTruthy();
                    });

                    fit('Should have defined image', () => {
                        const model: IPlayerModel = getPlayerModel();
                        model.football.workingFoot = ENUM_SERVICE.enums?.workingFoots[0];
                        updateModel(model);

                        const iconEl = fixture.debugElement.query(By.css('sfc-view-info-panel.working-foot .content > .mark.image > sfc-icon'));

                        expect(iconEl.query(By.css('img')).nativeElement.src).toContain(ENUM_SERVICE.enums?.workingFoots[0].image);
                        expect(iconEl.attributes['ng-reflect-size']).toEqual(ComponentSize.Large);
                    });

                    fit('Should have defined text', () => {
                        const model: IPlayerModel = getPlayerModel();
                        model.football.workingFoot = ENUM_SERVICE.enums?.workingFoots[0];
                        updateModel(model);

                        expect(fixture.nativeElement.querySelector('sfc-view-info-panel.working-foot .content > .mark.image > span').innerText)
                            .toEqual(model.football.workingFoot?.value);
                    });
                });

                describe('Week', () => {
                    fit('Should not exist', () => {
                        const model: IPlayerModel = getPlayerModel();
                        model.football.weakFoot = null;
                        updateModel(model);

                        expect(fixture.nativeElement.querySelector('sfc-view-info-panel.working-foot .content > .week-foot'))
                            .toBeNull();
                    });

                    fit('Should exist', () => {
                        const model: IPlayerModel = getPlayerModel();
                        model.football.weakFoot = 3;
                        updateModel(model);

                        expect(fixture.nativeElement.querySelector('sfc-view-info-panel.working-foot .content > .week-foot'))
                            .toBeTruthy();
                    });

                    fit('Should title has defined text', () => {
                        const model: IPlayerModel = getPlayerModel();
                        model.football.weakFoot = 3;
                        updateModel(model);

                        expect(fixture.nativeElement.querySelector('sfc-view-info-panel.working-foot .content > .week-foot > span.title').innerText)
                            .toEqual('Week foot:');
                    });

                    fit('Should stars have valid attributes', () => {
                        const model: IPlayerModel = getPlayerModel();
                        model.football.weakFoot = 3;
                        updateModel(model);

                        const starsEl: DebugElement = fixture.debugElement.query(By.css('sfc-view-info-panel.working-foot .content > .week-foot > sfc-stars'));

                        expect(starsEl.componentInstance.value).toEqual(model.football.weakFoot);
                        expect(starsEl.attributes['ng-reflect-custom-size']).toEqual('0.8');
                    });
                });
            });

            describe('Number', () => {
                fit('Should have appropriate attributes', () => {
                    const panelEl: DebugElement = fixture.debugElement.query(By.css('sfc-view-info-panel.number'));

                    expect(panelEl.componentInstance.label).toEqual(GeneralViewLocalization.NUMBER.LABEL);
                    expect(panelEl.componentInstance.description).toEqual(GeneralViewLocalization.NUMBER.DESCRIPTION);
                    expect(panelEl.componentInstance.icon).toEqual(faShirt);
                });

                fit('Should exist', () => {
                    const model: IPlayerModel = getPlayerModel();
                    model.football.number = 4;
                    updateModel(model);

                    expect(fixture.nativeElement.querySelector('sfc-view-info-panel.number .content > span'))
                        .toBeTruthy();
                });

                fit('Should not exist', () => {
                    expect(fixture.nativeElement.querySelector('sfc-view-info-panel.number .content > span'))
                        .toBeTruthy();
                });

                fit('Should no data component exist', () => {
                    const model: IPlayerModel = getPlayerModel();
                    model.football.number = null;
                    updateModel(model);

                    expect(fixture.nativeElement.querySelector('sfc-view-info-panel.number .content > sfc-no-data'))
                        .toBeTruthy();
                });

                fit('Should no data component does not exist', () => {
                    const model: IPlayerModel = getPlayerModel();
                    model.football.number = 4;
                    updateModel(model);

                    expect(fixture.nativeElement.querySelector('sfc-view-info-panel.number .content > sfc-no-data'))
                        .toBeNull();
                });

                fit('Should have defined value', () => {
                    const model: IPlayerModel = getPlayerModel();
                    model.football.number = 4;
                    updateModel(model);

                    expect(fixture.nativeElement.querySelector('sfc-view-info-panel.number .content > span').innerText)
                        .toEqual(`${model.football.number}`);
                });
            });
        });
    });

    function updateModel(model: IPlayerModel): void {
        activateRouteMock.parent.data = of({ [ViewPageConstants.RESOLVE_KEY]: { result: model } });
        component.ngOnInit();
        fixture.detectChanges();
    }

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
});