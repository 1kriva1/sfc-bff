import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ModalService, ISortingModel, empty, ReloadService, IPaginationModel, CommonConstants } from 'ngx-sfc-common';
import { IDropdownMenuItemModel } from 'ngx-sfc-components';
import { IForm } from '@core/types';
import { BaseListResponse, BasePaginationRequest, IBuildActionParameters } from '@core/models';
import { NotificationService } from '@core/services';
import { IFindTeamSchemesFilterModel, SchemeTeamService } from '@share/services';
import { EnumService } from '@share/services';
import { RouteKey } from '@core/enums';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { buildActionParameters, buildBackNavigationExtras, getRouteId } from '@core/utils';
import { ITeamSchemeModel } from '@share/services/scheme/team/models/common/team-scheme.model';
import { buildEditTeamSchemeAction, buildRemoveTeamSchemeAction } from 'src/app/features/team/utils/team-actions.utils';
import { TableLocalization } from '@share/localization/table.localization';
import { SearchComponent } from '@share/components/features/base/search/search.component';
import { SchemeAction, SchemeRoute, TeamAction as TeamAction1, TeamRoute } from '@share/enums';
import { TeamEditSchemesLocalization } from './team-edit-schemes.localization';
import { TeamEditSchemesTableConstants } from './parts/table/team-edit-schemes-table.constants';
import { ITeamEditSchemesFilterModel } from './team-edit-schemes-form.model';
import { ITeamEditSchemesTableModel } from './parts/table/team-edit-schemes-table.model';
import { mapFindTeamSchemesRequest, mapTeamEditSchemesTableModel } from './team-edit-schemes.mapper';
import { TeamLocalization } from 'src/app/features/team/localization';
import { ThemeService } from '@share/components/theme-toggler/services/theme/theme.service';
import { buildViewSchemeTeamAction } from '@share/utils';

@Component({
    templateUrl: './team-edit-schemes.component.html',
    styleUrls: ['./team-edit-schemes.component.scss']
})
export class TeamEditSchemesComponent
    extends SearchComponent<ITeamEditSchemesFilterModel, IFindTeamSchemesFilterModel, ITeamSchemeModel, ITeamEditSchemesTableModel> {

    // icons
    faPlus = faPlus;

    // ngx-sfc-common
    CommonConstants = CommonConstants;

    // core
    TableLocalization = TableLocalization;

    // component
    Localization = TeamEditSchemesLocalization;
    TableConstants = TeamEditSchemesTableConstants;

    /* Overrides */

    override actions = [TeamAction1.Player, SchemeAction.Team];

    /* End Table */

    private teamId: number;

    private backNavigationExtras: NavigationExtras;

    /* End Fields */

    constructor(
        private formBuilder: FormBuilder,
        private schemeTeamService: SchemeTeamService,
        private router: Router,
        modalService: ModalService,
        themeService: ThemeService,
        notificationService: NotificationService,
        reloadService: ReloadService,
        route: ActivatedRoute,
        private enumService: EnumService
    ) {
        super(modalService, themeService, notificationService, reloadService);
        this.teamId = getRouteId(route.snapshot);
        this.backNavigationExtras = buildBackNavigationExtras(this.router.url, TeamLocalization.NAVIGATION_BACK_LABEL);
    }

    buildFilterForm(): FormGroup {
        const controls: IForm<ITeamEditSchemesFilterModel> = {
            name: [null]
        };

        return this.formBuilder.group(controls);
    }

    buildRequest(model: ITeamEditSchemesFilterModel, pagination: IPaginationModel, sorting: ISortingModel | empty)
        : BasePaginationRequest<IFindTeamSchemesFilterModel> {
        return mapFindTeamSchemesRequest(model, pagination, sorting);
    }

    search(request: BasePaginationRequest<IFindTeamSchemesFilterModel>): Observable<HttpResponse<BaseListResponse<ITeamSchemeModel>>> {
        return this.schemeTeamService.find(this.teamId, request);
    }

    map(item: ITeamSchemeModel): ITeamEditSchemesTableModel {
        return mapTeamEditSchemesTableModel(item, this.enumService, teamScheme => { return this.buildActions(teamScheme) });
    }

    public navigateToCreatePage(): void {
        this.router.navigate(
            [`${SchemeRoute.Schemes}/${TeamRoute.Teams}/${this.teamId}/${RouteKey.Create}`],
            this.backNavigationExtras
        );
    }

    private buildActions(scheme: ITeamEditSchemesTableModel): IDropdownMenuItemModel[] {
        const actionParameters: IBuildActionParameters = buildActionParameters(this.router, this.backNavigationExtras),
            actions: IDropdownMenuItemModel[] = [
                buildEditTeamSchemeAction(scheme.team.id, scheme.id, this.router, this.backNavigationExtras),
                buildRemoveTeamSchemeAction(this.modalService, scheme),
                buildViewSchemeTeamAction(scheme.team.id, scheme.id, actionParameters)
            ];

        return actions;
    }
}