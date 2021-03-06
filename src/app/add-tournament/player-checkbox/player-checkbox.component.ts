import { Component, OnInit, Input, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-player-checkbox',
  templateUrl: './player-checkbox.component.html',
  styleUrls: ['./player-checkbox.component.css']
})
export class PlayerCheckboxComponent implements OnInit, OnDestroy {
  @Input() row: number;
  @Input() column: number;
  @Input() cell: any;
  @Input() deselectMatchUp$: Subject<boolean>;
  @Input() scoreTable: any;
  @Output() matchUpSelected$: EventEmitter<any> = new EventEmitter();
  @Output() cellChange = new EventEmitter();

  private onDestroy$: Subject<null> = new Subject();

  constructor() { }

  ngOnInit() {
    this.deselectMatchUp$.pipe(
      takeUntil(this.onDestroy$),
      tap((x: any) => {
        if (this.row === x.column && this.column === x.row) {
          this.cell = false;
          this.cellChange.emit(false);
        }
      })
    ).subscribe()
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  matchUpSelected(row: number, column: number, checked: boolean) {
    this.cellChange.emit(checked);
    this.matchUpSelected$.emit({ row, column, checked});
  }

}