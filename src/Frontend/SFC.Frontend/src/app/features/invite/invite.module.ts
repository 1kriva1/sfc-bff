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

@NgModule({
    declarations: [
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