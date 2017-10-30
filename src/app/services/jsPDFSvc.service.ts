//declare let jsPDF;
import * as jsPDF from 'jspdf';
import { ElementRef } from '@angular/core';
declare var html2canvas: any;

export class jsPDFService{
    public pdfHtml(chartContainer:ElementRef) {
        //chart looks different as here by default option is jpeg image
        alert('im in service');
    let pdf = new jsPDF();
    let options = {
        pagesplit: true
    };
    pdf.addHTML(chartContainer.nativeElement, 0, 0, options, () => {
        pdf.save("test.pdf");
    });
}

public pdfHtmlwithHtml2canvasMultiplePages(chartContainer:ElementRef)
{
    alert('pdfHtmlwithHtml2canvasMultiplePages from service');
  html2canvas(chartContainer.nativeElement, {
    onrendered: function(canvas) {

        var imgData = canvas.toDataURL('image/png');
      
      

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