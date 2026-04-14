import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { faAdversal, faAlgolia } from '@fortawesome/free-brands-svg-icons';
import {
    faStar, faBook, faCar, faHockeyPuck, faRainbow, faBellSlash,
    faSpellCheck, faSliders, faTruckMoving, faSun, faClock, faFutbol,
    faBan, faHourglassEnd, faAsterisk, faPowerOff,
    faFlagCheckered,
    faBaby
} from '@fortawesome/free-solid-svg-icons';
import { of } from 'rxjs';
import { DataService } from '../data/data.service';
import { IGetDataResponse } from '../data/models/get/get-data.response';
import { IGetInviteDataResponse } from '../invite';
import { InviteDataService } from '../invite/data/invite-data.service';
import { IGetRequestDataResponse } from '../request';
import { RequestDataService } from '../request/data/request-data.service';
import { IGetSchemeDataResponse } from '../scheme';
import { SchemeDataService } from '../scheme/data/scheme-data.service';
import { IGetTeamDataResponse } from '../team';
import { TeamDataService } from '../team/data/team-data.service';
import { EnumService } from './enum.service';
import { IEnumsModel } from './models/enum/enums.model';
import { GameDataService } from '../game/data/game-data.service';
import { IGetGameDataResponse } from '../game';

describe('Share.Service:Enum', () => {
    let service: EnumService;
    let dataServiceStub: Partial<DataService> = { get: () => of() };
    let inviteDataServiceStub: Partial<InviteDataService> = { get: () => of() };
    let requestDataServiceStub: Partial<RequestDataService> = { get: () => of() };
    let teamDataServiceStub: Partial<TeamDataService> = { get: () => of() };
    let schemeDataServiceStub: Partial<SchemeDataService> = { get: () => of() };
    let gameDataServiceStub: Partial<GameDataService> = { get: () => of() };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                { provide: DataService, useValue: dataServiceStub },
                { provide: InviteDataService, useValue: inviteDataServiceStub },
                { provide: RequestDataService, useValue: requestDataServiceStub },
                { provide: TeamDataService, useValue: teamDataServiceStub },
                { provide: SchemeDataService, useValue: schemeDataServiceStub },
                { provide: GameDataService, useValue: gameDataServiceStub }
            ]
        });

        service = TestBed.inject(EnumService);
    });

    fit('Should be created', () => {
        expect(service).toBeTruthy();
    });

    fit('Should return values', (done) => {
        dataServiceStub.get = () => of(buildDataResponse());
        inviteDataServiceStub.get = () => of(buildGetInviteDataResponse());
        requestDataServiceStub.get = () => of(buildGetRequestDataResponse());
        teamDataServiceStub.get = () => of(buildGetTeamDataResponse());
        schemeDataServiceStub.get = () => of(buildGetSchemeDataResponse());
        schemeDataServiceStub.get = () => of(buildGetSchemeDataResponse());
        gameDataServiceStub.get = () => of(buildGetGameDataResponse());

        service.load().subscribe((model: IEnumsModel) => {
            expect(model).toEqual(buildEnumsModel());
            done();
        });
    });

    fit('Should store values', (done) => {
        dataServiceStub.get = () => of(buildDataResponse());

        service.load().subscribe((model: IEnumsModel) => {
            expect(service.enums).toEqual(buildEnumsModel());
            expect(service.enums).toEqual(model);
            done();
        });
    });

    function buildDataResponse(): IGetDataResponse {
        return {
            FootballPositions: [{ Id: 0, Title: 'Goalkeeper' }],
            GameStyles: [{ Id: 0, Title: 'Attacking' }],
            StatCategories: [{ Id: 0, Title: 'Pace' }],
            StatSkills: [{ Id: 0, Title: 'Mental' }],
            StatTypes: [{ Id: 0, Title: 'SprintSpeed', Category: 0, Skill: 0 }],
            WorkingFoots: [{ Id: 0, Title: 'Right' }],
            Shirts: [
                { Id: 0, Title: 'Blue' },
                { Id: 1, Title: 'Pink' },
                { Id: 2, Title: 'Black' },
                { Id: 3, Title: 'Red' },
                { Id: 4, Title: 'Yellow' },
                { Id: 5, Title: 'Purple' },
                { Id: 6, Title: 'Orange' },
                { Id: 7, Title: 'Brown' },
                { Id: 8, Title: 'Green' }
            ],
            Errors: null,
            Success: true,
            Message: 'Success'
        };
    }

    function buildGetInviteDataResponse(): IGetInviteDataResponse {
        return {
            InviteStatuses: [],
            Errors: null,
            Success: true,
            Message: 'Success'
        };
    }

    function buildGetRequestDataResponse(): IGetRequestDataResponse {
        return {
            RequestStatuses: [],
            Errors: null,
            Success: true,
            Message: 'Success'
        };
    }

    function buildGetSchemeDataResponse(): IGetSchemeDataResponse {
        return {
            FormationPositions: [],
            Formations: [],
            SchemeTypes: [],
            Errors: null,
            Success: true,
            Message: 'Success'
        };
    }

    function buildGetTeamDataResponse(): IGetTeamDataResponse {
        return {
            TeamPlayerStatuses: [],
            TeamStatuses: [
                { Id: 0, Title: 'Temporary' },
                { Id: 1, Title: 'New' },
                { Id: 2, Title: 'Active' },
                { Id: 3, Title: 'Postponed' }
            ],
            Errors: null,
            Success: true,
            Message: 'Success'
        };
    }

    function buildGetGameDataResponse(): IGetGameDataResponse {
        return {
            GameStatuses: [
                {
                    Id: 0,
                    Title: 'New'
                },
                {
                    Id: 1,
                    Title: 'Upcoming'
                },
                {
                    Id: 2,
                    Title: 'Active'
                },
                {
                    Id: 3,
                    Title: 'Finished'
                },
                {
                    Id: 4,
                    Title: 'Canceled'
                }
            ],
            Errors: null,
            Success: true,
            Message: 'Success'
        };
    }

    function buildEnumsModel(): IEnumsModel {
        return {
            footballPositions: [{
                key: 0,
                value: 'Goalkeeper',
                image: `app/share/assets/images/enums/position/0.png`
            }],
            gameStyles: [{
                key: 0,
                value: 'Attacking',
                image: `app/share/assets/images/enums/game-style/0.png`
            }],
            statCategories: [{
                key: 0,
                value: 'Pace'
            }],
            statSkills: [{
                key: 0,
                value: 'Mental'
            }],
            statTypes: [{
                key: 0,
                value: 'SprintSpeed',
                category: 0,
                skill: 0
            }],
            workingFoots: [{
                key: 0,
                value: 'Right',
                image: `app/share/assets/images/enums/foot/0.png`
            }],
            badgeTypes: [
                { key: 0, value: 'Badge_0', icon: faStar, description: 'Has posted more than 1000 posts on their profile' },
                { key: 1, value: 'Badge_1', icon: faStar, description: 'Has posted more than 1000 posts on their profile' },
                { key: 2, value: 'Badge_2', icon: faAdversal, description: 'Has posted more than 1000 posts on their profile' },
                { key: 3, value: 'Badge_3', icon: faAlgolia, description: 'Has posted more than 1000 posts on their profile' },
                { key: 4, value: 'Badge_4', icon: faBook, description: 'Has posted more than 1000 posts on their profile' },
                { key: 5, value: 'Badge_5', icon: faCar, description: 'Has posted more than 1000 posts on their profile' },
                { key: 6, value: 'Badge_6', icon: faHockeyPuck, description: 'Has posted more than 1000 posts on their profile' },
                { key: 7, value: 'Badge_7', icon: faRainbow, description: 'Has posted more than 1000 posts on their profile' },
                { key: 8, value: 'Badge_8', icon: faBellSlash, description: 'Has posted more than 1000 posts on their profile' },
                { key: 9, value: 'Badge_9', icon: faSpellCheck, description: 'Has posted more than 1000 posts on their profile' },
                { key: 10, value: 'Badge_10', icon: faSliders, description: 'Has posted more than 1000 posts on their profile' },
                { key: 11, value: 'Badge_11', icon: faTruckMoving, description: 'Has posted more than 1000 posts on their profile' }
            ],
            gameStatuses: [
                { key: 0, value: 'New', icon: faBaby },
                { key: 1, value: 'Upcoming', icon: faClock },
                { key: 2, value: 'Active', icon: faFutbol },
                { key: 3, value: 'Finished', icon: faFlagCheckered },
                { key: 4, value: 'Canceled', icon: faBan },
            ],
            teamStatuses: [
                { key: 0, value: 'Temporary', icon: faAsterisk },
                { key: 1, value: 'New', icon: faFutbol },
                { key: 2, value: 'Active', icon: faPowerOff },
                { key: 3, value: 'Postponed', icon: faBan }
            ],
            shirts: [
                { key: 0, value: 'Blue', image: 'app/share/assets/images/enums/shirts/0.png' },
                { key: 1, value: 'Pink', image: 'app/share/assets/images/enums/shirts/1.png' },
                { key: 2, value: 'Black', image: 'app/share/assets/images/enums/shirts/2.png' },
                { key: 3, value: 'Red', image: 'app/share/assets/images/enums/shirts/3.png' },
                { key: 4, value: 'Yellow', image: 'app/share/assets/images/enums/shirts/4.png' },
                { key: 5, value: 'Purple', image: 'app/share/assets/images/enums/shirts/5.png' },
                { key: 6, value: 'Orange', image: 'app/share/assets/images/enums/shirts/6.png' },
                { key: 7, value: 'Brown', image: 'app/share/assets/images/enums/shirts/7.png' },
                { key: 8, value: 'Green', image: 'app/share/assets/images/enums/shirts/8.png' }
            ],
            formationPositions: [],
            formations: [],
            formationType: [],
            inviteStatuses: [],
            requestStatuses: [],
            teamPlayerStatuses: []
        };
    }
});
