import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { faAdversal, faAlgolia } from '@fortawesome/free-brands-svg-icons';
import {
    faStar, faBook, faCar, faHockeyPuck, faRainbow, faBellSlash,
    faSpellCheck, faSliders, faTruckMoving, faSun, faClock, faFutbol,
    faBan, faHourglassEnd, faAsterisk, faPowerOff
} from '@fortawesome/free-solid-svg-icons';
import { of } from 'rxjs';
import { DataService } from '../data/data.service';
import { IGetDataResponse } from '../data/models/get-data.response';
import { EnumService } from './enum.service';
import { IEnumsModel } from './models/enums.model';

describe('Share.Service:Enum', () => {
    let service: EnumService;
    let dataServiceStub: Partial<DataService> = {
        get: () => of()
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                { provide: DataService, useValue: dataServiceStub }
            ]
        });

        service = TestBed.inject(EnumService);
    });

    fit('Should be created', () => {
        expect(service).toBeTruthy();
    });

    fit('Should return values', (done) => {
        dataServiceStub.get = () => of(buildDataResponse());

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
                image: `app/core/assets/images/enums/position/0.png`
            }],
            gameStyles: [{
                key: 0,
                value: 'Attacking',
                image: `app/core/assets/images/enums/game-style/0.png`
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
                image: `app/core/assets/images/enums/foot/0.png`
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
                { key: 0, value: 'New', icon: faSun },
                { key: 1, value: 'Upcoming', icon: faClock },
                { key: 2, value: 'Active', icon: faFutbol },
                { key: 3, value: 'Canceled', icon: faBan },
                { key: 4, value: 'Finished', icon: faHourglassEnd },
            ],
            teamStatuses: [
                { key: 0, value: 'Temporary', icon: faAsterisk },
                { key: 1, value: 'New', icon: faSun },
                { key: 2, value: 'Active', icon: faFutbol },
                { key: 3, value: 'Postponed', icon: faPowerOff },
                { key: 4, value: 'Closed', icon: faBan }
            ],
            shirts: [
                { key: 0, value: 'Blue', image: 'app/core/assets/images/enums/shirts/0.png' },
                { key: 1, value: 'Pink', image: 'app/core/assets/images/enums/shirts/1.png' },
                { key: 2, value: 'Black', image: 'app/core/assets/images/enums/shirts/2.png' },
                { key: 3, value: 'Red', image: 'app/core/assets/images/enums/shirts/3.png' },
                { key: 4, value: 'Yellow', image: 'app/core/assets/images/enums/shirts/4.png' },
                { key: 5, value: 'Purple', image: 'app/core/assets/images/enums/shirts/5.png' },
                { key: 6, value: 'Orange', image: 'app/core/assets/images/enums/shirts/6.png' },
                { key: 7, value: 'Brown', image: 'app/core/assets/images/enums/shirts/7.png' },
                { key: 8, value: 'Green', image: 'app/core/assets/images/enums/shirts/8.png' }
            ]
        };
    }
});
