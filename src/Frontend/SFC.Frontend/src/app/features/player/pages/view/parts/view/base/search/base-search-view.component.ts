import { FormBuilder, FormGroup } from "@angular/forms";
import { BaseErrorResponse } from "@core/models";
import { INotification, NotificationService } from "@core/services";
import { MessageSeverity } from "@core/services/message/message-severity.enum";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { ThemeService } from "@share/components/theme-toggler/services/theme/theme.service";
import {
    ComponentSize, ILoadContainerLoaderResultModel, ILoadContainerParameters,
    ILoadContainerPredicateParameters, Position, Theme
} from "ngx-sfc-common";
import { TableTemplate } from "ngx-sfc-components";
import { Observable, of } from "rxjs";

export abstract class BaseSearchViewComponent<T> {
    faMagnifyingGlass = faMagnifyingGlass;

    Position = Position;
    TableTemplate = TableTemplate;
    ComponentSize = ComponentSize;

    public abstract loader(parameters: ILoadContainerParameters): Observable<ILoadContainerLoaderResultModel<T>>

    public predicate$!: Observable<ILoadContainerPredicateParameters | null>;

    public get showLoading(): boolean { return this.themeService.theme == Theme.Default; }

    public searchForm!: FormGroup;

    protected initialized: boolean = false;

    constructor(
        public themeService: ThemeService,
        protected formBuilder: FormBuilder,
        private notificationService: NotificationService
    ) { }

    protected handleError(error: BaseErrorResponse): Observable<ILoadContainerLoaderResultModel<T>> {
        const notification: INotification = {
            severity: MessageSeverity.ERROR,
            value: `${$localize`:@@core.interceptor.error.error-value-part:An error occurred:`} ${error.Message}`,
            title: $localize`:@@core.interceptor.error.error-title:Opps, error occured!`
        };

        this.notificationService.notify(notification);

        return of({ next: false, items: [], total: 0 });
    }
}