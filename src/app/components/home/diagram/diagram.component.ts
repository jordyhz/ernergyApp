import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';

import * as go from 'src/srcTS/go-unminified';
import './figures';

@Component({
  selector: 'app-diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.scss']
})
export class DiagramComponent implements OnInit, AfterViewInit {
  @ViewChild('diagramDiv', {static: false}) diagramDiv;
  myDiagram;
  $ = go.GraphObject.make;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.myDiagram =
    this.$(go.Diagram, this.diagramDiv.nativeElement,
      {
        'grid.visible': true,
        'grid.gridCellSize': new go.Size(30, 20),
        'draggingTool.isGridSnapEnabled': true,
        'resizingTool.isGridSnapEnabled': true,
        'rotatingTool.snapAngleMultiple': 90,
        'rotatingTool.snapAngleEpsilon': 45,
        'undoManager.isEnabled': true
      });
    this.myDiagram.nodeTemplateMap.add('Process',
      this.$(go.Node, 'Auto',
        {
          locationSpot: new go.Spot(0.5, 0.5), locationObjectName: 'SHAPE',
          resizable: true, resizeObjectName: 'SHAPE'
        },
        new go.Binding('location', 'pos', go.Point.parse).makeTwoWay(go.Point.stringify),
        this.$(go.Shape, 'Cylinder1',
          {
            name: 'SHAPE',
            strokeWidth: 2,
            fill: this.$(go.Brush, 'Linear',
              {
                start: go.Spot.Left, end: go.Spot.Right,
                0: 'gray', 0.5: 'white', 1: 'gray'
              }),
            minSize: new go.Size(50, 50),
            portId: '', fromSpot: go.Spot.AllSides, toSpot: go.Spot.AllSides
          },
          new go.Binding('desiredSize', 'size', go.Size.parse).makeTwoWay(go.Size.stringify)),
        this.$(go.TextBlock,
          {
            alignment: go.Spot.Center, textAlign: 'center', margin: 5,
            editable: true
          },
          new go.Binding('text').makeTwoWay())
      ));
    this.myDiagram.nodeTemplateMap.add('Valve',
      this.$(go.Node, 'Vertical',
        {
          locationSpot: new go.Spot(0.5, 1, 0, -21), locationObjectName: 'SHAPE',
          selectionObjectName: 'SHAPE', rotatable: true
        },
        new go.Binding('angle').makeTwoWay(),
        new go.Binding('location', 'pos', go.Point.parse).makeTwoWay(go.Point.stringify),
        this.$(go.TextBlock,
          { alignment: go.Spot.Center, textAlign: 'center', margin: 5, editable: true },
          new go.Binding('text').makeTwoWay(),
          // keep the text upright, even when the whole node has been rotated upside down
          new go.Binding('angle', 'angle', function(a) { return a === 180 ? 180 : 0; }).ofObject()),
        this.$(go.Shape,
          {
            name: 'SHAPE',
            geometryString: 'F1 M0 0 L40 20 40 0 0 20z M20 10 L20 30 M12 30 L28 30',
            strokeWidth: 2,
            fill: this.$(go.Brush, 'Linear', { 0: 'gray', 0.35: 'white', 0.7: 'gray' }),
            portId: '', fromSpot: new go.Spot(1, 0.35), toSpot: new go.Spot(0, 0.35)
          })
      ));
    this.myDiagram.linkTemplate =
      this.$(go.Link,
        { routing: go.Link.AvoidsNodes, curve: go.Link.JumpGap, corner: 10, reshapable: true, toShortLength: 7 },
        new go.Binding('points').makeTwoWay(),
        // mark each Shape to get the link geometry with isPanelMain: true
        this.$(go.Shape, { isPanelMain: true, stroke: 'black', strokeWidth: 7 }),
        this.$(go.Shape, { isPanelMain: true, stroke: 'gray', strokeWidth: 5 }),
        this.$(go.Shape, { isPanelMain: true, stroke: 'white', strokeWidth: 3, name: 'PIPE', strokeDashArray: [10, 10] }),
        this.$(go.Shape, { toArrow: 'Triangle', scale: 1.3, fill: 'gray', stroke: null })
      );
    this.loadData();
    // Animate the flow in the pipes
    let animation = new go.Animation();
    animation.easing = go.Animation.EaseLinear;
    this.myDiagram.links.each(function(link) {
      animation.add(link.findObject('PIPE'), 'strokeDashOffset', 20, 0);
    });
    // Run indefinitely
    animation.runCount = Infinity;
    animation.start();
  }
  loadData() {
    this.myDiagram.model = go.Model.fromJSON({ 'class': 'go.GraphLinksModel',
      'nodeDataArray': [
        {'key': 'P1', 'category': 'Process', 'pos': '150 120', 'text': 'Process'},
        {'key': 'P2', 'category': 'Process', 'pos': '330 320', 'text': 'Tank'},
        {'key': 'V1', 'category': 'Valve', 'pos': '270 120', 'text': 'V1'},
        {'key': 'P3', 'category': 'Process', 'pos': '150 420', 'text': 'Pump'},
        {'key': 'V2', 'category': 'Valve', 'pos': '150 280', 'text': 'VM', 'angle': 270},
        {'key': 'V3', 'category': 'Valve', 'pos': '270 420', 'text': 'V2', 'angle': 180},
        {'key': 'P4', 'category': 'Process', 'pos': '450 140', 'text': 'Reserve Tank'},
        {'key': 'V4', 'category': 'Valve', 'pos': '390 60', 'text': 'VA'},
        {'key': 'V5', 'category': 'Valve', 'pos': '450 260', 'text': 'VB', 'angle': 90}
      ],
      'linkDataArray': [
        {'from': 'P1', 'to': 'V1'},
        {'from': 'P3', 'to': 'V2'},
        {'from': 'V2', 'to': 'P1'},
        {'from': 'P2', 'to': 'V3'},
        {'from': 'V3', 'to': 'P3'},
        {'from': 'V1', 'to': 'V4'},
        {'from': 'V4', 'to': 'P4'},
        {'from': 'V1', 'to': 'P2'},
        {'from': 'P4', 'to': 'V5'},
        {'from': 'V5', 'to': 'P2'}
      ]});
  }

}
