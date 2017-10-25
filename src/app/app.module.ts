import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {PdfComponent} from './pdf/pdf.component';
import {MyhomeComponent} from './myhome/myhome.component';

@NgModule({
  declarations: [
    AppComponent,
    PdfComponent,
    MyhomeComponent
    
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
