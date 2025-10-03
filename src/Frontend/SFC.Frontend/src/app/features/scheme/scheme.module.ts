import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { NgxSfcCommonModule } from "ngx-sfc-common";
import { NgxSfcComponentsModule } from "ngx-sfc-components";
import { NgxSfcInputsModule } from "ngx-sfc-inputs";
import { ShareModule } from "@share/share.module";
import {
    SchemeTeamCreatePageComponent,
    SchemeTeamEditPageComponent,
    SchemeTeamFormationEditComponent,
    SchemeTeamFormationEditFieldComponent,
    SchemeTeamFormationProgressComponent,
    SchemeTeamInformationProgressComponent,
    SchemeTeamMainEditComponent,
    SchemeTeamPreviewComponent,
    SchemeTeamProfileEditComponent,
    SchemeTeamProfileGeneralEditComponent,
    SchemeTeamViewGeneralProfileComponent,
    SchemeTeamViewMainComponent,
    SchemeTeamViewPageComponent,
    SchemeTeamViewProfileComponent

} from "./parts/team";
import { SchemeRoutingModule } from "./scheme-routing.module";

@NgModule({
    declarations: [
        SchemeTeamCreatePageComponent,
        SchemeTeamEditPageComponent,
        SchemeTeamFormationEditComponent,
        SchemeTeamFormationEditFieldComponent,
        SchemeTeamFormationProgressComponent,
        SchemeTeamInformationProgressComponent,
        SchemeTeamMainEditComponent,
        SchemeTeamPreviewComponent,
        SchemeTeamProfileEditComponent,
        SchemeTeamProfileGeneralEditComponent,
        SchemeTeamViewGeneralProfileComponent,
        SchemeTeamViewMainComponent,
        SchemeTeamViewPageComponent,
        SchemeTeamViewProfileComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FontAwesomeModule,
        NgxSfcCommonModule,
        NgxSfcComponentsModule,
        NgxSfcInputsModule,
        ShareModule,
        SchemeRoutingModule
    ],
    exports: []
})
export class SchemeModule { }