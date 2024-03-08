import { Component } from '@angular/core';
import { LicensesService } from './licenses/licenses.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {

  constructor(
    protected readonly licensesService: LicensesService
  ) { }
}
