import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/shared/header/header.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [

    HeaderComponent
  ],
  imports: [
    RouterModule,
    CommonModule
  ]
  ,exports:[HeaderComponent]
})
export class SharedModule { }
