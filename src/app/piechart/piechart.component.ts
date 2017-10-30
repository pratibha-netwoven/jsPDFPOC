import { Component, OnInit,ViewChild, ElementRef, Input, OnChanges, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import {jsPDFService} from '../services/jsPDFSvc.service';
import { Datum } from './Datum.interface';


@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class PiechartComponent implements OnInit {
  @ViewChild('chart') chartContainer: ElementRef;
  private margin: any = { top: 20, bottom: 20, left: 20, right: 20};	
  data : Array<Datum>;
  
  constructor(private jsPDFSVC:jsPDFService) { }
  
  ngOnInit() {
    this.data = [
      {category: "Q1-2016", quantity: 12},
      {category: "Q2-2016", quantity: 18},
      {category: "Q3-2016", quantity: 40},
      {category: "Q4-2016", quantity: 30},
      {category: "Q1-2017", quantity: 30},
      {category: "Q1-2018", quantity: 78}
    ];
    this.drawChart(this.data);
  }

  drawChart(data: Array<Datum>) {
    debugger;
        // let width = 960,
        //     height = 500,
        const element = this.chartContainer.nativeElement;
        let width = element.offsetWidth - this.margin.left - this.margin.right;
        let height = element.offsetHeight - this.margin.top - this.margin.bottom;
        let    radius = Math.min(width, height) / 2,
            colourValues = d3.scaleOrdinal(d3.schemeCategory10);;
            //colourValues = d3.scale.category10();
            
            
            //width = element.offsetWidth - this.margin.left - this.margin.right;
            //this.height = element.offsetHeight - this.margin.top - this.margin.bottom;
            // const svg = d3.select(element).append('svg')
            //   .attr('width', element.offsetWidth)
            //   .attr('height', element.offsetHeight);

            //
        // specify Datum as shape of data
        // let arc = d3.svg.arc<d3.layout.pie.Arc<Datum>>()
        //     .innerRadius(radius - 70)
        //     .outerRadius(radius - 10);

      

        let arc = d3.arc<any>()
        //.innerRadius(radius - 70)  // if we give this it will form ring - Pratibha
        .innerRadius(0)
        .outerRadius(radius - 10);
    
        // notice accessor receives d of type Datum
        let pie = d3.pie<Datum>().sort(null).value((d: Datum):number => d.quantity);
    
        // note input to all .attr() and .text() functions
        // will be of type d3.layout.pie.Arc<Datum>
        let fill = (d: any,i): string => colourValues(this.data[i].category);
        let tfx  = (d: any): string => `translate(${arc.centroid(d)})`;
        let text = (d: any,i): string => this.data[i].category;
        
    
        let svg = d3.select(element).append('svg')
            // .attr('width', width)
            // .attr('height', height)
            // .append('g')
            // .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');
            .attr("viewBox", `0 0 ${width} ${height}`)
            .append("g")
            .attr("transform", `translate(${width / 2},${height / 2})`);
    
        // create a group for the pie chart
        let g = svg.selectAll('.pie')
            .data(pie(data))
            .enter().append('g')//.attr('class', 'arc');
    
        // add pie sections
        g.append('path').attr('d', arc).attr('fill', fill);
     
    
        // add labels
        //g.append('text').attr('transform', tfx).text(text);
        g.append('text').attr('transform', tfx).text(text);

    

        //not working
        // //adding tool tip
        // let tip = d3.tip()
        // .attr('class', 'd3-tip')
        // .offset([-10, 0])
        // .html(function(d) {
        //   return "<strong>Quantity:</strong> <span style='color:red'>" + d.quantity + "</span>";
        // })

        // g.call(tip);
    }

    
}
