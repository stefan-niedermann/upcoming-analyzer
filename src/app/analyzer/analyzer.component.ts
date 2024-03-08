import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, shareReplay, startWith } from 'rxjs/operators';
import { AnalyzerService, CardDescription, Hint } from './analyzer.service';

@Component({
  selector: 'app-analyzer',
  templateUrl: './analyzer.component.html',
  styleUrls: ['./analyzer.component.scss']
})
export class AnalyzerComponent {

  protected readonly Hint = Hint;

  protected readonly form: FormGroup = new FormGroup({
    isDone: new FormControl<boolean>(false),
    isSharedBoard: new FormControl<boolean>(false),
    hasDueDate: new FormControl<boolean>(false),
    youAssigned: new FormControl<boolean>(false),
    someoneElseAssigned: new FormControl<boolean>(false)
  })

  private readonly cardDescription$: Observable<CardDescription> = this.form.valueChanges.pipe(
    startWith(this.form.value),
    shareReplay()
  )

  protected readonly cardIsVisible$: Observable<boolean> = this.cardDescription$.pipe(
    map(cardDescription => this.analyzerService.isVisible(cardDescription))
  )

  protected readonly hint$: Observable<Hint> = this.cardDescription$.pipe(
    map(cardDescription => this.analyzerService.mapCardDescriptionToHint(cardDescription))
  )

  constructor(
    private readonly analyzerService: AnalyzerService
  ) {
    this.connectSharedBoardAndOtherAssignees();
  }

  /**
   * Assigning someone else is only possible if the card is on a shared board.
   */
  private connectSharedBoardAndOtherAssignees(): void {
    this.form.controls.isSharedBoard.valueChanges.pipe(
      takeUntilDestroyed(),
      startWith(this.form.controls.isSharedBoard.value)
    ).subscribe(isSharedBoardEnabled => {
      isSharedBoardEnabled
        ? this.enableSomeoneElseAssigned()
        : this.disableSomeoneElseAssigned()
    })
  }

  private enableSomeoneElseAssigned() {
    if (!this.form.controls.someoneElseAssigned.enabled) {
      this.form.controls.someoneElseAssigned.enable()
    }
  }

  private disableSomeoneElseAssigned() {
    if (this.form.controls.someoneElseAssigned.value === true) {
      this.form.controls.someoneElseAssigned.setValue(false)
    }

    if (this.form.controls.someoneElseAssigned.enabled) {
      this.form.controls.someoneElseAssigned.disable()
    }
  }
}
