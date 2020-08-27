sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/util/Export",
	"sap/ui/core/util/ExportTypeCSV",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/m/MessageStrip",
	"sap/ui/core/library"
], function (Controller, Export, exportCSV, jsonModel, Filter, MessageStrip, CoreLibrary) {
	"use strict";
	var ValueState = CoreLibrary.ValueState;
	return Controller.extend("poc.zvms.controller.Reports", {

		onInit: function () {
			var oModel = this.getOwnerComponent().getModel("VisitorSet");
			this.getView().setModel(oModel, "oExcel");

		},
		getRouter: function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},
		_onNavBack: function () {
			this.getRouter().navTo("Dashboard", {}, true);
			var that = this;
			that._clearData();

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
		handleChange: function (oEvent) {
			var sFrom = oEvent.getParameter("from"),
				sTo = oEvent.getParameter("to"),
				bValid = oEvent.getParameter("valid"),
				oEventSource = oEvent.getSource(),
				oText = this.byId("TextEvent");

			this._iEvent++;

			oText.setText("Id: " + oEventSource.getId() + "\nFrom: " + sFrom + "\nTo: " + sTo);

			if (bValid) {
				oEventSource.setValueState(ValueState.None);
			} else {
				oEventSource.setValueState(ValueState.Error);
			}
		},

		onSearch: function (oEvent) {

			var that = this;
			var query1 = this.getView().byId("dpkDateFrom").getValue();
			var query2 = this.getView().byId("txtDept").getSelectedKey();

			var oFilter1, oFilter2;
			var allFilter = "";
			if (query1 && query2.length > 0) {
				oFilter1 = new sap.ui.model.Filter("VisitDate", sap.ui.model.FilterOperator.EQ, query1);
				oFilter2 = new sap.ui.model.Filter("Department", sap.ui.model.FilterOperator.EQ, query2);

				allFilter = new sap.ui.model.Filter([oFilter1,oFilter2], false);

			} else {
				var otable1 = this.getView().byId("tblVisitors");
				otable1.setVisible(true);
				//	oFilter1 = new sap.ui.model.Filter("VisitDate", sap.ui.model.FilterOperator.EQ, "");
				//	allFilter = new sap.ui.model.Filter([oFilter1], false);
			}

			var obinding = this.getView().byId("tblVisitors").getBinding("items");
			obinding.filter(allFilter);

		},

		OnExport: function (oEvent) {
			// getting model into oModel variable.
			var oTab = this.getView().byId("tblVisitors");

			var oModel = this.getView().getModel("oExcel");
			//	var obinding = this.getView().byId("tblVisitors");
			var oBinding = oTab.getBinding("items");
			var oExport = new Export({
				exportType: new exportCSV({
					// for xls....
					fileExtension: "xls",
					separatorChar: "\t",
					charset: "utf-8",
					mimeType: "application/vnd.ms-excel"

					// for CSV....
					/* charset: "utf-8",
					fileExtension:"csv",
					separatorChar:",",
					mimeType:"application/csv" */
				}),

				models: oModel,
				rows: {
					path: "/Visitors",
					filters: oBinding.aFilters

				},
				columns: [{
					name: "Gate Pass No.",
					template: {
						content: "{VisitorId}"
					}
				}, {
					name: "Name",
					template: {
						content: "{FullName}"
					}
				}, {
					name: "Mobile No",
					template: {
						content: "{MobileNo}"
					}
				}, {
					name: "Department",
					template: {
						content: "{Department}"
					}
				}, {
					name: "Visited Date",
					template: {
						content: "{VisitDate}"
					}
				}]

			});
			oExport.saveFile().catch(function (oError) {
				sap.m.MessageToast.show("Generate is not possible beause no model was set");
			}).then(function () {
				oExport.destroy();
			});
		},
		_clearData: function () {
			var txtVisitdate = this.getView().byId("dpkDateFrom");
			txtVisitdate.setValue("");
		}

	});

});