import { BehaviorSubject, Observable } from "rxjs";

export interface ObservableDataModel<T> {
    data: T | null;
}

export class ObservableModel<T>{

    constructor(private defaultValue: T | null = null) { }

    public subject: BehaviorSubject<ObservableDataModel<T>> =
        new BehaviorSubject<ObservableDataModel<T>>({ data: null });

    public value$: Observable<ObservableDataModel<T>> = this.subject.asObservable();

    public get value(): T | null { return this.subject.value.data || this.defaultValue }
}