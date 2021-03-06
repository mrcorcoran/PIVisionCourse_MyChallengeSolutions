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
				Width: 150 ,
				BackgroundColor: '#ff5733',
				BorderRadius: 15,
				DisplayDigits: 1
			} 
		},
		configOptions: function(){
			return[
				{
					title: "Format Symbol",
					mode: "format"
				}
			];
		}
	}



	symbolVis.prototype.init = function(scope, elem) { 
		this.onDataUpdate = dataUpdate;
		function dataUpdate(newdata){
			if(!newdata) return;
			var firstAttribute = newdata.Data[0];
			scope.Values = firstAttribute.Values;

			if(firstAttribute.Label){
				//sporadic
				scope.UOM = firstAttribute.UOM;
				scope.Label = firstAttribute.Label;
			}

		}
	};

	PV.symbolCatalog.register(definition); 
})(window.PIVisualization); 
