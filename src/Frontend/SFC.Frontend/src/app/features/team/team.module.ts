import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { NgxSfcCommonModule } from "ngx-sfc-common";
import { NgxSfcComponentsModule } from "ngx-sfc-components";
import { NgxSfcInputsModule } from "ngx-sfc-inputs";
import { ShareModule } from "@share/share.module";
import { TeamRoutingModule } from "./team-routing.module";
import { TeamPlayerRemoveModalComponent } from "./components";
import {
    PlayersPreviewListComponent, TeamAvailabilityProfileEditComponent, TeamCreatePageComponent,
    TeamCreatePlayersComponent, TeamCreatePlayersInviteComponent, TeamCreatePlayersInviteRowComponent,
    TeamEditPageComponent, TeamEditPlayerInviteRowComponent, TeamEditPlayerInvitesProgressComponent,
    TeamEditPlayerRequestRowComponent, TeamEditPlayerRequestsProgressComponent, TeamEditPlayersComponent,
    TeamEditPlayersInviteComponent, TeamEditPlayerSquadRowComponent, TeamEditPlayersRequestComponent,
    TeamEditPlayersSquadComponent, TeamEditSchemeRowComponent, TeamEditSchemesComponent,
    TeamEditSquadProgressComponent, TeamFinancialProfileEditComponent, TeamGeneralProfileEditComponent,
    TeamInformationProgressComponent, TeamMainEditComponent, TeamPlayersPreviewCardItemComponent,
    TeamPlayersPreviewComponent, TeamPlayersPreviewListItemComponent, TeamProfileEditComponent
} from "./parts/general";
import {
    TeamPlayerViewGeneralProfileComponent, TeamPlayerViewMainComponent, TeamPlayerViewPageComponent,
    TeamPlayerViewPreviewComponent, TeamPlayerViewProfileComponent
} from "./parts/player";

@NgModule({
    declarations: [
        // components
        TeamPlayerRemoveModalComponent,
        // general
        TeamCreatePageComponent,
        TeamCreatePlayersComponent,
        TeamCreatePlayersInviteComponent,
        TeamCreatePlayersInviteRowComponent,
        TeamMainEditComponent,
        TeamProfileEditComponent,
        TeamGeneralProfileEditComponent,
        TeamAvailabilityProfileEditComponent,
        TeamFinancialProfileEditComponent,
        TeamInformationProgressComponent,
        TeamEditSquadProgressComponent,
        TeamPlayersPreviewComponent,
        PlayersPreviewListComponent,
        TeamPlayersPreviewListItemComponent,
        TeamPlayersPreviewCardItemComponent,
        TeamEditPageComponent,
        TeamEditPlayerInvitesProgressComponent,
        TeamEditPlayerRequestsProgressComponent,
        TeamEditPlayersComponent,
        TeamEditPlayersSquadComponent,
        TeamEditPlayerSquadRowComponent,
        TeamEditPlayersInviteComponent,
        TeamEditPlayerInviteRowComponent,
        TeamEditPlayersRequestComponent,
        TeamEditPlayerRequestRowComponent,
        TeamEditSchemesComponent,
        TeamEditSchemeRowComponent,
        // player
        TeamPlayerViewPageComponent,
        TeamPlayerViewMainComponent,
        TeamPlayerViewProfileComponent,
        TeamPlayerViewGeneralProfileComponent,
        TeamPlayerViewPreviewComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FontAwesomeModule,
        NgxSfcCommonModule,
        NgxSfcComponentsModule,
        NgxSfcInputsModule,
        ShareModule,
        TeamRoutingModule
    ],
    exports: []
})
export class TeamModule { }