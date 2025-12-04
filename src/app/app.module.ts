// app.module.ts (extrait)
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { AuthInterceptor } from '../interceptors/auth.interceptor';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    // vos composants
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    // autres modules
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  // bootstrap: [AppComponent]
})
export class AppModule { 
  
}