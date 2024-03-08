import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { MockService } from 'ng-mocks';
import { EMPTY } from 'rxjs';
import { LicensesService } from './licenses.service';

describe('LicensesService', () => {
  let service: LicensesService;

  beforeEach(() => {
    service = new LicensesService(
      false,
      MockService(HttpClient, {
        get: jest.fn(() => EMPTY)
      }),
      MockService(DomSanitizer, {
        sanitize: jest.fn(str => str)
      })
    );
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
