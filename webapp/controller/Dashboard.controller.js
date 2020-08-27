sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("poc.zvms.controller.Dashboard", {
		onInit: function () {
	var oModel = this.getOwnerComponent().getModel("VisitorSet");
				this.getView().setModel(oModel);
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
		
		_onPressTiles: function (oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			if (oEvent.getSource().getHeader() === "Total Visitors By Day") {
				oRouter.navTo("ListVisitorByDay");
			} else if (oEvent.getSource().getHeader() === "Total Visitors By Month") {
				oRouter.navTo("ListVisitorsByMonth");
			} else if (oEvent.getSource().getHeader() === "Total Visitors By Year") {
				oRouter.navTo("ListVisitorsByYear");
			} else if (oEvent.getSource().getHeader() === "Current visitor list") {
				oRouter.navTo("ListCurrentVisitor");
			}
		},
			
		_onSearch: function (oEvt) {
			var query = oEvt.getSource().getValue();
			if (query && query.length > 0) {
				var oFilter1 = new sap.ui.model.Filter("FullName", sap.ui.model.FilterOperator.Contains, query);
				var oFilter2 = new sap.ui.model.Filter("Email", sap.ui.model.FilterOperator.Contains, query);
				var oFilter3 = new sap.ui.model.Filter("CompanyName", sap.ui.model.FilterOperator.Contains, query);
				var oFilter4 = new sap.ui.model.Filter("Department", sap.ui.model.FilterOperator.Contains, query);

				var allFilter = new sap.ui.model.Filter([oFilter1, oFilter2, oFilter3,oFilter4], false);
			}
			var obinding = this.getView().byId("tblCurrentVisitor").getBinding("items");
			obinding.filter(allFilter);
		},
	});
});