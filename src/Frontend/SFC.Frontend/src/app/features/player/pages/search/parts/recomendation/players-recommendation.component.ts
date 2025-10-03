import { Component, Input } from "@angular/core";
import { IPlayerInfoModel } from "@share/components/features/player/info/player-info.model";

@Component({
    selector: 'sfc-players-recommendation',
    templateUrl: './players-recommendation.component.html',
    styleUrls: ['./players-recommendation.component.scss']
})
export class PlayersRecommendationComponent {

    @Input()
    items: IPlayerInfoModel[] = [];
}