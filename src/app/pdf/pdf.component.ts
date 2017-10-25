import { Component, OnInit, Inject } from '@angular/core';
// import * as jsPDF from 'jspdf';
declare var jsPDF: any; // Important
// var jsPDF = require('jspdf');
// require('jspdf-autotable');

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css'],
  providers: [
    { provide: 'Window', useValue: window }
    ]
    
})
export class PdfComponent implements OnInit {

  constructor(@Inject('Window') private window: Window) { }
  
  ngOnInit() {
  }
  
  download() {
    
   var doc = new jsPDF();
   doc.text(20, 20, 'Hello world!');
   doc.text(20, 30, 'This is client-side Javascript, pumping out a PDF.');
   doc.addPage();
   doc.text(20, 20, 'http://www.coding4developers.com/');
    
   //Save the PDF
   doc.save('Test.pdf');


  //  var doc = new jsPDF()
   
  //  doc.text('Hello world!', 10, 10)
  //  doc.save('a4.pdf')

   // Landscape export, 2×4 inches
    // var doc = new jsPDF({
    //   orientation: 'landscape',
    //   unit: 'in',
    //   format: [4, 2]
    // })

    // doc.text('Hello world!', 1, 1)
    // doc.save('two-by-four.pdf')

    // var doc = new jsPDF();
    
    // // We'll make our own renderer to skip this editor
    // var specialElementHandlers = {
    //   '#editor': function(element, renderer){
    //     return true;
    //   },
    //   '.controls': function(element, renderer){
    //     return true;
    //   }
    // };
    
    // // All units are in the set measurement for the document
    // // This can be changed to "pt" (points), "mm" (Default), "cm", "in"
    // doc.fromHTML($('body').get(0), 15, 15, {
    //   'width': 170, 
    //   'elementHandlers': specialElementHandlers
    // });

   }

   jsonToPDF(){
    var item = {
      "Name" : "XYZ",
      "Age" : "22",
      "Gender" : "Male"
    };
    var doc = new jsPDF();
    var col = ["Details", "Values"];
    var rows = [];

    for(var key in item){
        var temp = [key, item[key]];
        rows.push(temp);
    }

    doc.autoTable(col, rows);  // we are using v jspdf.plugin.autotable.js  jspdf-autotable@2.3.2

    doc.save('Test.pdf');
   }
}
