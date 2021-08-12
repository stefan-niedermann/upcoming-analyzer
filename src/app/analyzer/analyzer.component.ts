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

  isSharedBoardCheckbox = this.form.get('isSharedBoard');
  hasDueDateCheckbox = this.form.get('hasDueDate');
  youAssignedCheckbox = this.form.get('youAssigned');
  someoneElseAssignedCheckbox = this.form.get('someoneElseAssigned');

  explanation$: Observable<string> = EMPTY;
  cardIsVisible$: Observable<boolean> = EMPTY;
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
    this.explanation$ = values$.pipe(map(next => {
      /**
       * 
    Card has a due date AND card is in a not shared board
    Card is in a board which is also shared with others AND (card is assigned to you OR (card has a due date AND nobody is assigned to the card))
       */
      if(next.isSharedBoard && next.hasDueDate && next.youAssigned && next.someoneElseAssigned) {
        return 'Your card should be shown.';
      } else if(!next.isSharedBoard && next.hasDueDate && next.youAssigned && next.someoneElseAssigned) {
        return 'Your card should be shown.';
      } else if(next.isSharedBoard && !next.hasDueDate && next.youAssigned && next.someoneElseAssigned) {
        return 'Your card should be shown.';
      } else if(next.isSharedBoard && next.hasDueDate && !next.youAssigned && next.someoneElseAssigned) {
        return 'Assign the card to you or remove all other assignees from the card.'
      } else if(next.isSharedBoard && next.hasDueDate && next.youAssigned && !next.someoneElseAssigned) {
        return 'Your card should be shown.';
      } else if(!next.isSharedBoard && !next.hasDueDate && next.youAssigned && next.someoneElseAssigned) {
        return 'Set a due date to the card.';
      } else if(!next.isSharedBoard && next.hasDueDate && !next.youAssigned && next.someoneElseAssigned) {
        return 'Your card should be shown.';
      } else if(!next.isSharedBoard && next.hasDueDate && next.youAssigned && !next.someoneElseAssigned) {
        return 'Your card should be shown.';
      } else if(next.isSharedBoard && !next.hasDueDate && !next.youAssigned && next.someoneElseAssigned) {
        return 'Assign the card to you or set a due date and remove the other assignees.';
      } else if(next.isSharedBoard && !next.hasDueDate && next.youAssigned && !next.someoneElseAssigned) {
        return 'Your card should be shown.';
      } else if(next.isSharedBoard && next.hasDueDate && !next.youAssigned && !next.someoneElseAssigned) {
        return 'Your card should be shown.';
      } else if(!next.isSharedBoard && !next.hasDueDate && !next.youAssigned && next.someoneElseAssigned) {
        return 'Set a due date to the card.';
      } else if(!next.isSharedBoard && !next.hasDueDate && next.youAssigned && !next.someoneElseAssigned) {
        return 'Set a due date to the card.';
      } else if(!next.isSharedBoard && next.hasDueDate && !next.youAssigned && !next.someoneElseAssigned) {
        return 'Your card should be shown.';
      } else if(next.isSharedBoard && !next.hasDueDate && !next.youAssigned && !next.someoneElseAssigned) {
        return 'Assign the card to you or set a due date.';
      } else if(!next.isSharedBoard && !next.hasDueDate && !next.youAssigned && !next.someoneElseAssigned) {
        return 'Set a due date.';
      }
      return '';
    }));
  }
}