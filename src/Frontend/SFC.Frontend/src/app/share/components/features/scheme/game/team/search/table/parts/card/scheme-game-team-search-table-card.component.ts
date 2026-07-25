import { Component, OnInit } from "@angular/core";
import { TableSelectService } from "ngx-sfc-components";
import { getPlayersRaiting } from "@share/utils/stats";
import { IPlayerModel } from "@share/models/player/player.model";
import { ISchemeGameTeamFormationPlayerModel } from "@share/models";
import { SchemeGameTeamSearchTableCardConstants } from "./scheme-game-team-search-table-card.constants";
import { ISchemeGameTeamSearchTableCardModel } from "./scheme-game-team-search-table-card.model";
import { BaseTableContentComponent } from "../../../../../../../../extends/components/table/parts/content/base-table-content.component";
import { ISchemeGameTeamSearchTableModel } from "../../scheme-game-team-search-table.model";
import { SchemeGameTeamSearchTableColumn } from "../../enums/scheme-game-team-search-table-column.enum";
import { isDefined, where } from "ngx-sfc-common";
import { SchemeGameTeamSearchTableConstants } from "../../scheme-game-team-search-table.constants";

@Component({
    selector: 'sfc-scheme-game-team-search-table-card',
    templateUrl: './scheme-game-team-search-table-card.component.html',
    styleUrls: ['./scheme-game-team-search-table-card.component.scss']
})
export class SchemeGameTeamSearchTableCardComponent
    extends BaseTableContentComponent<ISchemeGameTeamSearchTableModel, ISchemeGameTeamSearchTableCardModel>
    implements OnInit {

    // component
    Constants = SchemeGameTeamSearchTableCardConstants;
    Column = SchemeGameTeamSearchTableColumn;

    protected override get id(): number { return this.data.id; }

    constructor(selectedService: TableSelectService) {
        super(selectedService);
    }

    override ngOnInit(): void {
        super.ngOnInit();

        const schemePlayers: IPlayerModel[] = where(
            this.data.formation.players,
            (schemePlayer: ISchemeGameTeamFormationPlayerModel) => isDefined(schemePlayer.player))
            ?.map((schemePlayer: ISchemeGameTeamFormationPlayerModel) => schemePlayer.player!) || [];

        this.viewModel = {
            name: this.data.profile.general.name,
            formation: this.data.formation.formationId,
            raiting: getPlayersRaiting(schemePlayers),
            actions: this.data.actions || []
        };

        this.statusClass = this.buildStatusClass(SchemeGameTeamSearchTableConstants.STATUS_CLASS_PART, SchemeGameTeamSearchTableConstants.DEFAULT_CLASS_STATUS);
    }
}