import { AnalyzerService } from './analyzer.service';

describe('AnalyzerService', () => {
  let service: AnalyzerService;

  beforeEach(() => {
    service = new AnalyzerService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
