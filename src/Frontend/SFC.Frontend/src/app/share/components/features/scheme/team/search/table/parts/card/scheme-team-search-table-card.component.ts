import { Component, OnInit } from "@angular/core";
import { TableSelectService } from "ngx-sfc-components";
import { getPlayersRaiting } from "@share/utils/stats";
import { IPlayerModel } from "@share/models/player/player.model";
import { ISchemeTeamFormationPlayerModel } from "@share/models";
import { SchemeTeamSearchTableCardConstants } from "./scheme-team-search-table-card.constants";
import { ISchemeTeamSearchTableCardModel } from "./scheme-team-search-table-card.model";
import { BaseTableContentComponent } from "../../../../../../../extends/components/table/parts/content/base-table-content.component";
import { ISchemeTeamSearchTableModel } from "../../scheme-team-search-table.model";
import { SchemeTeamSearchTableColumn } from "../../enums/scheme-team-search-table-column.enum";
import { isDefined, where } from "ngx-sfc-common";
import { SchemeTeamSearchTableConstants } from "../../scheme-team-search-table.constants";

@Component({
    selector: 'sfc-scheme-team-search-table-card',
    templateUrl: './scheme-team-search-table-card.component.html',
    styleUrls: ['./scheme-team-search-table-card.component.scss']
})
export class SchemeTeamSearchTableCardComponent
    extends BaseTableContentComponent<ISchemeTeamSearchTableModel, ISchemeTeamSearchTableCardModel>
    implements OnInit {

    // component
    Constants = SchemeTeamSearchTableCardConstants;
    Column = SchemeTeamSearchTableColumn;

    protected override get id(): number { return this.data.id; }

    constructor(selectedService: TableSelectService) {
        super(selectedService);
    }

    override ngOnInit(): void {
        super.ngOnInit();

        const schemePlayers: IPlayerModel[] = where(
            this.data.formation.players,
            (schemePlayer: ISchemeTeamFormationPlayerModel) => isDefined(schemePlayer.player))
            ?.map((schemePlayer: ISchemeTeamFormationPlayerModel) => schemePlayer.player!) || [];

        this.viewModel = {
            name: this.data.profile.general.name,
            formation: this.data.formation.formationId,
            raiting: getPlayersRaiting(schemePlayers),
            actions: this.data.actions || []
        };

        this.statusClass = this.buildStatusClass(SchemeTeamSearchTableConstants.STATUS_CLASS_PART, SchemeTeamSearchTableConstants.DEFAULT_CLASS_STATUS);
    }
}