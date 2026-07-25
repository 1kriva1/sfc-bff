import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Observable, startWith, Subscription } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { InviteGameTeamEditPageConstants } from "./invite-game-team-edit-page.constants";
import { ChangesCheckService } from "@core/guards/changes-check/changes-check.service";
import { GameService, GameTeamService } from "@share/services";
import { InviteGameTeamEditPageLocalization } from "./invite-game-team-edit-page.localization";
import { NotificationService } from "@core/services";
import { buildPropertyPath, buildTitle, getUrlSegments } from "@core/utils";
import { Title } from "@angular/platform-browser";
import { IInviteGameTeamEditPageModel } from "./models/invite-game-team-edit-page.model";
import { InviteGameTeamEditPageFormModel } from "./models/invite-game-team-edit-page-form.model";
import { ISideMenuModel } from "ngx-sfc-components";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { setMenuActiveItem } from "@share/utils";

@Component({
    templateUrl: './invite-game-team-edit-page.component.html',
    styleUrls: ['./invite-game-team-edit-page.component.scss']
})
export class InviteGameTeamEditPageComponent implements OnInit {

    // icons
    faQuestionCircle = faQuestionCircle;

    // component
    Localization = InviteGameTeamEditPageLocalization;

    public form!: FormGroup;

    public get value(): InviteGameTeamEditPageFormModel { return this.form.value; }

    public get value$(): Observable<InviteGameTeamEditPageFormModel> { return this.form.valueChanges.pipe(startWith(this.form.value)); }

    public get model(): IInviteGameTeamEditPageModel { return this.route.snapshot.data[InviteGameTeamEditPageConstants.RESOLVE_KEY].result; };

    public menu: ISideMenuModel = {
        label: InviteGameTeamEditPageLocalization.MENU.TITLE,
        open: true,
        switch: true,
        items: []
    };

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        public changesCheckService: ChangesCheckService,
        private notificationService: NotificationService,
        private titleService: Title,
        private gameService: GameService,
        private gameTeamService: GameTeamService
    ) {
    }

    ngOnInit(): void {
        this.form = this.buildForm();
        this.changesCheckService.init(this.form);
        this.setPageTitle();
        this.setMenuActiveItem();
    }

    private buildForm(): FormGroup {
        const form: FormGroup = this.formBuilder.group({});

        return form;
    }

    private setPageTitle(): void {
        const pageTitle = buildTitle('Name');
        this.titleService.setTitle(pageTitle);
    }    

    private setMenuActiveItem(): void {
        const segments: string[] = getUrlSegments(this.router.url, -2);
        setMenuActiveItem(this.menu, buildPropertyPath(segments));
    }
}