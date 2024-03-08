import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, InjectionToken, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { map, share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LicensesService {

  private readonly prodLicenseInformation: Observable<string> = this.http
    .get('3rdpartylicenses.txt', { responseType: 'text' })
    .pipe(
      map(licenses => licenses.replace(/(?:\r\n|\r|\n)/g, '<br />')),
      map(licenses => this.sanitizer.sanitize(SecurityContext.HTML, licenses) ?? ''),
    );

  private readonly devLicenseInformation$: Observable<string> = of('License information is only available in production mode.')

  private readonly environmentDependingLicenseInformation: Observable<string> = this.generatedLicenseFileAvailable
    ? this.prodLicenseInformation
    : this.devLicenseInformation$

  public readonly licenseInformation$: Observable<string> = this.environmentDependingLicenseInformation
    .pipe(share())

  constructor(
    @Inject(GeneratedLicenseFileAvailable)
    private readonly generatedLicenseFileAvailable: boolean,
    private readonly http: HttpClient,
    private readonly sanitizer: DomSanitizer
  ) { }
}

export const GeneratedLicenseFileAvailable = new InjectionToken<boolean>('GeneratedLicenseFileAvailable');