import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {PdfComponent} from './pdf/pdf.component';
import {MyhomeComponent} from './myhome/myhome.component';
import { MychartsComponent } from './mycharts/mycharts.component';
import { StackedchartComponent } from './stackedchart/stackedchart.component';
import { PiechartComponent } from './piechart/piechart.component';
import {jsPDFService} from './services/jsPDFSvc.service';
import { LinechartComponent } from './linechart/linechart.component';
@NgModule({
  declarations: [
    AppComponent,
    PdfComponent,
    MyhomeComponent,
    MychartsComponent,
    StackedchartComponent,
    PiechartComponent,
    LinechartComponent
    
  ],
  imports: [
    BrowserModule
  ],
  providers: [jsPDFService],
  bootstrap: [AppComponent]
})
export class AppModule { }
