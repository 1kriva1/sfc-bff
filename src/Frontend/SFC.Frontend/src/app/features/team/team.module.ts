import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ShareModule } from "@share/share.module";
import { NgxSfcCommonModule } from "ngx-sfc-common";
import { NgxSfcComponentsModule } from "ngx-sfc-components";
import { NgxSfcInputsModule } from "ngx-sfc-inputs";
import {
    ShirtCarouselSliderContentComponent,
    TabLabelComponent,
    EditPageProgressComponent,
    PlayersByPositionPreviewComponent,
    PlayersPreviewComponent,
    PlayerListItemComponent,
    PlayerIconItemComponent,
    GeneralEditComponent,
    AvailabilityEditComponent,
    FinancialEditComponent,
    InformationEditComponent,
    PlayersEditComponent
} from "./components";
import { CreatePageComponent, EditPageComponent } from "./pages";
import { TeamRoutingModule } from "./team-routing.module";

@NgModule({
    declarations: [
        // create
        CreatePageComponent,
        ShirtCarouselSliderContentComponent,
        PlayersByPositionPreviewComponent,
        PlayersPreviewComponent,
        PlayerListItemComponent,
        PlayerIconItemComponent,
        TabLabelComponent,
        GeneralEditComponent,
        AvailabilityEditComponent,
        FinancialEditComponent,
        InformationEditComponent,
        PlayersEditComponent,
        EditPageProgressComponent,
        // edit
        EditPageComponent
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