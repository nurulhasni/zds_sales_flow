sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageToast"
], function (Controller, JSONModel, Filter, FilterOperator, MessageToast) {
    "use strict";

    return Controller.extend("zds.sales.flow.controller.Main", {

        onInit: function () {
            // 1. Filter Model
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

            // 2. KPI Summary Model
            var oKpiModel = new JSONModel({
                inquiryCount: 36,
                deliveryCount: 72,
                quotationCount: 42,
                billingCount: 78,
                salesOrderCount: 60,
                paymentCount: 50
            });
            this.getView().setModel(oKpiModel, "kpiModel");

            // 3. Chart Data Model
            var oChartModel = new JSONModel({
                issues: [
                    { name: "Not Yet Payment", value: 80 },
                    { name: "Ready to Good issue", value: 10 },
                    { name: "Open Sales Order", value: 50 },
                    { name: "Open Inquiry Document", value: 15 }
                ]
            });
            this.getView().setModel(oChartModel, "chartData");

            // 4. Header Table Model
            var oHeaderModel = new JSONModel({
                DocHeader: [
                    {
                        SalesDocument: "2110000176",
                        FulfillmentIcon: "sap-icon://forward",
                        FulfillmentState: "Warning",
                        FulfillmentText: "Processing",
                        ProcessPhase: "Accounting",
                        CreatedOn: "21.07.2026",
                        IsExpanded: false
                    },
                    {
                        SalesDocument: "2110000177",
                        FulfillmentIcon: "sap-icon://forward",
                        FulfillmentState: "Warning",
                        FulfillmentText: "Processing",
                        ProcessPhase: "Accounting",
                        CreatedOn: "23.07.2026",
                        IsExpanded: false
                    },
                    {
                        SalesDocument: "2110000178",
                        FulfillmentIcon: "sap-icon://error",
                        FulfillmentState: "Error",
                        FulfillmentText: "Issue Found",
                        ProcessPhase: "Delivery Processing",
                        CreatedOn: "25.07.2026",
                        IsExpanded: true
                    },
                    {
                        SalesDocument: "2110000179",
                        FulfillmentIcon: "sap-icon://sys-enter-2",
                        FulfillmentState: "Success",
                        FulfillmentText: "Completed",
                        ProcessPhase: "Already Payment",
                        CreatedOn: "26.07.2026",
                        IsExpanded: false
                    },
                    {
                        SalesDocument: "2110000182",
                        FulfillmentIcon: "sap-icon://error",
                        FulfillmentState: "Error",
                        FulfillmentText: "Delivery Processing",
                        ProcessPhase: "Delivery Processing (20.07.2026 With Quotation)",
                        CreatedOn: "27.07.2026",
                        IsExpanded: false
                    }
                ]
            });
            this.getView().setModel(oHeaderModel, "headerModel");
        },

        onSearch: function () {
            MessageToast.show("Filtering document flow data...");
        },

        onAdaptFilter: function () {
            MessageToast.show("Adapt Filter clicked.");
        },

        onToggleRowExpansion: function (oEvent) {
            var oBindingContext = oEvent.getSource().getBindingContext("headerModel");
            if (oBindingContext) {
                var sPath = oBindingContext.getPath();
                var oModel = this.getView().getModel("headerModel");
                var bCurrentState = oModel.getProperty(sPath + "/IsExpanded");
                oModel.setProperty(sPath + "/IsExpanded", !bCurrentState);
            }
        }
    });
});
