import { AfterViewInit, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EMPTY, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-analyzer',
  templateUrl: './analyzer.component.html',
  styleUrls: ['./analyzer.component.scss']
})
export class AnalyzerComponent implements AfterViewInit {

  form: FormGroup = new FormGroup({
    isSharedBoard: new FormControl(),
    hasDueDate: new FormControl(),
    youAssigned: new FormControl(),
    someoneElseAssigned: new FormControl()
  });

  private readonly isSharedBoardCheckbox = this.form.get('isSharedBoard');
  private readonly hasDueDateCheckbox = this.form.get('hasDueDate');
  private readonly youAssignedCheckbox = this.form.get('youAssigned');
  private readonly someoneElseAssignedCheckbox = this.form.get('someoneElseAssigned');

  cardIsVisible$: Observable<boolean> = EMPTY;
  hint$: Observable<Hint> = EMPTY;
  icon$: Observable<string> = EMPTY;

  ngAfterViewInit() {
    const values$ = merge(
      this.isSharedBoardCheckbox?.valueChanges || EMPTY,
      this.hasDueDateCheckbox?.valueChanges || EMPTY,
      this.youAssignedCheckbox?.valueChanges || EMPTY,
      this.someoneElseAssignedCheckbox?.valueChanges || EMPTY
    ).pipe(map(() => {
      return {
        isSharedBoard: this.isSharedBoardCheckbox?.value,
        hasDueDate: this.hasDueDateCheckbox?.value,
        youAssigned: this.youAssignedCheckbox?.value,
        someoneElseAssigned: this.someoneElseAssignedCheckbox?.value
      }
    }));

    this.cardIsVisible$ = values$.pipe(
      map(next =>
        (next.hasDueDate && !next.isSharedBoard) ||
        (next.isSharedBoard && (next.youAssigned || (next.hasDueDate && !next.someoneElseAssigned)))
      ),
      map(next => !!next)
    )
    this.icon$ = this.cardIsVisible$.pipe(
      map(cardIsVisible => cardIsVisible ? 'check_circle' : 'cancel')
    )
    /**
     * Card has a due date AND card is in a not shared board OR
     * Card is in a board which is also shared with others AND (card is assigned to you OR (card has a due date AND nobody is assigned to the card))
     */
    this.hint$ = values$.pipe(map(next => {
      if (next.isSharedBoard && next.hasDueDate && next.youAssigned && next.someoneElseAssigned) {
        return Hint.CARD_SHOULD_BE_SHOWN;
      } else if (!next.isSharedBoard && next.hasDueDate && next.youAssigned && next.someoneElseAssigned) {
        return Hint.CARD_SHOULD_BE_SHOWN;
      } else if (next.isSharedBoard && !next.hasDueDate && next.youAssigned && next.someoneElseAssigned) {
        return Hint.CARD_SHOULD_BE_SHOWN;
      } else if (next.isSharedBoard && next.hasDueDate && !next.youAssigned && next.someoneElseAssigned) {
        return Hint.ASSIGN_TO_YOU_OR_REMOVE_OTHERS;
      } else if (next.isSharedBoard && next.hasDueDate && next.youAssigned && !next.someoneElseAssigned) {
        return Hint.CARD_SHOULD_BE_SHOWN;
      } else if (!next.isSharedBoard && !next.hasDueDate && next.youAssigned && next.someoneElseAssigned) {
        return Hint.SET_DUE_DATE;
      } else if (!next.isSharedBoard && next.hasDueDate && !next.youAssigned && next.someoneElseAssigned) {
        return Hint.CARD_SHOULD_BE_SHOWN;
      } else if (!next.isSharedBoard && next.hasDueDate && next.youAssigned && !next.someoneElseAssigned) {
        return Hint.CARD_SHOULD_BE_SHOWN;
      } else if (next.isSharedBoard && !next.hasDueDate && !next.youAssigned && next.someoneElseAssigned) {
        return Hint.ASSIGN_TO_YOU_OR_SET_DUE_DATE_AND_REMOVE_OTHERS;
      } else if (next.isSharedBoard && !next.hasDueDate && next.youAssigned && !next.someoneElseAssigned) {
        return Hint.CARD_SHOULD_BE_SHOWN;
      } else if (next.isSharedBoard && next.hasDueDate && !next.youAssigned && !next.someoneElseAssigned) {
        return Hint.CARD_SHOULD_BE_SHOWN;
      } else if (!next.isSharedBoard && !next.hasDueDate && !next.youAssigned && next.someoneElseAssigned) {
        return Hint.SET_DUE_DATE;
      } else if (!next.isSharedBoard && !next.hasDueDate && next.youAssigned && !next.someoneElseAssigned) {
        return Hint.SET_DUE_DATE;
      } else if (!next.isSharedBoard && next.hasDueDate && !next.youAssigned && !next.someoneElseAssigned) {
        return Hint.CARD_SHOULD_BE_SHOWN;
      } else if (next.isSharedBoard && !next.hasDueDate && !next.youAssigned && !next.someoneElseAssigned) {
        return Hint.ASSIGN_CARD_OR_SET_DUE_DATE;
      } else if (!next.isSharedBoard && !next.hasDueDate && !next.youAssigned && !next.someoneElseAssigned) {
        return Hint.SET_DUE_DATE;
      }
      throw new Error(`Invalid state: ${JSON.stringify(next)}`);
    }));
  }
}

enum Hint {
  CARD_SHOULD_BE_SHOWN = 'Your card should be shown.',
  SET_DUE_DATE = 'Set a due date to the card',
  ASSIGN_CARD_OR_SET_DUE_DATE = 'Assign the card to you or set a due date.',
  ASSIGN_TO_YOU_OR_REMOVE_OTHERS = 'Assign the card to you or remove all other assignees from the card.',
  ASSIGN_TO_YOU_OR_SET_DUE_DATE_AND_REMOVE_OTHERS = 'Assign the card to you or set a due date and remove the other assignees.'
}