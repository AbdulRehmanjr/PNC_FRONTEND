import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxSpinnerModule } from 'ngx-spinner';
import { ScrollTopModule } from 'primeng/scrolltop';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './module/shared/shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SpinnerInterceptor } from './interceptor/spinner.interceptor';
import { RequestInterceptor } from './interceptor/request.interceptor';
import { CapitalizePipe } from './pipe/capitalize.pipe';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    ScrollTopModule,
    SharedModule,
    AppRoutingModule,
    BrowserModule,
    NgxSpinnerModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true,
    },
  ],
  exports: [ScrollTopModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
