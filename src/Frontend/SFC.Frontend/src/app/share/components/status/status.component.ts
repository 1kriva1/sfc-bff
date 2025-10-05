import { Component, Input } from '@angular/core';
import { empty } from 'ngx-sfc-common';

@Component({
  selector: 'sfc-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent {

  /* Inputs */

  @Input()
  title: string | empty = null;

  @Input()
  label: string | empty;

  @Input()
  background: string | empty;

  /* End Inputs */
}
