import { Injectable } from "@angular/core";
import { faAdversal, faAlgolia } from "@fortawesome/free-brands-svg-icons";
import {
    faBellSlash, faBook, faCar,
    faHockeyPuck, faRainbow, faSliders,
    faSpellCheck, faStar, faTruckMoving
} from "@fortawesome/free-solid-svg-icons";
import { forkJoin, map, Observable, tap } from "rxjs";
import { DataService } from "../data/data.service";
import { InviteDataService } from "../invite/data/invite-data.service";
import { RequestDataService } from "../request/data/request-data.service";
import { SchemeDataService } from "../scheme/data/scheme-data.service";
import { TeamDataService } from "../team/data/team-data.service";
import { IEnumsModel } from "./models/enum/enums.model";
import { IServicesDataModel } from "./models/common/services-data.model";
import {
    mapEnum,
    mapFormationEnum,
    mapFormationPositionEnum,
    mapImageEnum,
    mapInviteStatusEnum,
    mapRequestStatusEnum,
    mapStatTypeEnum,
    mapTeamPlayerStatusEnum,
    mapTeamStatusEnum
} from "../../mappers";
import { GameDataService } from "../game";
import { mapGameStatusEnum } from "../../mappers/enum/enum.mapper";

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
        teamStatuses: [],
        shirts: [],
        inviteStatuses: [],
        requestStatuses: [],
        teamPlayerStatuses: [],
        formations: [],
        formationPositions: [],
        formationType: []
    };

    constructor(
        private dataService: DataService,
        private inviteDataService: InviteDataService,
        private requestDataService: RequestDataService,
        private teamDataService: TeamDataService,
        private schemeDataService: SchemeDataService,
        private gameDataService: GameDataService,
    ) { }

    public load(): Observable<IEnumsModel> {
        return forkJoin({
            data: this.dataService.get(),
            invite: this.inviteDataService.get(),
            request: this.requestDataService.get(),
            team: this.teamDataService.get(),
            scheme: this.schemeDataService.get(),
            game: this.gameDataService.get()
        }).pipe(
            tap((data: IServicesDataModel) => {
                this.enums = {
                    footballPositions: data.data.FootballPositions.map(value => mapImageEnum(value, 'app/share/assets/images/enums/position')),
                    gameStyles: data.data.GameStyles.map(value => mapImageEnum(value, 'app/share/assets/images/enums/game-style')),
                    workingFoots: data.data.WorkingFoots.map(value => mapImageEnum(value, 'app/share/assets/images/enums/foot')),
                    statCategories: data.data.StatCategories.map(value => mapEnum(value)),
                    statSkills: data.data.StatSkills.map(value => mapEnum(value)),
                    statTypes: data.data.StatTypes.map(value => mapStatTypeEnum(value)),
                    shirts: data.data.Shirts.map(value => mapImageEnum(value, 'app/share/assets/images/enums/shirts')),
                    teamStatuses: data.team.TeamStatuses.map(value => mapTeamStatusEnum(value)),
                    teamPlayerStatuses: data.team.TeamPlayerStatuses.map(value => mapTeamPlayerStatusEnum(value)),
                    inviteStatuses: data.invite.InviteStatuses.map(value => mapInviteStatusEnum(value)),
                    requestStatuses: data.request.RequestStatuses.map(value => mapRequestStatusEnum(value)),
                    formations: data.scheme.Formations.map(value => mapFormationEnum(value, 'app/share/assets/images/enums/formation', 'jpg')),
                    formationPositions: data.scheme.FormationPositions.map(value => mapFormationPositionEnum(value)),
                    formationType: data.scheme.SchemeTypes.map(value => mapEnum(value)),
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
                    gameStatuses: data.game.GameStatuses.map(value => mapGameStatusEnum(value)),
                };
            }),
            map(() => this.enums)
        );
    }
}