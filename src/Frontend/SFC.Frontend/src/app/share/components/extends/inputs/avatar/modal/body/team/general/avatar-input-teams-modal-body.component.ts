import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ModalService, ISortingModel, empty, ReloadService, IPaginationModel, CommonConstants, isDefined } from 'ngx-sfc-common';
import { ITableColumnExtendedModel, ITableSelectEvent } from 'ngx-sfc-components';
import { AvatarInputPlayersModalBodyLocalization } from './avatar-input-teams-modal-body.localization';
import { SearchComponent } from '@share/components/features/base/search/search.component';
import { ITeamSearchTableModel } from '@share/components/features/team/general/search/table/team-search-table.model';
import { ITeamModel } from '@share/services/team/general/models/common/team.model';
import { IFindTeamsFilterModel } from '@share/services/team/general/models/find/filters/find-teams-filter.model';
import { ITeamSearchFilterModel } from '@share/components/features/team/general/search/filters/team-search-filter.model';
import { AvatarInputTeamsModalBodyTableConstants } from './parts/table/avatar-input-teams-modal-body-table.constants';
import { IAvatarInputTeamsModalBodyEventModel } from './avatar-input-teams-modal-body-event.model';
import { EnumService } from '@share/services';
import { NotificationService } from '@core/services';
import { TeamService } from '@share/services/team/general/team.service';
import { IForm } from '@core/types';
import { BaseListResponse, BasePaginationRequest } from '@core/models';
import { mapFindTeamsRequest } from '@share/components/features/team/general/search/filters/team-search-filter.mapper';
import { mapTeamSearchTableModel } from '@share/components/features/team/general/search/table/team-search-table.mapper';
import { ThemeService } from '@share/components/theme-toggler/services/theme/theme.service';

@Component({
    selector: 'sfc-avatar-input-teams-modal-body',
    templateUrl: './avatar-input-teams-modal-body.component.html',
    styleUrls: ['./avatar-input-teams-modal-body.component.scss'],
    providers: [ModalService]
})
export class AvatarInputTeamsModalBodyComponent
    extends SearchComponent<
    ITeamSearchFilterModel,
    IFindTeamsFilterModel,
    ITeamModel,
    ITeamSearchTableModel> {

    // ngx-sfc-common
    CommonConstants = CommonConstants;

    // component
    Localization = AvatarInputPlayersModalBodyLocalization;
    Constants = AvatarInputTeamsModalBodyTableConstants;

    @Input()
    value: number | null = null;

    @Output()
    selectTeam: EventEmitter<IAvatarInputTeamsModalBodyEventModel> = new EventEmitter<IAvatarInputTeamsModalBodyEventModel>();

    // TODO: issue with localization and non property value in separate constants file
    public TableColumns: ITableColumnExtendedModel[] = AvatarInputTeamsModalBodyTableConstants.COLUMNS;

    constructor(
        private formBuilder: FormBuilder,
        private teamService: TeamService,
        private enumService: EnumService,
        modalService: ModalService,
        themeService: ThemeService,
        notificationService: NotificationService,
        reloadService: ReloadService
    ) {
        super(modalService, themeService, notificationService, reloadService);
    }

    buildFilterForm(): FormGroup {
        const controls: IForm<ITeamSearchFilterModel> = {
            name: [null]
        };

        return this.formBuilder.group(controls);
    }

    buildRequest(model: ITeamSearchFilterModel, pagination: IPaginationModel, sorting: ISortingModel | empty)
        : BasePaginationRequest<IFindTeamsFilterModel> {
        return mapFindTeamsRequest(model, pagination, sorting);
    }

    search(request: BasePaginationRequest<IFindTeamsFilterModel>): Observable<HttpResponse<BaseListResponse<ITeamModel>>> {
        return this.teamService.find(request, false);
    }

    map(item: ITeamModel): ITeamSearchTableModel {
        return mapTeamSearchTableModel(item, this.enumService);
    }

    public onSelect(event: ITableSelectEvent): void {
        if (event.selected && isDefined(this.value)) {
            this.value = null;
        }

        this.selectTeam.emit({ selected: event.selected, team: event.args });
    }
}