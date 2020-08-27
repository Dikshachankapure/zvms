sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel",
	'sap/m/MessageToast',
	'sap/ui/model/SimpleType',
	'sap/ui/model/ValidateException',
], function (Controller, MessageBox, History, JSONModel, MessageToast, SimpleType, ValidateException) {
	"use strict";

	return Controller.extend("poc.zvms.controller.AddVisitor", {
//ok
		onInit: function () {
			this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this._oRouter.getRoute("EditVisitor").attachPatternMatched(this._onEditMatched, this);

			var oModelVisitor = this.getOwnerComponent().getModel("VisitorSet");
			this.getView().setModel(oModelVisitor);

		},

		getRouter: function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},

		_onNavBack: function () {
			var that = this;
			that._clearData();
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

		ValidEmail: function () {
			var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
			var Email = this.getView().byId("txtEmail").getValue();
			
			  if (mailformat.test(Email) == false)  {
            	MessageBox.alert("Invalid Email Address");
            return false;
        }
		},
		
		
		
		_onEditMatched: function (oEvent) {
			var oParameters = oEvent.getParameters();
			var oModel = this.getView().getModel();

			var that = this;
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			var txtVisitorId = this.getView().byId("txtVisiId");
			var txtGateNo = this.getView().byId("txtGateNo");
			var txtFullName = this.getView().byId("txtFullName");
			var txtEmail = this.getView().byId("txtEmail");
			var txtMobileNumber = this.getView().byId("txtMbNo");
			var txtAddress = this.getView().byId("txtAddress");
			var txtIdentityProof = this.getView().byId("txtIdenProof");
			var txtIdentityProofNo = this.getView().byId("txtIdenProofNo");
			var txtImageUpload = this.getView().byId("fileUploader");
			var txtCompanyName = this.getView().byId("txtcmpName");
			var txtWhomtoMeet = this.getView().byId("txtWhmToMeet");
			var txtDepartment = this.getView().byId("txtDept");
			var txtReasontoMeet = this.getView().byId("txtRsnToMeet");
			var txtVisitdate = this.getView().byId("txtVisitDate");
			var txtInTime = this.getView().byId("txtInTime");

			var txtRemarks = this.getView().byId("txtRemark");

			var txtOutTime = this.getView().byId("txtOutTime");
			txtOutTime.setVisible(true);

			if (oParameters.arguments.VisitorId !== "" || oParameters.arguments.VisitorId !== null) {

				this.VisitorId = oParameters.arguments.VisitorId;
				var txtOutTimeL = this.getView().byId("txtOutTimeL");
				txtOutTimeL.setVisible(true);

				for (var i = 0; i < oModel.getData().Visitors.length; i++) {
					if (oModel.getData().Visitors[i].VisitorId.toString() === this.VisitorId) {
						txtVisitorId.setValue(this.VisitorId);
						txtGateNo.setSelectedKey(oModel.getData().Visitors[i].GateNo);
						txtFullName.setValue(oModel.getData().Visitors[i].FullName);
						txtEmail.setValue(oModel.getData().Visitors[i].Email);
						txtMobileNumber.setValue(oModel.getData().Visitors[i].MobileNo);
						txtAddress.setValue(oModel.getData().Visitors[i].Address);
						txtIdentityProof.setSelectedKey(oModel.getData().Visitors[i].IDProof);
						txtIdentityProofNo.setValue(oModel.getData().Visitors[i].IDProofNo);
						txtImageUpload.setValue(oModel.getData().Visitors[i].AuthorPicUrl);
						txtCompanyName.setValue(oModel.getData().Visitors[i].CompanyName);
						txtWhomtoMeet.setValue(oModel.getData().Visitors[i].WhoomToMeet);
						txtDepartment.setSelectedKey(oModel.getData().Visitors[i].Department);
						txtReasontoMeet.setValue(oModel.getData().Visitors[i].ReasonToMeet);
						txtVisitdate.setValue(oModel.getData().Visitors[i].VisitDate);

						txtInTime.setValue(oModel.getData().Visitors[i].InTime);
						txtOutTime.setValue(oModel.getData().Visitors[i].OutTime);
						txtRemarks.setValue(oModel.getData().Visitors[i].Remarks);
						return false;
					}
				}

			} else {
				MessageBox.error("Incorrect Data");
			}
		},

		_onSaveUpdate: function () {
			var that = this;
			var txtVisitorId = this.getView().byId("txtVisiId");
			if (txtVisitorId.getValue() === "0") {
				that._onSaveVisitor();
			} else {
				that._onUpdateVisitor();
			}
		},

		_onSaveVisitor: function () {
			var that = this;
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			var txtVisitorId = this.getView().byId("txtVisiId");
			var txtGateNo = this.getView().byId("txtGateNo");
			var txtFullName = this.getView().byId("txtFullName");
			var txtEmail = this.getView().byId("txtEmail");
			var txtMobileNumber = this.getView().byId("txtMbNo");
			var txtAddress = this.getView().byId("txtAddress");
			var txtIdentityProof = this.getView().byId("txtIdenProof");
			var txtIdentityProofNo = this.getView().byId("txtIdenProofNo");
			var txtImageUpload = this.getView().byId("fileUploader");

			var txtCompanyName = this.getView().byId("txtcmpName");
			var txtWhomtoMeet = this.getView().byId("txtWhmToMeet");
			var txtDepartment = this.getView().byId("txtDept");
			var txtReasontoMeet = this.getView().byId("txtRsnToMeet");
			var txtVisitdate = this.getView().byId("txtVisitDate");
			var txtInTime = this.getView().byId("txtInTime");
			var txtOutTime = this.getView().byId("txtOutTime");
			var txtRemarks = this.getView().byId("txtRemark");

			if (txtGateNo.getSelectedKey() === 0 || txtFullName.getValue() === "" || txtEmail.getValue() === "" || txtMobileNumber.getValue() ===
				"" || txtAddress.getValue() === "" || txtIdentityProof.getSelectedKey() === 0 || txtIdentityProofNo.getValue() === "" ||
				txtCompanyName.getValue() === "" || txtWhomtoMeet.getValue() === "" || txtDepartment.getSelectedKey() === 0 || txtReasontoMeet.getValue() ===
				"" || txtVisitdate.getValue() === "" || txtInTime.getValue() === "" || txtRemarks.getValue() === "") {
				MessageToast.show("Please fill up all required details");
				
			} else {
				// Get the Model in the view 
				var oModel = this.getView().getModel();

				// Get the Number of records in the OData Drivers 
				var VisitorNumber = oModel.getProperty("/Visitors").length;

				// Populate the new Driver ID 
				var NewVisitorID = VisitorNumber + 1;
				var oNewEntry = {};

				oNewEntry = {
					"VisitorId": NewVisitorID,
					"GateNo": txtGateNo.getSelectedKey(),
					"FullName": txtFullName.getValue(),
					"Email": txtEmail.getValue(),
					"MobileNo": txtMobileNumber.getValue(),
					"Address": txtAddress.getValue(),
					"IDProof": txtIdentityProof.getSelectedKey(),
					"IDProofNo": txtIdentityProofNo.getValue(),
					"AuthorPicUrl": txtImageUpload.getValue(),
					"CompanyName": txtCompanyName.getValue(),
					"WhoomToMeet": txtWhomtoMeet.getValue(),
					"Department": txtDepartment.getSelectedKey(),
					"ReasonToMeet": txtReasontoMeet.getValue(),
					"VisitDate": txtVisitdate.getValue(),
					"InTime": txtInTime.getValue(),
					"Remarks": txtRemarks.getValue(),

				};
				
				that.ValidEmail();
				var oModelVisitors = oModel.getProperty("/Visitors");
				oModelVisitors.push(oNewEntry);
				oModel.setProperty("/Visitors", oModelVisitors);
				MessageBox.confirm("Do you Save Data?", {
					icon: sap.m.MessageBox.Icon.INFORMATION,
					title: "Confirm",
					actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
					onClose: function (sAction) {
						if (sAction === "YES") {
						/*	var objEdit = sap.ui.getCore().byId("txtVisiId").getText();
							this.getRouter().navTo("VisitorPass", {
								ID: objEdit
							});*/
						//	oRouter.navTo("VisitorPass");
						
						oRouter.navTo("ManageVisitor");

							that._clearData();
						} else {
						/*	oRouter.navTo("ManageVisitor");

							that._clearData();*/
						}
					}
				});
			}
		},

		_onUpdateVisitor: function () {
			var that = this;
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);

			var txtVisitorId = this.getView().byId("txtVisiId");
			var txtGateno = this.getView().byId("txtGateNo");
			var txtFullName = this.getView().byId("txtFullName");
			var txtEmail = this.getView().byId("txtEmail");
			var txtMobileNumber = this.getView().byId("txtMbNo");
			var txtAddress = this.getView().byId("txtAddress");
			var txtIdentityProof = this.getView().byId("txtIdenProof");
			var txtIdentityProofNo = this.getView().byId("txtIdenProofNo");
			var txtImageUpload = this.getView().byId("fileUploader");
			var txtCompanyName = this.getView().byId("txtcmpName");
			var txtWhomtoMeet = this.getView().byId("txtWhmToMeet");
			var txtDepartment = this.getView().byId("txtDept");
			var txtReasontoMeet = this.getView().byId("txtRsnToMeet");
			var txtVisitdate = this.getView().byId("txtVisitDate");
			var txtInTime = this.getView().byId("txtInTime");
			var txtOutTime = this.getView().byId("txtOutTime");
			var txtRemarks = this.getView().byId("txtRemark");

			if (txtOutTime.getValue() === "") {
				MessageToast.show("Please fill up all required details");
			} else {
				// Get the Model in the view 
				var oModel = this.getView().getModel();

				var oModelVisitors = oModel.getProperty("/Visitors");

				for (var i = 0; i < oModel.getData().Visitors.length; i++) {
					if (oModel.getData().Visitors[i].VisitorId.toString() === txtVisitorId.getValue()) {
						oModel.getData().Visitors[i].VisitorId = txtVisitorId.getValue();
						oModel.getData().Visitors[i].GateNo = txtGateno.getSelectedKey();
						oModel.getData().Visitors[i].FullName = txtFullName.getValue();
						oModel.getData().Visitors[i].Email = txtEmail.getValue();
						oModel.getData().Visitors[i].MobileNo = txtMobileNumber.getValue();
						oModel.getData().Visitors[i].Address = txtAddress.getValue();
						oModel.getData().Visitors[i].IDProof = txtIdentityProof.getSelectedKey();

						oModel.getData().Visitors[i].IDProofNo = txtIdentityProofNo.getValue();

						oModel.getData().Visitors[i].AuthorPicUrl = txtImageUpload.getValue();
						oModel.getData().Visitors[i].CompanyName = txtCompanyName.getValue();
						oModel.getData().Visitors[i].WhoomToMeet = txtWhomtoMeet.getValue();
						oModel.getData().Visitors[i].Department = txtDepartment.getSelectedKey();
						oModel.getData().Visitors[i].ReasonToMeet = txtReasontoMeet.getValue();
						oModel.getData().Visitors[i].VisitDate = txtVisitdate.getValue();
						oModel.getData().Visitors[i].InTime = txtInTime.getValue();

						oModel.getData().Visitors[i].OutTime = txtOutTime.getValue();
						oModel.getData().Visitors[i].Remarks = txtRemarks.getValue();

					} else {
						oModel.getData().Visitors[i].VisitorId = oModel.getData().Visitors[i].VisitorId;
						oModel.getData().Visitors[i].GateNo = oModel.getData().Visitors[i].GateNo;
						oModel.getData().Visitors[i].FullName = oModel.getData().Visitors[i].FullName;
						oModel.getData().Visitors[i].Email = oModel.getData().Visitors[i].Email;
						oModel.getData().Visitors[i].MobileNo = oModel.getData().Visitors[i].MobileNo;
						oModel.getData().Visitors[i].Address = oModel.getData().Visitors[i].Address;
						oModel.getData().Visitors[i].IDProof = oModel.getData().Visitors[i].IDProof;

						oModel.getData().Visitors[i].IDProofNo = oModel.getData().Visitors[i].IDProofNo;
						oModel.getData().Visitors[i].AuthorPicUrl = oModel.getData().Visitors[i].AuthorPicUrl;
						oModel.getData().Visitors[i].CompanyName = oModel.getData().Visitors[i].CompanyName;
						oModel.getData().Visitors[i].WhoomToMeet = oModel.getData().Visitors[i].WhoomToMeet;
						oModel.getData().Visitors[i].Department = oModel.getData().Visitors[i].Department;
						oModel.getData().Visitors[i].ReasonToMeet = oModel.getData().Visitors[i].ReasonToMeet;
						oModel.getData().Visitors[i].VisitDate = oModel.getData().Visitors[i].VisitDate;
						oModel.getData().Visitors[i].InTime = oModel.getData().Visitors[i].InTime;

						oModel.getData().Visitors[i].OutTime = oModel.getData().Visitors[i].OutTime;
						oModel.getData().Visitors[i].Remarks = oModel.getData().Visitors[i].Remarks;

					}

				}

				oModel.setProperty("/Visitors", oModelVisitors);
				MessageBox.confirm("Do you want to Update Visitors information?", {
					icon: sap.m.MessageBox.Icon.INFORMATION,
					title: "Confirm",
					actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
					onClose: function (sAction) {
						if (sAction === "YES") {
							oRouter.navTo("ManageVisitor");
							that._clearData();
						}
					}
				});

			}
		},
/*
		onPrint: function (oEvent) {

			var VisitorID = this.getView().byId("txtVisiId").getValue();
			this.getRouter().navTo("VisitorPass", {
				ID: VisitorID
			});
		},*/

		_clearData: function () {
			var txtVisitorId = this.getView().byId("txtVisiId");
			var txtGateno = this.getView().byId("txtGateNo");
			var txtFullName = this.getView().byId("txtFullName");
			var txtEmail = this.getView().byId("txtEmail");
			var txtMobileNumber = this.getView().byId("txtMbNo");
			var txtAddress = this.getView().byId("txtAddress");
			var txtIdentityProof = this.getView().byId("txtIdenProof");
			var txtIdentityProofNo = this.getView().byId("txtIdenProofNo");
			var txtImageUpload = this.getView().byId("fileUploader");
			var txtCompanyName = this.getView().byId("txtcmpName");
			var txtWhomtoMeet = this.getView().byId("txtWhmToMeet");
			var txtDepartment = this.getView().byId("txtDept");
			var txtReasontoMeet = this.getView().byId("txtRsnToMeet");
			var txtVisitdate = this.getView().byId("txtVisitDate");
			var txtInTime = this.getView().byId("txtInTime");
			var txtOutTime = this.getView().byId("txtOutTime");
			var txtRemarks = this.getView().byId("txtRemark");

			//	var txtOutTime = sap.ui.getCore().byId("txtOutTime");
			txtOutTime.setVisible(false);

			txtVisitorId.setValue(0);
			txtGateno.setSelectedKey(0);
			txtFullName.setValue("");
			txtEmail.setValue("");
			txtMobileNumber.setValue("");
			txtAddress.setValue("");
			txtIdentityProof.setSelectedKey(0);
			txtIdentityProofNo.setValue("");
			txtImageUpload.setValue("");
			txtCompanyName.setValue("");
			txtWhomtoMeet.setValue("");
			txtDepartment.setSelectedKey(0);
			txtReasontoMeet.setValue("");
			txtVisitdate.setValue("");

			txtInTime.setValue("");
			txtOutTime.setValue("");
			txtRemarks.setValue("");
		}

	});

});