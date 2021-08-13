import { AfterViewInit, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EMPTY, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { AnalyzerService, Hint } from './analyzer.service';

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

  constructor(
    private readonly analyzerService: AnalyzerService
  ) {}

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

    this.cardIsVisible$ = values$.pipe(map(next => this.analyzerService.isVisible(next)))
    this.icon$ = this.cardIsVisible$.pipe(map(cardIsVisible => cardIsVisible ? 'check_circle' : 'cancel'))
    this.hint$ = values$.pipe(map(next => this.analyzerService.mapCardDescriptionToHint(next)));
  }
}
