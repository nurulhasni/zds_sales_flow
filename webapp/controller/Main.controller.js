sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/Fragment",
    "sap/m/MessageToast"
], function (Controller, JSONModel, Filter, FilterOperator, Fragment, MessageToast) {
    "use strict";

    var sStitchHtmlContent = `
<div class="bg-sap-gray font-body-md text-on-surface flex flex-col min-h-screen">
<!-- TopNavBar -->
<header class="bg-primary text-on-primary flex justify-between items-center w-full h-12 px-space-lg shadow-sm shrink-0 z-50">
<div class="flex items-center gap-4">
<button class="hover:bg-primary-container/20 p-1 rounded transition-colors duration-150">
<span class="material-symbols-outlined text-[24px]">arrow_back_ios_new</span>
</button>
<div class="font-headline-sm font-bold flex items-center gap-2">
<span class="material-symbols-outlined text-[28px]">deployed_code</span>
                SAP
            </div>
<div class="h-6 w-px bg-on-primary/30 mx-2"></div>
<h1 class="font-headline-md text-headline-md">SD - Document Flow &amp; Status Report</h1>
</div>
</header>

<div class="flex flex-1 overflow-hidden">
<!-- Main Content Canvas -->
<main class="flex-1 overflow-y-auto p-space-lg bg-surface">
<!-- Selection Screen (Filter Bar) -->
<section class="bg-surface-container-lowest p-space-md rounded-lg shadow-sm mb-space-lg border border-outline-variant/30">
<h2 class="font-headline-sm text-headline-sm mb-space-md">Selection Screen</h2>
<div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-space-md items-end">
<div>
<label class="sap-label">SD Document Type</label>
<select class="sap-input">
<option>Sales Order</option>
<option>Quotation</option>
</select>
</div>
<div>
<label class="sap-label">SD Document Number</label>
<input class="sap-input" placeholder="" type="text">
</div>
<div>
<label class="sap-label">Sold-to Party</label>
<input class="sap-input" placeholder="" type="text">
</div>
<div>
<label class="sap-label">Customer Reference</label>
<input class="sap-input" placeholder="" type="text">
</div>
<div>
<label class="sap-label">Document Date</label>
<input class="sap-input" placeholder="" type="text">
</div>
<div>
<label class="sap-label">Sales Employee</label>
<input class="sap-input" placeholder="" type="text">
</div>
<div>
<label class="sap-label">Sales Organization</label>
<input class="sap-input" placeholder="" type="text">
</div>
<div>
<label class="sap-label">Distribution Channel</label>
<input class="sap-input" placeholder="" type="text">
</div>
<div>
<label class="sap-label">Division</label>
<input class="sap-input" placeholder="" type="text">
</div>
<div class="flex items-center gap-space-md">
<button class="sap-btn-primary w-24">Go</button>
<a class="text-sap-blue font-label-md text-label-md hover:underline" href="#">Adapt Filter</a>
</div>
</div>
</section>

<!-- Document Flow Summary & Chart -->
<div class="grid grid-cols-1 lg:grid-cols-12 gap-space-lg mb-space-lg">
<!-- Status Cards -->
<section class="lg:col-span-4 bg-surface-container-lowest p-space-md rounded-lg shadow-sm border border-outline-variant/30">
<h2 class="font-headline-sm text-headline-sm mb-space-md">Document Flow Summary</h2>
<div class="grid grid-cols-2 gap-space-sm">
<div class="sap-card flex items-center justify-between border-l-4 border-l-surface-variant">
<span class="material-symbols-outlined text-surface-variant text-[32px]">groups</span>
<div class="text-right">
<div class="font-label-sm text-surface-variant">Inquiry</div>
<div class="font-headline-md text-surface-variant">36</div>
</div>
</div>
<div class="sap-card flex items-center justify-between border-l-4 border-l-[#0092d1]">
<span class="material-symbols-outlined text-[#0092d1] text-[32px]">local_shipping</span>
<div class="text-right">
<div class="font-label-sm text-[#0092d1]">Delivery</div>
<div class="font-headline-md text-[#0092d1]">72</div>
</div>
</div>
<div class="sap-card flex items-center justify-between border-l-4 border-l-[#d10074]">
<span class="material-symbols-outlined text-[#d10074] text-[32px]">edit_document</span>
<div class="text-right">
<div class="font-label-sm text-[#d10074]">Quotation</div>
<div class="font-headline-md text-[#d10074]">42</div>
</div>
</div>
<div class="sap-card flex items-center justify-between border-l-4 border-l-[#e9730c]">
<span class="material-symbols-outlined text-[#e9730c] text-[32px]">request_quote</span>
<div class="text-right">
<div class="font-label-sm text-[#e9730c]">Billing</div>
<div class="font-headline-md text-[#e9730c]">78</div>
</div>
</div>
<div class="sap-card flex items-center justify-between border-l-4 border-l-[#107e3e]">
<span class="material-symbols-outlined text-[#107e3e] text-[32px]">desktop_windows</span>
<div class="text-right">
<div class="font-label-sm text-[#107e3e]">Sales Order</div>
<div class="font-headline-md text-[#107e3e]">60</div>
</div>
</div>
<div class="sap-card flex items-center justify-between border-l-4 border-l-[#107e3e]">
<span class="material-symbols-outlined text-[#107e3e] text-[32px]">payments</span>
<div class="text-right">
<div class="font-label-sm text-[#107e3e]">Payment</div>
<div class="font-headline-md text-[#107e3e]">50</div>
</div>
</div>
</div>
</section>

<!-- Chart Area -->
<section class="lg:col-span-8 bg-surface-container-lowest p-space-md rounded-lg shadow-sm border border-outline-variant/30 relative">
<div class="flex justify-end gap-2 mb-4">
<span class="text-sap-blue font-label-md text-label-md cursor-pointer hover:underline">Details</span>
<span class="text-sap-blue font-label-md text-label-md cursor-pointer hover:underline">View By</span>
<span class="material-symbols-outlined text-sap-blue text-[18px] cursor-pointer">list_alt</span>
<span class="material-symbols-outlined text-sap-blue text-[18px] cursor-pointer">pie_chart</span>
<span class="material-symbols-outlined text-sap-blue text-[18px] cursor-pointer">bar_chart</span>
<span class="text-outline-variant mx-1">|</span>
<span class="material-symbols-outlined text-sap-blue text-[18px] cursor-pointer">settings</span>
<span class="material-symbols-outlined text-sap-blue text-[18px] cursor-pointer">fullscreen</span>
<span class="material-symbols-outlined text-sap-blue text-[18px] cursor-pointer">download</span>
<span class="material-symbols-outlined text-sap-blue text-[18px] cursor-pointer">more_horiz</span>
</div>
<div class="h-48 w-full border border-sap-border flex items-center justify-center p-4 relative">
<!-- Simulated Bar Chart -->
<div class="absolute inset-0 flex flex-col justify-around px-24 py-4">
<div class="text-center font-headline-sm mb-2">Total Issue</div>
<div class="flex items-center gap-2 h-6"><div class="w-32 text-right font-body-sm text-on-surface-variant">Not Yet Payment</div><div class="h-3 bg-[#0064d2] w-[80%] rounded-r"></div></div>
<div class="flex items-center gap-2 h-6"><div class="w-32 text-right font-body-sm text-on-surface-variant">Ready to Good issue</div><div class="h-3 bg-[#0064d2] w-[10%] rounded-r"></div></div>
<div class="flex items-center gap-2 h-6"><div class="w-32 text-right font-body-sm text-on-surface-variant">Open Sales Order</div><div class="h-3 bg-[#0064d2] w-[50%] rounded-r"></div></div>
<div class="flex items-center gap-2 h-6"><div class="w-32 text-right font-body-sm text-on-surface-variant">Open Inquiry Document</div><div class="h-3 bg-[#0064d2] w-[15%] rounded-r"></div></div>
</div>
<!-- Axis markers -->
<div class="absolute bottom-2 left-24 right-4 flex justify-between border-t border-sap-border pt-1 font-body-sm text-on-surface-variant">
<span class="">0</span><span class="">20</span><span class="">40</span><span class="">60</span><span class="">80</span>
</div>
</div>
</section>
</div>

<!-- Process Flow & Overview -->
<section class="bg-surface-container-lowest p-space-md rounded-lg shadow-sm border border-outline-variant/30 mb-space-lg">
<div class="flex justify-between items-center mb-space-md border-b border-sap-table-border pb-2">
<h2 class="font-headline-sm text-headline-sm">Document Flow Overview</h2>
<div class="flex gap-2">
<button class="sap-btn-secondary !px-2 !py-1"><span class="material-symbols-outlined text-[18px]">filter_list</span></button>
<button class="sap-btn-secondary !px-2 !py-1 bg-primary-fixed-dim/20"><span class="material-symbols-outlined text-[18px]">view_column</span></button>
<button class="sap-btn-secondary !px-2 !py-1"><span class="material-symbols-outlined text-[18px]">settings</span></button>
<button class="sap-btn-secondary !px-2 !py-1 flex items-center"><span class="material-symbols-outlined text-[18px]">file_download</span><span class="material-symbols-outlined text-[14px]">expand_more</span></button>
</div>
</div>
<!-- Table Header -->
<div class="grid grid-cols-4 bg-sap-gray p-2 border border-sap-table-border font-label-sm uppercase tracking-wider text-on-surface-variant">
<div class="">SD Document Number (5)</div>
<div class="">Overall Fulfillment</div>
<div class="">Process Phase</div>
<div class="">Order Processing</div>
</div>
<!-- Table Rows -->
<div class="border-x border-b border-sap-table-border">
<div class="grid grid-cols-4 p-2 border-b border-sap-table-border bg-surface-bright items-center text-body-sm">
<div class="text-sap-blue cursor-pointer hover:underline">## 2110000176</div>
<div><span class="material-symbols-outlined text-status-warning text-[18px]">keyboard_double_arrow_right</span></div>
<div class="">Accounting</div>
<div class="flex items-center justify-between pr-4"><span class="material-symbols-outlined text-status-success text-[18px]">check_circle</span><span class="material-symbols-outlined text-[16px] text-outline">chevron_right</span></div>
</div>
<div class="grid grid-cols-4 p-2 border-b border-sap-table-border bg-surface items-center text-body-sm">
<div class="text-sap-blue cursor-pointer hover:underline">## 2110000177</div>
<div><span class="material-symbols-outlined text-status-warning text-[18px]">keyboard_double_arrow_right</span></div>
<div class="">Accounting</div>
<div class="flex items-center justify-between pr-4"><span class="material-symbols-outlined text-status-success text-[18px]">check_circle</span><span class="material-symbols-outlined text-[16px] text-outline">chevron_right</span></div>
</div>
<div class="grid grid-cols-4 p-2 border-b border-sap-table-border bg-surface-bright items-center text-body-sm">
<div class="text-sap-blue font-bold cursor-pointer hover:underline">## 2110000178</div>
<div><span class="material-symbols-outlined text-status-error text-[18px]">cancel</span></div>
<div class="">Delivery Processing</div>
<div class="flex items-center justify-between pr-4"><span class="material-symbols-outlined text-status-success text-[18px]">check_circle</span><span class="material-symbols-outlined text-[16px] text-outline">expand_more</span></div>
</div>
<!-- Expanded Process Flow for 2110000178 -->
<div class="col-span-4 p-space-lg bg-[#fbfbfb] border-y border-sap-table-border overflow-x-auto">
<h3 class="font-headline-sm mb-4">Process Flow</h3>
<div class="relative min-w-[900px] h-[300px] flex items-center">
<!-- Node 1: Quotation -->
<div class="sap-card process-node absolute left-0 top-[20px]">
<div class="font-label-sm text-on-surface">Quotation Part</div>
<div class="font-body-sm text-on-surface-variant mb-2">451010001</div>
<div class="flex items-center gap-1 text-status-success mb-4 font-body-sm">
<span class="material-symbols-outlined text-[16px]">check_circle</span>
<span class="">Fully Reference</span>
</div>
<div class="text-[10px] text-on-surface-variant leading-tight">
<div class="">Created on : 19.06.2026</div>
<div class="">Created by : Shodiq</div>
<div class="">Valid to : 29.06.2026</div>
</div>
</div>
<!-- Arrow 1 to 2 -->
<div class="arrow-line w-[60px] left-[160px] top-[110px]"><div class="arrow-head"></div></div>
<!-- Node 2: Sales Order -->
<div class="sap-card process-node absolute left-[220px] top-[20px]">
<div class="font-label-sm text-on-surface">Sales order part</div>
<div class="font-body-sm text-on-surface-variant mb-2">2110000179</div>
<div class="flex items-center gap-1 text-status-success mb-2 font-body-sm">
<span class="material-symbols-outlined text-[16px]">check_circle</span>
<span class="">Complete</span>
</div>
<div class="flex items-center gap-1 text-status-error mb-2 font-body-sm">
<span class="material-symbols-outlined text-[16px]">cancel</span>
</div>
<div class="text-[10px] text-on-surface-variant leading-tight">
<div class="">Created on : 19.06.2026</div>
<div class="">Created by : Shodiq</div>
<div class="">Request Deliv Date : 03.07.2026</div>
</div>
</div>
<!-- Arrow 2 to 3 -->
<div class="arrow-line w-[60px] left-[380px] top-[110px]"><div class="arrow-head"></div></div>
<!-- Node 3: Delivery -->
<div class="sap-card process-node absolute left-[440px] top-[10px] z-10 shadow-md border-sap-blue">
<div class="font-label-sm text-on-surface">Part Delivery</div>
<div class="font-body-sm text-on-surface-variant mb-2">520000245</div>
<div class="flex items-center gap-1 text-status-success mb-4 font-body-sm">
<span class="material-symbols-outlined text-[16px]">check_circle</span>
<span class="">Shipped</span>
</div>
<div class="text-[10px] text-on-surface-variant leading-tight">
<div class="">Created on : 01.07.2026</div>
<div class="">Created by : Ajeng</div>
<div class="">Picked on : 02.07.2026</div>
<div class="">Shipped on :</div>
</div>
</div>
<!-- Branching Arrows -->
<div class="arrow-line w-[40px] left-[600px] top-[110px]"></div>
<div class="absolute left-[640px] top-[110px] w-px h-[140px] bg-sap-blue"></div>
<!-- Arrow to Invoice -->
<div class="arrow-line w-[20px] left-[640px] top-[110px]"><div class="arrow-head"></div></div>
<!-- Arrow to Goods Issue -->
<div class="arrow-line w-[20px] left-[640px] top-[250px]"><div class="arrow-head"></div></div>
<!-- Node 4: Invoice -->
<div class="sap-card process-node absolute left-[660px] top-[20px]">
<div class="font-label-sm text-on-surface">Invoice Part</div>
<div class="font-body-sm text-on-surface-variant mb-2">821000288</div>
<div class="flex items-center gap-1 text-status-success mb-4 font-body-sm">
<span class="material-symbols-outlined text-[16px]">check_circle</span>
<span class="">Completed</span>
</div>
<div class="text-[10px] text-on-surface-variant leading-tight">
<div class="">Created on : 11.07.2026</div>
<div class="">Created by : Putri</div>
<div class="">Billed on : 11.07.2026</div>
</div>
</div>
<!-- Arrow 4 to 5 -->
<div class="arrow-line w-[60px] left-[820px] top-[110px]"><div class="arrow-head"></div></div>
<!-- Node 5: Journal Entry -->
<div class="sap-card process-node absolute left-[880px] top-[20px]">
<div class="font-label-sm text-on-surface">Journal Entry</div>
<div class="font-body-sm text-on-surface-variant mb-2">21000231</div>
<div class="flex items-center gap-1 text-status-success mb-4 font-body-sm">
<span class="material-symbols-outlined text-[16px]">check_circle</span>
<span class="">Cleared</span>
</div>
<div class="text-[10px] text-on-surface-variant leading-tight">
<div class="">Created on : 11.07.2026</div>
<div class="">Created by : Putri</div>
<div class="">Posted on : 11.07.2026</div>
</div>
</div>
<!-- Branch Node: Goods Issue -->
<div class="sap-card process-node absolute left-[660px] top-[160px]">
<div class="font-label-sm text-on-surface">Goods Issue</div>
<div class="font-body-sm text-on-surface-variant mb-2">4900001262</div>
<div class="flex items-center gap-1 text-status-success mb-4 font-body-sm">
<span class="material-symbols-outlined text-[16px]">check_circle</span>
<span class="">Completed</span>
</div>
<div class="text-[10px] text-on-surface-variant leading-tight">
<div class="">Created on : 01.07.2026</div>
<div class="">Created by : Ajeng</div>
<div class="">Posting Date : </div>
</div>
</div>
</div>
</div>
<div class="grid grid-cols-4 p-2 border-b border-sap-table-border bg-surface items-center text-body-sm">
<div class="text-sap-blue cursor-pointer hover:underline">## 2110000179</div>
<div><span class="material-symbols-outlined text-status-success text-[18px]">check_circle</span></div>
<div class="">Already Payment</div>
<div class="flex items-center justify-between pr-4"><span class="material-symbols-outlined text-status-success text-[18px]">check_circle</span><span class="material-symbols-outlined text-[16px] text-outline">chevron_right</span></div>
</div>
<div class="grid grid-cols-4 p-2 bg-surface items-center text-body-sm mt-4 border-t border-sap-table-border">
<div class="text-sap-blue cursor-pointer hover:underline">## 2110000182</div>
<div><span class="material-symbols-outlined text-status-error text-[18px]">cancel</span></div>
<div class="flex items-center gap-8">
<span class="">Delivery Processing</span>
<span class="text-on-surface-variant">20.07.2026</span>
<span class="text-on-surface-variant">With Quotation</span>
</div>
<div class="flex items-center justify-between pr-4"><span class="material-symbols-outlined text-status-success text-[18px]">check_circle</span><span class="material-symbols-outlined text-[16px] text-outline">chevron_right</span></div>
</div>
</div>
</section>
</main>
</div>
</div>`;

    return Controller.extend("zds.sales.flow.controller.Main", {

        onInit: function () {
            var oHtmlControl = this.byId("stitchHtmlContainer");
            if (oHtmlControl) {
                oHtmlControl.setContent(sStitchHtmlContent);
            }
        },

        onAfterRendering: function () {
            var oHtmlControl = this.byId("stitchHtmlContainer");
            if (oHtmlControl) {
                oHtmlControl.setContent(sStitchHtmlContent);
            }
        }
    });
});
