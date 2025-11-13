import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    // tes composants ici
  ],
  imports: [
    BrowserModule,
    HttpClientModule, // ✅ ajoute cette ligne !
    // ...autres imports
  ],
  // bootstrap: [AppComponent]
})
export class AppModule { }
