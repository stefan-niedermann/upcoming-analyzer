import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about.component';
import { RouterModule } from '@angular/router';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';



@NgModule({
  declarations: [
    AboutComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    RouterModule.forChild([
        {
          path: '',
          component: AboutComponent
        }
      ])
  ]
})
export class AboutModule { }
