sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("poc.zvms.controller.CurrentVisitor", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf poc.zvms.view.CurrentVisitor
		 */
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

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf poc.zvms.view.CurrentVisitor
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf poc.zvms.view.CurrentVisitor
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf poc.zvms.view.CurrentVisitor
		 */
		//	onExit: function() {
		//
		//	}

	});

});