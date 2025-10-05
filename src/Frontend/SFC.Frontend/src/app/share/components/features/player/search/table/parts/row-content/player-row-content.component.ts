import { Component, OnInit } from "@angular/core";
import { faCircleCheck, faXmarkCircle } from "@fortawesome/free-regular-svg-icons";
import { IPlayerRowContentModel } from "./player-row-content.model";
import { getEnum } from "@core/utils";
import { getRaiting } from "@share/utils/stats";
import { BasePlayerItemComponent } from "../../../../../player/search/table/base/base-player-item.component";
import { PlayerRowContentLocalization } from "./player-row-content.localization";

@Component({
    selector: 'sfc-player-row-content',
    templateUrl: './player-row-content.component.html',
    styleUrls: ['./player-row-content.component.scss']
})
export class PlayerRowContentComponent
    extends BasePlayerItemComponent
    implements OnInit {

    PlayersRowContentLocalization = PlayerRowContentLocalization;

    public vm!: IPlayerRowContentModel;

    override ngOnInit(): void {        
        this.vm = {
            freePlayIcon: this.model.general.freePlay ? faCircleCheck : faXmarkCircle,
            gameStyle: getEnum(this.model.football.gameStyle, this.enumService.enums.gameStyles),
            raiting: getRaiting(this.model.stats),
            skill: this.model.football.skill || 0,
            tags: this.tags,
            workingFoot: getEnum(this.model.football.workingFoot, this.enumService.enums.workingFoots),
            types: this.getTypes(this.enumService.enums.statTypes, this.enumService.enums.statSkills)
        };
    }
}