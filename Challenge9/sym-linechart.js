(function (PV) {
	"use strict";

	function symbolVis() { };
	PV.deriveVisualizationFromBase(symbolVis);

	var definition = { 
		typeName: "linechart",
		visObjectType: symbolVis,
		datasourceBehavior: PV.Extensibility.Enums.DatasourceBehaviors.Multiple,
		getDefaultConfig: function(){ 
			return { 
				Height: 150,
				Width: 150 
			} 
		}
	}

	function getConfig(){
		return{
			"type": "serial",
			"categoryField": "category",
			"startDuration": 1,
			"categoryAxis": {
				"gridPosition": "start"
			},
			"trendLines": [],
			"graphs": [
				{
					"balloonText": "[[title]] of [[category]]:[[value]]",
					"bullet": "round",
					"id": "AmGraph-1",
					"title": "Ryan",
					"type": "smoothedLine",
					"valueField": "column-1",
					"lineColor": "#ff0000"
				},
				{
					"balloonText": "[[title]] of [[category]]:[[value]]",
					"bullet": "square",
					"id": "AmGraph-2",
					"title": "Matt",
					"type": "smoothedLine",
					"valueField": "column-2",
					"lineColor": "#0033cc"
				}
			],
			"guides": [],
			"valueAxes": [
				{
					"id": "ValueAxis-1",
					"title": "Awesomeness"
				}
			],
			"allLabels": [],
			"balloon": {},
			"legend": {
				"enabled": true,
				"useGraphSettings": true
			},
			"titles": [
				{
					"id": "Title-1",
					"size": 20,
					"text": "Smooth Line Chart"
				}
			],
			"dataProvider": [
				{
					"category": "category 1",
					"column-1": 8,
					"column-2": 5
				},
				{
					"category": "category 2",
					"column-1": 6,
					"column-2": 7
				},
				{
					"category": "category 3",
					"column-1": 2,
					"column-2": 3
				},
				{
					"category": "category 4",
					"column-1": 1,
					"column-2": 3
				},
				{
					"category": "category 5",
					"column-1": 2,
					"column-2": 1
				},
				{
					"category": "category 6",
					"column-1": 3,
					"column-2": 2
				},
				{
					"category": "category 7",
					"column-1": 6,
					"column-2": 8
				}
			]
		}
	}
		
	

	symbolVis.prototype.init = function(scope, elem) {
		var container = elem.find('#container')[0];
		container.id = "lineChart_" + scope.symbol.Name;
		AmCharts.makeChart(container.id, getConfig());
	};

	PV.symbolCatalog.register(definition); 
})(window.PIVisualization); 
