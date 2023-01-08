import { Component, OnDestroy } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { EMPTY, merge, Observable, of, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators'
import { AnalyzerService, CardDescription, Hint } from './analyzer.service';

@Component({
  selector: 'app-analyzer',
  templateUrl: './analyzer.component.html',
  styleUrls: ['./analyzer.component.scss']
})
export class AnalyzerComponent implements OnDestroy {

  form: UntypedFormGroup = new UntypedFormGroup({
    isSharedBoard: new UntypedFormControl(),
    hasDueDate: new UntypedFormControl(),
    youAssigned: new UntypedFormControl(),
    someoneElseAssigned: new UntypedFormControl()
  });

  private readonly unsubscribe$ = new Subject<void>();
  private readonly isSharedBoardCheckbox = this.form.get('isSharedBoard');
  private readonly hasDueDateCheckbox = this.form.get('hasDueDate');
  private readonly youAssignedCheckbox = this.form.get('youAssigned');
  private readonly someoneElseAssignedCheckbox = this.form.get('someoneElseAssigned');

  hintRef = Hint;
  cardIsVisible$: Observable<boolean> = EMPTY;
  hint$: Observable<Hint> = EMPTY;

  constructor(
    private readonly analyzerService: AnalyzerService
  ) {
    const cardDescription$ = merge(
      of(this.getInitialCardDescription()),
      this.getCardDescription()
    )

    this.cardIsVisible$ = cardDescription$.pipe(map(next => this.analyzerService.isVisible(next)))
    this.hint$ = cardDescription$.pipe(map(next => this.analyzerService.mapCardDescriptionToHint(next)));

    this.connectSharedBoardAndOtherAssignees();
  }

  /**
   * @returns the initial CardDescription
   */
  private getInitialCardDescription(): CardDescription {
    return {
      isSharedBoard: !!this.isSharedBoardCheckbox?.value,
      hasDueDate: !!this.hasDueDateCheckbox?.value,
      youAssigned: !!this.youAssignedCheckbox?.value,
      someoneElseAssigned: !!this.someoneElseAssignedCheckbox?.value
    }
  }

  /**
   * @returns an Observable that fires the new CardDescription everytime the user changes something 
   */
  private getCardDescription(): Observable<CardDescription> {
    return merge(
      this.isSharedBoardCheckbox?.valueChanges || EMPTY,
      this.hasDueDateCheckbox?.valueChanges || EMPTY,
      this.youAssignedCheckbox?.valueChanges || EMPTY,
      this.someoneElseAssignedCheckbox?.valueChanges || EMPTY,
    ).pipe(map(() => {
      return {
        isSharedBoard: this.isSharedBoardCheckbox?.value,
        hasDueDate: this.hasDueDateCheckbox?.value,
        youAssigned: this.youAssignedCheckbox?.value,
        someoneElseAssigned: this.someoneElseAssignedCheckbox?.value
      }
    }))
  }

  /**
   * Assigning someone else is only possible if the card is on a shared board.
   */
  private connectSharedBoardAndOtherAssignees(): void {
    if (!this.isSharedBoardCheckbox?.value) {
      this.someoneElseAssignedCheckbox?.disable()
    }
    this.isSharedBoardCheckbox?.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(next => {
        if (next) {
          this.someoneElseAssignedCheckbox?.enable()
        } else {
          this.someoneElseAssignedCheckbox?.setValue(false)
          this.someoneElseAssignedCheckbox?.disable()
        }
      })
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
