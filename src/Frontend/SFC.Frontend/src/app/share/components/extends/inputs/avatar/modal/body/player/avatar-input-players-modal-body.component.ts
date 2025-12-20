import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ModalService, ISortingModel, empty, ReloadService, IPaginationModel, CommonConstants, isDefined } from 'ngx-sfc-common';
import { ITableColumnExtendedModel, ITableSelectEvent } from 'ngx-sfc-components';
import { IForm } from '@core/types';
import { BaseListResponse, BasePaginationRequest } from '@core/models';
import { NotificationService } from '@core/services';
import { IFindPlayersFilterModel, IPlayerItemModel, PlayerService } from '@share/services';
import { EnumService } from '@share/services';
import { IPlayersFilterModel } from '@share/components/features/player/search/filters/models';
import { IPlayersTableModel } from '@share/components/features/player';
import { mapFindPlayersRequest, mapPlayerTableModel } from '@share/components/features/player/search/mappers';
import { AvatarInputPlayersModalBodyLocalization } from './avatar-input-players-modal-body.localization';
import { AvatarInputPlayersModalBodyTableConstants } from './parts/table/avatar-input-players-modal-body-table.constants';
import { IAvatarInputPlayersModalBodyEventModel } from './avatar-input-players-modal-body-event.model';
import { SearchComponent } from '@share/components/features/base/search/search.component';
import { ThemeService } from '@share/components/theme-toggler/services/theme/theme.service';

@Component({
    selector: 'sfc-avatar-input-players-modal-body',
    templateUrl: './avatar-input-players-modal-body.component.html',
    styleUrls: ['./avatar-input-players-modal-body.component.scss'],
    providers: [ModalService]
})
export class AvatarInputPlayersModalBodyComponent
    extends SearchComponent<
    IPlayersFilterModel,
    IFindPlayersFilterModel,
    IPlayerItemModel,
    IPlayersTableModel> {

    // ngx-sfc-common
    CommonConstants = CommonConstants;

    // component
    Localization = AvatarInputPlayersModalBodyLocalization;
    Constants = AvatarInputPlayersModalBodyTableConstants;

    @Input()
    value: number | null = null;

    @Input()
    selectOnClick: boolean = false;

    @Output()
    selectPlayer: EventEmitter<IAvatarInputPlayersModalBodyEventModel> = new EventEmitter<IAvatarInputPlayersModalBodyEventModel>();

    // TODO: issue with localization and non property value in separate constants file
    public TableColumns: ITableColumnExtendedModel[] = AvatarInputPlayersModalBodyTableConstants.COLUMNS;

    constructor(
        private formBuilder: FormBuilder,
        private playerService: PlayerService,
        private enumService: EnumService,        
        modalService: ModalService,
        themeService: ThemeService,
        notificationService: NotificationService,
        reloadService: ReloadService,
    ) {
        super(modalService, themeService, notificationService, reloadService);
    }

    buildFilterForm(): FormGroup {
        const controls: IForm<IPlayersFilterModel> = {
            name: [null]
        };

        return this.formBuilder.group(controls);
    }

    buildRequest(model: IPlayersFilterModel, pagination: IPaginationModel, sorting: ISortingModel | empty)
        : BasePaginationRequest<IFindPlayersFilterModel> {
        return mapFindPlayersRequest(model, pagination, sorting);
    }

    search(request: BasePaginationRequest<IFindPlayersFilterModel>): Observable<HttpResponse<BaseListResponse<IPlayerItemModel>>> {
        return this.playerService.find(request, false);
    }

    map(item: IPlayerItemModel): IPlayersTableModel {
        return mapPlayerTableModel(item, this.enumService);
    }

    public onSelect(event: ITableSelectEvent): void {
        if (event.selected && isDefined(this.value)) {
            this.value = null;
        }

        this.selectPlayer.emit({ selected: event.selected, player: event.args });
    }
}