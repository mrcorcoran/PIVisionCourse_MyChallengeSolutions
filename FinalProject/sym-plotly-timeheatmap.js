
(function (CS) {
	//'use strict';
	// Specify the symbol definition	
	var myCustomSymbolDefinition = {
		
		typeName: 'plotly-timeheatmap',
		// Specify the user-friendly name of the symbol that will appear in PI Vision
		displayName: 'TimeHeatmap',
		// Specify the number of data sources for this symbol; just a single data source or multiple
		datasourceBehavior: CS.Extensibility.Enums.DatasourceBehaviors.Multiple,
		
		visObjectType: symbolVis,
		// Specify default configuration for this symbol
		getDefaultConfig: function () {
			return {
				// Specify the data shape type (for symbols that update with new data)
				DataShape: 'TimeSeries',
				DataQueryMode: CS.Extensibility.Enums.DataQueryMode.ModePlotValues,
				// Specify the default height and width of this symbol
				Height: 450,
				Width: 700,
				// Specify the value of custom configuration options below, if any
				showTitle: true,
				backgroundColor: "white",
				seriesColor: "black",
				textColor: "black",
				xAxisColor: "red",
				yAxisColor: "green",
				zAxisColor: "blue"
            };
		},
		// By including this, you're specifying that you want to allow configuration options for this symbol
        configOptions: function () {
            return [{
				// Add a title that will appear when the user right-clicks a symbol
				title: 'Format Symbol',
				// Supply a unique name for this cofiguration setting, so it can be reused, if needed
                mode: 'format'
            }];
        },
        // Specify the name of the function that will be called to initialize the symbol
	
	};
	
	//************************************
	// Function called to initialize the symbol
	//************************************
	
	function symbolVis() { }
    CS.deriveVisualizationFromBase(symbolVis);
	symbolVis.prototype.init = function(scope, elem) {
		// Specify which function to call when a data update or configuration change occurs 
		this.onDataUpdate = myCustomDataUpdateFunction;
		//this.onConfigChange = myCustomConfigurationChangeFunction;
		
		// Locate the html div that will contain the symbol, using its id, which is "container" by default
		var symbolContainerDiv = elem.find('#container')[0];
		//var chart = Plotly.makeChart(symbolContainerDiv.id, getConfig());
        // Use random functions to generate a new unique id for this symbol, to make it unique among all other custom symbols
		var newUniqueIDString = "myCustomSymbol_" + Math.random().toString(36).substr(2, 16);
		// Write that new unique ID back to overwrite the old id
        symbolContainerDiv.id = newUniqueIDString;
		// Create a variable to hold the custom visualization object
		var customVisualizationObject = false;
		// Create a variable to hold the combined data array
		var dataArray = [];
		// Create a var to hold the data item paths
		var dataItemLabels = [
			"Please Select An Additional Data Item", 
			"Please Select An Additional Data Item", 
			"Please Select An Additional Data Item"
		];
		//************************************
		// When a data update occurs...
		//************************************
		function myCustomDataUpdateFunction(data) {
			// If there is indeed new data in the update
            //console.log("New data received: ", data);
			if (data !== null && data.Data) {
				dataArray = [ [], [], []];
				// Check for an error
				if (data.Data[0].ErrorDescription) {
					console.log(data.Data[0].ErrorDescription);
				}
				// If the custom visualization hasn't been made yet... create the custom visualization!
				// Custom code begins here:
				// -----------------------------------------------------------------------------------------
				if (data.Data[0] && data.Data[1] && data.Data[2]) {
					
					// Store all of the 3 data item labels in the data item labels global variable
					for (var i = 0; i < 3; i++) {
						if (data.Data[i].Label && data.Data[i].Units) {
							dataItemLabels[i] = data.Data[i].Label + " (" + data.Data[i].Units + ")";;
						}
					}
					// Format the data as a new array that can be easily plotted
					for (var i = 0; i < 15; i++) {
						// Try to parse the values
						var newXValue = parseFloat( ("" + data.Data[0].Values[i].Value).replace(",", "") );
						var newYValue = parseFloat( ("" + data.Data[1].Values[i].Time).replace(",", "") );
						//var newZValue = parseFloat( ("" + data.Data[2].Values[i].Value).replace(",", "") );
						if (!isNaN(newXValue) && !isNaN(newYValue)) {
							dataArray[0].push(newXValue);
							dataArray[1].push(newYValue);
							//dataArray[2].push(newZValue);
							
						}
					}
				
				console.log("Data array: ", dataArray);
				// Create the custom visualization
				
					var data = [
						{
							
							type: 'heatmap',
							//x: dataArray[0],
							//y: dataArray[1],
							z: [dataArray[0],[1]],
							
						}
					];
					
					Plotly.newPlot(symbolContainerDiv, data);
				} 
			}
		}
        
	
	}
	
	CS.symbolCatalog.register(myCustomSymbolDefinition);
	
})(window.PIVisualization);