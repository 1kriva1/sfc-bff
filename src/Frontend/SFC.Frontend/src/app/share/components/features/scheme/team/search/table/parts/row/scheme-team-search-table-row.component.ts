import { Component, OnInit } from "@angular/core";
import { TableSelectService } from "ngx-sfc-components";
import { getPlayersRaiting } from "@share/utils/stats";
import { EnumService } from "@share/services";
import { IPlayerModel } from "@share/models/player/player.model";
import { SchemeTeamSearchTableRowConstants } from "./scheme-team-search-table-row.constants";
import { ISchemeTeamSearchTableRowModel } from "./scheme-team-search-table-row.model";
import { ISchemeTeamFormationPlayerModel } from "@share/models";
import { BaseTableContentComponent } from "../../../../../../../extends/components/table/parts/content/base-table-content.component";
import { ISchemeTeamSearchTableModel } from "../../scheme-team-search-table.model";
import { SchemeTeamSearchTableConstants } from "../../scheme-team-search-table.constants";
import { isDefined, where } from "ngx-sfc-common";
import { getFormationTotalPlayers } from "@share/utils";
import { SchemeTeamSearchTableColumn } from "../../enums/scheme-team-search-table-column.enum";

@Component({
    selector: 'sfc-scheme-team-search-table-row',
    templateUrl: './scheme-team-search-table-row.component.html',
    styleUrls: ['./scheme-team-search-table-row.component.scss']
})
export class SchemeTeamSearchTableRowComponent
    extends BaseTableContentComponent<ISchemeTeamSearchTableModel, ISchemeTeamSearchTableRowModel>
    implements OnInit { 

    // component
    Constants = SchemeTeamSearchTableRowConstants;
    Column = SchemeTeamSearchTableColumn;

    constructor(private enumService: EnumService, selectedService: TableSelectService) {
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
            comment: this.data.profile.general.comment,
            formation: this.data.formation.formationId,
            raiting: getPlayersRaiting(schemePlayers),
            playersTotal: getFormationTotalPlayers(this.data.formation.formationId, this.enumService.enums.formations),
            playersSelected: schemePlayers.length,            
            actions: this.data.actions || []
        };

        this.statusClass = this.buildStatusClass(SchemeTeamSearchTableConstants.STATUS_CLASS_PART, SchemeTeamSearchTableConstants.DEFAULT_CLASS_STATUS);
    }
}