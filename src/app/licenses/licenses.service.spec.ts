import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { MockProvider} from 'ng-mocks'

import { GeneratedLicenseFileAvailable, LicensesService } from './licenses.service';

describe('LicensesService', () => {
  let service: LicensesService;

  beforeEach(() => {
    service = new LicensesService(false, {} as any, {} as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
