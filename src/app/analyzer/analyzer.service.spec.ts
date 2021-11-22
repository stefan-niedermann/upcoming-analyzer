import { AnalyzerService, Hint } from './analyzer.service';

describe('AnalyzerService', () => {
  let service: AnalyzerService;

  beforeEach(() => {
    service = new AnalyzerService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  test.each([
    [{
      isSharedBoard: true,
      hasDueDate: true,
      youAssigned: true,
      someoneElseAssigned: true
    }, Hint.CARD_SHOULD_BE_SHOWN],
    [{
      isSharedBoard: true,
      hasDueDate: false,
      youAssigned: true,
      someoneElseAssigned: true
    }, Hint.CARD_SHOULD_BE_SHOWN],
    [{
      isSharedBoard: true,
      hasDueDate: true,
      youAssigned: false,
      someoneElseAssigned: true
    }, Hint.ASSIGN_TO_YOU_OR_REMOVE_OTHERS],
    [{
      isSharedBoard: true,
      hasDueDate: true,
      youAssigned: true,
      someoneElseAssigned: false
    }, Hint.CARD_SHOULD_BE_SHOWN],
    [{
      isSharedBoard: false,
      hasDueDate: false,
      youAssigned: true,
      someoneElseAssigned: true
    }, Hint.SET_DUE_DATE],
    [{
      isSharedBoard: true,
      hasDueDate: false,
      youAssigned: false,
      someoneElseAssigned: true
    }, Hint.ASSIGN_TO_YOU_OR_SET_DUE_DATE_AND_REMOVE_OTHERS],
    [{
      isSharedBoard: true,
      hasDueDate: true,
      youAssigned: false,
      someoneElseAssigned: false
    }, Hint.CARD_SHOULD_BE_SHOWN],
    [{
      isSharedBoard: false,
      hasDueDate: true,
      youAssigned: false,
      someoneElseAssigned: true
    }, Hint.CARD_SHOULD_BE_SHOWN],
    [{
      isSharedBoard: true,
      hasDueDate: false,
      youAssigned: true,
      someoneElseAssigned: false
    }, Hint.CARD_SHOULD_BE_SHOWN],
    [{
      isSharedBoard: false,
      hasDueDate: true,
      youAssigned: true,
      someoneElseAssigned: false
    }, Hint.CARD_SHOULD_BE_SHOWN],
    [{
      isSharedBoard: true,
      hasDueDate: false,
      youAssigned: false,
      someoneElseAssigned: true
    }, Hint.ASSIGN_TO_YOU_OR_SET_DUE_DATE_AND_REMOVE_OTHERS],
    [{
      isSharedBoard: false,
      hasDueDate: false,
      youAssigned: false,
      someoneElseAssigned: true
    }, Hint.SET_DUE_DATE],
    [{
      isSharedBoard: false,
      hasDueDate: false,
      youAssigned: true,
      someoneElseAssigned: false
    }, Hint.SET_DUE_DATE],
    [{
      isSharedBoard: true,
      hasDueDate: false,
      youAssigned: false,
      someoneElseAssigned: false
    }, Hint.ASSIGN_CARD_OR_SET_DUE_DATE],
    [{
      isSharedBoard: false,
      hasDueDate: false,
      youAssigned: false,
      someoneElseAssigned: false
    }, Hint.SET_DUE_DATE],
  ])(
    "%p should return this hint: %p",
    (cardDescription, expectedHint) => {
      expect(service.mapCardDescriptionToHint(cardDescription)).toBe(expectedHint);
    }
  );
});
