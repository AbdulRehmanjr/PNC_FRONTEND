import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/shared/header/header.component';
import { RouterModule } from '@angular/router';
import { BadgeModule } from 'primeng/badge';


@NgModule({
  declarations: [
    HeaderComponent,
  ],
  imports: [
    BadgeModule,
    RouterModule,
    CommonModule
  ]
  ,exports:[HeaderComponent]
})
export class SharedModule { }
