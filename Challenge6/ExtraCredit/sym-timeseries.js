(function (PV) {
	"use strict";

	function symbolVis() { };
	PV.deriveVisualizationFromBase(symbolVis);

	var definition = { 
		typeName: "timeseries",
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

	/* var dataItems = [
		{
			Time: "19-Jan-18 00:00:00",
			Value: 123
		},
		{
			Time: "18-Feb-18 00:00:00",
			Value: 567
		}
	]; */

	symbolVis.prototype.init = function(scope, elem) { 
		this.onDataUpdate = dataUpdate;
		function dataUpdate(data){
			if(!data) return;
			var firstAttribute = data.Data[0];
			scope.Values = firstAttribute.Values;

			if(firstAttribute.Label){
				//sporadic
				scope.Units = firstAttribute.Units;
				scope.Label = firstAttribute.Label;
			}

		}
		scope.Values = dataItems;
	};

	PV.symbolCatalog.register(definition); 
})(window.PIVisualization); 
