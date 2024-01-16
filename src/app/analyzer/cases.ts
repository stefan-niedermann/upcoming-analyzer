import { CardDescription, Hint } from "./analyzer.service";

export const cases: Array<[CardDescription, Hint]> = [
  [
    {
      "isDone": false,
      "isSharedBoard": false,
      "hasDueDate": false,
      "youAssigned": false,
      "someoneElseAssigned": false
    },
    Hint.SET_DUE_DATE
  ],
  [
    {
      "isDone": false,
      "isSharedBoard": false,
      "hasDueDate": false,
      "youAssigned": false,
      "someoneElseAssigned": true
    },
    Hint.SET_DUE_DATE
  ],
  [
    {
      "isDone": false,
      "isSharedBoard": false,
      "hasDueDate": false,
      "youAssigned": true,
      "someoneElseAssigned": false
    },
    Hint.SET_DUE_DATE
  ],
  [
    {
      "isDone": false,
      "isSharedBoard": false,
      "hasDueDate": false,
      "youAssigned": true,
      "someoneElseAssigned": true
    },
    Hint.SET_DUE_DATE
  ],
  [
    {
      "isDone": false,
      "isSharedBoard": false,
      "hasDueDate": true,
      "youAssigned": false,
      "someoneElseAssigned": false
    },
    Hint.CARD_SHOULD_BE_SHOWN
  ],
  [
    {
      "isDone": false,
      "isSharedBoard": false,
      "hasDueDate": true,
      "youAssigned": false,
      "someoneElseAssigned": true
    },
    Hint.CARD_SHOULD_BE_SHOWN
  ],
  [
    {
      "isDone": false,
      "isSharedBoard": false,
      "hasDueDate": true,
      "youAssigned": true,
      "someoneElseAssigned": false
    },
    Hint.CARD_SHOULD_BE_SHOWN
  ],
  [
    {
      "isDone": false,
      "isSharedBoard": false,
      "hasDueDate": true,
      "youAssigned": true,
      "someoneElseAssigned": true
    },
    Hint.CARD_SHOULD_BE_SHOWN
  ],
  [
    {
      "isDone": false,
      "isSharedBoard": true,
      "hasDueDate": false,
      "youAssigned": false,
      "someoneElseAssigned": false
    },
    Hint.ASSIGN_CARD_OR_SET_DUE_DATE
  ],
  [
    {
      "isDone": false,
      "isSharedBoard": true,
      "hasDueDate": false,
      "youAssigned": false,
      "someoneElseAssigned": true
    },
    Hint.ASSIGN_TO_YOU_OR_SET_DUE_DATE_AND_REMOVE_OTHERS
  ],
  [
    {
      "isDone": false,
      "isSharedBoard": true,
      "hasDueDate": false,
      "youAssigned": true,
      "someoneElseAssigned": false
    },
    Hint.CARD_SHOULD_BE_SHOWN
  ],
  [
    {
      "isDone": false,
      "isSharedBoard": true,
      "hasDueDate": false,
      "youAssigned": true,
      "someoneElseAssigned": true
    },
    Hint.CARD_SHOULD_BE_SHOWN
  ],
  [
    {
      "isDone": false,
      "isSharedBoard": true,
      "hasDueDate": true,
      "youAssigned": false,
      "someoneElseAssigned": false
    },
    Hint.CARD_SHOULD_BE_SHOWN
  ],
  [
    {
      "isDone": false,
      "isSharedBoard": true,
      "hasDueDate": true,
      "youAssigned": false,
      "someoneElseAssigned": true
    },
    Hint.ASSIGN_TO_YOU_OR_REMOVE_OTHERS
  ],
  [
    {
      "isDone": false,
      "isSharedBoard": true,
      "hasDueDate": true,
      "youAssigned": true,
      "someoneElseAssigned": false
    },
    Hint.CARD_SHOULD_BE_SHOWN
  ],
  [
    {
      "isDone": false,
      "isSharedBoard": true,
      "hasDueDate": true,
      "youAssigned": true,
      "someoneElseAssigned": true
    },
    Hint.CARD_SHOULD_BE_SHOWN
  ],
  [
    {
      "isDone": true,
      "isSharedBoard": false,
      "hasDueDate": false,
      "youAssigned": false,
      "someoneElseAssigned": false
    },
    Hint.CARD_MUST_NOT_BE_DONE
  ],
  [
    {
      "isDone": true,
      "isSharedBoard": false,
      "hasDueDate": false,
      "youAssigned": false,
      "someoneElseAssigned": true
    },
    Hint.CARD_MUST_NOT_BE_DONE
  ],
  [
    {
      "isDone": true,
      "isSharedBoard": false,
      "hasDueDate": false,
      "youAssigned": true,
      "someoneElseAssigned": false
    },
    Hint.CARD_MUST_NOT_BE_DONE
  ],
  [
    {
      "isDone": true,
      "isSharedBoard": false,
      "hasDueDate": false,
      "youAssigned": true,
      "someoneElseAssigned": true
    },
    Hint.CARD_MUST_NOT_BE_DONE
  ],
  [
    {
      "isDone": true,
      "isSharedBoard": false,
      "hasDueDate": true,
      "youAssigned": false,
      "someoneElseAssigned": false
    },
    Hint.CARD_MUST_NOT_BE_DONE
  ],
  [
    {
      "isDone": true,
      "isSharedBoard": false,
      "hasDueDate": true,
      "youAssigned": false,
      "someoneElseAssigned": true
    },
    Hint.CARD_MUST_NOT_BE_DONE
  ],
  [
    {
      "isDone": true,
      "isSharedBoard": false,
      "hasDueDate": true,
      "youAssigned": true,
      "someoneElseAssigned": false
    },
    Hint.CARD_MUST_NOT_BE_DONE
  ],
  [
    {
      "isDone": true,
      "isSharedBoard": false,
      "hasDueDate": true,
      "youAssigned": true,
      "someoneElseAssigned": true
    },
    Hint.CARD_MUST_NOT_BE_DONE
  ],
  [
    {
      "isDone": true,
      "isSharedBoard": true,
      "hasDueDate": false,
      "youAssigned": false,
      "someoneElseAssigned": false
    },
    Hint.CARD_MUST_NOT_BE_DONE
  ],
  [
    {
      "isDone": true,
      "isSharedBoard": true,
      "hasDueDate": false,
      "youAssigned": false,
      "someoneElseAssigned": true
    },
    Hint.CARD_MUST_NOT_BE_DONE
  ],
  [
    {
      "isDone": true,
      "isSharedBoard": true,
      "hasDueDate": false,
      "youAssigned": true,
      "someoneElseAssigned": false
    },
    Hint.CARD_MUST_NOT_BE_DONE
  ],
  [
    {
      "isDone": true,
      "isSharedBoard": true,
      "hasDueDate": false,
      "youAssigned": true,
      "someoneElseAssigned": true
    },
    Hint.CARD_MUST_NOT_BE_DONE
  ],
  [
    {
      "isDone": true,
      "isSharedBoard": true,
      "hasDueDate": true,
      "youAssigned": false,
      "someoneElseAssigned": false
    },
    Hint.CARD_MUST_NOT_BE_DONE
  ],
  [
    {
      "isDone": true,
      "isSharedBoard": true,
      "hasDueDate": true,
      "youAssigned": false,
      "someoneElseAssigned": true
    },
    Hint.CARD_MUST_NOT_BE_DONE
  ],
  [
    {
      "isDone": true,
      "isSharedBoard": true,
      "hasDueDate": true,
      "youAssigned": true,
      "someoneElseAssigned": false
    },
    Hint.CARD_MUST_NOT_BE_DONE
  ],
  [
    {
      "isDone": true,
      "isSharedBoard": true,
      "hasDueDate": true,
      "youAssigned": true,
      "someoneElseAssigned": true
    },
    Hint.CARD_MUST_NOT_BE_DONE
  ]
];