import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnalyzerService {

  constructor() { }

  public isVisible(cardDescription: CardDescription): boolean {
    return (cardDescription.hasDueDate && !cardDescription.isSharedBoard) ||
      (cardDescription.isSharedBoard && (cardDescription.youAssigned || (cardDescription.hasDueDate && !cardDescription.someoneElseAssigned)))
  }

  /**
   * Card has a due date AND card is in a not shared board OR
   * Card is in a board which is also shared with others AND (card is assigned to you OR (card has a due date AND nobody is assigned to the card))
   */
  public mapCardDescriptionToHint(cardDescription: CardDescription): Hint {
    if (cardDescription.isSharedBoard && cardDescription.hasDueDate && cardDescription.youAssigned && cardDescription.someoneElseAssigned) {
      return Hint.CARD_SHOULD_BE_SHOWN;
    } else if (!cardDescription.isSharedBoard && cardDescription.hasDueDate && cardDescription.youAssigned && cardDescription.someoneElseAssigned) {
      return Hint.CARD_SHOULD_BE_SHOWN;
    } else if (cardDescription.isSharedBoard && !cardDescription.hasDueDate && cardDescription.youAssigned && cardDescription.someoneElseAssigned) {
      return Hint.CARD_SHOULD_BE_SHOWN;
    } else if (cardDescription.isSharedBoard && cardDescription.hasDueDate && !cardDescription.youAssigned && cardDescription.someoneElseAssigned) {
      return Hint.ASSIGN_TO_YOU_OR_REMOVE_OTHERS;
    } else if (cardDescription.isSharedBoard && cardDescription.hasDueDate && cardDescription.youAssigned && !cardDescription.someoneElseAssigned) {
      return Hint.CARD_SHOULD_BE_SHOWN;
    } else if (!cardDescription.isSharedBoard && !cardDescription.hasDueDate && cardDescription.youAssigned && cardDescription.someoneElseAssigned) {
      return Hint.SET_DUE_DATE;
    } else if (!cardDescription.isSharedBoard && cardDescription.hasDueDate && !cardDescription.youAssigned && cardDescription.someoneElseAssigned) {
      return Hint.CARD_SHOULD_BE_SHOWN;
    } else if (!cardDescription.isSharedBoard && cardDescription.hasDueDate && cardDescription.youAssigned && !cardDescription.someoneElseAssigned) {
      return Hint.CARD_SHOULD_BE_SHOWN;
    } else if (cardDescription.isSharedBoard && !cardDescription.hasDueDate && !cardDescription.youAssigned && cardDescription.someoneElseAssigned) {
      return Hint.ASSIGN_TO_YOU_OR_SET_DUE_DATE_AND_REMOVE_OTHERS;
    } else if (cardDescription.isSharedBoard && !cardDescription.hasDueDate && cardDescription.youAssigned && !cardDescription.someoneElseAssigned) {
      return Hint.CARD_SHOULD_BE_SHOWN;
    } else if (cardDescription.isSharedBoard && cardDescription.hasDueDate && !cardDescription.youAssigned && !cardDescription.someoneElseAssigned) {
      return Hint.CARD_SHOULD_BE_SHOWN;
    } else if (!cardDescription.isSharedBoard && !cardDescription.hasDueDate && !cardDescription.youAssigned && cardDescription.someoneElseAssigned) {
      return Hint.SET_DUE_DATE;
    } else if (!cardDescription.isSharedBoard && !cardDescription.hasDueDate && cardDescription.youAssigned && !cardDescription.someoneElseAssigned) {
      return Hint.SET_DUE_DATE;
    } else if (!cardDescription.isSharedBoard && cardDescription.hasDueDate && !cardDescription.youAssigned && !cardDescription.someoneElseAssigned) {
      return Hint.CARD_SHOULD_BE_SHOWN;
    } else if (cardDescription.isSharedBoard && !cardDescription.hasDueDate && !cardDescription.youAssigned && !cardDescription.someoneElseAssigned) {
      return Hint.ASSIGN_CARD_OR_SET_DUE_DATE;
    } else if (!cardDescription.isSharedBoard && !cardDescription.hasDueDate && !cardDescription.youAssigned && !cardDescription.someoneElseAssigned) {
      return Hint.SET_DUE_DATE;
    }
    throw new Error(`Invalid state: ${JSON.stringify(cardDescription)}`);
  }
}

export interface CardDescription {
  isSharedBoard: boolean;
  hasDueDate: boolean;
  youAssigned: boolean;
  someoneElseAssigned: boolean;
}

export enum Hint {
  CARD_SHOULD_BE_SHOWN = 'Your card should be visible.',
  SET_DUE_DATE = 'Set a due date to the card.',
  ASSIGN_CARD_OR_SET_DUE_DATE = 'Assign the card to you or set a due date.',
  ASSIGN_TO_YOU_OR_REMOVE_OTHERS = 'Assign the card to you or remove all other assignees from the card.',
  ASSIGN_TO_YOU_OR_SET_DUE_DATE_AND_REMOVE_OTHERS = 'Assign the card to you or set a due date and remove the other assignees.'
}