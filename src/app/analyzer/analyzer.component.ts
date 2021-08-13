import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, EMPTY, merge, Observable, ReplaySubject, Subject } from 'rxjs';
import { last, map, share, shareReplay, takeUntil } from 'rxjs/operators'
import { AnalyzerService, CardDescription, Hint } from './analyzer.service';

@Component({
  selector: 'app-analyzer',
  templateUrl: './analyzer.component.html',
  styleUrls: ['./analyzer.component.scss']
})
export class AnalyzerComponent implements AfterViewInit, OnDestroy {

  form: FormGroup = new FormGroup({
    isSharedBoard: new FormControl(),
    hasDueDate: new FormControl(),
    youAssigned: new FormControl(),
    someoneElseAssigned: new FormControl()
  });

  private readonly unsubscribe$ = new Subject<void>();
  private readonly isSharedBoardCheckbox = this.form.get('isSharedBoard');
  private readonly hasDueDateCheckbox = this.form.get('hasDueDate');
  private readonly youAssignedCheckbox = this.form.get('youAssigned');
  private readonly someoneElseAssignedCheckbox = this.form.get('someoneElseAssigned');

  cardIsVisible$: Observable<boolean> = EMPTY;
  hint$: Observable<Hint> = EMPTY;

  constructor(
    private readonly analyzerService: AnalyzerService
  ) { }

  ngAfterViewInit() {
    const values$ = new ReplaySubject<CardDescription>();
    merge(
      this.isSharedBoardCheckbox?.valueChanges || EMPTY,
      this.hasDueDateCheckbox?.valueChanges || EMPTY,
      this.youAssignedCheckbox?.valueChanges || EMPTY,
      this.someoneElseAssignedCheckbox?.valueChanges || EMPTY
    ).pipe(
      takeUntil(this.unsubscribe$),
      map(() => {
        return {
          isSharedBoard: this.isSharedBoardCheckbox?.value,
          hasDueDate: this.hasDueDateCheckbox?.value,
          youAssigned: this.youAssignedCheckbox?.value,
          someoneElseAssigned: this.someoneElseAssignedCheckbox?.value
        }
      })
    ).subscribe((next) => values$.next(next));

    this.cardIsVisible$ = values$.pipe(map(next => this.analyzerService.isVisible(next)))
    this.hint$ = values$.pipe(map(next => this.analyzerService.mapCardDescriptionToHint(next)));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
