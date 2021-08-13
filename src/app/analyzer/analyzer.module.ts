import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyzerComponent } from './analyzer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    AnalyzerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatSlideToggleModule,
    RouterModule.forChild([
        {
          path: '',
          component: AnalyzerComponent
        }
      ])
  ]
})
export class AnalyzerModule { }
