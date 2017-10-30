import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-linechart',
  templateUrl: './linechart.component.html',
  styleUrls: ['./linechart.component.css'],
  encapsulation:ViewEncapsulation.None
})
/*
Line Chart Checklist

Add an SVG to draw our line chart on
Use the D3 standard margin convetion
Create an x axis
Create a y axis
Create an x scale
Create a y scale
Create a line generator
Create a random dataset
Create a path object for the line
Bind the data to the path object
Call the line generator on the data-bound path object
Add circles to show each datapoint
Add some basic styling to the chart so its easier on the eyes
*/
export class LinechartComponent implements OnInit {

  @ViewChild('chart') chartContainer: ElementRef;
  private margin: any = { top: 20, bottom: 20, left: 20, right: 20 };
  //margin = {top: 50, right: 50, bottom: 50, left: 50}	 
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
    this.createChart();
  }

  createChart() {

    // 2. Use the margin convention practice 
    const element = this.chartContainer.nativeElement;
    this.width = element.offsetWidth - this.margin.left - this.margin.right;
    this.height = element.offsetHeight - this.margin.top - this.margin.bottom;

    // var margin = {top: 50, right: 50, bottom: 50, left: 50}
    // , width = window.innerWidth - margin.left - margin.right // Use the window's width 
    // , height = window.innerHeight - margin.top - margin.bottom; // Use the window's height

    // The number of datapoints
    var n = 21;

    // 5. X scale will use the index of our data
    var xScale = d3.scaleLinear()
      .domain([0, n - 1]) // input
      .range([0, 400]); // output

    // 6. Y scale will use the randomly generate number 
    var yScale = d3.scaleLinear()
      .domain([0, 100]) // input 
      .range([this.height, 0]); // output 

    // 8. An array of objects of length N. Each object has key -> value pair, the key being "y" and the value is a random number
    var dataset = d3.range(n).map(function (d, idx) { return { "y": idx * 4 } })
    console.log(dataset);
    //d3.range(n).map(function(d) { return[{x:3,y:5},{x:6,y:8},{x:2,y:4},{x:9,y:3}]});



    // 7. d3's line generator
    let line = d3.line<any>()
      .x((d: any, i) => xScale(i)) // set the x values for the line generator
      .y((d: any) => yScale(d.y))
    // .y(d => this.yScale(d.y)) // set the y values for the line generator 
    //.curve(d3.curveMonotoneX) // apply smoothing to the line


    // 1. Add the SVG to the page and employ #2
    var svg = d3.select(element).append("svg")
      .attr("width", this.width + this.margin.left + this.margin.right)
      .attr("height", this.height + this.margin.top + this.margin.bottom)
      .append("g")
      .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

    // 3. Call the x axis in a group tag
    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(xScale)); // Create an axis component with d3.axisBottom

    // 4. Call the y axis in a group tag
    svg.append("g")
      .attr("class", "y axis")
      .call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft

    // 9. Append the path, bind the data, and call the line generator 
    svg.append("path")
      .datum(dataset) // 10. Binds data to the line 
      .attr("class", "line") // Assign a class for styling 
      .attr("d", line); // 11. Calls the line generator 

    // 12. Appends a circle for each datapoint 
    svg.selectAll(".dot")
      .data(dataset)
      .enter().append("circle") // Uses the enter().append() method
      .attr("class", "dot") // Assign a class for styling
      .attr("cx", function (d, i) { return xScale(i) })
      .attr("cy", function (d) { return yScale(d.y) })
      .attr("r", 5);

  }
}
