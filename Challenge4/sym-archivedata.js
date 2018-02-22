(function (PV) {
	"use strict";

	function symbolVis() { };
	PV.deriveVisualizationFromBase(symbolVis);

	var definition = { 
		typeName: "archivedata",
		visObjectType: symbolVis,
		datasourceBehavior: PV.Extensibility.Enums.DatasourceBehaviors.Single,
		getDefaultConfig: function(){ 
			return { 
				DataShape: 'Timeseries',
				Height: 150,
				Width: 150 
			} 
		}
	}

	var dataItems = [
		{
			Time: "18-Feb-19 06:00:00",
			Value: 123
		},
		{
			Time: "19-Feb-18 09:00:00",
			Value: 567
		}
	];

	symbolVis.prototype.init = function(scope, elem) { 
		this.onDataUpdate = dataUpdate;
		function dataUpdate(data){}
			
		scope.Values = dataItems;
	};

	PV.symbolCatalog.register(definition); 
})(window.PIVisualization); 
