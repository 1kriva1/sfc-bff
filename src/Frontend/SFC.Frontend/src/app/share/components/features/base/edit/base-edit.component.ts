import { AfterViewInit, Directive, ElementRef, OnDestroy, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Subscription, startWith, tap, fromEvent, filter, map, switchMap, catchError, Observable } from "rxjs";
import { BaseErrorResponse } from "@core/models";
import { INotification, NotificationService } from "@core/services";
import { markFormTouchedAndDirty } from "@core/utils";
import { catchBaseError } from "@core/utils/observable";

@Directive()
export abstract class BaseEditComponent<FormValue, Request, Response extends BaseErrorResponse>
    implements AfterViewInit, OnDestroy {

    /* View child */

    @ViewChild('submitBtn', { static: false, read: ElementRef })
    private submitBtn!: ElementRef;

    /* End View child */

    /* Form */

    public form!: FormGroup;

    protected submitted: boolean = false;

    public get submitDisabled(): boolean { return this.submitted && this.form.invalid; }

    /* End Form */

    /* Subscription */

    private _subscription!: Subscription;
    
    /* End Subscription */

    /* API */

    public error: BaseErrorResponse | null = null;

    /* End API */

    /* Abstract */

    protected abstract mapRequest(value: FormValue): Request;

    protected abstract action(request: Request): Observable<Response>;

    protected abstract handleResponse(response: Response): void;

    protected abstract get notification(): INotification;

    /* End Abstract */

    constructor(protected notificationService: NotificationService) { }

    ngAfterViewInit(): void {
        const changes$ = this.form.valueChanges.pipe(
            startWith(this.form.value)
        );

        this._subscription = changes$.pipe(
            tap(() => this.error = null),
            switchMap((value: FormValue) => {
                return fromEvent<InputEvent>(this.submitBtn.nativeElement, 'click')
                    .pipe(
                        tap(() => this.tapSubmit()),
                        filter(() => this.form.valid),
                        map(() => this.mapRequest(value)),
                        switchMap((request: Request) =>
                            this.action(request).pipe(catchError((error) => catchBaseError(error, this.notificationService)))
                        )
                    );
            })
        ).subscribe((response: Response) => {
            this.error = response.Success ? null : response as BaseErrorResponse;
            this.handleResponse(response);
            this.notificationService.notify(this.notification);
        });
    }

    ngOnDestroy(): void {
        this._subscription.unsubscribe();
    }

    private tapSubmit(): void {
        if (!this.submitted) {
            this.submitted = true;
            markFormTouchedAndDirty(this.form);
        }
    }
}