sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/Fragment",
    "sap/m/MessageToast"
], function (Controller, JSONModel, Filter, FilterOperator, Fragment, MessageToast) {
    "use strict";

    return Controller.extend("zds.sales.flow.controller.Main", {

        onInit: function () {
            // === ALL MODELS INITIALIZED SYNCHRONOUSLY MATCHING MOCKUP ===

            // 1. Header Table Data (5 Sales Documents matching mockup exactly)
            var oHeaderModel = new JSONModel({
                DocHeader: [
                    { 
                        SalesDocument: "2110000176", 
                        DocNumDisplay: "SALES 2110000176",
                        FulfillmentState: "Information",
                        FulfillmentIcon: "sap-icon://navigation-right-arrow",
                        FulfillmentText: ">>>",
                        ProcessPhase: "Accounting", 
                        OrderProcessingState: "Success",
                        CreatedOn: "2026-08-01", 
                        CreatedBy: "CB4100000012"
                    },
                    { 
                        SalesDocument: "2110000177", 
                        DocNumDisplay: "SALES 2110000177",
                        FulfillmentState: "Information",
                        FulfillmentIcon: "sap-icon://navigation-right-arrow",
                        FulfillmentText: ">>>",
                        ProcessPhase: "Accounting", 
                        OrderProcessingState: "Success",
                        CreatedOn: "2026-08-03", 
                        CreatedBy: "CB4100000014"
                    },
                    { 
                        SalesDocument: "2110000178", 
                        DocNumDisplay: "SALES 2110000178",
                        FulfillmentState: "Error",
                        FulfillmentIcon: "sap-icon://cancel",
                        FulfillmentText: "✖",
                        ProcessPhase: "Delivery Processing", 
                        OrderProcessingState: "Success",
                        CreatedOn: "2026-08-05", 
                        CreatedBy: "CB4100000012"
                    },
                    { 
                        SalesDocument: "2110000179", 
                        DocNumDisplay: "SALES 2110000179",
                        FulfillmentState: "Success",
                        FulfillmentIcon: "sap-icon://accept",
                        FulfillmentText: "✔",
                        ProcessPhase: "Already Payment", 
                        OrderProcessingState: "Success",
                        CreatedOn: "2026-08-07", 
                        CreatedBy: "CB4100000015"
                    },
                    { 
                        SalesDocument: "2110000180", 
                        DocNumDisplay: "SALES 2110000180",
                        FulfillmentState: "Success",
                        FulfillmentIcon: "sap-icon://accept",
                        FulfillmentText: "✔",
                        ProcessPhase: "Completed", 
                        OrderProcessingState: "Success",
                        CreatedOn: "2026-08-10", 
                        CreatedBy: "CB4100000018"
                    }
                ]
            });
            this.getView().setModel(oHeaderModel, "headerModel");

            // 2. KPI Tile Summary (6 Tiles matching mockup: Inquiry 36, Delivery 72, Quotation 42, Billing 78, Sales Order 60, Payment 50)
            var oKpiModel = new JSONModel({
                inquiryCount: 36,
                deliveryCount: 72,
                quotationCount: 42,
                billingCount: 78,
                salesOrderCount: 60,
                paymentCount: 50
            });
            this.getView().setModel(oKpiModel, "kpiModel");

            // 3. Bar Chart Issues matching mockup categories & values
            var oChartModel = new JSONModel({
                issues: [
                    { name: "Not Yet Payment", value: 70 },
                    { name: "Ready to Good Issue", value: 40 },
                    { name: "Open Sales Order", value: 40 },
                    { name: "Open Inquiry Document", value: 10 }
                ]
            });
            this.getView().setModel(oChartModel, "chartData");

            // 4. Filter Model
            var oFilterModel = new JSONModel({
                docType: "Sales Order",
                docNum: "",
                soldTo: "",
                custRef: "",
                docDate: "",
                salesEmp: "",
                salesOrg: "",
                distChannel: "",
                division: ""
            });
            this.getView().setModel(oFilterModel, "filterModel");

            // 5. ProcessFlow Graph Model
            var oFlowModel = new JSONModel({
                currentSO: "",
                lanes: [],
                nodes: []
            });
            this.getView().setModel(oFlowModel, "flowModel");

            // 6. Process Flow Fallback data
            this._mFallbackRelations = {
                "2110000176": [
                    { DocNumber: "20000001", DocCategory: "B", DocTitle: "Quotation Part", Status: "Positive", StatusText: "Fully Referenced", CreatedOnDate: "2026-07-28", CreatedBy: "CB4100000012", SubsequentDocs: "node_2110000176" },
                    { DocNumber: "2110000176", DocCategory: "C", DocTitle: "Sales Order Part", Status: "Positive", StatusText: "Complete", CreatedOnDate: "2026-08-01", CreatedBy: "CB4100000012", SubsequentDocs: "node_80000045" },
                    { DocNumber: "80000045", DocCategory: "J", DocTitle: "Part Delivery", Status: "Positive", StatusText: "Shipped", CreatedOnDate: "2026-08-02", CreatedBy: "CB4100000012", SubsequentDocs: "node_49000012" },
                    { DocNumber: "49000012", DocCategory: "R", DocTitle: "Goods Issue", Status: "Positive", StatusText: "Completed", CreatedOnDate: "2026-08-02", CreatedBy: "CB4100000012", SubsequentDocs: "node_90000012" },
                    { DocNumber: "90000012", DocCategory: "M", DocTitle: "Invoice Part", Status: "Positive", StatusText: "Cleared", CreatedOnDate: "2026-08-04", CreatedBy: "CB4100000012", SubsequentDocs: "node_100000088" },
                    { DocNumber: "100000088", DocCategory: "g", DocTitle: "Journal Entry", Status: "Positive", StatusText: "Cleared", CreatedOnDate: "2026-08-04", CreatedBy: "CB4100000012", SubsequentDocs: "" }
                ]
            };
        },

        // --- EVENT HANDLERS ---

        onTilePress: function (sCategory) {
            MessageToast.show("Filter applied for category: " + sCategory);
        },

        onSearch: function () {
            var oFilterData = this.getView().getModel("filterModel").getData();
            var aFilters = [];
            
            if (oFilterData.docNum) {
                aFilters.push(new Filter("SalesDocument", FilterOperator.Contains, oFilterData.docNum));
            }
            if (oFilterData.soldTo) {
                aFilters.push(new Filter("CreatedBy", FilterOperator.Contains, oFilterData.soldTo));
            }

            var oBinding = this.byId("tblDocOverview").getBinding("rows");
            if (oBinding) {
                oBinding.filter(aFilters);
            }
            MessageToast.show("Searching documents...");
        },

        onAdaptFilter: function () {
            MessageToast.show("Adapt Filter dialog opened");
        },

        onExpandRow: function (oEvent) {
            var oContext = oEvent.getSource().getBindingContext("headerModel");
            if (!oContext) { return; }

            var sSalesDoc = oContext.getProperty("SalesDocument");
            var oView = this.getView();

            var oFlowData = this._getFlowData(sSalesDoc);
            var oFlowModel = oView.getModel("flowModel");
            oFlowModel.setData({
                currentSO: sSalesDoc,
                lanes: oFlowData.lanes,
                nodes: oFlowData.nodes
            });

            if (!this._pDialog) {
                this._pDialog = Fragment.load({
                    id: oView.getId(),
                    name: "zds.sales.flow.view.ProcessFlowDialog",
                    controller: this
                }).then(function (oDialog) {
                    oView.addDependent(oDialog);
                    return oDialog;
                });
            }
            this._pDialog.then(function (oDialog) {
                oDialog.open();
            });
        },

        onCloseDialog: function () {
            this._pDialog.then(function (oDialog) {
                oDialog.close();
            });
        },

        // --- PRIVATE HELPERS ---

        _getFlowData: function (sSalesDoc) {
            var aRelations = this._mFallbackRelations[sSalesDoc] || [
                { DocNumber: "20000001", DocCategory: "B", DocTitle: "Quotation Part", Status: "Positive", StatusText: "Referenced", CreatedOnDate: "-", CreatedBy: "-", SubsequentDocs: "node_" + sSalesDoc },
                { DocNumber: sSalesDoc, DocCategory: "C", DocTitle: "Sales Order Part", Status: "Positive", StatusText: "Complete", CreatedOnDate: "-", CreatedBy: "-", SubsequentDocs: "node_80000045" },
                { DocNumber: "80000045", DocCategory: "J", DocTitle: "Part Delivery", Status: "Positive", StatusText: "Shipped", CreatedOnDate: "-", CreatedBy: "-", SubsequentDocs: "node_49000012" },
                { DocNumber: "49000012", DocCategory: "R", DocTitle: "Goods Issue", Status: "Positive", StatusText: "Completed", CreatedOnDate: "-", CreatedBy: "-", SubsequentDocs: "node_90000012" },
                { DocNumber: "90000012", DocCategory: "M", DocTitle: "Invoice Part", Status: "Positive", StatusText: "Cleared", CreatedOnDate: "-", CreatedBy: "-", SubsequentDocs: "node_100000088" },
                { DocNumber: "100000088", DocCategory: "g", DocTitle: "Journal Entry", Status: "Positive", StatusText: "Cleared", CreatedOnDate: "-", CreatedBy: "-", SubsequentDocs: "" }
            ];

            var aLanes = [
                { laneId: "0", icon: "sap-icon://quotation", label: "Quotation", position: 0 },
                { laneId: "1", icon: "sap-icon://sales-order", label: "Sales Order", position: 1 },
                { laneId: "2", icon: "sap-icon://shipping-status", label: "Delivery", position: 2 },
                { laneId: "3", icon: "sap-icon://blank-tag", label: "Goods Issue", position: 3 },
                { laneId: "4", icon: "sap-icon://sales-document", label: "Invoice", position: 4 },
                { laneId: "5", icon: "sap-icon://lead-outdated", label: "Journal Entry", position: 5 }
            ];

            var mLane = { "B": "0", "C": "1", "J": "2", "R": "3", "M": "4" };
            var mState = { "Positive": "Positive", "Critical": "Critical", "Negative": "Negative" };

            var aNodes = aRelations.map(function (r) {
                var aChildren = r.SubsequentDocs ? r.SubsequentDocs.split(",").filter(Boolean) : [];
                return {
                    id: "node_" + r.DocNumber,
                    laneId: mLane[r.DocCategory] || "5",
                    title: r.DocTitle,
                    subtitle: r.DocNumber,
                    state: mState[r.Status] || "Neutral",
                    stateText: r.StatusText,
                    children: aChildren,
                    texts: ["Created: " + (r.CreatedOnDate || "-"), "By: " + (r.CreatedBy || "-")]
                };
            });

            return { lanes: aLanes, nodes: aNodes };
        }
    });
});
