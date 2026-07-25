import { Component, OnInit } from "@angular/core";
import { TableSelectService } from "ngx-sfc-components";
import { getPlayersRaiting } from "@share/utils/stats";
import { EnumService } from "@share/services";
import { IPlayerModel } from "@share/models/player/player.model";
import { SchemeGameTeamSearchTableRowConstants } from "./scheme-game-team-search-table-row.constants";
import { ISchemeGameTeamSearchTableRowModel } from "./scheme-game-team-search-table-row.model";
import { ISchemeGameTeamFormationPlayerModel } from "@share/models";
import { BaseTableContentComponent } from "../../../../../../../../extends/components/table/parts/content/base-table-content.component";
import { ISchemeGameTeamSearchTableModel } from "../../scheme-game-team-search-table.model";
import { SchemeGameTeamSearchTableConstants } from "../../scheme-game-team-search-table.constants";
import { isDefined, where } from "ngx-sfc-common";
import { getFormationTotalPlayers } from "@share/utils";
import { SchemeGameTeamSearchTableColumn } from "../../enums/scheme-game-team-search-table-column.enum";

@Component({
    selector: 'sfc-scheme-game-team-search-table-row',
    templateUrl: './scheme-game-team-search-table-row.component.html',
    styleUrls: ['./scheme-game-team-search-table-row.component.scss']
})
export class SchemeGameTeamSearchTableRowComponent
    extends BaseTableContentComponent<ISchemeGameTeamSearchTableModel, ISchemeGameTeamSearchTableRowModel>
    implements OnInit { 

    // component
    Constants = SchemeGameTeamSearchTableRowConstants;
    Column = SchemeGameTeamSearchTableColumn;

    protected override get id(): number { return this.data.id; }

    constructor(private enumService: EnumService, selectedService: TableSelectService) {
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
            comment: this.data.profile.general.comment,
            formation: this.data.formation.formationId,
            raiting: getPlayersRaiting(schemePlayers),
            playersTotal: getFormationTotalPlayers(this.data.formation.formationId, this.enumService.enums.formations),
            playersSelected: schemePlayers.length,            
            actions: this.data.actions || []
        };

        this.statusClass = this.buildStatusClass(SchemeGameTeamSearchTableConstants.STATUS_CLASS_PART, SchemeGameTeamSearchTableConstants.DEFAULT_CLASS_STATUS);
    }
}