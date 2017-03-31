sap.ui.controller("extension.initial", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf extension.initial
*/
	onInit: function() {
		/*data=  {
				"countries": {"results":[{"name": "India", "Capital": "New Delhi"},
								            {"name": "Pakistan", "Capital": "Islamabad"},
								            {"name": "France", "Capital": "paris"},
								            {"name": "Italy", "Capital": "Rome"},
								            {"name": "England", "Capital": "London"},
								            {"name": "Canada", "Capital": "Ottawa"},
								            {"name": "Japan", "Capital": "Tokyo"},
								            {"name": "China", "Capital": "Beijing"}
								            
								            ]},
								"state":{"results": [{"name": "Karnataka", "Capital": "Bengaluru"},
							            {"name": "Maharashtra", "Capital": "Mumbai"},
							            {"name": "West bengal", "Capital": "Kolkata"},
							            {"name": "Tamilnadu", "Capital": "Chennai"},
							            {"name": "Goa", "Capital": "Panjim"},
							            {"name": "Rajasthan", "Capital": "Jaipur"},
							            {"name": "Kerala", "Capital": "Thiruvananthapuram"},
							            {"name": "Andhra pradesh", "Capital": "Hyderabad"}]}


								}
		
		
		 oModel=sap.ui.model.json.JSONModel(data.countries);
		sap.ui.getCore().setModel(oModel)*/
		
	},
	onAfterRendering: function() {
		/*$("#oComboBox-Table2-0-input").prop("draggable", "true");
		$("#oComboBox-Table2-0-input").on('dragstart', function (event) {
			if(typeof event.dataTransfer == 'undefined') {
				event.dataTransfer = event.originalEvent.dataTransfer;
			}
			
		    event.dataTransfer.setData("text-drag", event.target.id);
		    
		    event.data = event.target.id;
		    
		    G_SOURCE_ID = event.target.id;
		    
		});

		$("#oComboBox-Table2-1-input").prop("ondrop", "drop(event)");
		$("#oComboBox-Table2-1-input").on("dragover", function (event) {
		     event.preventDefault();
		     //var originCtrlID = event.originalEvent.currentTarget.getAttribute("id");
		     var originCtrlID = G_SOURCE_ID;
		     
		     var dragVal = $("#" + originCtrlID).val();
		     $("#" + this.getAttribute("id")).val(dragVal);
		});
		
		$("#oComboBox-Table2-2-input").prop("ondrop", "drop(event)");
		$("#oComboBox-Table2-2-input").on("dragover", function (event) {
		     event.preventDefault();
		   //var originCtrlID = event.originalEvent.currentTarget.getAttribute("id");
		     var originCtrlID = G_SOURCE_ID;
		     var dragVal = $("#" + originCtrlID).val();
		     $("#" + this.getAttribute("id")).val(dragVal);
		});*/
		
		
		var objData = sap.ui.getCore().byId("Table2").getModel().getData();
		var dataLen = sap.ui.getCore().byId("Table2").getModel().getData().length;
		
		
		var tabToJSON = tableToJson($('#Table2').get(0));
		
		
		$("[id^=dfReqColDropdown]").each(function() {
			var objEle = this;
			var objEleID = this.id;
			
			if(objEleID.endsWith("-input")) {
				
				$("#" + objEleID).prop("draggable", "true");
				$("#" + objEleID).on('dragstart', function (event) {
					if(typeof event.dataTransfer == 'undefined') {
						event.dataTransfer = event.originalEvent.dataTransfer;
					}
					
				    event.dataTransfer.setData("text-drag", event.target.id);
				    
				    event.data = event.target.id;
				    
				    G_SOURCE_ID = event.target.id;
				    
				});
				
				
				$("#" + objEleID).prop("ondrop", "drop(event)");
				$("#" + objEleID).on("dragover", function (event) {
				     event.preventDefault();
				     //var originCtrlID = event.originalEvent.currentTarget.getAttribute("id");
				     var originCtrlID = G_SOURCE_ID;
				     
				     var dragVal = $("#" + originCtrlID).val();
				     $("#" + this.getAttribute("id")).val(dragVal);
				});
			}
        });
		
		
		for(var j=0;j<dataLen;j++){
			
			var ctrlID = "oComboBox-Table2-" + j + "-input";
			
			$("#" + ctrlID).prop("draggable", "true");
			$("#" + ctrlID).on('dragstart', function (event) {
				if(typeof event.dataTransfer == 'undefined') {
					event.dataTransfer = event.originalEvent.dataTransfer;
				}
				
			    event.dataTransfer.setData("text-drag", event.target.id);
			    
			    event.data = event.target.id;
			    
			    G_SOURCE_ID = event.target.id;
			    
			});
			
			
			$("#" + ctrlID).prop("ondrop", "drop(event)");
			$("#" + ctrlID).on("dragover", function (event) {
			     event.preventDefault();
			     //var originCtrlID = event.originalEvent.currentTarget.getAttribute("id");
			     var originCtrlID = G_SOURCE_ID;
			     
			     var dragVal = $("#" + originCtrlID).val();
			     $("#" + this.getAttribute("id")).val(dragVal);
			});
		}
		
		
		
	},
	
	
	
	
	getVisibility: function(){
		debugger;
		setInterval( checkForm, 100 );
		 function checkForm(){
			 
			 if(sap.ui.getCore().byId("input").getValue()){
				 return true 
			 }
			else{
				return false
			}
			 
			 
		 }
	},
	
	applyFilterLN: function() {
		
		var objData = sap.ui.getCore().byId("Table1").getModel().getData();
		var dataLen = sap.ui.getCore().byId("Table1").getModel().getData().length;
		
		var arrFilter = [];
		
		for(var j=0;j<dataLen;j++){
			if(sap.ui.getCore().byId("chkBox" + j).getSelected()) {
				var strText = sap.ui.getCore().byId("chkBox" + j).getText();
				var oFilter = new sap.ui.model.Filter("lastName",sap.ui.model.FilterOperator.Contains, strText);
				arrFilter.push(oFilter)
			}
		}
		
		var comFil = new sap.ui.model.Filter(arrFilter);
    	var oList = sap.ui.getCore().byId("Table1");
    	oList.getBinding("items").filter(comFil, sap.ui.model.FilterType.Application);
    	
	},
	applyFilterFN: function() {
		var objData = sap.ui.getCore().byId("Table1").getModel().getData();
		var dataLen = sap.ui.getCore().byId("Table1").getModel().getData().length;
		
		var arrFilter = [];
		
		for(var j=0;j<dataLen;j++){
			if(sap.ui.getCore().byId("chkBox" + j).getSelected()) {
				var strText = sap.ui.getCore().byId("chkBox" + j).getText();
				var oFilter = new sap.ui.model.Filter("firstName",sap.ui.model.FilterOperator.Contains, strText);
				arrFilter.push(oFilter)
			}
		}
		
		var comFil = new sap.ui.model.Filter(arrFilter);
    	var oList = sap.ui.getCore().byId("Table1");
    	oList.getBinding("items").filter(comFil, sap.ui.model.FilterType.Application);
	}
/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf extension.initial
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf extension.initial
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf extension.initial
*/
//	onExit: function() {
//
//	}

});


function tableToJson(table) {
	var data = [];

	// first row needs to be headers
	var headers = [];
	for (var i=0; i<table.children[0].childNodes.length; i++) {
	    headers[i] = table.children[0].childNodes[i].innerHTML.toLowerCase().replace(/ /gi,'');
	}

	// go through cells
	for (var i=1; i<table.children.length; i++) {

	    var tableRow = table.children[i];
	    var rowData = {};

	    for (var j=0; j<tableRow.childNodes.length; j++) {

	        rowData[ headers[j] ] = tableRow.childNodes[j].innerHTML;

	    }

	    data.push(rowData);
	}       

	return data; }