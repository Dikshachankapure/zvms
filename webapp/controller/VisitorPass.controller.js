sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
], function (Controller, MessageBox) {
	"use strict";

	return Controller.extend("poc.zvms.controller.VisitorPass", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf poc.zvms.view.VisitorPass
		 */
		onInit: function () {
			this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this._oRouter.getRoute("VisitorPass").attachPatternMatched(this._onEditMatched, this);

			var oModelVisitor = this.getOwnerComponent().getModel("VisitorSet");
			this.getView().setModel(oModelVisitor);

		},
		getRouter: function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},

		_onNavBack: function () {
			var that = this;
			//	that._clearData();
			this.getRouter().navTo("ManageVisitor", {}, true);

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

		_onEditMatched: function (oEvent) {
			var oParameters = oEvent.getParameters();
			var oModel = this.getView().getModel();

			var that = this;
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			var txtVisitorId = this.getView().byId("txtVisiId");
			var txtFullName = this.getView().byId("txtFullName");
			var txtGateNo = this.getView().byId("txtGateNo");
			var txtMobileNumber = this.getView().byId("txtMbNo");
			var txtWhomtoMeet = this.getView().byId("txtWhmToMeet");
			var txtCompanyName = this.getView().byId("txtcmpName");
			var txtVisitdate = this.getView().byId("txtVisitDate");
			var txtInTime = this.getView().byId("txtInTime");

			var txtImage = this.getView().byId("idimage");

			if (oParameters.arguments.VisitorId !== "" || oParameters.arguments.VisitorId !== null) {

				this.VisitorId = oParameters.arguments.VisitorId;

				for (var i = 0; i < oModel.getData().Visitors.length; i++) {
					if (oModel.getData().Visitors[i].VisitorId.toString() === this.VisitorId) {
						txtVisitorId.setText(this.VisitorId);
						txtFullName.setText(oModel.getData().Visitors[i].FullName);
						txtGateNo.setText(oModel.getData().Visitors[i].GateNo);
						txtMobileNumber.setText(oModel.getData().Visitors[i].MobileNo);
						txtWhomtoMeet.setText(oModel.getData().Visitors[i].WhoomToMeet);
						txtVisitdate.setText(oModel.getData().Visitors[i].VisitDate);
						txtInTime.setText(oModel.getData().Visitors[i].InTime);

						txtImage.setSrc(oModel.getData().Visitors[i].AuthorPicUrl);
						return false;
					}
				}

			} else {
				MessageBox.error("Incorrect Data");
			}
		},

		onPrintPass: function (oEvent) {
			var tntTool = this.getView().byId("tnttool");
			tntTool.setVisible(false);

			var printButton = this.getView().byId("btnPrint");
			printButton.setVisible(false);

			//	window.print();

			setTimeout(function () {
				window.print();

			}, 500);

			var that = this;
			window.onafterprint = that.AfterPrint();

		},
		AfterPrint: function () {
			var printButton = this.getView().byId("btnPrint");
			var tntTool = this.getView().byId("tnttool");
			setTimeout(function () {
				tntTool.setVisible(true);
				printButton.setVisible(true);
			}, 500);

		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf poc.zvms.view.VisitorPass
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf poc.zvms.view.VisitorPass
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf poc.zvms.view.VisitorPass
		 */
		//	onExit: function() {
		//
		//	}

	});

});