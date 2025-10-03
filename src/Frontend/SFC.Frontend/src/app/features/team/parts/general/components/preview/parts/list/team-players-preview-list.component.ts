import { Component, Input } from '@angular/core';
import { ItemsView } from 'ngx-sfc-common';
import { TeamPlayersPreviewListLocalization } from './team-players-preview-list.localization';
import { ITeamPlayersPreviewListModel } from './team-players-preview-list.model';

@Component({
    selector: 'sfc-team-players-preview-list',
    templateUrl: './team-players-preview-list.component.html',
    styleUrls: ['./team-players-preview-list.component.scss']
})
export class PlayersPreviewListComponent {

    // ngx-sfc-common
    ItemsView = ItemsView;

    // component
    Localization = TeamPlayersPreviewListLocalization;

    /* Inputs */

    @Input()
    model!: ITeamPlayersPreviewListModel;

    @Input()
    view: ItemsView = ItemsView.List;

    /* End Inputs */
}