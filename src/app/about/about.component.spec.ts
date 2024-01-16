import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatIconModule } from '@angular/material/icon';
import { MockProvider } from 'ng-mocks';
import { EMPTY } from 'rxjs';
import { LicensesService } from './licenses/licenses.service';
import { AboutComponent } from './about.component';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        MatIconModule,
        MatButtonModule
      ],
      providers: [
        MockProvider(LicensesService, {
          getLicenses: () => EMPTY
        })
      ],
      declarations: [ AboutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
