import { Injectable } from "@angular/core";
import { faAdversal, faAlgolia } from "@fortawesome/free-brands-svg-icons";
import {
    faAsterisk, faBan, faBellSlash, faBook, faCar, faClock, faFutbol,
    faHockeyPuck, faHourglassEnd, faPowerOff, faRainbow, faSliders,
    faSpellCheck, faStar, faSun, faTruckMoving
} from "@fortawesome/free-solid-svg-icons";
import { map, Observable, tap } from "rxjs";
import { DataService } from "../data/data.service";
import { IGetDataResponse } from "../data/models/get-data.response";
import { IEnumsModel } from "./models/enums.model";

@Injectable({
    providedIn: 'root'
})
export class EnumService {
    public enums: IEnumsModel = {
        footballPositions: [],
        gameStyles: [],
        statCategories: [],
        statSkills: [],
        statTypes: [],
        workingFoots: [],
        badgeTypes: [],
        gameStatuses: [],
        teamStatuses: []
    };

    constructor(private dataService: DataService) { }

    public load(): Observable<IEnumsModel> {
        return this.dataService.get().pipe(
            tap((response: IGetDataResponse) => {
                this.enums = {
                    footballPositions: response.FootballPositions.map(value => ({
                        key: value.Id,
                        value: value.Title,
                        image: `app/core/assets/images/enums/position/${value.Id}.png`
                    })),
                    gameStyles: response.GameStyles.map(value => ({
                        key: value.Id,
                        value: value.Title,
                        image: `app/core/assets/images/enums/game-style/${value.Id}.png`
                    })),
                    workingFoots: response.WorkingFoots.map(value => ({
                        key: value.Id,
                        value: value.Title,
                        image: `app/core/assets/images/enums/foot/${value.Id}.png`
                    })),
                    statCategories: response.StatCategories.map(value => ({ key: value.Id, value: value.Title })),
                    statSkills: response.StatSkills.map(value => ({ key: value.Id, value: value.Title })),
                    statTypes: response.StatTypes.map(value => ({
                        key: value.Id,
                        value: value.Title,
                        category: value.Category,
                        skill: value.Skill
                    })),
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
                    ]
                };
            }),
            map(() => this.enums)
        );
    }
}