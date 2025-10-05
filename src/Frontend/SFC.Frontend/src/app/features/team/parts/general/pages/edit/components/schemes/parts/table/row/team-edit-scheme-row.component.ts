import { Component, Input, OnInit } from "@angular/core";
import { Position } from "ngx-sfc-common";
import { ITableColumnExtendedModel } from "ngx-sfc-components";
import { getPlayersRaiting } from "@share/utils/stats";
import { EnumService } from "@share/services";
import { IFormationEnumModel } from "@share/services/enum/models/enum/formation-enum.model";
import { getFormationEnum } from "@share/utils/formations";
import { TeamEditSchemesTableColumn } from "../team-edit-schemes-table-column.enum";
import { ITeamEditSchemeRowModel } from "./team-edit-scheme-row.model";
import { ITeamEditSchemesTableModel } from "../team-edit-schemes-table.model";

@Component({
    selector: 'sfc-team-edit-scheme-row',
    templateUrl: './team-edit-scheme-row.component.html',
    styleUrls: ['./team-edit-scheme-row.component.scss']
})
export class TeamEditSchemeRowComponent implements OnInit {

    // ngx-sfc-common
    Position = Position;

    // component
    Column = TeamEditSchemesTableColumn;

    /* Inputs */

    @Input()
    model!: ITeamEditSchemesTableModel;

    @Input()
    columns: ITableColumnExtendedModel[] = [];

    /* End Inputs */

    /* Fields */

    public viewModel!: ITeamEditSchemeRowModel;

    /* End Fields */

    constructor(private enumService: EnumService) { }

    ngOnInit(): void {
        const rating = getPlayersRaiting(this.model.formation.players.map(teamPlayer => teamPlayer.player!)),
            formation: IFormationEnumModel = getFormationEnum(this.model.formation.formationId, this.enumService.enums.formations)!;

        this.viewModel = {
            name: this.model.profile.general.name,
            comment: this.model.profile.general.comment,
            formation: formation,
            rating: rating
        };
    }
}