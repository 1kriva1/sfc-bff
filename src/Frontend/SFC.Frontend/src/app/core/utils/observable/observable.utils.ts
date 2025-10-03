import { combineLatest, filter, map, Observable, of, startWith, switchMap, shareReplay } from "rxjs";
import { BaseErrorResponse, IPageModel } from "../../models";
import { hasAnyItem, hasItem } from "ngx-sfc-common";
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

export function catchPageError<T>(error: BaseErrorResponse, notificationService: NotificationService)
    : Observable<IPageModel<T>> {
    const notification: INotification = {
        severity: MessageSeverity.ERROR,
        value: error.Message,
        title: 'Fetch error'
    };

    notificationService.notify(notification);

    return of({ next: false, items: [], total: 0 });
}

export function addReload(action: string, reload$: Observable<string[]>): Observable<string[]> {
    return reload$.pipe(filter(ids => hasItem(ids, action)));
}

export function addReloadWithStart(action: string, reload$: Observable<string[]>): Observable<string[]> {
    return reload$.pipe(
        startWith([action]),
        filter(ids => hasItem(ids, action))
    );
}

export function addReloadWithStartMultiple(actions: string[], reload$: Observable<string[]>): Observable<string[]> {
    return reload$.pipe(
        startWith(actions),
        filter(ids => hasAnyItem(ids, actions))
    );
}

export function combineWithReload<T>(value$: Observable<T>, reload$: Observable<string[]>, action: string): Observable<T> {
    const _$: Observable<any> = addReloadWithStart(action, reload$);
    return combineLatest([value$, _$]).pipe(map(([value, _]) => value));
}

export function combineWithReloadMultiple<T>(value$: Observable<T>, reload$: Observable<string[]>, actions: string[]): Observable<T> {
    const _$: Observable<any> = addReloadWithStartMultiple(actions, reload$);
    return combineLatest([value$, _$]).pipe(map(([value, _]) => value));
}

export function switchReload<T>(value$: Observable<T>, action: string, reload$: Observable<string[]>): Observable<T> {
    const result$: Observable<any> = addReload(action, reload$);
    return result$.pipe(switchMap(() => value$));
}

export function switchReloadWithStart<T>(value$: Observable<T>, action: string, reload$: Observable<string[]>): Observable<T> {
    const result$: Observable<any> = addReloadWithStart(action, reload$);
    return result$.pipe(switchMap(() => value$));
}

export function switchReloadWithStartAndShare<T>(value$: Observable<T>, action: string, reload$: Observable<string[]>): Observable<T> {
    const result$: Observable<any> = addReloadWithStart(action, reload$);
    return result$.pipe(
        switchMap(() => value$),
        shareReplay({ bufferSize: 1, refCount: true })
    );
}