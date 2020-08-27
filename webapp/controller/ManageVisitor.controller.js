sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("poc.zvms.controller.ManageVisitor", {

		
		onInit: function () {
				var oModel = this.getOwnerComponent().getModel("VisitorSet");
				this.getView().setModel(oModel);
		},
		
		getRouter: function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},
		
		_onNavBack: function () {
			this.getRouter().navTo("Dashboard", {}, true);
		},

		_onPressMenu: function (oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			if (oEvent.getSource().getText() === "Dashboard") {
				oRouter.navTo("Dashboard");
			} else if (oEvent.getSource().getText() === "Location Manager") {
				oRouter.navTo("LocationManager");
			} else if (oEvent.getSource().getText() === "Manage Visitors") {
				oRouter.navTo("ManageVisitor");
			} else if (oEvent.getSource().getText() === "Reports") {
				oRouter.navTo("Reports");
			}
		},
		
			onPrint: function (oEvent) {
	//this.getRouter().navTo("VisitorPass");
	
			var objEdit = oEvent.getSource().getBindingContext().getObject();
				this.getRouter().navTo("VisitorPass", {
				VisitorId: objEdit.VisitorId
				
			});
		

		},
		
		_onAddVisitor: function (oEvent) {
		
			this.getRouter().navTo("AddVisitor");
				
		},
		
		_onEdit: function (oEvent) {
		
			var objEdit = oEvent.getSource().getBindingContext().getObject();
				this.getRouter().navTo("EditVisitor", {
				VisitorId: objEdit.VisitorId
			});
			var txtOutTime = sap.ui.getCore().byId("__xmlview0--txtOutTime-descr");
				txtOutTime.setVisible(true);
		
				var txtOutTime = sap.ui.getCore().byId("__xmlview0--txtOutTime-descr");
				txtOutTime.setVisible(false);
			
		
				
				var txtOutTime = sap.ui.getCore().byId("__xmlview0--txtOutTime-descr");
				txtOutTime.setVisible(true);
		},
		
		_onSearch: function (oEvt) {
			var query = oEvt.getSource().getValue();
			if (query && query.length > 0) {
				var oFilter1 = new sap.ui.model.Filter("FullName", sap.ui.model.FilterOperator.Contains, query);
				var oFilter2 = new sap.ui.model.Filter("MobileNo", sap.ui.model.FilterOperator.Contains, query);
				var oFilter3 = new sap.ui.model.Filter("Department", sap.ui.model.FilterOperator.Contains, query);
				var allFilter = new sap.ui.model.Filter([oFilter1, oFilter2, oFilter3], false);
			}
			var obinding = this.getView().byId("tblVisitors").getBinding("items");
			obinding.filter(allFilter);
		}

	});

});