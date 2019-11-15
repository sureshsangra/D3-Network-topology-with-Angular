import { Component, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import * as d3 from 'd3';
import { color } from 'd3';
import { test } from './testd3';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent  {
  rotate(target: Element, dir: number) {
    throw new Error("Method not implemented.");
  }

constructor(private httpService: HttpClient){}
    svg;
    width;
    height;
    color: any;
    simulation;
    link;
    node;
    div;
    style;
    g;
    zoom_handler;
    
    
    ngOnInit() {
      console.log('D3.js version:', d3['version']);
  
      this.loadForceDirectedGraph();
    }
 
    
    loadForceDirectedGraph() {
      this.svg = d3.select('svg');
      this.width = +this.svg.attr('width');
     this.style = +this.svg.style('background', '#000')
      this.height = +this.svg.attr('height');
      this.color = d3.scaleOrdinal(d3.schemeCategory10);

      this.zoom_handler = d3.zoom().on("zoom", (d)=> {return this.zoom_actions(d)});


      this.simulation = d3.forceSimulation()
        .force('link', d3.forceLink().id((d) => d['id']))
        .force('charge', d3.forceManyBody())
        .force('center', d3.forceCenter(this.width / 2, this.height / 2))
        

      this.render(test);
  }


  render(data): void {
     
        

      this.link = this.svg.append('g')
        .attr('class', 'links')
        .selectAll('line')
        .data(data['links'])
        .enter()
        .append('line')
        .style('background', '#fff')
        .attr('stroke-width', (d) => Math.sqrt(d['value']));
      
       
      
      this.node = this.svg.append('g')
            .attr('class', 'nodes')
            .selectAll('circle')
            .data(data['nodes'])
            .enter()
            .append('circle')
            .attr('r', 10)
            .attr('fill', (d) => this.color(d['group']))
           
            .call(d3.drag()
              //.on('start', (d) => {return this.dragStarted(d);})
              .on('drag', (d) => {return this.dragged(d);})
              //.on('end', (d) => {return this.dragEnded(d);})
            )
            
            this.svg.call(this.zoom_handler);
      this.node.append('title')
          .text( (d) => { return d.id});
      this.simulation
      .nodes(data.nodes)
      .on("tick", ()=>{return this.ticked()});

    this.simulation.force("link")
      .links(data.links);
  }
  ticked() {
      this.link
        .attr('x1', function(d) { return d['source'].x; })
        .attr('y1', function(d) { return d['source'].y; })
        .attr('x2', function(d) { return d['target'].x; })
        .attr('y2', function(d) { return d['target'].y; });

    this.node
      .attr('cx', function(d) { return d['x']; })
      .attr('cy', function(d) { return d['y']; });
  }

  

  dragStarted(d): void {
    if (!d3.event.active) this.simulation.alphaTarget(0.3);
  d3.event.subject.px = d3.event.subject.x;
  d3.event.subject.py = d3.event.subject.y;
    
  }

  dragged(d): void {
   
    d.px += d3.event.dx;
    d.py += d3.event.dy;
    d.x += d3.event.dx;
    d.y += d3.event.dy; 
    this.ticked();
  }

  dragEnded(d): void {
    
        if (!d3.event.active) this.simulation.alphaTarget(0);
        d3.event.subject.px = null;
        d3.event.subject.py = null;
     }

  zoom_actions(d):void {
      this.node.attr("transform", d3.event.transform)
      this.link.attr("transform", d3.event.transform)
    }

   reset_zoom(d):void {
    this.node.attr("transform", d3.zoomIdentity.scale(1))
    this.link.attr("transform", d3.zoomIdentity.scale(1))
   }
    
}
