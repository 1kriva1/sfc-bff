import { Component, Input } from '@angular/core';
import { ITeamModel } from '@share/models/team/general/team.model';
import { empty } from 'ngx-sfc-common';

@Component({
    selector: 'sfc-scheme-team-preview',
    templateUrl: './scheme-team-preview.component.html'
})
export class SchemeTeamPreviewComponent {

    @Input()
    team: ITeamModel | empty;
}