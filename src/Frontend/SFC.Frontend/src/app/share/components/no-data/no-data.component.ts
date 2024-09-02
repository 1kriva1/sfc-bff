import { Component, Input } from '@angular/core';

@Component({
  selector: 'sfc-no-data',
  template: `
    <span *ngIf="!delimeter">{{label}}</span>
    <sfc-delimeter *ngIf="delimeter" [label]="label"></sfc-delimeter>
  `,
  styleUrls: ['./no-data.component.scss']
})
export class NoDataComponent {

  @Input()
  label: string = $localize`:@@core.no-data:No data`;

  @Input()
  delimeter: boolean = false;
}