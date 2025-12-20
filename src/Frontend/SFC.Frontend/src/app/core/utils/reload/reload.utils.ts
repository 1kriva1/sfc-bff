import { combineLatest, filter, map, Observable, startWith, switchMap, shareReplay } from "rxjs";
import { hasAnyItem, hasItem } from "ngx-sfc-common";

// Add reload

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

// End Add reload

// Combine with reload

export function combineWithReload<T>(value$: Observable<T>, reload$: Observable<string[]>, action: string): Observable<T> {
    const _$: Observable<any> = addReloadWithStart(action, reload$);
    return combineLatest([value$, _$]).pipe(map(([value, _]) => value));
}

export function combineWithReloadMultiple<T>(value$: Observable<T>, reload$: Observable<string[]>, actions: string[]): Observable<T> {
    const _$: Observable<any> = addReloadWithStartMultiple(actions, reload$);
    return combineLatest([value$, _$]).pipe(map(([value, _]) => value));
}

// End Combine with reload

// Switch to reload

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

// End Switch to reload