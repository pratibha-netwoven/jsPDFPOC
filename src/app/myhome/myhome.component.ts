import { Component, ViewChild, ElementRef, Input } from '@angular/core';

import * as jsPDF from 'jspdf';
declare let jsPDF;
declare var html2canvas: any;
@Component({
  selector: 'app-myhome',
  templateUrl: './myhome.component.html',
  styleUrls: ['./myhome.component.css']
})
export class MyhomeComponent {
 
   @ViewChild('test') el: ElementRef;
  
      constructor() {
      }
  
      public pdfHtml() {
          let pdf = new jsPDF();
          let options = {
              pagesplit: true
          };
          pdf.addHTML(this.el.nativeElement, 0, 0, options, () => {
              pdf.save("test.pdf");
          });
      }

      public pdfHtmlwithhtm2canvasFirstPageOnly()
      {
        html2canvas(this.el.nativeElement, {
          onrendered: function(canvas) {

              var imgData = canvas.toDataURL('image/png');
            
              console.log('Report Image URL: '+imgData);
              var doc = new jsPDF('p', 'mm', [400, 600]); //210mm wide and 297mm high
              let options = {
                pagesplit: true
            };
              doc.addImage(imgData, 'PNG', 10, 10);
            
              doc.save('sample.pdf');

            
          }//,
          //useCORS: true  
              
      });
      }

      public pdfHtmlwithHtml2canvasMultiplePages(canvas,imgData)
      {
        html2canvas(this.el.nativeElement, {
          onrendered: function(canvas) {

              var imgData = canvas.toDataURL('image/png');
            
            //   console.log('Report Image URL: '+imgData);
            //   var doc = new jsPDF('p', 'mm', [400, 600]); //210mm wide and 297mm high
            //   let options = {
            //     pagesplit: true
            // };
            //   doc.addImage(imgData, 'PNG', 10, 10);
            
            //   doc.save('sample.pdf');

            // for getting multiple pages pdf
            var imgWidth = 210; 
            var pageHeight = 295;  
            var imgHeight = canvas.height * imgWidth / canvas.width;
            var heightLeft = imgHeight;
            var doc = new jsPDF('p', 'mm');
            var position = 0;
            
            doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
            
            while (heightLeft >= 0) {
              position = heightLeft - imgHeight;
              doc.addPage();
              doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
              heightLeft -= pageHeight;
            }
            doc.save( 'file.pdf');
          }
              
      });
      }
}
