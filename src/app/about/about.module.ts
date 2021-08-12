import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    AboutComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild([
        {
          path: '',
          component: AboutComponent
        }
      ])
  ]
})
export class AboutModule { }
