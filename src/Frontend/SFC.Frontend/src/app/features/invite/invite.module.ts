import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { NgxSfcCommonModule } from "ngx-sfc-common";
import { NgxSfcComponentsModule } from "ngx-sfc-components";
import { NgxSfcInputsModule } from "ngx-sfc-inputs";
import { ShareModule } from "@share/share.module";
import { InviteRoutingModule } from "./invite-routing.module";
import {
    InviteTeamPlayerCreatePageComponent,
    InviteTeamPlayerMainEditComponent,
    InviteTeamPlayerProfileEditComponent,
    InviteTeamPlayerProfileFootballEditComponent,
    InviteTeamPlayerProfileGeneralEditComponent,
    InviteTeamPlayerViewPageComponent,
    InviteTeamPlayerViewMainComponent,
    InviteTeamPlayerViewProfileComponent,
    InviteTeamPlayerViewGeneralProfileComponent,
    InviteTeamPlayerEditPageComponent,
    InviteTeamPlayerInformationProgressComponent,
    InviteTeamPlayerPreviewComponent
} from "./parts/team/player";
import {
    InviteGamePlayerCreatePageComponent,
    InviteGamePlayerEditPageComponent,
    InviteGamePlayerViewPageComponent
} from "./parts/game/player";
import {
    InviteGameTeamCreatePageComponent,
    InviteGameTeamEditPageComponent,
    InviteGameTeamViewPageComponent
} from "./parts/game/team";

@NgModule({
    declarations: [
        // invite/team/player
        InviteTeamPlayerCreatePageComponent,
        InviteTeamPlayerMainEditComponent,
        InviteTeamPlayerProfileEditComponent,
        InviteTeamPlayerProfileFootballEditComponent,
        InviteTeamPlayerProfileGeneralEditComponent,
        InviteTeamPlayerViewPageComponent,
        InviteTeamPlayerViewMainComponent,
        InviteTeamPlayerViewProfileComponent,
        InviteTeamPlayerViewGeneralProfileComponent,
        InviteTeamPlayerEditPageComponent,
        InviteTeamPlayerInformationProgressComponent,
        InviteTeamPlayerPreviewComponent,
        // invite/team/player
        InviteGamePlayerCreatePageComponent,
        InviteGamePlayerEditPageComponent,
        InviteGamePlayerViewPageComponent,
        // invite/team/team
        InviteGameTeamCreatePageComponent,
        InviteGameTeamEditPageComponent,
        InviteGameTeamViewPageComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FontAwesomeModule,
        NgxSfcCommonModule,
        NgxSfcComponentsModule,
        NgxSfcInputsModule,
        ShareModule,
        InviteRoutingModule
    ],
    exports: []
})
export class InviteModule { }