import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as d3 from 'd3';
@Component({
  selector: 'app-stackedchart',
  templateUrl: './stackedchart.component.html',
  styleUrls: ['./stackedchart.component.css']
})



export class StackedchartComponent implements OnInit {
 @ViewChild('stackedchart') chartContainer: ElementRef;

 private data:Array<any>;
 private margin = {top: 20, right: 30, bottom: 30, left: 60};
 private chart: any;	
 private width: number;
 private height: number;
 private xScale: any;
 private yScale: any;
 private colors: any;
 private xAxis: any;
 private yAxis: any;
  constructor() { }

  ngOnInit() {
    this.createStackedChart();
  }

  createStackedChart(){
   
    this.data = [
      {month: "Q1-2016", apples: 3840, bananas: 1920, cherries: -1960, dates: -400},
      {month: "Q2-2016", apples: 1600, bananas: 1440, cherries: -960, dates: -400},
      {month: "Q3-2016", apples:  640, bananas:  960, cherries: -640, dates: -600},
      {month: "Q4-2016", apples:  320, bananas:  480, cherries: -640, dates: -400}
    ];
    
    const element = this.chartContainer.nativeElement;
    this.width = element.offsetWidth - this.margin.left - this.margin.right;
    this.height = element.offsetHeight - this.margin.top - this.margin.bottom;
    const svg = d3.select(element).append('svg')
      .attr('width', element.offsetWidth)
      .attr('height', element.offsetHeight);

    var series = d3.stack()
        .keys(["apples", "bananas", "cherries", "dates"])
        .offset(d3.stackOffsetDiverging)
        (this.data);
    
    var x = d3.scaleBand()
        .domain(this.data.map(function(d) { return d.month; }))
        .rangeRound([this.margin.left, this.width - this.margin.right])
        .padding(0.1);
    
    var y = d3.scaleLinear()
        .domain([Number(d3.min(series, stackMin)), Number(d3.max(series, stackMax))])
        .rangeRound([this.height - this.margin.bottom, this.margin.top]);
    
    var z = d3.scaleOrdinal(d3.schemeCategory10);
    //
  //   var xData = ["apples", "bananas", "cherries", "dates"];
  //   var dataIntermediate = xData.map(function (c) {
  //     return this.data.map(function (d) {
  //         return {x: d.month, y: d[c]};
  //     });
  // });
   
  // var dataStackLayout = d3.stack()(dataIntermediate);
  //
    svg.append("g")
      .selectAll("g")
      .data(series)
      .enter().append("g")
        .attr("fill", function(d) { return z(d.key); })
      .selectAll("rect")
      .data(function(d:any) { return d; })
      .enter().append("rect")
        .attr("width", x.bandwidth)
        .attr("x", function(d) { return x(d[0].toString()); })
        .attr("y", function(d) { return y(d[1]); })
        .attr("height", function(d) { return y(d[0]) - y(d[1]); })
    
    svg.append("g")
        .attr("transform", "translate(0," + y(0) + ")")
        .call(d3.axisBottom(x));
    
    svg.append("g")
        .attr("transform", "translate(" + this.margin.left + ",0)")
        .call(d3.axisLeft(y));
    
    function stackMin(serie) {
      return d3.min(serie, function(d) { return d[0]; });
    }
    
    function stackMax(serie) {
      return d3.max(serie, function(d) { return d[1]; });
    }
  }
}
