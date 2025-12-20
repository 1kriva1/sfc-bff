import { Observable, of } from "rxjs";
import { BaseErrorResponse, IPageModel } from "../../models";
import { INotification, NotificationService } from "../../services";
import { MessageSeverity } from "../../services/message/message-severity.enum";

export function catchBaseError<Response extends BaseErrorResponse>(error: Response, notificationService: NotificationService)
    : Observable<Response> {
    const notification: INotification = {
        severity: MessageSeverity.ERROR,
        value: error.Message,
        title: 'Error occured'
    };

    notificationService.notify(notification);

    return of(error);
}

export function catchPaginationError<T>(error: BaseErrorResponse, notificationService: NotificationService)
    : Observable<IPageModel<T>> {
    const notification: INotification = {
        severity: MessageSeverity.ERROR,
        value: error.Message,
        title: 'Fetch error'
    };

    notificationService.notify(notification);

    return of({ next: false, items: [], total: 0 });
}