import { Component, OnInit } from "@angular/core";
import { faCircleCheck, faXmarkCircle } from "@fortawesome/free-regular-svg-icons";
import { IPlayerRowContentModel } from "./player-row-content.model";
import { getRaiting } from "@share/utils";
import { BasePlayerItemComponent } from "../base/base-player-item.component";
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

    ngOnInit(): void {
        this.vm = {
            freePlayIcon: this.model.general.freePlay ? faCircleCheck : faXmarkCircle,
            gameStyle: this.getGameStyle(this.enumService.enums.gameStyles),
            raiting: getRaiting(this.model.stats),
            skill: this.model.football.skill || 0,
            tags: this.tags,
            workingFoot: this.getWorkingFoot(this.enumService.enums.workingFoots),
            types: this.getTypes(this.enumService.enums.statTypes, this.enumService.enums.statSkills)
        };
    }
}