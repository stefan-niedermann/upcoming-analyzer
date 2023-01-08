import { AnalyzerService } from './analyzer.service';
import { cases } from './cases';

describe('AnalyzerService', () => {
  let service: AnalyzerService;

  beforeEach(() => {
    service = new AnalyzerService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  test.each(cases)("%p should return this hint: %p", (cardDescription, expectedHint) => {
    expect(service.mapCardDescriptionToHint(cardDescription)).toBe(expectedHint);
  });
});
