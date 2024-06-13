import { Component, OnDestroy, OnInit } from '@angular/core';
import { ControlContainer, FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';
import { Sequence } from 'ngx-sfc-common';
import { getProgressColorDynamicallyFunc } from 'ngx-sfc-components';
import { map, Observable, pairwise, startWith, Subscription } from 'rxjs';
import { EditPagePart } from '../../enums/edit-page-part.enum';
import { BaseEditComponent } from '../base-edit.component';
import { StatsService } from './services/stats.service';
import { StatsEditConstants } from './stats-edit.constants';
import { StatsEditLocalization } from './stats-edit.localization';
import { EnumService } from '@share/services';
import { getModel } from '@share/utils';
import { IStatsModel } from '@share/models';
import { EditPageRaitingViewModel } from '../../models';

@Component({
    selector: 'sfc-stats-edit',
    templateUrl: './stats-edit.component.html',
    styleUrls: ['../base-edit.component.scss', './stats-edit.component.scss'],
    viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class StatsEditComponent
    extends BaseEditComponent
    implements OnInit, OnDestroy {

    Constants = StatsEditConstants;
    Localization = StatsEditLocalization;
    EditPagePart = EditPagePart;
    getProgressColorDynamicallyFunc = getProgressColorDynamicallyFunc;

    public vm$!: Observable<any>;

    public get isStatIncreaseAvailable(): boolean {
        return this.statsService.stats.difference > 0;
    }

    public get isStatDecreaseAvailable(): boolean {
        return (this.statsService.stats.used - this.statsService.initial.used) > 0;
    }

    public statsModel: IStatsModel[] = [];

    private _statsControlsSubscriptions: Subscription[] = [];

    constructor(
        parent: FormGroupDirective,
        formBuilder: FormBuilder,
        private statsService: StatsService,
        private enumService: EnumService) {
        super(parent, formBuilder);
    }

    ngOnInit(): void {
        this.statsModel = getModel(this.enumService.enums.statTypes,
            this.enumService.enums.statCategories);

        const statsGroup: FormGroup[] = this.buildStatsForm();

        this.form.addControl(EditPagePart.Stats, this.formBuilder.group(statsGroup));

        this.vm$ = this.form.valueChanges
            .pipe(
                startWith(this.form.value),
                map((model: any) => new EditPageRaitingViewModel(model.stats))
            );

        this.listenControls();
    }

    ngOnDestroy(): void {
        this._statsControlsSubscriptions.forEach(subscription => subscription.unsubscribe());
    }

    private listenControls(): void {
        const statsControls = (this.form.get(EditPagePart.Stats) as FormGroup).controls;

        Object.keys(statsControls).forEach((groupKey: string) => {
            const groupControls = (statsControls[groupKey] as FormGroup).controls;

            Object.keys(groupControls).forEach((key: string) => {
                const control = groupControls[key];

                this._statsControlsSubscriptions.push(control.valueChanges.pipe(
                    startWith(control.value),
                    pairwise(),
                    map(([prev, next]: [number, number]) => ({ prev, next }))
                ).subscribe((changes: any) => {
                    const sequence: Sequence = changes.next > changes.prev
                        ? Sequence.Next : Sequence.Previous;
                    this.statsService.toggle(sequence);
                }));
            })
        });
    }

    private buildStatsForm(): FormGroup[] {
        return this.statsModel.reduce((groupAccumulator: any, stat: IStatsModel) => {
            const controls: any =
                stat.items.reduce((controlAccumulator: any, item: any) =>
                    ({ ...controlAccumulator, [item.key]: this.Constants.INITIAL_STAT_VALUE }), {});

            return ({ ...groupAccumulator, [stat.key]: this.formBuilder.group(controls) });
        }, {});
    }
}
