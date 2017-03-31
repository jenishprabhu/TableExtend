sap.ui.jsview("extension.initial", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf extension.initial
	*/ 
	getControllerName : function() {
		return "extension.initial";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf extension.initial
	*/ 
	createContent : function(oController) {
		

   		var oItemTemplate = new sap.ui.core.ListItem(
				{
				text:"{firstName}"
				}); 
   				
		 var oTable1 = new ColumnClickableTable("Table2", {
		        mode: sap.m.ListMode.None,
		        columns: [
		            new sap.m.Column("Table1-col1", {
		                header : new sap.m.Label({
		                    text : "Last Name"
		                })
		            }),
		            new sap.m.Column("Table1-col2", {
		                header : new sap.m.Label({
		                    text : "First Name"
		                })
		           }),
		           new sap.m.Column("Table1-col3", {
		                header : new sap.m.Label({
		                    text : "Combo Box"
		                })
		           })
		        ],
		        items: {
		            path: "/", 
		            template: new sap.m.ColumnListItem({
		                cells : [ 
		                    new sap.m.Text({text : "{lastName}"}), 
		                    new sap.m.Text({text : "{firstName}"}),
		                    new sap.ui.commons.ComboBox("oComboBox",
		            				{ 
		            				items: { path: "/", template: oItemTemplate } 
		            				})
		                ]
		            })
		        },
		        columnPress: function(e) {
		        	
		        	var objData = e.getSource().getModel().getData();
		        	
		        	var columnIndex = e.getParameter('columnIndex');
		        	
		        	var strFilter = [];
		        	
		        	var vBox = new sap.m.VBox("container");
		        	
		        	var btn = new sap.m.Button({text: "OK"});
		        	
		        	if(columnIndex == 0) {
		        		for(var cnt=0;cnt<objData.length;cnt++) {
		        			var hBox = new sap.m.HBox();
		        			
		        			var chkBox = sap.ui.getCore().byId("chkBox" + cnt);
		        			
		        			if(typeof chkBox != 'undefined') {
		        				chkBox.destroy();
		        			}
		        			
		        			var checkBox = new sap.m.CheckBox("chkBox" + cnt, {text: objData[cnt].lastName}); 
		        			
		        			hBox.addItem(checkBox);
		        			
		        			vBox.addItem(hBox);
		        			
		        			btn.attachPress(oController.applyFilterLN);
		        		}
		        	}else if(columnIndex == 1) {
		        		for(var cnt=0;cnt<objData.length;cnt++) {
		        			
		        			var hBox = new sap.m.HBox();
		        			
		        			var chkBox = sap.ui.getCore().byId("chkBox" + cnt);
		        			
		        			if(typeof chkBox != 'undefined') {
		        				chkBox.destroy();
		        			}
		        			
		        			var checkBox = new sap.m.CheckBox("chkBox"  + cnt, {text: objData[cnt].firstName}); 
		        			
		        			
		        			hBox.addItem(checkBox);
		        			//hBox.addItem(objText);
		        			
		        			vBox.addItem(hBox);
		        			
		        			btn.attachPress(oController.applyFilterFN);
		        		}
		        	}
		        	
		        	vBox.addItem(btn);
		        	
		            console.log(e.getParameter('columnIndex'));
		            
		            var oPopover = new sap.m.Popover({
		    		    placement : sap.m.PlacementType.Bottom,  
		    		   //title : 'abcdedd',
		    		    showHeader: false,
		    		    contentWidth : '250px',
		    		    content :vBox
		    		});
		    		
		    		 oPopover.openBy(e.getParameter('event'));
		        }
		    });

		    var oModel1 = new sap.ui.model.json.JSONModel();
		    var users = [];
		    for (var i = 0; i < 10; i++) {
		        users.push({lastName: 'Last Name ' + i,  firstName: 'First Name ' + i});
		    }
		    oModel1.setData(users);

		    oTable1.setModel(oModel1);
		
		
		//Create an instance of the table control
		var oTable = new ColumnClickableUITable("Table1",{
			title: "Shopping List",
			visibleRowCount: 6,
			firstVisibleRow: 3,
			selectionMode: sap.ui.table.SelectionMode.Single,
			columnPress: function(e) {
				//alert("Column Pressed");
				
				var ascIcon = new sap.ui.core.Icon({src: "sap-icon://sort-ascending"}).addStyleClass("sapUiSmallMarginBegin");
				var txtAsc = new sap.m.Text({text: "Sort Ascending"}).addStyleClass("sapUiSmallMarginBegin");
				var descIcon = new sap.ui.core.Icon({src: "sap-icon://sort-descending"}).addStyleClass("sapUiSmallMarginBegin");
				var txtDesc = new sap.m.Text({text: "Sort Descending"}).addStyleClass("sapUiSmallMarginBegin");
				
				var hBox = new sap.m.HBox();
				hBox.addItem(ascIcon);
				hBox.addItem(txtAsc);
				
				var hBox1 = new sap.m.HBox();
				hBox1.addItem(descIcon);
				hBox1.addItem(txtDesc);
				
				var vBox = new sap.m.VBox();
				vBox.addItem(hBox);
				vBox.addItem(hBox1);
				
				var checkBox = new sap.m.CheckBox("chkBox1", {text: "Blah"}); 
				
				vBox.addItem(checkBox);
				
				var oPopover = new sap.m.Popover({
	    		    placement : sap.m.PlacementType.Bottom,  
	    		   //title : 'abcdedd',
	    		    showHeader: false,
	    		    contentWidth : '250px',
	    		    content :vBox
	    		});
	    		
	    		 oPopover.openBy(e.getParameter('event'));
	    		 
			}
		});

		//Define the columns and the control templates to be used		
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "category"}),
			template: new sap.ui.commons.TextView().bindProperty("text", "category"),
			/*sortProperty: "category",
			filterProperty: "category",*/
			width: "75px",
			hAlign: "Center"
		}));	
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "name"}),
			template: new sap.ui.commons.TextView().bindProperty("text", "name"),
			sortProperty: "name",
			filterProperty: "name",
			width: "75px",
			hAlign: "Center"
		}));	
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "catId"}),
			template: new sap.ui.commons.TextView().bindProperty("text", "catId"),
			sortProperty: "catId",
			filterProperty: "catId",
			width: "75px",
			hAlign: "Center"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "Select Product"}),
			template: new sap.ui.commons.CheckBox().bindProperty("checked", "checked"),
			sortProperty: "checked",
			filterProperty: "checked",
			width: "75px",
			hAlign: "Center"
		}));
		//
		
		
		var oModel_mock = new sap.ui.model.json.JSONModel("model/Products.json");
		oTable.setModel(oModel_mock);
		
		this.setModel(oModel_mock);
		
		oTable.bindRows("/collection");
		
		    return [oTable, oTable1];
		
	}

});
