module.exports = [
"[project]/Desktop/revenue_snapshot2026/app/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/revenue_snapshot2026/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/revenue_snapshot2026/node_modules/styled-jsx/style.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/revenue_snapshot2026/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/revenue_snapshot2026/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function fmtMoney(n) {
    return new Intl.NumberFormat("ru-RU", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0
    }).format(n);
}
function pct(n) {
    const sign = n > 0 ? "+" : "";
    return `${sign}${Math.round(n)}%`;
}
function color(delta, invert = false) {
    if (invert) {
        if (delta < 0) return "text-emerald-300";
        if (delta > 0) return "text-rose-300";
    } else {
        if (delta > 0) return "text-emerald-300";
        if (delta < 0) return "text-rose-300";
    }
    return "text-white/50";
}
function normalizeDigits(value) {
    const digits = value.replace(/\D/g, "");
    if (!digits) return "";
    return digits.replace(/^0+(?=\d)/, "");
}
function parseNumeric(value, fallback = 0) {
    if (!value) return fallback;
    const n = Number(value);
    return Number.isFinite(n) ? n : fallback;
}
function getMetricFlag(type, delta) {
    if (type === "revenue") {
        if (delta >= 10) return "Сильный рост";
        if (delta >= 3) return "Рост";
        if (delta <= -10) return "Сильное падение";
        if (delta <= -3) return "Снижение";
        return "Стабильно";
    }
    if (type === "costs") {
        if (delta <= -10) return "Снижение затрат";
        if (delta <= -3) return "Экономия";
        if (delta >= 10) return "Рост затрат";
        if (delta >= 3) return "Давление затрат";
        return "Стабильно";
    }
    if (delta >= 10) return "Рост маржи";
    if (delta >= 3) return "Позитивная динамика";
    if (delta <= -10) return "Просадка маржи";
    if (delta <= -3) return "Давление на маржу";
    return "Стабильно";
}
function flagTone(type, delta) {
    if (type === "costs") {
        if (delta <= -3) return "flag-good";
        if (delta >= 3) return "flag-bad";
        return "flag-neutral";
    }
    if (delta >= 3) return "flag-good";
    if (delta <= -3) return "flag-bad";
    return "flag-neutral";
}
function TopMetricCard({ title, value, delta, type, invert = false }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "glass-card soft-glow glare-card metric-card metric-card-main",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "metric-head",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "metric-title-wrap",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "metric-label",
                                children: title
                            }, void 0, false, {
                                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                lineNumber: 101,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `metric-flag ${flagTone(type, delta)}`,
                                children: getMetricFlag(type, delta)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                lineNumber: 102,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                        lineNumber: 100,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `metric-delta-top ${color(delta, invert)}`,
                        children: pct(delta)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                        lineNumber: 107,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                lineNumber: 99,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "metric-main-value",
                children: value
            }, void 0, false, {
                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                lineNumber: 112,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
        lineNumber: 98,
        columnNumber: 5
    }, this);
}
function ModelCard({ title, value, delta, invert = false }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "glass-card soft-glow glare-card model-card",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "model-head",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "model-label",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                        lineNumber: 131,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `model-delta-top ${color(delta, invert)}`,
                        children: pct(delta)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                        lineNumber: 132,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                lineNumber: 130,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "model-main-value",
                children: value
            }, void 0, false, {
                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                lineNumber: 137,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
        lineNumber: 129,
        columnNumber: 5
    }, this);
}
function Row({ label, delta, invert = false }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex justify-between gap-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-white/60",
                children: label
            }, void 0, false, {
                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                lineNumber: 153,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: color(delta, invert),
                children: pct(delta)
            }, void 0, false, {
                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                lineNumber: 154,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
        lineNumber: 152,
        columnNumber: 5
    }, this);
}
function InsightIcon() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 20 20",
        fill: "none",
        "aria-hidden": "true",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M10 2.9a6.1 6.1 0 0 0-3.86 10.82c.68.58 1.1 1.15 1.3 1.78h5.12c.2-.63.62-1.2 1.3-1.78A6.1 6.1 0 0 0 10 2.9Z",
                stroke: "currentColor",
                strokeWidth: "1.5",
                strokeLinejoin: "round"
            }, void 0, false, {
                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                lineNumber: 162,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M8 17h4",
                stroke: "currentColor",
                strokeWidth: "1.5",
                strokeLinecap: "round"
            }, void 0, false, {
                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                lineNumber: 163,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M8.7 19h2.6",
                stroke: "currentColor",
                strokeWidth: "1.5",
                strokeLinecap: "round"
            }, void 0, false, {
                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                lineNumber: 164,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M10 6.1v1.6",
                stroke: "currentColor",
                strokeWidth: "1.5",
                strokeLinecap: "round"
            }, void 0, false, {
                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                lineNumber: 165,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
        lineNumber: 161,
        columnNumber: 5
    }, this);
}
function StrategyChip({ label, active, onClick }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "button",
        className: `strategy-chip ${active ? "is-active" : ""}`,
        onClick: onClick,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: `strategy-chip-dot ${active ? "is-active" : ""}`
            }, void 0, false, {
                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                lineNumber: 185,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "strategy-chip-label",
                children: label
            }, void 0, false, {
                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                lineNumber: 186,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
        lineNumber: 180,
        columnNumber: 5
    }, this);
}
function StrategyMetaBadges({ items, tone = "neutral" }) {
    if (!items.length) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `strategy-meta-row ${tone === "soft" ? "is-soft" : ""} is-yellow`,
        children: items.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "strategy-meta-badge",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "strategy-meta-badge-label",
                        children: item.label
                    }, void 0, false, {
                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                        lineNumber: 212,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "strategy-meta-badge-value",
                        children: item.value
                    }, void 0, false, {
                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                        lineNumber: 213,
                        columnNumber: 11
                    }, this)
                ]
            }, `${item.label}-${item.value}`, true, {
                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                lineNumber: 211,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
        lineNumber: 209,
        columnNumber: 5
    }, this);
}
function ControlLever({ title, tooltip, value, min, max, step = 1, suffix = "%", set, onStart }) {
    const [started, setStarted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const tone = value > 0 ? "text-emerald-300" : value < 0 ? "text-rose-300" : "text-white/50";
    const formatted = value > 0 ? `+${value}${suffix}` : `${value}${suffix}`;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "control-lever",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "control-lever-head",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "control-lever-title",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                        lineNumber: 257,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "control-tooltip-trigger",
                        "aria-label": `Подробнее про ${title}`,
                        "aria-expanded": open,
                        onMouseEnter: ()=>setOpen(true),
                        onMouseLeave: ()=>setOpen(false),
                        onFocus: ()=>setOpen(true),
                        onBlur: ()=>setOpen(false),
                        onClick: ()=>setOpen((v)=>!v),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(InsightIcon, {}, void 0, false, {
                                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                lineNumber: 269,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `control-tooltip ${open ? "is-open" : ""}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                children: "Основной эффект:"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                lineNumber: 271,
                                                columnNumber: 19
                                            }, this),
                                            " ",
                                            tooltip.effect
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                        lineNumber: 271,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                children: "Сложность:"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                lineNumber: 272,
                                                columnNumber: 19
                                            }, this),
                                            " ",
                                            tooltip.complexity
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                        lineNumber: 272,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                children: "Побочка:"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                lineNumber: 273,
                                                columnNumber: 19
                                            }, this),
                                            " ",
                                            tooltip.downside
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                        lineNumber: 273,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                children: "Смысл:"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                lineNumber: 274,
                                                columnNumber: 19
                                            }, this),
                                            " ",
                                            tooltip.meaning
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                        lineNumber: 274,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                lineNumber: 270,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                        lineNumber: 258,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                lineNumber: 256,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "control-scale-row",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: [
                            min,
                            suffix
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                        lineNumber: 280,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: max > 0 ? `+${max}${suffix}` : `${max}${suffix}`
                    }, void 0, false, {
                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                        lineNumber: 281,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                lineNumber: 279,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: "range",
                min: min,
                max: max,
                step: step,
                value: value,
                onMouseDown: ()=>{
                    if (!started) {
                        onStart();
                        setStarted(true);
                    }
                },
                onTouchStart: ()=>{
                    if (!started) {
                        onStart();
                        setStarted(true);
                    }
                },
                onMouseUp: ()=>setStarted(false),
                onTouchEnd: ()=>setStarted(false),
                onChange: (e)=>set(Number(e.target.value)),
                className: "range-input control-range-input"
            }, void 0, false, {
                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                lineNumber: 284,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `control-value ${tone}`,
                children: formatted
            }, void 0, false, {
                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                lineNumber: 308,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
        lineNumber: 255,
        columnNumber: 5
    }, this);
}
function HeroEconomyChart() {
    const base = {
        leads: 10,
        deals: 2.0,
        aov: 3200,
        margin: 40,
        revenue: 13000,
        opex: 3500,
        cogs: 3900,
        grossProfit: 5600
    };
    const drivers = [
        {
            key: "marketing",
            label: "Маркетинг",
            full: "Маркетинг",
            deltaLabel: "+30% лидов и рост спроса",
            leads: 13,
            deals: 2.4,
            aov: 3200,
            margin: 42,
            revenue: 14800,
            opex: 3200,
            cogs: 3600,
            grossProfit: 6200
        },
        {
            key: "aov",
            label: "AOV",
            full: "AOV",
            deltaLabel: "+рост среднего заказа",
            leads: 10,
            deals: 2.0,
            aov: 4100,
            margin: 44,
            revenue: 15200,
            opex: 3300,
            cogs: 3900,
            grossProfit: 6700
        },
        {
            key: "sales",
            label: "Продажи",
            full: "Продажи",
            deltaLabel: "+0.8 сделки",
            leads: 10,
            deals: 2.8,
            aov: 3200,
            margin: 45,
            revenue: 18200,
            opex: 4600,
            cogs: 5100,
            grossProfit: 8500
        },
        {
            key: "costs",
            label: "Модель расходов",
            full: "Модель расходов",
            deltaLabel: "−давление на OPEX и Margin",
            leads: 10,
            deals: 2.0,
            aov: 3200,
            margin: 51,
            revenue: 13000,
            opex: 2500,
            cogs: 3900,
            grossProfit: 6600
        }
    ];
    const [activeIndex, setActiveIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(3);
    const active = drivers[activeIndex];
    const bars = [
        {
            name: "Revenue",
            value: active.revenue,
            good: true
        },
        {
            name: "OPEX",
            value: active.opex,
            good: false
        },
        {
            name: "COGS",
            value: active.cogs,
            good: false
        },
        {
            name: "Gross Profit",
            value: active.grossProfit,
            good: true
        }
    ];
    const maxBar = 20000;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "hero-visual-shell",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "hero-chart-float",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "hero-chart-float-title",
                    children: "Drivers"
                }, void 0, false, {
                    fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                    lineNumber: 400,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "hero-levers-inline hero-levers-inline-float",
                    children: drivers.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>setActiveIndex(index),
                            className: `hero-tag ${index === activeIndex ? "hero-tag-active" : ""}`,
                            children: item.label
                        }, item.key, false, {
                            fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                            lineNumber: 404,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                    lineNumber: 402,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "hero-chart-box glare-card",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "hero-chart-metrics-row",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "hero-metric-square glare-card-lite",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Лидов / мес"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                            lineNumber: 418,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            children: active.leads
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                            lineNumber: 419,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                    lineNumber: 417,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "hero-metric-square glare-card-lite",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Сделок / мес"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                            lineNumber: 423,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            children: active.deals.toFixed(1)
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                            lineNumber: 424,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                    lineNumber: 422,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "hero-metric-square glare-card-lite",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "AOV"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                            lineNumber: 428,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            children: fmtMoney(active.aov)
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                            lineNumber: 429,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                    lineNumber: 427,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "hero-metric-square glare-card-lite",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Маржа"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                            lineNumber: 433,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            children: [
                                                active.margin,
                                                "%"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                            lineNumber: 434,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                    lineNumber: 432,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                            lineNumber: 416,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bar-chart-wrap glare-card-lite",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bar-chart-scale",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "$0"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                            lineNumber: 440,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "$5 000"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                            lineNumber: 441,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "$10 000"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                            lineNumber: 442,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "$15 000"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                            lineNumber: 443,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "$20 000"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                            lineNumber: 444,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                    lineNumber: 439,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bar-chart-grid"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                    lineNumber: 447,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bar-chart-columns bar-chart-columns-horizontal",
                                    children: bars.map((bar)=>{
                                        const width = Math.max(6, bar.value / maxBar * 100);
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bar-chart-row",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "bar-chart-row-top",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "bar-chart-label",
                                                            children: bar.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                            lineNumber: 456,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "bar-chart-value",
                                                            children: fmtMoney(bar.value)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                            lineNumber: 457,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                    lineNumber: 455,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "bar-chart-bar-shell-horizontal",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: `bar-chart-bar bar-chart-bar-horizontal ${bar.good ? "bar-good" : "bar-bad"} ${bar.name === "Revenue" ? "bar-revenue" : ""}`,
                                                        style: {
                                                            width: `${width}%`
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                        lineNumber: 461,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                    lineNumber: 460,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, bar.name, true, {
                                            fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                            lineNumber: 454,
                                            columnNumber: 19
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                    lineNumber: 449,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                            lineNumber: 438,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "hero-chart-bottom",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "hero-money-card hero-money-card-clean hero-money-card-muted",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "База"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                            lineNumber: 474,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            children: fmtMoney(base.revenue)
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                            lineNumber: 475,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                            children: [
                                                fmtMoney(base.grossProfit),
                                                " gross profit / мес"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                            lineNumber: 476,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                    lineNumber: 473,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "hero-money-card hero-money-card-clean hero-money-card-muted",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Активный драйвер"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                            lineNumber: 480,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            children: fmtMoney(active.revenue)
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                            lineNumber: 481,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                            children: [
                                                fmtMoney(active.grossProfit),
                                                " gross profit / мес"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                            lineNumber: 482,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                    lineNumber: 479,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                            lineNumber: 472,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "hero-active-note glare-card-lite",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "hero-active-note-dot"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                    lineNumber: 487,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: [
                                        "Сейчас подсвечен ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                            children: active.full
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                            lineNumber: 489,
                                            columnNumber: 32
                                        }, this),
                                        " — ",
                                        active.deltaLabel,
                                        "."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                    lineNumber: 488,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                            lineNumber: 486,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                    lineNumber: 415,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
            lineNumber: 399,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
        lineNumber: 398,
        columnNumber: 5
    }, this);
}
function AttentionIcon() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 20 20",
        fill: "none",
        "aria-hidden": "true",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M10 2.25 18 16.1a1.2 1.2 0 0 1-1.04 1.8H3.04A1.2 1.2 0 0 1 2 16.1l8-13.85Z",
                stroke: "currentColor",
                strokeWidth: "1.5"
            }, void 0, false, {
                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                lineNumber: 501,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M10 7v4.4",
                stroke: "currentColor",
                strokeWidth: "1.7",
                strokeLinecap: "round"
            }, void 0, false, {
                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                lineNumber: 502,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "10",
                cy: "14.25",
                r: "0.95",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                lineNumber: 503,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
        lineNumber: 500,
        columnNumber: 5
    }, this);
}
function ChipIcon({ kind }) {
    if (kind === "team") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            viewBox: "0 0 20 20",
            fill: "none",
            "aria-hidden": "true",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                    cx: "7",
                    cy: "7",
                    r: "2.2",
                    stroke: "currentColor",
                    strokeWidth: "1.5"
                }, void 0, false, {
                    fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                    lineNumber: 512,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                    cx: "13.2",
                    cy: "7.6",
                    r: "1.8",
                    stroke: "currentColor",
                    strokeWidth: "1.5"
                }, void 0, false, {
                    fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                    lineNumber: 513,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M3.8 14c.7-2.1 2.3-3.2 4.7-3.2 2.4 0 4 1.1 4.7 3.2",
                    stroke: "currentColor",
                    strokeWidth: "1.5",
                    strokeLinecap: "round"
                }, void 0, false, {
                    fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                    lineNumber: 514,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
            lineNumber: 511,
            columnNumber: 7
        }, this);
    }
    if (kind === "chat") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            viewBox: "0 0 20 20",
            fill: "none",
            "aria-hidden": "true",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M4 5.6A2.6 2.6 0 0 1 6.6 3h6.8A2.6 2.6 0 0 1 16 5.6v4.1a2.6 2.6 0 0 1-2.6 2.6H9l-3.3 2.7v-2.7H6.6A2.6 2.6 0 0 1 4 9.7V5.6Z",
                stroke: "currentColor",
                strokeWidth: "1.5",
                strokeLinejoin: "round"
            }, void 0, false, {
                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                lineNumber: 521,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
            lineNumber: 520,
            columnNumber: 7
        }, this);
    }
    if (kind === "solo") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            viewBox: "0 0 20 20",
            fill: "none",
            "aria-hidden": "true",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                    cx: "10",
                    cy: "6.5",
                    r: "2.3",
                    stroke: "currentColor",
                    strokeWidth: "1.5"
                }, void 0, false, {
                    fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                    lineNumber: 528,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M5.4 15c.75-2.25 2.28-3.37 4.6-3.37 2.33 0 3.86 1.12 4.6 3.37",
                    stroke: "currentColor",
                    strokeWidth: "1.5",
                    strokeLinecap: "round"
                }, void 0, false, {
                    fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                    lineNumber: 529,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
            lineNumber: 527,
            columnNumber: 7
        }, this);
    }
    if (kind === "online") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            viewBox: "0 0 20 20",
            fill: "none",
            "aria-hidden": "true",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                    x: "3",
                    y: "4",
                    width: "14",
                    height: "9.5",
                    rx: "2",
                    stroke: "currentColor",
                    strokeWidth: "1.5"
                }, void 0, false, {
                    fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                    lineNumber: 536,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M7.1 16h5.8",
                    stroke: "currentColor",
                    strokeWidth: "1.5",
                    strokeLinecap: "round"
                }, void 0, false, {
                    fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                    lineNumber: 537,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
            lineNumber: 535,
            columnNumber: 7
        }, this);
    }
    if (kind === "rate") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            viewBox: "0 0 20 20",
            fill: "none",
            "aria-hidden": "true",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M4 14.8h12",
                    stroke: "currentColor",
                    strokeWidth: "1.5",
                    strokeLinecap: "round"
                }, void 0, false, {
                    fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                    lineNumber: 544,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M6 12.5V9.2M10 12.5V6.3M14 12.5V7.8",
                    stroke: "currentColor",
                    strokeWidth: "1.7",
                    strokeLinecap: "round"
                }, void 0, false, {
                    fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                    lineNumber: 545,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
            lineNumber: 543,
            columnNumber: 7
        }, this);
    }
    if (kind === "swot") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            viewBox: "0 0 20 20",
            fill: "none",
            "aria-hidden": "true",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                    x: "3.5",
                    y: "3.5",
                    width: "13",
                    height: "13",
                    rx: "2.4",
                    stroke: "currentColor",
                    strokeWidth: "1.5"
                }, void 0, false, {
                    fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                    lineNumber: 552,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M10 3.8v12.4M3.8 10h12.4",
                    stroke: "currentColor",
                    strokeWidth: "1.3"
                }, void 0, false, {
                    fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                    lineNumber: 553,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
            lineNumber: 551,
            columnNumber: 7
        }, this);
    }
    if (kind === "segment") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            viewBox: "0 0 20 20",
            fill: "none",
            "aria-hidden": "true",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M10 10V3.5A6.5 6.5 0 1 1 3.5 10H10Z",
                    stroke: "currentColor",
                    strokeWidth: "1.5",
                    strokeLinejoin: "round"
                }, void 0, false, {
                    fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                    lineNumber: 560,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M11.2 3.7a6.35 6.35 0 0 1 5.1 5.1h-5.1V3.7Z",
                    stroke: "currentColor",
                    strokeWidth: "1.5",
                    strokeLinejoin: "round"
                }, void 0, false, {
                    fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                    lineNumber: 561,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
            lineNumber: 559,
            columnNumber: 7
        }, this);
    }
    if (kind === "practice") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            viewBox: "0 0 20 20",
            fill: "none",
            "aria-hidden": "true",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M5 10.4 8.1 13.5 15 6.5",
                stroke: "currentColor",
                strokeWidth: "1.7",
                strokeLinecap: "round",
                strokeLinejoin: "round"
            }, void 0, false, {
                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                lineNumber: 568,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
            lineNumber: 567,
            columnNumber: 7
        }, this);
    }
    if (kind === "jtbd") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            viewBox: "0 0 20 20",
            fill: "none",
            "aria-hidden": "true",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M4 5.5h12M4 10h8M4 14.5h10",
                stroke: "currentColor",
                strokeWidth: "1.5",
                strokeLinecap: "round"
            }, void 0, false, {
                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                lineNumber: 575,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
            lineNumber: 574,
            columnNumber: 7
        }, this);
    }
    if (kind === "brief") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            viewBox: "0 0 20 20",
            fill: "none",
            "aria-hidden": "true",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M6 4.5h8a1.5 1.5 0 0 1 1.5 1.5v9a1.5 1.5 0 0 1-1.5 1.5H6A1.5 1.5 0 0 1 4.5 15V6A1.5 1.5 0 0 1 6 4.5Z",
                    stroke: "currentColor",
                    strokeWidth: "1.5"
                }, void 0, false, {
                    fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                    lineNumber: 582,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M7 8h6M7 11h6",
                    stroke: "currentColor",
                    strokeWidth: "1.5",
                    strokeLinecap: "round"
                }, void 0, false, {
                    fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                    lineNumber: 583,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
            lineNumber: 581,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 20 20",
        fill: "none",
        "aria-hidden": "true",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M4 10.2 8 14l8-8",
            stroke: "currentColor",
            strokeWidth: "1.7",
            strokeLinecap: "round",
            strokeLinejoin: "round"
        }, void 0, false, {
            fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
            lineNumber: 589,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
        lineNumber: 588,
        columnNumber: 5
    }, this);
}
function TagList({ items, variant = "soft", icon = "custom" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `tariff-tag-list tariff-tag-list-${variant}`,
        children: items.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `tariff-tag tariff-tag-${variant}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "tariff-tag-icon",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ChipIcon, {
                            kind: icon
                        }, void 0, false, {
                            fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                            lineNumber: 608,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                        lineNumber: 607,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: item
                    }, void 0, false, {
                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                        lineNumber: 610,
                        columnNumber: 11
                    }, this)
                ]
            }, item, true, {
                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                lineNumber: 606,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
        lineNumber: 604,
        columnNumber: 5
    }, this);
}
function TariffParagraphContent({ section }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "tariff-paragraph-content",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "tariff-paragraph-title",
                children: section.label
            }, void 0, false, {
                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                lineNumber: 630,
                columnNumber: 7
            }, this),
            section.items?.length ? section.render === "tags" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TagList, {
                items: section.items,
                variant: "soft",
                icon: section.iconKind ?? "custom"
            }, void 0, false, {
                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                lineNumber: 634,
                columnNumber: 11
            }, this) : section.render === "icon-tags" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TagList, {
                items: section.items,
                variant: "icon-solid",
                icon: section.iconKind ?? "custom"
            }, void 0, false, {
                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                lineNumber: 640,
                columnNumber: 11
            }, this) : section.render === "yellow-tags" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TagList, {
                items: section.items,
                variant: "yellow",
                icon: section.iconKind ?? "custom"
            }, void 0, false, {
                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                lineNumber: 646,
                columnNumber: 11
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "tariff-check-list",
                children: section.items.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "tariff-check-item",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "tariff-check-mark",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ChipIcon, {
                                    kind: section.iconKind ?? "custom"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                    lineNumber: 656,
                                    columnNumber: 19
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                lineNumber: 655,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: item
                            }, void 0, false, {
                                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                lineNumber: 658,
                                columnNumber: 17
                            }, this)
                        ]
                    }, item, true, {
                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                        lineNumber: 654,
                        columnNumber: 15
                    }, this))
            }, void 0, false, {
                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                lineNumber: 652,
                columnNumber: 11
            }, this) : null,
            section.notes?.length ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "tariff-note-list",
                children: section.notes.map((note)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "tariff-note-item",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "tariff-note-bullet",
                                children: "•"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                lineNumber: 669,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: note
                            }, void 0, false, {
                                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                lineNumber: 670,
                                columnNumber: 15
                            }, this)
                        ]
                    }, note, true, {
                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                        lineNumber: 668,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                lineNumber: 666,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
        lineNumber: 629,
        columnNumber: 5
    }, this);
}
function TariffCompareBlock({ section }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "tariff-compare-section",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "tariff-compare-section-head",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    className: "tariff-compare-section-title",
                    children: section.label
                }, void 0, false, {
                    fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                    lineNumber: 694,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                lineNumber: 693,
                columnNumber: 7
            }, this),
            section.items?.length ? section.render === "tags" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TagList, {
                items: section.items,
                variant: "soft",
                icon: section.iconKind ?? "custom"
            }, void 0, false, {
                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                lineNumber: 699,
                columnNumber: 11
            }, this) : section.render === "icon-tags" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TagList, {
                items: section.items,
                variant: "icon-solid",
                icon: section.iconKind ?? "custom"
            }, void 0, false, {
                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                lineNumber: 705,
                columnNumber: 11
            }, this) : section.render === "yellow-tags" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TagList, {
                items: section.items,
                variant: "yellow",
                icon: section.iconKind ?? "custom"
            }, void 0, false, {
                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                lineNumber: 711,
                columnNumber: 11
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "tariff-check-list",
                children: section.items.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "tariff-check-item",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "tariff-check-mark",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ChipIcon, {
                                    kind: section.iconKind ?? "custom"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                    lineNumber: 721,
                                    columnNumber: 19
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                lineNumber: 720,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: item
                            }, void 0, false, {
                                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                lineNumber: 723,
                                columnNumber: 17
                            }, this)
                        ]
                    }, item, true, {
                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                        lineNumber: 719,
                        columnNumber: 15
                    }, this))
            }, void 0, false, {
                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                lineNumber: 717,
                columnNumber: 11
            }, this) : null,
            section.notes?.length ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "tariff-note-list",
                children: section.notes.map((note)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "tariff-note-item",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "tariff-note-bullet",
                                children: "•"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                lineNumber: 734,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: note
                            }, void 0, false, {
                                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                lineNumber: 735,
                                columnNumber: 15
                            }, this)
                        ]
                    }, note, true, {
                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                        lineNumber: 733,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                lineNumber: 731,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
        lineNumber: 692,
        columnNumber: 5
    }, this);
}
function TariffCompareCard({ title, sections, disclaimer }) {
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
        className: "tariff-compare-card",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "tariff-compare-card-head",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "tariff-column-title",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                        lineNumber: 764,
                        columnNumber: 9
                    }, this),
                    disclaimer?.length ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "tariff-attention",
                        "aria-label": "Show disclaimer",
                        "aria-expanded": open,
                        onMouseEnter: ()=>setOpen(true),
                        onMouseLeave: ()=>setOpen(false),
                        onFocus: ()=>setOpen(true),
                        onBlur: ()=>setOpen(false),
                        onClick: ()=>setOpen((v)=>!v),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AttentionIcon, {}, void 0, false, {
                                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                lineNumber: 778,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "tariff-attention-label",
                                children: "disclaimer"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                lineNumber: 779,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `tariff-disclaimer-pop ${open ? "is-open" : ""}`,
                                children: disclaimer.map((note)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "tariff-disclaimer-line",
                                        children: note
                                    }, note, false, {
                                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                        lineNumber: 782,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                lineNumber: 780,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                        lineNumber: 767,
                        columnNumber: 11
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                lineNumber: 763,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "tariff-compare-card-body",
                children: sections.map((section)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TariffCompareBlock, {
                        section: section
                    }, section.label, false, {
                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                        lineNumber: 793,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                lineNumber: 791,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
        lineNumber: 762,
        columnNumber: 5
    }, this);
}
const TARIFF_COMPARE_CONFIG = {
    playground: {
        title: "ONLINE PLAYGROUND",
        disclaimer: [
            "Инструмент не заменяет глубокую операционную работу.",
            "Рекомендации требуют адаптации под конкретный бизнес."
        ],
        sections: [
            {
                label: "Input Data",
                render: "tags",
                iconKind: "custom",
                items: [
                    "Сбор данных",
                    "Позиционирование",
                    "Экономика бизнеса",
                    "Клиенты и поток",
                    "Продукт и продажи",
                    "Структура и процессы",
                    "Аналитика и управление",
                    "Стратегия"
                ]
            },
            {
                label: "Format",
                render: "icon-tags",
                iconKind: "solo",
                items: [
                    "Самостоятельное прохождение",
                    "Онлайн-интерфейс"
                ]
            },
            {
                label: "Economic model",
                iconKind: "rate",
                items: [
                    "Сборка модели на основе введенных данных",
                    "Оценка текущей эффективности",
                    "Выявление возможных точек потерь"
                ]
            },
            {
                label: "Leverages",
                iconKind: "rate",
                items: [
                    "Определение потенциальных драйверов роста",
                    "Приоритизация по предполагаемому влиянию",
                    "Связка с текущей бизнес-моделью"
                ]
            },
            {
                label: "Final Results",
                render: "yellow-tags",
                iconKind: "jtbd",
                items: [
                    "Economic Rate (оценка модели на основе вводных)",
                    "Главный фактор, сдерживающий рост (гипотеза)",
                    "Приоритетные рычаги роста",
                    "JTBD под каждый рычаг"
                ]
            },
            {
                label: "Decompose",
                iconKind: "chat",
                items: [
                    "Онлайн-встреча 60 минут",
                    "Обсуждение результатов и допущений",
                    "Пояснение логики выводов",
                    "Ответы на вопросы"
                ]
            }
        ]
    },
    onrec: {
        title: "ON REC",
        disclaimer: [
            "Результат формируется на основе совместной работы и предоставленной информации.",
            "Выводы учитывают контекст, но не заменяют полную трансформацию бизнеса.",
            "Рекомендации требуют внедрения и управленческих решений."
        ],
        sections: [
            {
                label: "Input Data",
                render: "tags",
                iconKind: "custom",
                items: [
                    "Персональный сбор данных",
                    "Позиционирование",
                    "Экономика бизнеса",
                    "Клиенты и поток",
                    "Продукт и продажи",
                    "Структура и процессы",
                    "Аналитика и управление",
                    "Стратегия"
                ]
            },
            {
                label: "Format",
                render: "icon-tags",
                iconKind: "team",
                items: [
                    "Работа с участием команды",
                    "Онлайн-коммуникация",
                    "Индивидуальная проработка"
                ],
                notes: [
                    "Связь во время подготовки результата.",
                    "Дополнительные уточнения в процессе."
                ]
            },
            {
                label: "Economic model",
                iconKind: "rate",
                items: [
                    "Сборка модели на основе интервью и уточнений",
                    "Углубленная оценка эффективности",
                    "Выявление точек потерь с учетом контекста"
                ]
            },
            {
                label: "Leverages",
                iconKind: "rate",
                items: [
                    "Определение ключевых драйверов роста",
                    "Приоритизация с учетом реальной операционной ситуации",
                    "Связка с текущими ограничениями бизнеса"
                ]
            },
            {
                label: "Final Results",
                render: "yellow-tags",
                iconKind: "swot",
                items: [
                    "Economic Rate",
                    "Главный фактор, сдерживающий рост",
                    "Приоритетные рычаги роста",
                    "JTBD под каждый рычаг",
                    "SWOT-анализ",
                    "Сегментация и позиционирование",
                    "Практики для внедрения"
                ]
            },
            {
                label: "Decompose",
                iconKind: "brief",
                items: [
                    "Личный брифинг с командой",
                    "Дополнительные уточнения в процессе",
                    "Связь во время подготовки результата"
                ],
                notes: [
                    "Результат готовится самостоятельно командой на основе более глубокого контекста."
                ]
            }
        ]
    }
};
function TariffDetailsComparison() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "tariff-comparison-grid tariff-comparison-grid-parallel",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TariffCompareCard, {
                title: TARIFF_COMPARE_CONFIG.playground.title,
                sections: TARIFF_COMPARE_CONFIG.playground.sections,
                disclaimer: TARIFF_COMPARE_CONFIG.playground.disclaimer
            }, void 0, false, {
                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                lineNumber: 974,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TariffCompareCard, {
                title: TARIFF_COMPARE_CONFIG.onrec.title,
                sections: TARIFF_COMPARE_CONFIG.onrec.sections,
                disclaimer: TARIFF_COMPARE_CONFIG.onrec.disclaimer
            }, void 0, false, {
                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                lineNumber: 979,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
        lineNumber: 973,
        columnNumber: 5
    }, this);
}
function ResultDocCard({ tab, title, text }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "result-doc-card tilt-card",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "result-doc-card-inner tilt-inner glare-card",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "result-doc-top",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "result-doc-tab",
                        children: tab
                    }, void 0, false, {
                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                        lineNumber: 1001,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                    lineNumber: 1000,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "result-doc-title",
                    children: title
                }, void 0, false, {
                    fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                    lineNumber: 1003,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "result-doc-text",
                    children: text
                }, void 0, false, {
                    fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                    lineNumber: 1004,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
            lineNumber: 999,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
        lineNumber: 998,
        columnNumber: 5
    }, this);
}
function StartCard({ title, icon, mobileIcon, price, href, priceDesktop, priceMobile, buttonDesktop, buttonMobile, onPay }) {
    const ctaLabel = title === "On Rec" ? "Оплатить" : "Оплатить";
    const styleVars = {
        ["--price-top"]: priceDesktop.top ?? "auto",
        ["--price-right"]: priceDesktop.right ?? "auto",
        ["--price-bottom"]: priceDesktop.bottom ?? "auto",
        ["--price-left"]: priceDesktop.left ?? "auto",
        ["--button-top"]: buttonDesktop.top ?? "auto",
        ["--button-right"]: buttonDesktop.right ?? "auto",
        ["--button-bottom"]: buttonDesktop.bottom ?? "auto",
        ["--button-left"]: buttonDesktop.left ?? "auto",
        ["--button-width"]: buttonDesktop.width ?? "auto",
        ["--price-top-mobile"]: priceMobile?.top ?? priceDesktop.top ?? "auto",
        ["--price-right-mobile"]: priceMobile?.right ?? priceDesktop.right ?? "auto",
        ["--price-bottom-mobile"]: priceMobile?.bottom ?? priceDesktop.bottom ?? "auto",
        ["--price-left-mobile"]: priceMobile?.left ?? priceDesktop.left ?? "auto",
        ["--button-top-mobile"]: buttonMobile?.top ?? buttonDesktop.top ?? "auto",
        ["--button-right-mobile"]: buttonMobile?.right ?? buttonDesktop.right ?? "auto",
        ["--button-bottom-mobile"]: buttonMobile?.bottom ?? buttonDesktop.bottom ?? "auto",
        ["--button-left-mobile"]: buttonMobile?.left ?? buttonDesktop.left ?? "auto",
        ["--button-width-mobile"]: buttonMobile?.width ?? buttonDesktop.width ?? "auto"
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "start-card tilt-card",
        style: styleVars,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "start-card-inner start-card-inner-plain tilt-inner premium-glass",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("picture", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("source", {
                            media: "(max-width: 767px)",
                            srcSet: mobileIcon ?? icon
                        }, void 0, false, {
                            fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                            lineNumber: 1071,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: icon,
                            alt: title,
                            className: "start-card-frame"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                            lineNumber: 1072,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                    lineNumber: 1070,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "start-card-overlay start-card-overlay-plain",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "start-card-bottom-simple",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "start-card-price-float",
                                children: price
                            }, void 0, false, {
                                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                lineNumber: 1076,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: href,
                                className: "start-card-btn start-card-btn-floating",
                                onClick: (e)=>{
                                    if (!onPay) return;
                                    e.preventDefault();
                                    onPay(href);
                                },
                                children: ctaLabel
                            }, void 0, false, {
                                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                lineNumber: 1077,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                        lineNumber: 1075,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                    lineNumber: 1074,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
            lineNumber: 1069,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
        lineNumber: 1068,
        columnNumber: 5
    }, this);
}
function StageCarousel() {
    const items = [
        {
            niche: "SaaS",
            stage: "Early Stage",
            lever: "Сборка первой устойчивой модели",
            roadmap: "Сначала фиксируется факт экономики, затем приоритет и короткий RoadMap по усилению.",
            zones: [
                "Leads",
                "Qual Leads"
            ],
            result: [
                "Cycle",
                "Payback"
            ]
        },
        {
            niche: "HealthTech",
            stage: "Growth",
            lever: "Ускорение сделки без давления на маржу",
            roadmap: "Snapshot собирает логику роста, выделяет ограничение и дает последовательность решений.",
            zones: [
                "Sales",
                "Retention"
            ],
            result: [
                "CAC",
                "Margin"
            ]
        },
        {
            niche: "B2B",
            stage: "Startup",
            lever: "Сокращение ручного управления ростом",
            roadmap: "Результат показывает, где теряется скорость роста и какой сценарий дает наибольший эффект.",
            zones: [
                "Pipeline",
                "Offer"
            ],
            result: [
                "Cycle",
                "Profit"
            ]
        },
        {
            niche: "FinTech",
            stage: "Growth",
            lever: "Пересборка экономики привлечения",
            roadmap: "Фокус смещается на каналы, payback и точку, которая реально тормозит масштабирование.",
            zones: [
                "CAC",
                "Quality"
            ],
            result: [
                "Payback",
                "Scale"
            ]
        },
        {
            niche: "EdTech",
            stage: "Expansion",
            lever: "Рост без потери качества экономики",
            roadmap: "Система показывает, как сохранить маржу и где нужна смена приоритета роста.",
            zones: [
                "Offer",
                "Retention"
            ],
            result: [
                "Margin",
                "Load"
            ]
        },
        {
            niche: "E-com",
            stage: "Expansion",
            lever: "Усиление прибыльности через модель",
            roadmap: "Snapshot отделяет видимый рост от полезного роста и расставляет экономические приоритеты.",
            zones: [
                "AOV",
                "Costs"
            ],
            result: [
                "Profit",
                "Structure"
            ]
        }
    ];
    const [isMobile, setIsMobile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const syncViewport = ()=>{
            setIsMobile(window.innerWidth <= 1180);
        };
        syncViewport();
        window.addEventListener("resize", syncViewport);
        return ()=>window.removeEventListener("resize", syncViewport);
    }, []);
    const visibleCount = isMobile ? 1 : 3;
    const headClones = items.slice(-visibleCount);
    const tailClones = items.slice(0, visibleCount);
    const trackItems = [
        ...headClones,
        ...items,
        ...tailClones
    ];
    const [currentIndex, setCurrentIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(visibleCount);
    const [isAnimating, setIsAnimating] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [direction, setDirection] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("next");
    const [isSnapReset, setIsSnapReset] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setCurrentIndex(visibleCount);
        setIsAnimating(false);
        setIsSnapReset(true);
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
    }, [
        visibleCount
    ]);
    const goToNext = ()=>{
        if (isAnimating) return;
        setDirection("next");
        setIsAnimating(true);
        setCurrentIndex((prev)=>prev + 1);
    };
    const goToPrev = ()=>{
        if (isAnimating) return;
        setDirection("prev");
        setIsAnimating(true);
        setCurrentIndex((prev)=>prev - 1);
    };
    const handleTransitionEnd = ()=>{
        setIsAnimating(false);
        if (currentIndex >= items.length + visibleCount) {
            setIsSnapReset(true);
            setCurrentIndex(visibleCount);
            window.requestAnimationFrame(()=>{
                window.requestAnimationFrame(()=>setIsSnapReset(false));
            });
            return;
        }
        if (currentIndex < visibleCount) {
            setIsSnapReset(true);
            setCurrentIndex(items.length + currentIndex);
            window.requestAnimationFrame(()=>{
                window.requestAnimationFrame(()=>setIsSnapReset(false));
            });
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "stage-scheme-wrap",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "stage-scheme-nav",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "stage-scheme-arrow",
                        onClick: goToPrev,
                        "aria-label": "Предыдущая карточка",
                        children: "←"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                        lineNumber: 1229,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "stage-scheme-arrow",
                        onClick: goToNext,
                        "aria-label": "Следующая карточка",
                        children: "→"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                        lineNumber: 1237,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                lineNumber: 1228,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "stage-scheme-viewport",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `stage-scheme-track ${isAnimating ? `is-animating direction-${direction}` : ""} ${isSnapReset ? "is-snap-reset" : ""}`,
                    style: {
                        transform: `translate3d(-${currentIndex * 100 / visibleCount}%, 0, 0)`
                    },
                    onTransitionEnd: handleTransitionEnd,
                    children: trackItems.map((item, idx)=>{
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "stage-scheme-slide",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                className: "stage-scheme-card",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "stage-scheme-kicker",
                                        children: "Ниша"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                        lineNumber: 1260,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "stage-scheme-title",
                                        children: item.niche
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                        lineNumber: 1261,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "stage-scheme-stage",
                                        children: item.stage
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                        lineNumber: 1262,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "stage-scheme-lever-label",
                                        children: "Выявленный рычаг"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                        lineNumber: 1264,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "stage-scheme-lever",
                                        children: item.lever
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                        lineNumber: 1265,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "stage-scheme-roadmap",
                                        children: item.roadmap
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                        lineNumber: 1266,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "stage-scheme-bottom",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "stage-scheme-group",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "stage-scheme-label",
                                                        children: "зоны влияния"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                        lineNumber: 1270,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "stage-scheme-tags",
                                                        children: item.zones.map((tag)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "stage-scheme-tag",
                                                                children: tag
                                                            }, tag, false, {
                                                                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                                lineNumber: 1273,
                                                                columnNumber: 27
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                        lineNumber: 1271,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                lineNumber: 1269,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "stage-scheme-group",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "stage-scheme-label",
                                                        children: "результат"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                        lineNumber: 1281,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "stage-scheme-tags",
                                                        children: item.result.map((tag)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "stage-scheme-tag stage-scheme-tag-result",
                                                                children: tag
                                                            }, tag, false, {
                                                                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                                lineNumber: 1284,
                                                                columnNumber: 27
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                        lineNumber: 1282,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                lineNumber: 1280,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                        lineNumber: 1268,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                lineNumber: 1259,
                                columnNumber: 17
                            }, this)
                        }, `${item.niche}-${idx}`, false, {
                            fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                            lineNumber: 1255,
                            columnNumber: 15
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                    lineNumber: 1248,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                lineNumber: 1247,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
        lineNumber: 1227,
        columnNumber: 5
    }, this);
}
function Home() {
    const [clientsInput, setClientsInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("20");
    const [checkInput, setCheckInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("2000");
    const [marginInput, setMarginInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("30");
    const clientsBase = parseNumeric(clientsInput, 0);
    const checkBase = parseNumeric(checkInput, 0);
    const marginBase = Math.min(95, Math.max(1, parseNumeric(marginInput, 0)));
    const [marketing, setMarketing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [avgCheckShift, setAvgCheckShift] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [efficiency, setEfficiency] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [ltv, setLtv] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [selectedStrategy, setSelectedStrategy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [history, setHistory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [mobileMenuOpen, setMobileMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [faqOpen, setFaqOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selectedOffer, setSelectedOffer] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("playground");
    const [previewMobilePopupOpen, setPreviewMobilePopupOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [previewMobileFloatingVisible, setPreviewMobileFloatingVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const previewSectionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const journeySectionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [journeyActiveIndex, setJourneyActiveIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const journeySteps = [
        {
            number: "01",
            title: "Выбор формата",
            text: "Online Playground — самостоятельный формат. On Rec — формат с участием команды.",
            linkLabel: "Начать",
            linkHref: "#tariffs"
        },
        {
            number: "02",
            title: "Сбор данных",
            text: "Фиксируем экономику, клиентов, продукт, процессы и стратегию бизнеса."
        },
        {
            number: "03",
            title: "Генерация результата",
            text: "Система собирает Revenue Snapshot и формирует единую аналитическую модель."
        },
        {
            number: "04",
            title: "Изучение текущих возможностей",
            text: "Показываем точки потерь, ограничение роста и главный рычаг усиления."
        },
        {
            number: "05",
            title: "60-минутная декомпозиция",
            text: "Результат можно разобрать с C-level специалистами по маркетингу и продажам."
        },
        {
            number: "06",
            title: "Личный кабинет и бонусы",
            text: "3 запуска, разные бизнесы, интерактивные результаты, PDF и спецусловия на новые инструменты."
        }
    ];
    const payUrl = "https://www.paypal.com/ncp/payment/J573NHRDCJQZC";
    const onRecUrl = "https://www.paypal.com/ncp/payment/GQLFG3CYUHM82";
    const loginUrl = "https://revenue-snapshot2026.vercel.app/cabinet-login";
    const tgContactUrl = "https://t.me/growth_avenue_company";
    const waContactUrl = "https://wa.me/995555163833";
    const paymentRecoveryUrl = `https://wa.me/995555163833?text=${encodeURIComponent("Я случайно закрыла PayPal после оплаты. Проверьте, пожалуйста, мою запись и, если найдёте оплату, отправьте повторно ссылку на завершение регистрации.")}`;
    const [paymentState, setPaymentState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("idle");
    const selectedOfferConfig = TARIFF_COMPARE_CONFIG[selectedOffer];
    const selectedOfferCard = selectedOffer === "playground" ? {
        title: "Online-playground",
        icon: "/online_playground_desc.svg",
        mobileIcon: "/online-playground_mobile.svg",
        price: "$114",
        href: payUrl
    } : {
        title: "On Rec",
        icon: "/onrec_desc.svg",
        mobileIcon: "/on-rec_mobile.svg",
        price: "$770",
        href: onRecUrl
    };
    const faqItems = [
        {
            q: "Что такое Revenue Snapshot?",
            a: `Revenue Snapshot — это результат стратегической диагностики экономики бизнеса.

Он показывает:
• где теряется выручка
• какое ограничение сдерживает рост
• какой рычаг даст наибольший экономический эффект
• какие направления изменений приоритетны сейчас`
        },
        {
            q: "Что я получу в итоге?",
            a: `Вы получаете структурированный аналитический результат, который включает:
• экономическую картину бизнеса
• точки потерь и ограничения роста
• приоритетные рычаги роста
• направления действий и логику изменений`
        },
        {
            q: "Чем Online Playground отличается от On Rec?",
            a: `Разница не в результате, а в формате прохождения.

Online Playground:
• вы проходите диагностику самостоятельно
• система собирает результат на основе ваших ответов
• подходит для быстрого самостоятельного прохождения

On Rec:
• диагностика проходит с участием команды
• данные собираются и уточняются вместе с нами
• в процессе возможны дополнительные вопросы
• результат дополняется более глубокой проработкой контекста`
        },
        {
            q: "Что происходит после оплаты?",
            a: `После оплаты вы переходите к следующему этапу:
• завершаете регистрацию
• получаете доступ к личному кабинету
• выбираете момент для прохождения
• затем получаете Revenue Snapshot в выбранном формате`
        },
        {
            q: "На основании чего строится результат?",
            a: `Результат формируется на основе сочетания:
• экономических моделей и формул
• структурированной логики интерпретации бизнес-данных
• AI-модуля, который выявляет зависимости, ограничения и точки роста

AI не придумывает выводы произвольно — он работает в рамках заданной логики анализа.`
        },
        {
            q: "Насколько точным будет результат?",
            a: `Точность результата зависит от качества и полноты исходных данных.

Чем точнее вводные, тем точнее выводы, приоритизация и рекомендации.`
        },
        {
            q: "Какие данные нужны для прохождения?",
            a: `Минимально потребуется:
• выручка за последний период
• количество клиентов или продаж
• средний чек
• общее понимание структуры расходов
• понимание каналов привлечения клиентов

Дополнительные данные повышают точность результата, но не являются обязательными на старте.`
        },
        {
            q: "Нужно ли готовиться заранее?",
            a: `Нет, специальная подготовка не требуется.

Вы можете пройти диагностику постепенно и вернуться к заполнению позже, если часть данных нужно уточнить.`
        },
        {
            q: "Что будет, если я укажу данные примерно?",
            a: `Результат сохранит аналитическую логику, но станет менее точным в деталях.

Вы всё равно увидите ключевые зависимости и направления усиления модели.`
        },
        {
            q: "Это предварительная оценка или полноценная замена консультации?",
            a: `Revenue Snapshot закрывает задачу диагностики и определения ключевых решений без классического консультационного процесса.

То есть в части диагностики это полноценный продукт, а не просто предварительная оценка.`
        },
        {
            q: "Это про выручку или про прибыль?",
            a: `Анализ строится через выручку, затраты, ограничения и операционную модель бизнеса.

Но конечная цель Revenue Snapshot — не просто рост оборота, а усиление прибыльности бизнеса.`
        },
        {
            q: "Что такое основной рычаг роста?",
            a: `Это фактор, изменение которого даст наибольший экономический эффект при текущей модели бизнеса.

Он определяется через анализ ограничений, влияния параметров на экономику и потенциала изменения.`
        },
        {
            q: "Сколько раз можно воспользоваться Revenue Snapshot?",
            a: `В рамках текущего доступа доступно 3 полноценных результата.

Все результаты сохраняются в личном кабинете и остаются доступными для повторного просмотра.`
        },
        {
            q: "Сохраняются ли мои данные?",
            a: `Да, данные сохраняются исключительно для формирования и предоставления результата.

Они не используются публично или в кейсах без вашего предварительного согласия.`
        }
    ];
    const STRATEGY_CONFIG = {
        aggressive: {
            label: "агрессивный и рискованный рост",
            preset: {
                marketing: 16,
                avgCheckShift: -8,
                efficiency: 6,
                ltv: 4
            },
            formationParams: [
                {
                    label: "Сложность",
                    value: "средне-высокая"
                },
                {
                    label: "Время до KPI",
                    value: "быстро"
                }
            ],
            leverParams: [
                {
                    label: "Risk Exposure",
                    value: "высокий"
                },
                {
                    label: "Scaling",
                    value: "высокий"
                },
                {
                    label: "Стоимость",
                    value: "средне-высокая"
                }
            ],
            behavior: [
                "Резкий рост выручки.",
                "Нестабильная или падающая маржа.",
                "Высокая нагрузка на систему и бюджет."
            ]
        },
        planned: {
            label: "планомерный рост с отложенным эффектом",
            preset: {
                marketing: 5,
                avgCheckShift: 12,
                efficiency: 14,
                ltv: 15
            },
            formationParams: [
                {
                    label: "Сложность",
                    value: "высокая"
                },
                {
                    label: "Время до KPI",
                    value: "среднее"
                }
            ],
            leverParams: [
                {
                    label: "Risk Exposure",
                    value: "средний"
                },
                {
                    label: "Scaling",
                    value: "высокий"
                },
                {
                    label: "Стоимость",
                    value: "средняя"
                }
            ],
            behavior: [
                "Клиенты растут умеренно.",
                "Выручка растет без резкого давления на модель.",
                "Маржинальность стабильно увеличивается, а модель становится устойчивее."
            ]
        },
        cheap: {
            label: "дешевый медленный рост",
            preset: {
                marketing: 0,
                avgCheckShift: -12,
                efficiency: 7,
                ltv: 20
            },
            formationParams: [
                {
                    label: "Сложность",
                    value: "низкая"
                },
                {
                    label: "Время до KPI",
                    value: "долго"
                }
            ],
            leverParams: [
                {
                    label: "Risk Exposure",
                    value: "низкий"
                },
                {
                    label: "Scaling",
                    value: "средний"
                },
                {
                    label: "Стоимость",
                    value: "низкая"
                }
            ],
            behavior: [
                "Медленный рост выручки.",
                "Стабильный рост прибыли.",
                "Низкая нагрузка на бюджет и более бережная траектория модели."
            ]
        }
    };
    const strategyOptions = [
        {
            key: "aggressive",
            label: STRATEGY_CONFIG.aggressive.label
        },
        {
            key: "planned",
            label: STRATEGY_CONFIG.planned.label
        },
        {
            key: "cheap",
            label: STRATEGY_CONFIG.cheap.label
        }
    ];
    const handlePay = (paypalUrl)=>{
        window.open(paypalUrl, "_blank", "noopener,noreferrer");
        setPaymentState("waiting");
    };
    const closePaymentOverlay = ()=>{
        setPaymentState("idle");
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const onResize = ()=>{
            if (window.innerWidth > 860) setMobileMenuOpen(false);
        };
        window.addEventListener("resize", onResize);
        return ()=>window.removeEventListener("resize", onResize);
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!faqOpen) return;
        const onKeyDown = (e)=>{
            if (e.key === "Escape") setFaqOpen(false);
        };
        window.addEventListener("keydown", onKeyDown);
        return ()=>window.removeEventListener("keydown", onKeyDown);
    }, [
        faqOpen
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handlePreviewMobileButton = ()=>{
            const section = previewSectionRef.current;
            if (!section) return;
            if (window.innerWidth > 767) {
                setPreviewMobileFloatingVisible(false);
                setPreviewMobilePopupOpen(false);
                return;
            }
            const rect = section.getBoundingClientRect();
            const isVisible = rect.top <= window.innerHeight * 0.3 && rect.bottom >= window.innerHeight * 0.38;
            setPreviewMobileFloatingVisible(isVisible);
            if (!isVisible) {
                setPreviewMobilePopupOpen(false);
            }
        };
        handlePreviewMobileButton();
        window.addEventListener("scroll", handlePreviewMobileButton, {
            passive: true
        });
        window.addEventListener("resize", handlePreviewMobileButton);
        return ()=>{
            window.removeEventListener("scroll", handlePreviewMobileButton);
            window.removeEventListener("resize", handlePreviewMobileButton);
        };
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleJourneyScroll = ()=>{
            const section = journeySectionRef.current;
            if (!section || window.innerWidth <= 1180) {
                setJourneyActiveIndex(0);
                return;
            }
            const rect = section.getBoundingClientRect();
            const sectionHeight = Math.max(section.offsetHeight - window.innerHeight, 0.65);
            const rawProgress = (window.innerHeight * 0.65 - rect.top) / sectionHeight;
            const progress = Math.min(Math.max(rawProgress, 0), 0.9999);
            const nextIndex = Math.min(journeySteps.length - 0.8, Math.floor(progress * journeySteps.length));
            setJourneyActiveIndex(nextIndex);
        };
        handleJourneyScroll();
        window.addEventListener("scroll", handleJourneyScroll, {
            passive: true
        });
        window.addEventListener("resize", handleJourneyScroll);
        return ()=>{
            window.removeEventListener("scroll", handleJourneyScroll);
            window.removeEventListener("resize", handleJourneyScroll);
        };
    }, [
        journeySteps.length
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (("TURBOPACK compile-time value", "undefined") !== "undefined" && window.innerWidth <= 1023) //TURBOPACK unreachable
        ;
        const tiltCards = Array.from(document.querySelectorAll(".tilt-card"));
        const cleanups = [];
        tiltCards.forEach((card)=>{
            const inner = card.querySelector(".tilt-inner");
            if (!inner) return;
            const handleMove = (e)=>{
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const px = x / rect.width;
                const py = y / rect.height;
                const rotateY = (px - 0.5) * 8;
                const rotateX = (0.5 - py) * 8;
                inner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px) scale(1.01)`;
            };
            const handleLeave = ()=>{
                inner.style.transform = "rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)";
            };
            card.addEventListener("mousemove", handleMove);
            card.addEventListener("mouseleave", handleLeave);
            cleanups.push(()=>{
                card.removeEventListener("mousemove", handleMove);
                card.removeEventListener("mouseleave", handleLeave);
            });
        });
        return ()=>cleanups.forEach((fn)=>fn());
    }, []);
    const pushHistory = ()=>{
        setHistory((prev)=>[
                ...prev,
                {
                    clientsInput,
                    checkInput,
                    marginInput,
                    marketing,
                    avgCheckShift,
                    efficiency,
                    ltv,
                    selectedStrategy
                }
            ]);
    };
    const handleUndo = ()=>{
        setHistory((prev)=>{
            if (!prev.length) return prev;
            const last = prev[prev.length - 1];
            setClientsInput(last.clientsInput);
            setCheckInput(last.checkInput);
            setMarginInput(last.marginInput);
            setMarketing(last.marketing);
            setAvgCheckShift(last.avgCheckShift);
            setEfficiency(last.efficiency);
            setLtv(last.ltv);
            setSelectedStrategy(last.selectedStrategy);
            return prev.slice(0, -1);
        });
    };
    const handleReset = ()=>{
        pushHistory();
        setClientsInput("20");
        setCheckInput("2000");
        setMarginInput("30");
        setMarketing(0);
        setAvgCheckShift(0);
        setEfficiency(0);
        setLtv(0);
        setSelectedStrategy(null);
    };
    const clamp = (n, min, max)=>Math.min(max, Math.max(min, n));
    const safeDiv = (n, d)=>d === 0 ? 0 : n / d * 100;
    const nonLinear = (x)=>x * (1 - 0.4 * Math.abs(x));
    const preview = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const safeClients = Math.max(0, clientsBase);
        const safeCheck = Math.max(0, checkBase);
        const safeMarginPct = clamp(marginBase, 1, 95);
        const baseRevenue = safeClients * safeCheck;
        const baseProfit = baseRevenue * (safeMarginPct / 100);
        const baseCosts = Math.max(0, baseRevenue - baseProfit);
        const baseAcquisitionShare = 0.34;
        const baseCAC = safeClients > 0 ? baseCosts * baseAcquisitionShare / safeClients : 0;
        const baseOpex = baseCosts * (1 - baseAcquisitionShare);
        const m = nonLinear(marketing / 20);
        const e = nonLinear(efficiency / 20);
        const l = nonLinear(ltv / 25);
        const c = avgCheckShift >= 0 ? nonLinear(avgCheckShift / 30) : nonLinear(avgCheckShift / 15);
        let clients = safeClients;
        let aov = safeCheck;
        let cac = baseCAC;
        let opex = baseOpex;
        clients *= 1 + 0.12 * m;
        if (avgCheckShift < 0) {
            clients *= 1 + 0.25 * Math.abs(c);
        } else {
            clients *= 1 - 0.12 * c;
        }
        clients *= 1 + 0.04 * e;
        clients *= 1 + 0.15 * l;
        clients *= 1 + 0.06 * Math.max(0, c) * l;
        if (avgCheckShift < 0) {
            clients *= 1 + 0.1 * l;
        }
        aov *= 1 + avgCheckShift / 100;
        aov *= 1 + 0.03 * m;
        aov *= 1 + 0.02 * e;
        aov *= 1 - 0.05 * l;
        cac *= 1 - 0.07 * m;
        cac *= 1 + 0.08 * Math.max(0, c);
        cac *= 1 - 0.15 * e;
        cac *= 1 - 0.12 * l;
        cac *= 1 - 0.05 * m * e;
        opex *= 1 + 0.15 * m;
        opex *= 1 + 0.08 * Math.max(0, c);
        opex *= 1 - 0.12 * e;
        opex *= 1 + 0.08 * l;
        clients = Math.max(0, clients);
        aov = Math.max(0, aov);
        cac = Math.max(baseCAC * 0.35, cac);
        opex = Math.max(baseOpex * 0.55, opex);
        const revenue = clients * aov;
        const acquisition = clients * cac;
        const rawCosts = acquisition + opex;
        const rawProfit = revenue - rawCosts;
        let marginPct = revenue > 0 ? rawProfit / revenue * 100 : 0;
        marginPct -= 2 * Math.max(0, m) * (1 - e);
        marginPct = clamp(marginPct, -20, 80);
        const profit = revenue * (marginPct / 100);
        const costs = revenue - profit;
        const revDelta = safeDiv(revenue - baseRevenue, baseRevenue);
        const costDelta = safeDiv(costs - baseCosts, baseCosts);
        const profitDelta = safeDiv(profit - baseProfit, baseProfit);
        const clientsDelta = safeDiv(clients - safeClients, safeClients);
        const avgCheckDelta = safeDiv(aov - safeCheck, safeCheck);
        const cacDelta = safeDiv(cac - baseCAC, baseCAC);
        const marginDelta = marginPct - safeMarginPct;
        const reserveValue = Math.max(0, profit - baseProfit);
        const scenarioFlags = [];
        const allLeversAtMax = marketing === 20 && avgCheckShift === 30 && efficiency === 20 && ltv === 25;
        if (allLeversAtMax) {
            scenarioFlags.push("это сказка");
        } else {
            if (revDelta >= 8) {
                scenarioFlags.push("Модель ускоряет рост выручки за счёт усиления клиентского потока и более активной траектории роста.");
            } else if (revDelta >= 3) {
                scenarioFlags.push("Выручка растёт без резкого разрыва с базовой моделью — эффект уже заметен, но остаётся контролируемым.");
            } else if (revDelta <= -3) {
                scenarioFlags.push("Текущая комбинация рычагов снижает верхний предел выручки и делает модель более сдержанной по объёму.");
            }
            if (costDelta >= 8) {
                scenarioFlags.push("Расходы растут ускоренно: сценарий покупает объём через дополнительное давление на CAC и OPEX.");
            } else if (costDelta <= -3) {
                scenarioFlags.push("Сценарий разгружает расходную часть и удерживает рост в более чистой экономической структуре.");
            }
            if (profitDelta >= 8) {
                scenarioFlags.push("Прибыль растёт быстрее базы — модель усиливает не только оборот, но и полезный экономический результат.");
            } else if (profitDelta <= -3) {
                scenarioFlags.push("Прибыль остаётся под давлением: часть роста уходит в стоимость привлечения и операционную нагрузку.");
            }
            if (marginDelta >= 3) {
                scenarioFlags.push("Маржинальность укрепляется: модель становится устойчивее к масштабированию и менее чувствительна к лишним затратам.");
            } else if (marginDelta <= -3) {
                scenarioFlags.push("Маржа проседает: сценарий усиливает рост, но делает его более дорогим для текущей экономики.");
            }
            if (!scenarioFlags.length) {
                scenarioFlags.push("Сейчас показан базовый сценарий без выраженного управленческого сдвига.");
            }
        }
        return {
            revenue,
            costs,
            profit,
            clients,
            avgCheck: aov,
            cac,
            marginPct,
            reserveValue,
            revDelta,
            costDelta,
            profitDelta,
            clientsDelta,
            avgCheckDelta,
            cacDelta,
            marginDelta,
            scenarioFlags
        };
    }, [
        clientsBase,
        checkBase,
        marginBase,
        marketing,
        avgCheckShift,
        efficiency,
        ltv
    ]);
    const leverTooltips = {
        marketing: {
            effect: "рост клиентского потока, корректировка CAC и усиление спроса",
            complexity: "низкая или средняя — запустить проще, чем перестроить модель",
            downside: "давит на расходы и без внутренней эффективности может просаживать прибыль",
            meaning: "это быстрый способ нарастить объем, но не бесплатный рост"
        },
        avgCheck: {
            effect: "рост денег с одного клиента и усиление прибыльности сделки",
            complexity: "высокая — требует сильнее упаковать продукт, ценность и позиционирование",
            downside: "часть спроса может отвалиться, а затраты на продукт и сервис — вырасти",
            meaning: "это рычаг дорогого роста, который работает только при сильной ценности"
        },
        efficiency: {
            effect: "снижение давления расходов и улучшение общей экономики модели",
            complexity: "средняя или высокая — требует пересборки процессов, команды и операционки",
            downside: "не дает резкого скачка спроса и со временем упирается в потолок эффекта",
            meaning: "это способ расти чище: не через объем, а через лучшую структуру модели"
        },
        ltv: {
            effect: "усиление монетизации уже привлеченной базы и рост повторной выручки",
            complexity: "высокая — требует удержания, апсейлов и более продуманного продукта",
            downside: "может увеличить нагрузку на сервис, продукт и операционные расходы",
            meaning: "это самый умный рост: больше денег из уже привлеченных клиентов"
        }
    };
    const selectedStrategyMeta = selectedStrategy ? STRATEGY_CONFIG[selectedStrategy] : null;
    const hasPreviewInteraction = selectedStrategy !== null || marketing !== 0 || avgCheckShift !== 0 || efficiency !== 0 || ltv !== 0;
    const handleStrategySelect = (key)=>{
        pushHistory();
        if (selectedStrategy === key) {
            setSelectedStrategy(null);
            return;
        }
        const preset = STRATEGY_CONFIG[key].preset;
        setSelectedStrategy(key);
        setMarketing(preset.marketing);
        setAvgCheckShift(preset.avgCheckShift);
        setEfficiency(preset.efficiency);
        setLtv(preset.ltv);
    };
    const handleManualMarketing = (value)=>{
        if (selectedStrategy) setSelectedStrategy(null);
        setMarketing(value);
    };
    const handleManualAvgCheck = (value)=>{
        if (selectedStrategy) setSelectedStrategy(null);
        setAvgCheckShift(value);
    };
    const handleManualEfficiency = (value)=>{
        if (selectedStrategy) setSelectedStrategy(null);
        setEfficiency(value);
    };
    const handleManualLtv = (value)=>{
        if (selectedStrategy) setSelectedStrategy(null);
        setLtv(value);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        id: "top",
        className: "jsx-d5b486fc11cf5d30" + " " + "page-shell",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                "aria-hidden": "true",
                className: "jsx-d5b486fc11cf5d30" + " " + "page-background",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-d5b486fc11cf5d30" + " " + "aurora aurora-1"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                        lineNumber: 2015,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-d5b486fc11cf5d30" + " " + "aurora aurora-2"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                        lineNumber: 2016,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-d5b486fc11cf5d30" + " " + "aurora aurora-3"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                        lineNumber: 2017,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-d5b486fc11cf5d30" + " " + "aurora aurora-4"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                        lineNumber: 2018,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-d5b486fc11cf5d30" + " " + "vignette"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                        lineNumber: 2019,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                lineNumber: 2014,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "jsx-d5b486fc11cf5d30" + " " + `header-fixed ${mobileMenuOpen ? "header-open" : ""}`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "jsx-d5b486fc11cf5d30" + " " + "header-inner",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            href: "#top",
                            "aria-label": "Growth Avenue home",
                            className: "jsx-d5b486fc11cf5d30" + " " + "logo-link",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: "/logo.svg",
                                alt: "Growth Avenue",
                                className: "jsx-d5b486fc11cf5d30" + " " + "logo-main"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                lineNumber: 2025,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                            lineNumber: 2024,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            "aria-label": "Открыть меню",
                            "aria-expanded": mobileMenuOpen,
                            onClick: ()=>setMobileMenuOpen((prev)=>!prev),
                            className: "jsx-d5b486fc11cf5d30" + " " + `header-burger ${mobileMenuOpen ? "is-open" : ""}`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "jsx-d5b486fc11cf5d30"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                    lineNumber: 2035,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "jsx-d5b486fc11cf5d30"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                    lineNumber: 2036,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "jsx-d5b486fc11cf5d30"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                    lineNumber: 2037,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                            lineNumber: 2028,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                            className: "jsx-d5b486fc11cf5d30" + " " + `header-nav ${mobileMenuOpen ? "is-open" : ""}`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: "#how-it-works",
                                    onClick: ()=>setMobileMenuOpen(false),
                                    className: "jsx-d5b486fc11cf5d30" + " " + "header-link",
                                    children: "Как это работает"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                    lineNumber: 2041,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: "#preview",
                                    onClick: ()=>setMobileMenuOpen(false),
                                    className: "jsx-d5b486fc11cf5d30" + " " + "header-link",
                                    children: "Интерактивное превью"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                    lineNumber: 2042,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: "#results",
                                    onClick: ()=>setMobileMenuOpen(false),
                                    className: "jsx-d5b486fc11cf5d30" + " " + "header-link",
                                    children: "Что вы получите"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                    lineNumber: 2043,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: "#analysis",
                                    onClick: ()=>setMobileMenuOpen(false),
                                    className: "jsx-d5b486fc11cf5d30" + " " + "header-link",
                                    children: "Как проходит анализ"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                    lineNumber: 2044,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                            lineNumber: 2040,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-d5b486fc11cf5d30" + " " + `header-actions ${mobileMenuOpen ? "is-open" : ""}`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>{
                                        setFaqOpen(true);
                                        setMobileMenuOpen(false);
                                    },
                                    className: "jsx-d5b486fc11cf5d30" + " " + "header-faq-btn",
                                    children: "FAQ"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                    lineNumber: 2048,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: loginUrl,
                                    onClick: ()=>setMobileMenuOpen(false),
                                    className: "jsx-d5b486fc11cf5d30" + " " + "header-login-btn",
                                    children: "Profile"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                    lineNumber: 2058,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: "#tariffs",
                                    onClick: ()=>setMobileMenuOpen(false),
                                    className: "jsx-d5b486fc11cf5d30" + " " + "tg-gradient-btn header-cta",
                                    children: "Начать"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                    lineNumber: 2059,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: tgContactUrl,
                                    target: "_blank",
                                    rel: "noreferrer",
                                    className: "jsx-d5b486fc11cf5d30" + " " + "header-pill",
                                    children: "TG"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                    lineNumber: 2060,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: waContactUrl,
                                    target: "_blank",
                                    rel: "noreferrer",
                                    className: "jsx-d5b486fc11cf5d30" + " " + "header-pill",
                                    children: "WA"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                    lineNumber: 2061,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                            lineNumber: 2047,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                    lineNumber: 2023,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                lineNumber: 2022,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-d5b486fc11cf5d30" + " " + "content-wrap",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "jsx-d5b486fc11cf5d30" + " " + "hero-section mb-16",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-d5b486fc11cf5d30" + " " + "hero-grid hero-grid-frame",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-d5b486fc11cf5d30" + " " + "hero-left",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                            className: "jsx-d5b486fc11cf5d30" + " " + "hero-main-title",
                                            children: "Revenue Snapshot"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                            lineNumber: 2070,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-d5b486fc11cf5d30" + " " + "hero-main-subtitle",
                                            children: "Revenue Snapshot — это данные, которые отвечают на острые вопросы бизнеса. Не общие выводы, а конкретные расчёты и приоритеты."
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                            lineNumber: 2072,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-d5b486fc11cf5d30" + " " + "hero-main-copy",
                                            children: "Система фиксирует ограничения роста, показывает точки потерь и собирает управленческую последовательность решений на основе экономики бизнеса."
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                            lineNumber: 2077,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-d5b486fc11cf5d30" + " " + "hero-highlights-row hero-highlights-row-unified glare-card-lite",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-d5b486fc11cf5d30" + " " + "hero-highlight-chip",
                                                    children: "ECONOMIC RATE"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                    lineNumber: 2083,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-d5b486fc11cf5d30" + " " + "hero-highlight-chip",
                                                    children: "GROWTH LIMIT"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                    lineNumber: 2084,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-d5b486fc11cf5d30" + " " + "hero-highlight-chip",
                                                    children: "SOLUTION"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                    lineNumber: 2085,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-d5b486fc11cf5d30" + " " + "hero-highlight-chip",
                                                    children: "JTBD"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                    lineNumber: 2086,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                            lineNumber: 2082,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-d5b486fc11cf5d30" + " " + "hero-actions-row",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                    href: "#tariffs",
                                                    className: "jsx-d5b486fc11cf5d30" + " " + "tg-gradient-btn inline-flex",
                                                    children: "Начать"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                    lineNumber: 2090,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                    href: "#preview",
                                                    className: "jsx-d5b486fc11cf5d30" + " " + "ghost-link ghost-link-dark inline-flex",
                                                    children: "Попробовать демо"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                    lineNumber: 2091,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                            lineNumber: 2089,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                    lineNumber: 2069,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(HeroEconomyChart, {}, void 0, false, {
                                    fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                    lineNumber: 2095,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                            lineNumber: 2068,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                        lineNumber: 2067,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        id: "how-it-works",
                        ref: journeySectionRef,
                        className: "jsx-d5b486fc11cf5d30" + " " + "mb-16 journey-scroll-shell",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-d5b486fc11cf5d30" + " " + "journey-scroll-sticky",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-d5b486fc11cf5d30" + " " + "section-head",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-d5b486fc11cf5d30" + " " + "section-kicker",
                                            children: "Как это работает"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                            lineNumber: 2102,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "jsx-d5b486fc11cf5d30" + " " + "section-title",
                                            children: "Путь от базовых параметров к полной картине экономики бизнеса"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                            lineNumber: 2103,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-d5b486fc11cf5d30" + " " + "section-copy",
                                            children: "Revenue Snapshot показывает путь клиента: от выбора формата прохождения до доступа к результатам и возможностям личного кабинета."
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                            lineNumber: 2104,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                    lineNumber: 2101,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    "aria-hidden": "true",
                                    className: "jsx-d5b486fc11cf5d30" + " " + "journey-progress-wrap",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                width: `${(journeyActiveIndex + 1) / journeySteps.length * 100}%`
                                            },
                                            className: "jsx-d5b486fc11cf5d30" + " " + "journey-progress-fill"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                            lineNumber: 2110,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-d5b486fc11cf5d30" + " " + "journey-progress-dots",
                                            children: journeySteps.map((step, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "jsx-d5b486fc11cf5d30" + " " + `journey-progress-dot ${index <= journeyActiveIndex ? "is-active" : ""}`
                                                }, step.number, false, {
                                                    fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                    lineNumber: 2116,
                                                    columnNumber: 19
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                            lineNumber: 2114,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                    lineNumber: 2109,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-d5b486fc11cf5d30" + " " + "journey-scroll-grid",
                                    children: journeySteps.map((step, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                            className: "jsx-d5b486fc11cf5d30" + " " + `journey-stage-card ${index <= journeyActiveIndex ? "is-active" : "is-muted"}`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-d5b486fc11cf5d30" + " " + "journey-stage-number",
                                                    children: step.number
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                    lineNumber: 2130,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-d5b486fc11cf5d30" + " " + "journey-stage-title",
                                                    children: step.title
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                    lineNumber: 2131,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-d5b486fc11cf5d30" + " " + "journey-stage-text",
                                                    children: step.text
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                    lineNumber: 2132,
                                                    columnNumber: 19
                                                }, this),
                                                step.linkHref ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                    href: step.linkHref,
                                                    className: "jsx-d5b486fc11cf5d30" + " " + "journey-stage-link",
                                                    children: step.linkLabel
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                    lineNumber: 2134,
                                                    columnNumber: 21
                                                }, this) : null
                                            ]
                                        }, step.number, true, {
                                            fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                            lineNumber: 2126,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                    lineNumber: 2124,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    "aria-hidden": "true",
                                    className: "jsx-d5b486fc11cf5d30" + " " + "journey-progress-shadow-spacer"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                    lineNumber: 2142,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-d5b486fc11cf5d30" + " " + "journey-demo-bridge",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-d5b486fc11cf5d30" + " " + "journey-demo-copy",
                                            children: "Чтобы понять логику модели до полного анализа — попробуйте упрощённую демо-версию ниже."
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                            lineNumber: 2146,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: "#preview",
                                            className: "jsx-d5b486fc11cf5d30" + " " + "ghost-link ghost-link-dark inline-flex",
                                            children: "Попробовать демо"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                            lineNumber: 2149,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                    lineNumber: 2145,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                            lineNumber: 2100,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                        lineNumber: 2099,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        id: "preview",
                        ref: previewSectionRef,
                        className: "jsx-d5b486fc11cf5d30" + " " + "mb-16",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-d5b486fc11cf5d30" + " " + "section-head",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-d5b486fc11cf5d30" + " " + "section-kicker",
                                        children: "Интерактивное превью"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                        lineNumber: 2156,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "jsx-d5b486fc11cf5d30" + " " + "section-title",
                                        children: "Посмотрите, как меняется экономика бизнеса при разных управленческих решениях"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                        lineNumber: 2157,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "jsx-d5b486fc11cf5d30" + " " + "section-copy",
                                        children: "Это предварительная симуляция бизнес-модели. Она показывает, как один управленческий рычаг меняет несколько показателей сразу и где возникает компромисс между ростом, затратами и прибылью."
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                        lineNumber: 2160,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                lineNumber: 2155,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-d5b486fc11cf5d30" + " " + "preview-grid preview-grid-strategy-layout",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-d5b486fc11cf5d30" + " " + "preview-main-column preview-main-column-structured",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-d5b486fc11cf5d30" + " " + "preview-panel-label",
                                                children: "Введите базовые параметры бизнеса"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                lineNumber: 2168,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-d5b486fc11cf5d30" + " " + "preview-inline-inputs",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-d5b486fc11cf5d30" + " " + "preview-inline-input-shell",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "text",
                                                                inputMode: "numeric",
                                                                value: clientsInput,
                                                                onFocus: pushHistory,
                                                                onChange: (e)=>setClientsInput(normalizeDigits(e.target.value)),
                                                                placeholder: "20",
                                                                className: "jsx-d5b486fc11cf5d30" + " " + "preview-inline-input"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                                lineNumber: 2172,
                                                                columnNumber: 5
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "jsx-d5b486fc11cf5d30" + " " + "preview-inline-input-meta",
                                                                children: "клиенты / месяц"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                                lineNumber: 2181,
                                                                columnNumber: 5
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                        lineNumber: 2171,
                                                        columnNumber: 3
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-d5b486fc11cf5d30" + " " + "preview-inline-input-shell",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "text",
                                                                inputMode: "numeric",
                                                                value: checkInput,
                                                                onFocus: pushHistory,
                                                                onChange: (e)=>setCheckInput(normalizeDigits(e.target.value)),
                                                                placeholder: "2000",
                                                                className: "jsx-d5b486fc11cf5d30" + " " + "preview-inline-input"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                                lineNumber: 2185,
                                                                columnNumber: 5
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "jsx-d5b486fc11cf5d30" + " " + "preview-inline-input-meta",
                                                                children: "$ / средний чек"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                                lineNumber: 2194,
                                                                columnNumber: 5
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                        lineNumber: 2184,
                                                        columnNumber: 3
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-d5b486fc11cf5d30" + " " + "preview-inline-input-shell",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "text",
                                                                inputMode: "numeric",
                                                                value: marginInput,
                                                                onFocus: pushHistory,
                                                                onChange: (e)=>setMarginInput(normalizeDigits(e.target.value)),
                                                                placeholder: "30",
                                                                className: "jsx-d5b486fc11cf5d30" + " " + "preview-inline-input"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                                lineNumber: 2198,
                                                                columnNumber: 5
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "jsx-d5b486fc11cf5d30" + " " + "preview-inline-input-meta",
                                                                children: "% / маржинальность"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                                lineNumber: 2207,
                                                                columnNumber: 5
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                        lineNumber: 2197,
                                                        columnNumber: 3
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                lineNumber: 2170,
                                                columnNumber: 14
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-d5b486fc11cf5d30" + " " + "preview-panel-label",
                                                children: "Выберите стратегию"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                lineNumber: 2211,
                                                columnNumber: 1
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-d5b486fc11cf5d30" + " " + "strategy-chip-row",
                                                children: strategyOptions.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StrategyChip, {
                                                        label: item.label,
                                                        active: selectedStrategy === item.key,
                                                        onClick: ()=>handleStrategySelect(item.key)
                                                    }, item.key, false, {
                                                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                        lineNumber: 2214,
                                                        columnNumber: 5
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                lineNumber: 2212,
                                                columnNumber: 1
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                                className: "jsx-d5b486fc11cf5d30" + " " + "dashboard-grid dashboard-grid-structured mt-10",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-d5b486fc11cf5d30" + " " + "dashboard-metric-slot dashboard-metric-slot-revenue",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TopMetricCard, {
                                                            title: "Выручка",
                                                            value: fmtMoney(preview.revenue),
                                                            delta: preview.revDelta,
                                                            type: "revenue"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                            lineNumber: 2225,
                                                            columnNumber: 19
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                        lineNumber: 2224,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-d5b486fc11cf5d30" + " " + "dashboard-metric-slot dashboard-metric-slot-costs",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TopMetricCard, {
                                                            title: "Расходы",
                                                            value: fmtMoney(preview.costs),
                                                            delta: preview.costDelta,
                                                            type: "costs",
                                                            invert: true
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                            lineNumber: 2228,
                                                            columnNumber: 19
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                        lineNumber: 2227,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-d5b486fc11cf5d30" + " " + "dashboard-metric-slot dashboard-metric-slot-profit",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TopMetricCard, {
                                                            title: "Прибыль",
                                                            value: fmtMoney(preview.profit),
                                                            delta: preview.profitDelta,
                                                            type: "profit"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                            lineNumber: 2231,
                                                            columnNumber: 19
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                        lineNumber: 2230,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                lineNumber: 2223,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-d5b486fc11cf5d30" + " " + "mt-8",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-d5b486fc11cf5d30" + " " + "preview-section-headline",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "jsx-d5b486fc11cf5d30" + " " + "preview-panel-label preview-panel-label-muted",
                                                                children: "Формирование экономики"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                                lineNumber: 2237,
                                                                columnNumber: 19
                                                            }, this),
                                                            selectedStrategyMeta ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StrategyMetaBadges, {
                                                                items: selectedStrategyMeta.formationParams
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                                lineNumber: 2239,
                                                                columnNumber: 21
                                                            }, this) : null
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                        lineNumber: 2236,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-d5b486fc11cf5d30" + " " + "model-grid-structured",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ModelCard, {
                                                                title: "Привлечение клиента",
                                                                value: fmtMoney(preview.cac),
                                                                delta: preview.cacDelta,
                                                                invert: true
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                                lineNumber: 2243,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ModelCard, {
                                                                title: "Изменения Маржинальности",
                                                                value: `${Math.round(preview.marginPct)}%`,
                                                                delta: preview.marginDelta
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                                lineNumber: 2244,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ModelCard, {
                                                                title: "Количество Клиентов",
                                                                value: Math.round(preview.clients),
                                                                delta: preview.clientsDelta
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                                lineNumber: 2245,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ModelCard, {
                                                                title: "Изменения Среднего чека",
                                                                value: fmtMoney(preview.avgCheck),
                                                                delta: preview.avgCheckDelta
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                                lineNumber: 2246,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                        lineNumber: 2242,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                lineNumber: 2235,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-d5b486fc11cf5d30" + " " + "preview-controls-head mt-10",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-d5b486fc11cf5d30" + " " + "preview-controls-head-left",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "jsx-d5b486fc11cf5d30" + " " + "preview-panel-label preview-panel-label-muted",
                                                                children: "Рычаги управления"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                                lineNumber: 2252,
                                                                columnNumber: 19
                                                            }, this),
                                                            selectedStrategyMeta ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StrategyMetaBadges, {
                                                                items: selectedStrategyMeta.leverParams,
                                                                tone: "soft"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                                lineNumber: 2254,
                                                                columnNumber: 21
                                                            }, this) : null
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                        lineNumber: 2251,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-d5b486fc11cf5d30" + " " + "preview-actions-inline",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                onClick: handleUndo,
                                                                disabled: !history.length,
                                                                className: "jsx-d5b486fc11cf5d30" + " " + "reset-link",
                                                                children: "Отменить действие"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                                lineNumber: 2258,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                onClick: handleReset,
                                                                className: "jsx-d5b486fc11cf5d30" + " " + "reset-link",
                                                                children: "Сбросить"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                                lineNumber: 2259,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                        lineNumber: 2257,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                lineNumber: 2250,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-d5b486fc11cf5d30" + " " + "control-levers-grid",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ControlLever, {
                                                        title: "Маркетинг",
                                                        tooltip: leverTooltips.marketing,
                                                        value: marketing,
                                                        min: -20,
                                                        max: 20,
                                                        set: handleManualMarketing,
                                                        onStart: pushHistory
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                        lineNumber: 2264,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ControlLever, {
                                                        title: "Средний чек",
                                                        tooltip: leverTooltips.avgCheck,
                                                        value: avgCheckShift,
                                                        min: -15,
                                                        max: 30,
                                                        set: handleManualAvgCheck,
                                                        onStart: pushHistory
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                        lineNumber: 2273,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ControlLever, {
                                                        title: "Эффективность и автоматизация",
                                                        tooltip: leverTooltips.efficiency,
                                                        value: efficiency,
                                                        min: 0,
                                                        max: 20,
                                                        set: handleManualEfficiency,
                                                        onStart: pushHistory
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                        lineNumber: 2282,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ControlLever, {
                                                        title: "LTV",
                                                        tooltip: leverTooltips.ltv,
                                                        value: ltv,
                                                        min: 0,
                                                        max: 25,
                                                        set: handleManualLtv,
                                                        onStart: pushHistory
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                        lineNumber: 2291,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                lineNumber: 2263,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                        lineNumber: 2167,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        "aria-label": "Открыть Snapshot reserve",
                                        onClick: ()=>setPreviewMobilePopupOpen(true),
                                        className: "jsx-d5b486fc11cf5d30" + " " + `preview-mobile-fab ${hasPreviewInteraction ? "is-pulsing" : ""} ${previewMobileFloatingVisible ? "is-visible" : ""}`,
                                        children: "S"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                        lineNumber: 2303,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                                        className: "jsx-d5b486fc11cf5d30" + " " + "glass-card glare-card preview-side preview-side-advanced preview-side-reserve-window",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-d5b486fc11cf5d30" + " " + "reserve-kicker",
                                                children: "Оценочный резерв"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                lineNumber: 2313,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-d5b486fc11cf5d30" + " " + "hero-preview-box mt-4 glare-card-lite preview-reserve-box",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-d5b486fc11cf5d30" + " " + "reserve-amount",
                                                        children: [
                                                            "≈ ",
                                                            fmtMoney(preview.reserveValue),
                                                            " ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "jsx-d5b486fc11cf5d30",
                                                                children: "/ мес"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                                lineNumber: 2315,
                                                                columnNumber: 84
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                        lineNumber: 2315,
                                                        columnNumber: 17
                                                    }, this),
                                                    selectedStrategyMeta ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-d5b486fc11cf5d30" + " " + "reserve-strategy-copy",
                                                        children: selectedStrategyMeta.behavior.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "jsx-d5b486fc11cf5d30" + " " + "reserve-strategy-item",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "jsx-d5b486fc11cf5d30" + " " + "reserve-strategy-bullet",
                                                                        children: "•"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                                        lineNumber: 2320,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "jsx-d5b486fc11cf5d30",
                                                                        children: item
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                                        lineNumber: 2321,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, item, true, {
                                                                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                                lineNumber: 2319,
                                                                columnNumber: 23
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                        lineNumber: 2317,
                                                        columnNumber: 19
                                                    }, this) : null
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                lineNumber: 2314,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-d5b486fc11cf5d30" + " " + "mt-4 space-y-3 text-sm",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Row, {
                                                        label: "Выручка",
                                                        delta: preview.revDelta
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                        lineNumber: 2329,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Row, {
                                                        label: "Расходы",
                                                        delta: preview.costDelta,
                                                        invert: true
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                        lineNumber: 2330,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Row, {
                                                        label: "Прибыль",
                                                        delta: preview.profitDelta
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                        lineNumber: 2331,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                lineNumber: 2328,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-d5b486fc11cf5d30" + " " + "preview-side-note glass-card soft-glow glare-card mt-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-d5b486fc11cf5d30" + " " + "preview-side-note-title",
                                                        children: "Что сейчас происходит в модели"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                        lineNumber: 2335,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-d5b486fc11cf5d30" + " " + "preview-side-note-list",
                                                        children: preview.scenarioFlags.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "jsx-d5b486fc11cf5d30" + " " + "preview-side-note-item",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "jsx-d5b486fc11cf5d30" + " " + "preview-side-note-bullet",
                                                                        children: "•"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                                        lineNumber: 2339,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "jsx-d5b486fc11cf5d30",
                                                                        children: item
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                                        lineNumber: 2340,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, item, true, {
                                                                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                                lineNumber: 2338,
                                                                columnNumber: 21
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                        lineNumber: 2336,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                lineNumber: 2334,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>handlePay(payUrl),
                                                className: "jsx-d5b486fc11cf5d30" + " " + "tg-gradient-btn mt-5 block w-full text-center",
                                                children: "Попробовать Snapshot"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                lineNumber: 2346,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                        lineNumber: 2312,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                lineNumber: 2166,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                        lineNumber: 2154,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        id: "results",
                        className: "jsx-d5b486fc11cf5d30" + " " + "mb-16",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-d5b486fc11cf5d30" + " " + "section-head",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-d5b486fc11cf5d30" + " " + "section-kicker",
                                        children: "Что вы получите"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                        lineNumber: 2355,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "jsx-d5b486fc11cf5d30" + " " + "section-title",
                                        children: "Цели Revenue Snapshot"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                        lineNumber: 2356,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "jsx-d5b486fc11cf5d30" + " " + "section-copy",
                                        children: [
                                            "Понять, каким должен быть первый ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "jsx-d5b486fc11cf5d30" + " " + "accent-word",
                                                children: "верный"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                lineNumber: 2358,
                                                columnNumber: 48
                                            }, this),
                                            " шаг к построению новой стратегии для новых рубежей."
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                        lineNumber: 2357,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                lineNumber: 2354,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-d5b486fc11cf5d30" + " " + "results-grid-2x2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ResultDocCard, {
                                        tab: "ECONOMIC RATE",
                                        title: "Executive Summary",
                                        text: "Данные о вашем продукте, его маржинальности и спросе выявляют сильные и слабые стороны бизнеса и определяется главный фокус на данный момент."
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                        lineNumber: 2363,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ResultDocCard, {
                                        tab: "GROWTH LIMIT",
                                        title: "Key Conclusions",
                                        text: "Ключевые выводы из фактов о компании определяют, как достичь текущей цели бизнеса. Формируется управленческий вывод об экономической модели."
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                        lineNumber: 2364,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ResultDocCard, {
                                        tab: "SOLUTION",
                                        title: "Strategy&Practice",
                                        text: "Проведённый анализ данных определяет первичную задачу: целью всегда является повышение дохода."
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                        lineNumber: 2365,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ResultDocCard, {
                                        tab: "JTBD",
                                        title: "RoadMap",
                                        text: "Тезисный план действий на следующие 6 месяцев по запуску конкретного MVP."
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                        lineNumber: 2366,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                lineNumber: 2362,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-d5b486fc11cf5d30" + " " + "results-bottom-stack",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-d5b486fc11cf5d30" + " " + "results-roadmap-note",
                                        children: [
                                            "После получения и изучения результатов у Вас есть возможность назначить ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "jsx-d5b486fc11cf5d30",
                                                children: "30-минутную встречу"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                lineNumber: 2371,
                                                columnNumber: 87
                                            }, this),
                                            " с нашими C-level специалистами в сфере Маркетинга и Продаж ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "jsx-d5b486fc11cf5d30",
                                                children: "для декомпозиции результатов"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                lineNumber: 2371,
                                                columnNumber: 179
                                            }, this),
                                            "."
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                        lineNumber: 2370,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>handlePay(payUrl),
                                        className: "jsx-d5b486fc11cf5d30" + " " + "result-doc-start-btn results-start-btn",
                                        children: "Начать"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                        lineNumber: 2373,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                lineNumber: 2369,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                        lineNumber: 2353,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "jsx-d5b486fc11cf5d30" + " " + "mb-16 stage-hover-map",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-d5b486fc11cf5d30" + " " + "section-head",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-d5b486fc11cf5d30" + " " + "section-kicker",
                                        children: "Для кого этот инструмент"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                        lineNumber: 2379,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "jsx-d5b486fc11cf5d30" + " " + "section-title",
                                        children: "Где Revenue Snapshot показал результат"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                        lineNumber: 2380,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                lineNumber: 2378,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StageCarousel, {}, void 0, false, {
                                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                lineNumber: 2382,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                        lineNumber: 2377,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        id: "analysis",
                        className: "jsx-d5b486fc11cf5d30" + " " + "mb-16",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                id: "tariffs",
                                className: "jsx-d5b486fc11cf5d30"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                lineNumber: 2386,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-d5b486fc11cf5d30" + " " + "section-head",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-d5b486fc11cf5d30" + " " + "section-kicker",
                                        children: "Как проходит анализ"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                        lineNumber: 2388,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "jsx-d5b486fc11cf5d30" + " " + "section-title analysis-section-title",
                                        children: "С чего начать?"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                        lineNumber: 2389,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "jsx-d5b486fc11cf5d30" + " " + "section-copy",
                                        children: [
                                            "Вам предоставляется ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "jsx-d5b486fc11cf5d30" + " " + "accent-word",
                                                children: "Личный кабинет на 365 дней"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                lineNumber: 2391,
                                                columnNumber: 35
                                            }, this),
                                            ", где хранятся ваши результаты, и будут добавляться ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "jsx-d5b486fc11cf5d30" + " " + "accent-word",
                                                children: "инструменты по спец условиям"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                lineNumber: 2391,
                                                columnNumber: 150
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                        lineNumber: 2390,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                lineNumber: 2387,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-d5b486fc11cf5d30" + " " + "analysis-single-column",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-d5b486fc11cf5d30" + " " + "analysis-right-card analysis-right-card-plain analysis-right-card-full",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-d5b486fc11cf5d30" + " " + "analysis-offers-desktop",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-d5b486fc11cf5d30" + " " + "start-cards-row start-cards-row-horizontal",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StartCard, {
                                                            title: "Online-playground",
                                                            icon: "/online_playground_desc.svg",
                                                            mobileIcon: "/online-playground_mobile.svg",
                                                            price: "$114",
                                                            href: payUrl,
                                                            priceDesktop: {
                                                                top: "18%",
                                                                right: "6.6%"
                                                            },
                                                            priceMobile: {
                                                                top: "88.8%",
                                                                right: "6.4%"
                                                            },
                                                            buttonDesktop: {
                                                                left: "5.8%",
                                                                bottom: "24.6%",
                                                                width: "35%"
                                                            },
                                                            buttonMobile: {
                                                                left: "6.4%",
                                                                bottom: "11.2%",
                                                                width: "48%"
                                                            },
                                                            onPay: handlePay
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                            lineNumber: 2399,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StartCard, {
                                                            title: "On Rec",
                                                            icon: "/onrec_desc.svg",
                                                            mobileIcon: "/on-rec_mobile.svg",
                                                            price: "$770",
                                                            href: onRecUrl,
                                                            priceDesktop: {
                                                                top: "18%",
                                                                right: "6.6%"
                                                            },
                                                            priceMobile: {
                                                                top: "88.8%",
                                                                right: "6.4%"
                                                            },
                                                            buttonDesktop: {
                                                                left: "5.8%",
                                                                bottom: "24.6%",
                                                                width: "35%"
                                                            },
                                                            buttonMobile: {
                                                                left: "6.4%",
                                                                bottom: "11.2%",
                                                                width: "48%"
                                                            },
                                                            onPay: handlePay
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                            lineNumber: 2411,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                    lineNumber: 2398,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TariffDetailsComparison, {}, void 0, false, {
                                                    fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                    lineNumber: 2424,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                            lineNumber: 2397,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-d5b486fc11cf5d30" + " " + "analysis-offers-mobile",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-d5b486fc11cf5d30" + " " + "offer-switch-row",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            onClick: ()=>setSelectedOffer("playground"),
                                                            className: "jsx-d5b486fc11cf5d30" + " " + `offer-switch-btn ${selectedOffer === "playground" ? "is-active" : ""}`,
                                                            children: "Offer1"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                            lineNumber: 2429,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            onClick: ()=>setSelectedOffer("onrec"),
                                                            className: "jsx-d5b486fc11cf5d30" + " " + `offer-switch-btn ${selectedOffer === "onrec" ? "is-active" : ""}`,
                                                            children: "Offer2"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                            lineNumber: 2436,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                    lineNumber: 2428,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-d5b486fc11cf5d30" + " " + "analysis-mobile-offer-card",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StartCard, {
                                                        title: selectedOfferCard.title,
                                                        icon: selectedOfferCard.icon,
                                                        mobileIcon: selectedOfferCard.mobileIcon,
                                                        price: selectedOfferCard.price,
                                                        href: selectedOfferCard.href,
                                                        priceDesktop: {
                                                            top: "18%",
                                                            right: "6.6%"
                                                        },
                                                        priceMobile: {
                                                            top: "73%",
                                                            right: "6.4%"
                                                        },
                                                        buttonDesktop: {
                                                            left: "5.8%",
                                                            bottom: "24.6%",
                                                            width: "35%"
                                                        },
                                                        buttonMobile: {
                                                            left: "6.4%",
                                                            bottom: "11.2%",
                                                            width: "48%"
                                                        },
                                                        onPay: handlePay
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                        lineNumber: 2446,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                    lineNumber: 2445,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TariffCompareCard, {
                                                    title: selectedOfferConfig.title,
                                                    sections: selectedOfferConfig.sections,
                                                    disclaimer: selectedOfferConfig.disclaimer
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                    lineNumber: 2460,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                            lineNumber: 2427,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                    lineNumber: 2396,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                lineNumber: 2395,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                        lineNumber: 2385,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        id: "try",
                        className: "jsx-d5b486fc11cf5d30" + " " + "pb-8",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-d5b486fc11cf5d30" + " " + "glass-card glare-card cta-card cta-card-single",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-d5b486fc11cf5d30",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-d5b486fc11cf5d30" + " " + "section-kicker",
                                        children: "Long story short"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                        lineNumber: 2473,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "jsx-d5b486fc11cf5d30" + " " + "mt-3 text-3xl font-semibold text-white md:text-4xl",
                                        children: "Revenue Snapshot – ваш флюгер в мире капитализма"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                        lineNumber: 2474,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "jsx-d5b486fc11cf5d30" + " " + "mt-4 max-w-5xl text-base leading-7 text-white/68",
                                        children: "Вдохновением для создания RS стала наша рутинная работа и постоянные аудиты бизнеса, в течение которых мы поняли, что мир автоматизаций не обойдет и нас  Мы создали инстурмент, который позволяет за довольно короткое время понять куда вам двигаться именно сейчас – не абстрактно, а с чего начать и какие цели рационально поставить в данный момент"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                        lineNumber: 2475,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                lineNumber: 2472,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                            lineNumber: 2471,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                        lineNumber: 2470,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                        className: "jsx-d5b486fc11cf5d30" + " " + "page-footer",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-d5b486fc11cf5d30",
                                children: "Growth Avenue"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                lineNumber: 2483,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-d5b486fc11cf5d30" + " " + "page-footer-links",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/terms-of-use",
                                        children: "Terms of Use"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                        lineNumber: 2485,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/privacy-policy",
                                        children: "Privacy Policy"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                        lineNumber: 2486,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                lineNumber: 2484,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                        lineNumber: 2482,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                lineNumber: 2066,
                columnNumber: 7
            }, this),
            previewMobilePopupOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                role: "dialog",
                "aria-modal": "true",
                "aria-label": "Snapshot reserve",
                className: "jsx-d5b486fc11cf5d30" + " " + "preview-mobile-popup-root",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        "aria-label": "Закрыть Snapshot reserve",
                        onClick: ()=>setPreviewMobilePopupOpen(false),
                        className: "jsx-d5b486fc11cf5d30" + " " + "preview-mobile-popup-backdrop"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                        lineNumber: 2494,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-d5b486fc11cf5d30" + " " + "preview-mobile-popup-card glass-card glare-card",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                "aria-label": "Закрыть",
                                onClick: ()=>setPreviewMobilePopupOpen(false),
                                className: "jsx-d5b486fc11cf5d30" + " " + "preview-mobile-popup-close",
                                children: "✕"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                lineNumber: 2501,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-d5b486fc11cf5d30" + " " + "reserve-kicker",
                                children: "Оценочный резерв"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                lineNumber: 2510,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-d5b486fc11cf5d30" + " " + "hero-preview-box mt-4 glare-card-lite preview-reserve-box",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-d5b486fc11cf5d30" + " " + "reserve-amount",
                                        children: [
                                            "≈ ",
                                            fmtMoney(preview.reserveValue),
                                            " ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "jsx-d5b486fc11cf5d30",
                                                children: "/ мес"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                lineNumber: 2512,
                                                columnNumber: 82
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                        lineNumber: 2512,
                                        columnNumber: 15
                                    }, this),
                                    selectedStrategyMeta ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-d5b486fc11cf5d30" + " " + "reserve-strategy-copy",
                                        children: selectedStrategyMeta.behavior.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-d5b486fc11cf5d30" + " " + "reserve-strategy-item",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "jsx-d5b486fc11cf5d30" + " " + "reserve-strategy-bullet",
                                                        children: "•"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                        lineNumber: 2517,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "jsx-d5b486fc11cf5d30",
                                                        children: item
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                        lineNumber: 2518,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, item, true, {
                                                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                lineNumber: 2516,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                        lineNumber: 2514,
                                        columnNumber: 17
                                    }, this) : null
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                lineNumber: 2511,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-d5b486fc11cf5d30" + " " + "mt-4 space-y-3 text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Row, {
                                        label: "Выручка",
                                        delta: preview.revDelta
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                        lineNumber: 2526,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Row, {
                                        label: "Расходы",
                                        delta: preview.costDelta,
                                        invert: true
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                        lineNumber: 2527,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Row, {
                                        label: "Прибыль",
                                        delta: preview.profitDelta
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                        lineNumber: 2528,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                lineNumber: 2525,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-d5b486fc11cf5d30" + " " + "preview-side-note glass-card soft-glow glare-card mt-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-d5b486fc11cf5d30" + " " + "preview-side-note-title",
                                        children: "Что сейчас происходит в модели"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                        lineNumber: 2532,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-d5b486fc11cf5d30" + " " + "preview-side-note-list",
                                        children: preview.scenarioFlags.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-d5b486fc11cf5d30" + " " + "preview-side-note-item",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "jsx-d5b486fc11cf5d30" + " " + "preview-side-note-bullet",
                                                        children: "•"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                        lineNumber: 2536,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "jsx-d5b486fc11cf5d30",
                                                        children: item
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                        lineNumber: 2537,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, item, true, {
                                                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                lineNumber: 2535,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                        lineNumber: 2533,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                lineNumber: 2531,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>{
                                    setPreviewMobilePopupOpen(false);
                                    handlePay(payUrl);
                                },
                                className: "jsx-d5b486fc11cf5d30" + " " + "tg-gradient-btn mt-5 block w-full text-center",
                                children: "Попробовать Snapshot"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                lineNumber: 2543,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                        lineNumber: 2500,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                lineNumber: 2493,
                columnNumber: 9
            }, this),
            paymentState !== "idle" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                role: "dialog",
                "aria-modal": "true",
                "aria-label": "Ожидание оплаты",
                className: "jsx-d5b486fc11cf5d30" + " " + "payment-overlay-root",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-d5b486fc11cf5d30" + " " + "payment-overlay-backdrop"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                        lineNumber: 2559,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-d5b486fc11cf5d30" + " " + "payment-overlay-card",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-d5b486fc11cf5d30" + " " + "payment-overlay-status-row",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-d5b486fc11cf5d30" + " " + "payment-status-pill is-waiting",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "jsx-d5b486fc11cf5d30" + " " + "payment-status-dot"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                            lineNumber: 2563,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "jsx-d5b486fc11cf5d30",
                                            children: "Ожидание оплаты"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                            lineNumber: 2564,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                    lineNumber: 2562,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                lineNumber: 2561,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "jsx-d5b486fc11cf5d30" + " " + "payment-overlay-title",
                                children: "Открыто окно PayPal"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                lineNumber: 2568,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "jsx-d5b486fc11cf5d30" + " " + "payment-overlay-copy",
                                children: "После успешной оплаты PayPal перенаправит вас на страницу создания личного кабинета."
                            }, void 0, false, {
                                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                lineNumber: 2569,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-d5b486fc11cf5d30" + " " + "payment-overlay-note",
                                children: "Не закрывайте это окно, если оно вам не мешает. Попап останется открыт до тех пор, пока вы сами не нажмёте «Всё ок. Готово» или не закроете страницу."
                            }, void 0, false, {
                                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                lineNumber: 2572,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-d5b486fc11cf5d30" + " " + "payment-overlay-actions payment-overlay-actions-stacked",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: paymentRecoveryUrl,
                                        target: "_blank",
                                        rel: "noreferrer",
                                        className: "jsx-d5b486fc11cf5d30" + " " + "payment-overlay-btn payment-overlay-btn-secondary payment-overlay-btn-link",
                                        children: "Я случайно закрыл PayPal после оплаты"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                        lineNumber: 2577,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: closePaymentOverlay,
                                        className: "jsx-d5b486fc11cf5d30" + " " + "payment-overlay-btn payment-overlay-btn-primary",
                                        children: "Всё ок. Готово"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                        lineNumber: 2585,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                lineNumber: 2576,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                        lineNumber: 2560,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                lineNumber: 2558,
                columnNumber: 9
            }, this),
            faqOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                role: "dialog",
                "aria-modal": "true",
                "aria-label": "FAQ",
                className: "jsx-d5b486fc11cf5d30" + " " + "faq-modal-root",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        "aria-label": "Закрыть FAQ",
                        onClick: ()=>setFaqOpen(false),
                        className: "jsx-d5b486fc11cf5d30" + " " + "faq-backdrop"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                        lineNumber: 2599,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-d5b486fc11cf5d30" + " " + "faq-modal-card",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-d5b486fc11cf5d30" + " " + "faq-modal-head",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-d5b486fc11cf5d30",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-d5b486fc11cf5d30" + " " + "faq-modal-kicker",
                                                children: "FAQ"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                lineNumber: 2608,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "jsx-d5b486fc11cf5d30" + " " + "faq-modal-title",
                                                children: "Частые вопросы"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                lineNumber: 2609,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                        lineNumber: 2607,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>setFaqOpen(false),
                                        className: "jsx-d5b486fc11cf5d30" + " " + "faq-close-btn",
                                        children: "✕"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                        lineNumber: 2611,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                lineNumber: 2606,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-d5b486fc11cf5d30" + " " + "faq-modal-list",
                                children: faqItems.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-d5b486fc11cf5d30" + " " + "faq-item",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-d5b486fc11cf5d30" + " " + "faq-item-q",
                                                children: item.q
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                lineNumber: 2619,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-d5b486fc11cf5d30" + " " + "faq-item-a",
                                                children: item.a
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                                lineNumber: 2620,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, item.q, true, {
                                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                        lineNumber: 2618,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                                lineNumber: 2616,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                        lineNumber: 2605,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
                lineNumber: 2598,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$revenue_snapshot2026$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                id: "d5b486fc11cf5d30",
                children: 'html{scroll-behavior:smooth}body{color:#fefefe;background:#0a1526;overflow-x:hidden}img{max-width:100%}.page-shell{color:#fefefe;background:#0a1526;min-height:100vh;position:relative;overflow:clip}.page-background{pointer-events:none;z-index:0;background-color:#0000;background-image:radial-gradient(circle at 18% 22%,#7086ff1f,#0000 26%),radial-gradient(circle at 82% 18%,#ffffff0d,#0000 22%),radial-gradient(circle at 62% 70%,#8761ff14,#0000 22%),linear-gradient(130deg,#0a1526 0%,#0c1830 34%,#0a1526 68%,#121f39 100%);background-position:0 0,0 0,0 0,0 0;background-repeat:repeat,repeat,repeat,repeat;background-size:140% 140%;background-attachment:scroll,scroll,scroll,scroll;background-origin:padding-box,padding-box,padding-box,padding-box;background-clip:border-box,border-box,border-box,border-box;animation:none;position:fixed;inset:0}.content-wrap{z-index:2;width:100%;max-width:1440px;margin:0 auto;padding:108px 20px 40px;position:relative}.content-wrap>*,.hero-grid>*,.preview-grid>*,.analysis-grid>*,.cta-card>*,.stage-card-bottom-inner>*,.journey-compact>*{min-width:0}.header-fixed{z-index:80;-webkit-backdrop-filter:blur(18px);background:linear-gradient(#041027eb,#0410279e);border-bottom:1px solid #ffffff0f;position:fixed;inset:0 0 auto}.header-open .header-inner{background:#041027f0;border-color:#ffffff1f}.header-inner{border-radius:0 0 22px 22px;grid-template-columns:auto 1fr auto;align-items:center;gap:18px;max-width:1400px;margin:0 auto;padding:14px 16px 12px;display:grid}.logo-link{align-items:center;display:inline-flex}.header-nav{flex-wrap:wrap;justify-content:center;align-items:center;gap:16px;min-width:0;display:flex}.header-link{color:#ffffffeb;white-space:nowrap;letter-spacing:-.02em;font-size:13px;font-weight:600;line-height:1;text-decoration:none;transition:opacity .2s,transform .2s,color .2s}.header-link:hover{opacity:1;color:#fff;transform:translateY(-1px)}.header-actions{flex-wrap:wrap;justify-content:flex-end;align-items:center;gap:8px;display:flex}.header-cta{white-space:nowrap;min-height:40px;padding:0 18px;font-size:13px}.header-faq-btn,.header-login-btn{color:#fff;background:#ffffff0f;border:1px solid #ffffff24;border-radius:999px;justify-content:center;align-items:center;min-height:40px;padding:0 16px;font-size:13px;font-weight:700;text-decoration:none;display:inline-flex;box-shadow:inset 0 1px #ffffff14}.header-faq-btn{cursor:pointer}.header-faq-btn:hover,.header-login-btn:hover{background:#ffffff17;transform:translateY(-1px)}.faq-modal-root{z-index:120;place-items:center;padding:20px;display:grid;position:fixed;inset:0}.faq-backdrop{-webkit-backdrop-filter:blur(14px);cursor:pointer;background:#030a16b8;border:0;position:absolute;inset:0}.faq-modal-card{z-index:1;background:linear-gradient(#101b31eb,#0b1426e0);border:1px solid #ffffff24;border-radius:28px;width:min(760px,100%);max-height:min(82vh,860px);padding:24px;position:relative;overflow:auto;box-shadow:0 30px 80px #00000057,inset 0 1px #ffffff14}.faq-modal-head{justify-content:space-between;align-items:flex-start;gap:16px;margin-bottom:18px;display:flex}.faq-modal-kicker{color:#f7d237;letter-spacing:.14em;text-transform:uppercase;font-size:12px;font-weight:800}.faq-modal-title{letter-spacing:-.05em;margin:8px 0 0;font-size:max(28px,min(4vw,42px));font-weight:700;line-height:.95}.faq-close-btn{color:#fff;cursor:pointer;background:#ffffff0f;border:1px solid #ffffff24;border-radius:999px;width:40px;height:40px;font-size:18px;line-height:1}.faq-modal-list{gap:12px;display:grid}.faq-item{background:#ffffff0d;border:1px solid #ffffff14;border-radius:20px;padding:16px 18px}.faq-item-q{color:#fff;font-size:16px;font-weight:700}.faq-item-a{color:#ffffffb8;margin-top:8px;font-size:14px;line-height:1.55}.header-burger{background:#0b1d3a99;border:1px solid #ffffff1f;border-radius:14px;flex-direction:column;justify-content:center;align-items:center;gap:4px;width:44px;height:44px;padding:0;display:none;box-shadow:inset 0 1px #ffffff14}.header-burger span{background:#fff;border-radius:999px;width:18px;height:2px;transition:transform .22s,opacity .22s}.header-burger.is-open span:first-child{transform:translateY(6px)rotate(45deg)}.header-burger.is-open span:nth-child(2){opacity:0}.header-burger.is-open span:nth-child(3){transform:translateY(-6px)rotate(-45deg)}.header-pill,.hero-highlight-chip{color:#0b1d3a;background:linear-gradient(135deg,#f7d237fa,#f7d237e0);border-radius:999px;justify-content:center;align-items:center;min-height:34px;padding:0 14px;font-size:12px;font-weight:700;text-decoration:none;display:inline-flex;box-shadow:0 10px 24px #f7d23729}.hero-tag{color:#ffffffc7;background:#e0e1e312;border:1px solid #ffffff1f;border-radius:999px;justify-content:center;align-items:center;min-height:34px;padding:0 14px;font-size:12px;font-weight:700;text-decoration:none;display:inline-flex;box-shadow:inset 0 1px #ffffff0d}.logo-main{object-fit:contain;object-position:left center;flex-shrink:0;width:250px;height:62px;display:block}.aurora{filter:blur(110px);opacity:.26;border-radius:999px;position:absolute}.aurora-1{background:#507fff38;width:380px;height:380px;top:40px;left:-80px}.aurora-2{background:#f7d2371f;width:300px;height:300px;top:80px;right:5%}.aurora-3{background:#5872ff29;width:360px;height:360px;top:36%;left:26%}.aurora-4{background:#ffffff14;width:300px;height:300px;bottom:12%;right:10%}.line-grid{display:none}.vignette{background:radial-gradient(circle,#0000 42%,#0a15263d 72%,#0a1526bd 100%);position:absolute;inset:0}.glass-card{isolation:isolate;-webkit-backdrop-filter:blur(42px)saturate(155%);background:linear-gradient(#e0e1e30e 0%,#e0e1e306 100%);border:1px solid #d6dce824;border-radius:24px;padding:20px;position:relative;overflow:hidden;box-shadow:inset 0 1px #ffffff24,inset 0 -1px #ffffff06,0 18px 44px #00000029}.glass-card:before{content:"";pointer-events:none;z-index:0;opacity:.75;background:linear-gradient(115deg,#ffffff1a 0%,#ffffff06 18%,#ffffff03 34%,#ffffff0d 48%,#ffffff03 64%,#ffffff0f 82%,#ffffff05 100%);position:absolute;inset:0}.glass-card:after{content:"";pointer-events:none;z-index:0;opacity:.12;mix-blend-mode:soft-light;background-image:radial-gradient(circle at 20% 20%,#ffffff38 0 .8px,#0000 1px),radial-gradient(circle at 70% 30%,#ffffff29 0 .8px,#0000 1px),radial-gradient(circle at 35% 75%,#ffffff2e 0 .7px,#0000 .9px),radial-gradient(circle at 80% 80%,#ffffff1f 0 .7px,#0000 .9px);background-size:16px 16px,19px 19px,15px 15px,21px 21px;position:absolute;inset:0}.glass-card>*,.glare-card>*,.glare-card-lite>*{z-index:1;position:relative}.soft-glow{box-shadow:inset 0 1px #ffffff2e,inset 0 -1px #ffffff0a,0 18px 50px #0000002e}.glare-card:before,.glare-card-lite:before{content:"";filter:blur(44px);pointer-events:none;z-index:0;opacity:.8;background:radial-gradient(circle,#ffffff1a 0%,#ffffff09 38%,#0000 76%);border-radius:999px;width:34%;height:34%;position:absolute;top:12%;left:14%}.premium-glass{isolation:isolate;position:relative;overflow:hidden}.premium-glass:before{content:"";z-index:0;pointer-events:none;opacity:.18;filter:blur(18px);background:repeating-linear-gradient(105deg,#ffffff0d 0 2px,#0000 12px 42px);animation:14s linear infinite premiumGlassShift;position:absolute;inset:-20%}.premium-glass:after{content:"";z-index:0;pointer-events:none;filter:blur(42px);opacity:.95;mix-blend-mode:screen;background:radial-gradient(circle at 30% 40%,#7dffdc57 0%,#0000 42%),radial-gradient(circle at 68%,#8278ff52 0%,#0000 44%),radial-gradient(circle at 48% 44%,#ffffff1f 0%,#0000 36%);height:42%;position:absolute;inset:auto -10% -18%}.section-head{margin-bottom:22px}.section-kicker{color:#f7d237;letter-spacing:-.03em;margin-bottom:10px;font-size:16px;font-weight:700;line-height:1.05}.section-title{letter-spacing:-.055em;color:#fff;text-wrap:balance;max-width:760px;margin:0;font-size:max(34px,min(3.8vw,58px));font-weight:700;line-height:.96}.analysis-section-title{max-width:780px}.section-copy{color:#ffffffb3;max-width:840px;margin-top:16px;font-size:18px;line-height:1}.hero-section{border-radius:36px;min-height:800px;padding:34px 28px 30px;position:relative;overflow:hidden}.hero-section:before{content:"";z-index:0;transform-origin:50%;background-image:url(/hero.svg);background-position:50%;background-repeat:no-repeat;background-size:cover;position:absolute;inset:0}.hero-section:after{content:"";z-index:1;background:linear-gradient(90deg,#0410273d 0%,#0410271a 38%,#0410270a 62%,#04102714 100%);position:absolute;inset:0}.hero-grid{gap:22px;display:grid}.hero-grid-frame{z-index:2;grid-template-columns:minmax(0,1fr) minmax(520px,.92fr);align-items:start;position:relative}.hero-left{flex-direction:column;min-height:100%;padding:4px 6px 8px;display:flex}.hero-main-title{letter-spacing:-.07em;color:#fff;max-width:860px;margin:0;font-size:max(62px,min(6.4vw,110px));font-weight:700;line-height:.9}.hero-main-subtitle{color:#fff;letter-spacing:-.045em;margin-top:22px;font-size:max(22px,min(2vw,30px));font-weight:500;line-height:.98}.hero-main-copy{color:#ffffffc7;max-width:620px;margin-top:22px;font-size:22px;line-height:1}.hero-highlights-row{flex-wrap:wrap;gap:10px;margin-top:28px;display:flex}.hero-actions-row{flex-wrap:wrap;gap:12px;margin-top:26px;display:flex}.tg-gradient-btn{color:#fff;background:linear-gradient(90deg,#47b6f6 0%,#5da7ff 22%,#7c84ff 48%,#9c6dff 72%,#c25cf3 100%) 0 0/220% 220%;border:1px solid #ffffff29;border-radius:999px;justify-content:center;align-items:center;min-height:46px;padding:0 20px;font-weight:700;text-decoration:none;animation:none;display:inline-flex;position:relative;overflow:hidden;box-shadow:0 10px 30px #4760ff38,inset 0 1px #ffffff2e}.tg-gradient-btn:before{content:"";background:linear-gradient(120deg,#0000 0%,#ffffff38 25%,#0000 50%);animation:none;position:absolute;inset:0;transform:translate(-130%)}.tg-gradient-btn>*{z-index:1;position:relative}.tg-gradient-btn:hover{transform:translateY(-1px)}.ghost-link{color:#fefefe;background:#e0e1e312;border:1px solid #ffffff1f;border-radius:999px;justify-content:center;align-items:center;min-height:46px;padding:0 20px;text-decoration:none;display:inline-flex}.ghost-link-dark{background:#0b1d3a6b}.hero-chart-float{width:100%;max-width:620px;margin-left:auto}.hero-chart-float-title{color:#ffffffa3;text-transform:uppercase;letter-spacing:.14em;margin-bottom:12px;font-size:12px}.hero-levers-inline{flex-wrap:wrap;gap:8px;margin-bottom:12px;display:flex}.hero-tag{cursor:pointer;border:1px solid #ffffff1f;transition:background .22s,color .22s,box-shadow .22s,border-color .22s}.hero-tag-active{color:#0b1d3a;background:linear-gradient(135deg,#f7d237fa,#f7d237e0);border-color:#f7d2373d;box-shadow:0 0 0 1px #f7d23729,0 14px 28px #f7d2372e}.hero-chart-box{-webkit-backdrop-filter:blur(26px)saturate(145%);background:linear-gradient(135deg,#e0e1e317 0%,#e0e1e30f 45%,#e0e1e30a 100%);border:1px solid #ffffff24;border-radius:28px;flex-direction:column;padding:14px;display:flex;position:relative;overflow:hidden;box-shadow:inset 0 1px #ffffff2e,inset 0 -1px #ffffff0d,0 18px 50px #0000003d}.hero-chart-metrics-row{grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;margin-bottom:12px;display:grid}.hero-metric-square{background:#ffffff0a;border:1px solid #ffffff14;border-radius:18px;min-height:78px;padding:12px}.hero-metric-square span,.bar-chart-label,.bar-chart-scale span,.hero-money-card span,.hero-money-card small{color:#ffffff94;font-size:12px}.hero-metric-square strong,.hero-money-card strong{margin-top:8px;font-size:18px;line-height:1.05;display:block}.bar-chart-wrap{background:#ffffff09;border:1px solid #ffffff14;border-radius:24px;padding:16px 14px 14px;position:relative}.bar-chart-scale{grid-template-columns:repeat(5,minmax(0,1fr));margin-bottom:18px;display:grid}.bar-chart-grid{background-image:linear-gradient(90deg,#ffffff0d 1px,#0000 1px);background-size:25% 100%;position:absolute;inset:40px 14px 14px}.bar-chart-columns-horizontal{gap:12px;display:grid;position:relative}.bar-chart-row-top{justify-content:space-between;gap:12px;margin-bottom:7px;display:flex}.bar-chart-value{color:#ffffffd1;font-size:13px}.bar-chart-bar-shell-horizontal{background:#ffffff0d;border-radius:999px;height:14px;overflow:hidden}.bar-chart-bar-horizontal{border-radius:inherit;height:100%;transition:width .8s,transform .8s}.bar-good{background:linear-gradient(90deg,#f4dd72fa,#ffec95fa)}.bar-bad{background:linear-gradient(90deg,#7a95ffe0,#acb7ffe0)}.hero-chart-bottom{z-index:3;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin-top:12px;display:grid;position:relative}.hero-money-card{-webkit-backdrop-filter:blur(18px)saturate(130%);background:#081228bd;border:1px solid #ffffff24;border-radius:18px;padding:14px;box-shadow:inset 0 1px #ffffff14,0 18px 36px #00000029}.hero-active-note{color:#ffffffc2;z-index:3;background:#081228ad;border:1px solid #ffffff1f;border-radius:18px;align-items:center;gap:10px;margin-top:12px;padding:12px 14px;font-size:13px;line-height:1.45;display:flex;position:relative}.hero-active-note-dot{background:#f7d237;border-radius:999px;flex-shrink:0;width:10px;height:10px;animation:none;box-shadow:0 0 16px #f7d2376b}.hero-money-card-muted{box-shadow:inset 0 1px #ffffff0f;background:#0a122494!important;border:1px solid #c8c8c829!important}.journey-scroll-shell{min-height:180vh;position:relative}.journey-scroll-sticky{padding-bottom:12px;position:sticky;top:50px;overflow:hidden}.journey-scroll-grid{border-bottom:1px solid #ffffff14;grid-template-columns:repeat(3,minmax(0,1fr));gap:0;margin-top:10px;display:grid}.journey-stage-card{border-top:1px solid #ffffff14;border-left:1px solid #ffffff14;min-height:252px;padding:16px 24px 24px;transition:opacity .38s,filter .38s,transform .38s;position:relative}.journey-stage-card:nth-child(-n+3){border-top:none}.journey-stage-card:nth-child(3n+1){border-left:none}.journey-stage-card.is-muted{opacity:.24;filter:blur(8px);transform:translateY(10px)}.journey-stage-card.is-active{opacity:1;filter:blur();transform:translateY(0)}.journey-stage-number{color:#ffffffb8;letter-spacing:-.05em;font-size:max(34px,min(2.8vw,56px));font-weight:500;line-height:.9}.journey-stage-title{color:#fff;letter-spacing:-.05em;max-width:260px;margin-top:52px;font-size:max(20px,min(2vw,34px));font-weight:600;line-height:.96}.journey-stage-text{color:#ffffffad;max-width:286px;margin-top:14px;font-size:15px;line-height:1.5}.journey-stage-link{color:#f7d237;align-items:center;margin-top:16px;font-size:16px;font-weight:700;text-decoration:none;display:inline-flex}.journey-progress-wrap{z-index:2;height:26px;margin:18px 0 8px;position:relative}.journey-progress-shadow-spacer,.journey-progress-wrap-legacy{display:none}.journey-progress-wrap:before{content:"";background:#ffffff14;border-radius:999px;height:4px;position:absolute;top:11px;left:0;right:0}.journey-progress-fill{background:linear-gradient(90deg,#8278fff2,#bc7dfff2);border-radius:999px;height:4px;transition:width .32s;position:absolute;top:11px;left:0;box-shadow:0 0 26px #8278ff80}.journey-progress-dots{grid-template-columns:repeat(6,minmax(0,1fr));height:100%;display:grid;position:relative}.journey-progress-dot{background:#3f325f;border:3px solid #6e5fa2;border-radius:999px;place-self:center;width:18px;height:18px;transition:background .24s,border-color .24s,box-shadow .24s;box-shadow:0 0 0 6px #6f60a614}.journey-progress-dot.is-active{background:#8d79e6;border-color:#5e4f98;box-shadow:0 0 0 6px #8d79e62e}.journey-demo-bridge{justify-content:space-between;align-items:center;gap:16px;margin-top:18px;padding:0 2px;display:flex}.journey-demo-copy{color:#ffffffad;max-width:760px;font-size:16px;line-height:1.45}.preview-grid{grid-template-columns:minmax(0,1fr) 340px;align-items:start;gap:24px;display:grid}.preview-grid-strategy-layout{grid-template-columns:minmax(0,1fr) 340px;align-items:start;gap:26px}.preview-main-column-structured{min-width:0}.preview-panel-label{color:#ffffffe6;margin-bottom:14px;font-size:15px;font-weight:600}.preview-panel-label-muted{color:#ffffffbd}.preview-inline-inputs{grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;max-width:1120px;margin-bottom:28px;display:grid}.preview-inline-input-shell{background:#e0e1e314;border:1px solid #ffffff1a;border-radius:22px;justify-content:space-between;align-items:center;gap:18px;min-height:76px;padding:0 22px;display:flex;box-shadow:inset 0 1px #ffffff0f}.preview-inline-input{color:#fff;letter-spacing:-.02em;background:0 0;border:none;outline:none;width:120px;min-width:120px;font-size:19px;font-weight:700;line-height:1}.preview-inline-input::placeholder{color:#ffffffeb;opacity:1}.preview-inline-input-meta{color:#ffffffe6;letter-spacing:-.02em;text-align:left;font-size:17px;font-weight:500;line-height:1.1}.preview-section-headline{justify-content:space-between;align-items:flex-start;gap:14px;margin-bottom:14px;display:flex}.strategy-meta-row{flex-wrap:wrap;justify-content:flex-end;gap:8px;display:flex}.strategy-meta-row.is-soft{justify-content:flex-start}.strategy-meta-badge{background:#f7d23724;border:1px solid #f7d23742;border-radius:999px;align-items:center;gap:8px;min-height:32px;padding:0 10px;display:inline-flex}.strategy-meta-badge-label{color:#f7d237c2;letter-spacing:.04em;font-size:11px;font-weight:700}.strategy-meta-badge-value{color:#fff8d4;font-size:12px;font-weight:700}.strategy-chip-row{flex-wrap:wrap;gap:18px;margin-bottom:6px;display:flex}.strategy-chip{color:#ffffffe0;letter-spacing:-.01em;cursor:pointer;background:#ffffff0f;border:1px solid #ffffff1f;border-radius:16px;align-items:center;gap:12px;min-height:48px;padding:0 20px;font-size:14px;font-weight:500;transition:background .2s,border-color .2s,transform .2s;display:inline-flex}.strategy-chip:hover{background:#ffffff17;border-color:#ffffff2e;transform:translateY(-1px)}.strategy-chip.is-active{background:#ffffff1a;border-color:#f7d23742}.strategy-chip-dot{width:10px;height:10px;box-shadow:none;background:0 0;border:1px solid #ffffff3d;border-radius:999px;flex:none}.strategy-chip-dot.is-active{background:#f7d237;border-color:#f7d237;box-shadow:0 0 12px #f7d23752}.strategy-chip-label{text-align:left;flex:auto}.dashboard-grid-structured{grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;display:grid}.dashboard-metric-slot{min-width:0}.model-grid-structured{grid-template-columns:1.18fr .95fr .72fr 1fr;gap:18px;display:grid}.preview-controls-head{justify-content:space-between;align-items:center;gap:16px;display:flex}.preview-controls-head-left{flex-direction:column;align-items:flex-start;gap:10px;display:flex}.control-levers-grid{grid-template-columns:repeat(4,minmax(0,1fr));gap:0;margin-top:18px;display:grid}.control-lever{flex-direction:column;justify-content:flex-end;min-height:256px;padding:0 22px;display:flex;position:relative}.control-lever+.control-lever{border-left:1px solid #ffffff38}.control-lever-head{justify-content:space-between;align-items:flex-start;gap:12px;display:flex;position:absolute;top:0;left:22px;right:22px}.control-lever-title{color:#fff;letter-spacing:-.03em;max-width:220px;font-size:18px;font-weight:700;line-height:1.1}.control-tooltip-trigger{color:#ffffffeb;cursor:pointer;background:0 0;border:none;flex:none;width:28px;height:28px;padding:0;position:relative}.control-tooltip-trigger svg{width:24px;height:24px}.control-tooltip{color:#ffffffd1;text-align:left;opacity:0;visibility:hidden;z-index:30;pointer-events:none;background:#0a1224f7;border:1px solid #ffffff29;border-radius:16px;gap:6px;width:min(280px,42vw);padding:14px 15px;font-size:12px;line-height:1.55;transition:all .18s;display:grid;position:absolute;top:calc(100% + 10px);right:0;transform:translateY(6px);box-shadow:0 18px 36px #00000052}.control-tooltip.is-open{opacity:1;visibility:visible;transform:translateY(0)}.control-scale-row{color:#ffffffd1;justify-content:space-between;align-items:center;gap:16px;margin-top:auto;margin-bottom:10px;font-size:13px;font-weight:700;display:flex}.control-range-input{width:100%;margin:0}.control-value{color:#fff;margin-top:24px;font-size:18px;font-weight:700;line-height:1}.preview-side-reserve-window{position:sticky;top:96px}.preview-mobile-fab,.preview-mobile-popup-root,.preview-input-intro{display:none}.preview-grid-advanced{display:contents}.metric-card,.model-card{min-height:132px;padding:16px}.metric-head,.model-head{justify-content:space-between;align-items:flex-start;gap:10px;display:flex}.metric-label,.model-label{color:#ffffffb3;font-size:13px;font-weight:600}.metric-flag{color:#ffffff9e;background:#ffffff0a;border:1px solid #ffffff14;border-radius:999px;margin-top:8px;padding:4px 8px;font-size:11px;line-height:1;display:inline-flex}.flag-good{color:#bbf7d0;background:#22c55e14;border-color:#bbf7d02e}.flag-bad{color:#fecdd3;background:#fb718514;border-color:#fb71852e}.metric-delta-top,.model-delta-top{font-size:12px;font-weight:700}.metric-main-value,.model-main-value{letter-spacing:-.04em;margin-top:22px;font-size:max(22px,min(2vw,30px));font-weight:700;line-height:.98}.preview-actions-inline{align-items:center;gap:16px;display:flex}.reset-link{color:#ffffff8a;cursor:pointer;background:0 0;border:none;padding:0;font-size:13px}.reset-link:disabled{opacity:.35;cursor:not-allowed}.preview-side{position:sticky;top:100px}.preview-side-advanced{top:96px}.preview-reserve-box{padding:18px}.preview-side-note{border-radius:20px;padding:16px}.preview-side-note-title{color:#fff;font-size:14px;font-weight:700;line-height:1.2}.preview-side-note-list{gap:10px;margin-top:12px;display:grid}.preview-side-note-item{color:#ffffffb8;grid-template-columns:12px 1fr;align-items:start;gap:10px;font-size:13px;line-height:1.5;display:grid}.preview-side-note-bullet{color:#f7d237;line-height:1.2}.reserve-kicker{color:#f7d237;font-size:13px;font-weight:700}.hero-preview-box,.side-note-card,.cta-box{background:#ffffff0a;border:1px solid #ffffff14;border-radius:20px;padding:16px}.reserve-amount{letter-spacing:-.04em;color:#f7d237;font-size:max(22px,min(2vw,30px));font-weight:700;line-height:.98}.reserve-amount span{color:#ffffff9e;font-size:inherit;font-weight:inherit}.reserve-strategy-copy{gap:10px;margin-top:18px;display:grid}.reserve-strategy-item{color:#ffffffbd;grid-template-columns:10px 1fr;align-items:start;gap:10px;font-size:13px;line-height:1.5;display:grid}.reserve-strategy-bullet{color:#f7d237;line-height:1.2}.results-grid-2x2{grid-template-columns:repeat(2,minmax(0,min(100%,470px)));justify-content:center;gap:14px;display:grid}.result-doc-card{perspective:1400px;min-height:236px}.result-doc-card-inner{height:100%;min-height:236px;transform-style:preserve-3d;background:linear-gradient(#e0e1e31a,#e0e1e312);border:1px solid #ffffff1f;border-radius:28px;padding:20px;transition:transform .18s ease-out}.result-doc-top{justify-content:flex-start;gap:10px;margin-bottom:24px;display:flex}.result-doc-tab{color:#0b1d3a;letter-spacing:.1em;text-transform:uppercase;background:linear-gradient(135deg,#f7d237fa,#f7d237e6);border:1px solid #f7d2373d;border-radius:999px;align-items:center;min-height:30px;padding:0 12px;font-size:11px;font-weight:800;display:inline-flex}.result-doc-title{letter-spacing:-.04em;font-size:28px;font-weight:600;line-height:.98}.result-doc-text{color:#ffffffb8;max-width:92%;margin-top:16px;font-size:15px;line-height:1.55}.results-bottom-stack{flex-direction:column;align-items:center;gap:18px;margin-top:18px;display:flex}.results-roadmap-note{text-align:center;color:#ffffffad;max-width:860px;font-size:15px;line-height:1.65}.results-roadmap-note span{color:#f7d237;font-weight:600}.result-doc-start-btn{color:#fff;background:linear-gradient(90deg,#47b6f6 0%,#5da7ff 22%,#7c84ff 48%,#9c6dff 72%,#c25cf3 100%) 0 0/220% 220%;border:1px solid #ffffff29;border-radius:999px;justify-content:center;align-items:center;min-height:46px;padding:0 22px;font-weight:700;text-decoration:none;animation:none;display:inline-flex;box-shadow:0 10px 30px #4760ff38,inset 0 1px #ffffff2e}.industries-pills{flex-wrap:wrap;align-items:center;gap:10px;margin-bottom:20px;display:flex}.industries-pills-carousel{justify-content:space-between;align-items:center;gap:16px}.industries-pills-left{flex-wrap:wrap;align-items:center;gap:10px;display:flex}.stage-rotate-cue{color:#ffffffb8;-webkit-backdrop-filter:blur(24px);background:#ffffff09;border:1px solid #ffffff1c;border-radius:999px;justify-content:center;align-items:center;gap:10px;min-width:118px;height:44px;padding:0 14px;display:inline-flex;box-shadow:inset 0 1px #ffffff0d}.stage-rotate-cue-label{letter-spacing:.14em;text-transform:uppercase;color:#ffffff8a;font-size:11px}.stage-rotate-cue-right{margin-left:auto}.stage-rotate-cue svg{width:42px;height:22px}.industry-pill{color:#ffffff7a;background:#ffffff0a;border:1px solid #ffffff1f;border-radius:999px;justify-content:center;align-items:center;min-height:34px;padding:0 14px;font-size:12px;font-weight:700;display:inline-flex}.industry-pill-active{color:#0b1d3a;background:linear-gradient(135deg,#f7d237fa,#f7d237e0);border-color:#f7d23747}.industry-pill-selected{box-shadow:0 0 0 2px #f7d2372e,0 14px 30px #f7d23729}.stage-carousel-scene{perspective:2200px;touch-action:pan-y;-webkit-user-select:none;user-select:none;cursor:grab;flex-direction:column;justify-content:center;align-items:center;min-height:550px;display:flex;position:relative;overflow:hidden}.stage-carousel-mobile-rail{display:none}.stage-carousel-scene.is-dragging{cursor:grabbing}.stage-carousel-drum{width:100%;height:456px;transform-style:preserve-3d;position:relative}.stage-carousel-item-free{width:min(580px,50vw);transform-style:preserve-3d;will-change:transform,opacity,filter;transition:transform 40ms linear,opacity 40ms linear,filter 40ms linear;position:absolute;top:18px;left:50%}.stage-card-analytics{-webkit-backdrop-filter:blur(68px)saturate(155%);background:linear-gradient(#101b3175 0%,#0b142657 100%);border:1px solid #ffffff1c;border-radius:30px;flex-direction:column;min-height:354px;display:flex;position:relative;overflow:hidden;box-shadow:0 24px 54px #00000038,inset 0 1px #ffffff0f}.stage-card-analytics.is-front{background:linear-gradient(#101b31b8 0%,#0b142694 100%);border-color:#ffffff2e;box-shadow:0 30px 70px #00000047,inset 0 1px #ffffff1a}.stage-card-analytics.is-front .stage-card-top-panel{background:linear-gradient(135deg,#ffffff1c 0%,#ffffff0d 100%)}.stage-carousel-item.is-industry-match{opacity:1!important}.stage-carousel-item.is-industry-match .stage-card-analytics{border-color:#f7d23738;box-shadow:0 24px 60px #f7d23714,0 24px 54px #00000038,inset 0 1px #ffffff14}.stage-carousel-item.is-industry-dim{opacity:.2!important}.stage-carousel-mobile-slide.is-industry-match .stage-card-analytics{border-color:#f7d23738;box-shadow:0 24px 60px #f7d23714,0 24px 54px #00000038,inset 0 1px #ffffff14}.stage-carousel-mobile-slide.is-industry-dim{opacity:.48}.stage-card-analytics:after{display:none}.stage-card-top-panel{background:linear-gradient(135deg,#ffffff12 0%,#ffffff06 100%);grid-template-columns:minmax(0,1fr) auto;gap:18px;min-height:184px;padding:20px 20px 16px;display:grid}.stage-card-copy{flex-direction:column;gap:14px;min-width:0;display:flex}.stage-copy-block h4{color:#fffffff5;letter-spacing:-.03em;margin:0;font-size:20px;font-weight:500;line-height:1.04}.stage-copy-block p{color:#ffffffd1;margin:8px 0 0;font-size:13px;line-height:1.5}.stage-card-heading{flex-direction:column;justify-content:flex-start;align-items:flex-end;min-width:130px;display:flex}.stage-card-heading span{text-transform:uppercase;letter-spacing:.16em;color:#ffffff80;font-size:11px}.stage-card-heading strong{letter-spacing:-.06em;margin-top:6px;font-size:42px;line-height:.92}.stage-card-bottom-panel{flex:1;padding:16px 18px 18px;position:relative}.stage-card-bottom-inner{grid-template-columns:1fr 1fr;gap:18px;min-height:100%;display:grid}.compact-metrics-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;display:grid}.stage-inline-metric{-webkit-backdrop-filter:blur(16px);backdrop-filter:blur(16px);background:#fff1;border:1px solid #ffffff1a;border-radius:18px;padding:12px}.stage-ring-label{color:#ffffff8f;text-transform:uppercase;letter-spacing:.12em;font-size:11px}.stage-inline-metric-value{letter-spacing:-.04em;margin-top:8px;font-size:22px;font-weight:700;line-height:1}.stage-bars-title{letter-spacing:-.06em;font-size:24px;font-weight:700;line-height:1}.stage-bars-wrap{gap:12px;margin-top:14px;display:grid}.stage-bar-group{max-width:none}.stage-bar-label{letter-spacing:.12em;text-transform:uppercase;color:#ffffff85;margin-bottom:8px;font-size:11px}.stage-bar-stack{gap:8px;display:grid}.stage-bar-track{background:#ffffff0f;border-radius:999px;height:16px;overflow:hidden}.stage-bar-track-thin{height:10px}.stage-bar-fill{border-radius:inherit;height:100%}.stage-bar-fill-fact{background:linear-gradient(90deg,#f7d237f5,#ffe78af5)}.stage-bar-fill-plan{background:linear-gradient(90deg,#8278ffc2,#acb7ffd1)}.stage-card-watermark-icon{display:none}.stage-lite-wrap{flex-direction:column;gap:18px;display:flex}.stage-lite-card{background:linear-gradient(#101b3194,#0b14266b);border:1px solid #ffffff1f;border-radius:30px;padding:24px;transition:opacity .3s,transform .3s}.stage-lite-head{justify-content:space-between;align-items:flex-start;gap:16px;display:flex}.stage-lite-kicker{color:#ffffff8f;letter-spacing:.14em;text-transform:uppercase;font-size:12px}.stage-lite-title{letter-spacing:-.05em;margin:8px 0 0;font-size:max(44px,min(5vw,64px));line-height:.95}.stage-lite-stage-chip{color:#f7d237;background:#f7d2371f;border:1px solid #f7d2373d;border-radius:999px;align-items:center;min-height:34px;margin-top:14px;padding:0 14px;font-size:12px;font-weight:700;display:inline-flex}.stage-lite-nav{gap:10px;display:flex}.stage-lite-arrow{color:#fff;background:#ffffff0d;border:1px solid #ffffff1f;border-radius:999px;width:44px;height:44px}.stage-lite-copy-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:16px;margin-top:22px;display:grid}.stage-lite-copy-card{background:#ffffff0d;border:1px solid #ffffff14;border-radius:22px;padding:18px}.stage-lite-copy-title{margin-bottom:8px;font-size:20px;font-weight:700;line-height:1}.stage-lite-copy-card p{color:#ffffffbd;margin:0;font-size:15px;line-height:1.55}.stage-lite-bottom{grid-template-columns:1.1fr .9fr;gap:18px;margin-top:18px;display:grid}.stage-lite-metrics{grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;display:grid}.stage-lite-metric{background:#ffffff0e;border:1px solid #ffffff14;border-radius:18px;padding:14px}.stage-lite-metric-label{color:#ffffff8f;letter-spacing:.12em;text-transform:uppercase;font-size:11px}.stage-lite-metric-value{letter-spacing:-.04em;margin-top:8px;font-size:24px;font-weight:700;line-height:1}.stage-lite-bars-title{letter-spacing:-.05em;margin-bottom:14px;font-size:24px;font-weight:700;line-height:1}.stage-lite-bar-group+.stage-lite-bar-group{margin-top:12px}.stage-lite-bar-label{color:#ffffff8f;letter-spacing:.12em;text-transform:uppercase;margin-bottom:8px;font-size:11px}.stage-lite-bar-track{background:#ffffff0f;border-radius:999px;height:16px;overflow:hidden}.stage-lite-bar-track-thin{height:10px;margin-top:8px}.stage-lite-bar-fill{border-radius:inherit;height:100%}.stage-lite-bar-fill-fact{background:linear-gradient(90deg,#f7d237f5,#ffe78af5)}.stage-lite-bar-fill-plan{background:linear-gradient(90deg,#8278ffc2,#acb7ffd1)}.stage-scheme-grid{grid-template-columns:repeat(3,minmax(0,1fr));gap:0;min-height:360px;display:grid}.stage-scheme-card{background:radial-gradient(circle at 30% 20%,#8278ff1a,#0000 34%),linear-gradient(#101b3161,#0b14262e);border-top:1px solid #ffffff14;border-left:1px solid #ffffff14;padding:18px 20px 20px;transition:opacity .32s,filter .32s,transform .32s;position:relative}.analysis-stack{flex-direction:column;gap:22px;display:flex}.analysis-single-column{display:block}.analysis-left-title{letter-spacing:-.05em;max-width:680px;margin:0;font-size:max(30px,min(2.8vw,44px));font-weight:700;line-height:.98}.snapshot-builder-copy{color:#ffffffb3;max-width:680px;margin:14px 0 18px;font-size:16px;line-height:1.58}.analysis-right-card-plain{max-width:none;height:auto;min-height:100%;overflow:visible}.analysis-right-card-full{width:100%}.analysis-offers-mobile{display:none}.offer-switch-row{gap:10px;margin:0 0 16px;display:flex}.offer-switch-btn{color:#ffffffd6;background:#ffffff0f;border:1px solid #ffffff1f;border-radius:999px;justify-content:center;align-items:center;min-height:40px;padding:0 18px;font-size:13px;font-weight:700;display:inline-flex}.offer-switch-btn.is-active{color:#0b1d3a;background:linear-gradient(135deg,#f7d237fa,#f7d237e0);border-color:#f7d23747;box-shadow:0 12px 28px #f7d23724}.analysis-mobile-offer-card{margin-bottom:14px}.start-cards-row{grid-template-columns:repeat(2,minmax(0,1fr));align-items:start;gap:28px;display:grid}.start-cards-row-top{margin-bottom:0}.start-cards-row-horizontal{grid-template-columns:repeat(2,minmax(0,1fr));align-items:start;gap:22px;display:grid}.start-card{z-index:2;flex:1 1 0;position:relative}.start-card-inner{transform-style:preserve-3d;box-shadow:none;background:0 0;border:none;border-radius:32px;height:auto;min-height:0;transition:transform .18s ease-out;position:relative;overflow:visible}.start-card-inner picture{width:100%;display:block}.start-card-frame{object-fit:contain;object-position:center;opacity:1;z-index:2;border-radius:32px;width:100%;height:auto;display:block;position:relative}.start-card-overlay{pointer-events:none;z-index:4;background:0 0;padding:0;display:block;position:absolute;inset:0}.start-card-status-dot{display:none}.start-card-bottom-simple{z-index:5;display:block;position:absolute;inset:0}.start-card-title-chip{display:none}.start-card-price-float{top:var(--price-top,auto);right:var(--price-right,auto);bottom:var(--price-bottom,auto);left:var(--price-left,auto);z-index:6;color:#fff;letter-spacing:-.06em;text-shadow:0 10px 28px #00000038;font-size:max(52px,min(4.3vw,92px));font-weight:700;line-height:.92;position:absolute}.start-card-btn{top:var(--button-top,auto);right:var(--button-right,auto);bottom:var(--button-bottom,auto);left:var(--button-left,auto);width:var(--button-width,auto);z-index:6;pointer-events:auto;color:#fff;pointer-events:auto;white-space:nowrap;background:linear-gradient(90deg,#47b6f6 0%,#5da7ff 22%,#7c84ff 48%,#9c6dff 72%,#c25cf3 100%) 0 0/220% 220%;border:1px solid #ffffff29;border-radius:999px;justify-content:center;align-items:center;min-height:42px;padding:0 18px;font-weight:700;text-decoration:none;animation:none;display:inline-flex;position:absolute;box-shadow:0 10px 30px #4760ff38,inset 0 1px #ffffff2e}.tariff-comparison-grid{grid-template-columns:repeat(2,minmax(0,1fr));align-items:start;gap:28px;margin-top:20px;display:grid}.tariff-column{-webkit-backdrop-filter:blur(24px)saturate(135%);background:radial-gradient(circle at 18% 10%,#7ea3ff1f,#0000 24%),radial-gradient(circle at 72% 0,#7e6fff1a,#0000 28%),linear-gradient(#142344b8,#0815309e);border:1px solid #ffffff1f;border-radius:30px;padding:26px 26px 28px;position:relative;box-shadow:inset 0 1px #ffffff1a,0 18px 42px #00000024}.tariff-column-head{justify-content:space-between;align-items:flex-start;gap:12px;margin-bottom:20px;display:flex}.tariff-column-title{color:#f7d237;letter-spacing:-.03em;font-size:18px;font-weight:800;line-height:1}.tariff-attention{color:#f7d237;cursor:pointer;background:#f7d23714;border:1px solid #f7d23759;border-radius:999px;flex:none;justify-content:center;align-items:center;height:34px;min-height:34px;padding:0 14px;display:inline-flex;position:relative}.tariff-attention svg{width:16px;height:16px}.tariff-attention-label{letter-spacing:.08em;text-transform:uppercase;margin-left:6px;font-size:11px;line-height:1}.tariff-disclaimer-pop{color:#ffffffd6;text-align:left;opacity:0;visibility:hidden;z-index:20;pointer-events:none;background:#070f20f7;border:1px solid #f7d2373d;border-radius:16px;width:min(280px,72vw);padding:12px 14px;font-size:12px;line-height:1.5;transition:all .18s;position:absolute;top:calc(100% + 10px);right:0;transform:translateY(6px);box-shadow:0 18px 34px #00000061}.tariff-disclaimer-pop.is-open{opacity:1;visibility:visible;transform:translateY(0)}.tariff-disclaimer-line{display:block}.tariff-disclaimer-line+.tariff-disclaimer-line{margin-top:6px}.tariff-layout{grid-template-columns:210px 1px minmax(0,1fr);align-items:stretch;column-gap:30px;min-height:560px;display:grid}.tariff-menu{flex-direction:column;gap:14px;padding-top:8px;display:flex}.tariff-menu-btn{color:#e0e6f4eb;letter-spacing:-.02em;text-align:left;background:linear-gradient(#ffffff1a,#ffffff0f);border:1px solid #ffffff1f;border-radius:22px;justify-content:flex-start;align-items:center;min-height:58px;padding:0 18px;font-size:15px;font-weight:600;line-height:1.1;transition:background .22s,border-color .22s,transform .22s,box-shadow .22s,color .22s;display:inline-flex;box-shadow:inset 0 1px #ffffff1f,0 8px 18px #0000001f}.tariff-menu-btn:hover{background:linear-gradient(#ffffff21,#ffffff14);border-color:#ffffff2e;transform:translateY(-1px)}.tariff-menu-btn.is-active{color:#152342;background:linear-gradient(135deg,#f7d237fa,#f7d237e0);border-color:#f7d2377a;box-shadow:0 12px 28px #f7d2372e,inset 0 1px #ffffff38}.tariff-divider{background:linear-gradient(#ffffff05 0%,#ffffff94 8%,#ffffff5c 92%,#ffffff05 100%);justify-self:start;width:1px}.tariff-content{max-width:100%;padding-top:10px;padding-left:4px}.tariff-paragraph-content{max-width:100%}.tariff-paragraph-title{color:#fff;letter-spacing:-.05em;margin:0 0 22px;font-size:max(34px,min(3vw,54px));font-weight:500;line-height:.96}.tariff-check-list,.tariff-note-list{gap:16px;display:grid}.tariff-check-item,.tariff-note-item{color:#ffffffd1;grid-template-columns:22px 1fr;align-items:start;gap:14px;font-size:18px;line-height:1.55;display:grid}.tariff-check-mark{color:#f7d237;justify-content:center;align-items:center;width:22px;height:22px;margin-top:2px;display:inline-flex}.tariff-check-mark svg,.tariff-tag-icon svg{width:18px;height:18px}.tariff-note-bullet{color:#ffffff8f;line-height:1.2}.tariff-tag-list{flex-wrap:wrap;gap:10px;display:flex}.tariff-tag{border-radius:999px;align-items:center;gap:8px;min-height:42px;padding:10px 15px;font-size:14px;line-height:1.25;display:inline-flex}.tariff-tag-icon{flex:none;justify-content:center;align-items:center;width:16px;height:16px;display:inline-flex}.tariff-tag-soft{color:#ffffffd6;background:#ffffff0f;border:1px solid #ffffff1f}.tariff-tag-soft .tariff-tag-icon{color:#f7d237}.tariff-tag-icon-solid{color:#ffffffd6;background:#ffffff0f;border:1px solid #ffffff1f}.tariff-tag-icon-solid .tariff-tag-icon{color:#f7d237}.tariff-tag-yellow{color:#1a2133;background:#f7d237f5;border:1px solid #f7d237;font-weight:600}.tariff-tag-yellow .tariff-tag-icon{color:#1a2133}.tariff-panel-layout{grid-template-columns:244px minmax(0,1fr);align-items:stretch;gap:30px;min-height:520px;display:grid}.tariff-panel-nav{flex-direction:column;gap:16px;padding-top:2px;display:flex}.tariff-panel-tab{color:#ffffffe0;letter-spacing:-.01em;text-align:left;background:#ffffff14;border:1px solid #ffffff1f;border-radius:14px;justify-content:center;align-items:center;width:fit-content;max-width:100%;min-height:44px;padding:0 18px;font-size:13px;font-weight:600;line-height:1.1;transition:transform .2s,background .2s,border-color .2s,box-shadow .2s,color .2s;display:inline-flex;box-shadow:inset 0 1px #ffffff0f}.tariff-panel-tab:hover{background:#ffffff1a;border-color:#ffffff29;transform:translateY(-1px)}.tariff-panel-tab.is-active{color:#fff;background:#ffffff24;border-color:#ffffff2e;box-shadow:inset 0 1px #ffffff14,0 10px 20px #0000001f}.tariff-panel-content{border-left:1px solid #ffffff1f;flex-direction:column;gap:18px;min-width:0;padding:6px 0 6px 34px;display:flex}.tariff-panel-content-title{color:#fff;letter-spacing:-.04em;white-space:pre-line;max-width:520px;font-size:max(30px,min(2.8vw,52px));font-weight:500;line-height:.96}.tariff-panel-content .tariff-check-list{gap:14px}.tariff-panel-content .tariff-check-item,.tariff-panel-content .tariff-note-item{font-size:15px;line-height:1.62}.tariff-panel-content .tariff-tag-list{gap:12px}.tariff-panel-content .tariff-tag{min-height:40px;padding:9px 15px;font-size:13px}.stage-scheme-wrap{background:0 0;border:none;border-radius:0;padding:0;position:relative;overflow:visible}.stage-scheme-nav{justify-content:flex-end;gap:10px;margin-bottom:16px;display:flex}.stage-scheme-arrow{color:#fff;background:#ffffff0d;border:1px solid #ffffff24;border-radius:999px;width:46px;height:46px;font-size:22px;line-height:1;transition:transform .2s,background .2s,border-color .2s}.stage-scheme-arrow:hover{background:#ffffff14;border-color:#ffffff2e;transform:translateY(-1px)}.stage-scheme-viewport{overflow:hidden}.stage-scheme-track{will-change:transform;width:100%;transition:transform .82s cubic-bezier(.22,1,.36,1);display:flex}.stage-scheme-track.is-snap-reset{transition:none}.stage-scheme-slide{flex:0 0 33.3333%;min-width:33.3333%}.stage-scheme-card{background:radial-gradient(circle at 30% 20%,#8278ff1a,#0000 34%),linear-gradient(#101b3161,#0b14262e);border-top:1px solid #ffffff14;border-left:1px solid #ffffff14;padding:18px 20px 20px;position:relative}.stage-scheme-card:first-child{border-left:none}.stage-scheme-kicker{color:#ffffff8f;letter-spacing:.12em;text-transform:uppercase;font-size:12px}.stage-scheme-title{letter-spacing:-.05em;margin-top:10px;font-size:max(34px,min(4vw,54px));font-weight:600;line-height:.94}.stage-scheme-stage{color:#ffffffb8;letter-spacing:-.03em;margin-top:8px;font-size:18px;line-height:1.15}.stage-scheme-lever-label{color:#ffffffb8;letter-spacing:-.02em;margin-top:18px;font-size:14px;font-weight:500;line-height:1.15}.stage-scheme-lever{color:#fff;letter-spacing:-.03em;max-width:320px;margin-top:6px;font-size:22px;font-weight:600;line-height:1.05}.stage-scheme-roadmap{color:#ffffffb8;max-width:300px;margin:6px 0 0;font-size:14px;line-height:1.5}.stage-scheme-bottom{grid-template-columns:1fr 1fr;align-items:end;gap:16px;margin-top:26px;display:grid}.stage-scheme-label{color:#ffffffd1;letter-spacing:.08em;text-transform:lowercase;margin-bottom:8px;font-size:13px}.stage-scheme-tags{flex-wrap:wrap;gap:8px;display:flex}.stage-scheme-tag{color:#ffffffe0;background:#ffffff14;border:1px solid #ffffff1a;border-radius:10px;justify-content:center;align-items:center;min-width:86px;min-height:34px;padding:0 14px;font-size:13px;font-weight:600;display:inline-flex}.stage-scheme-tag-result{color:#bbf7d0;background:#22c55e24;border-color:#4ade803d}.cta-card{grid-template-columns:minmax(0,1fr);align-items:center;gap:18px;display:grid}.cta-card-single{padding-right:28px}.footer-mini-links,.page-footer-links{flex-wrap:wrap;gap:14px;display:flex}.footer-mini-links a,.page-footer-links a{color:#ffffff80;font-size:12px;text-decoration:none}.page-footer{z-index:12;color:#ffffff85;border-top:1px solid #ffffff14;justify-content:space-between;align-items:center;gap:16px;margin-top:30px;padding-top:18px;font-size:13px;display:flex;position:relative}.page-footer-links{z-index:13;position:relative}.page-footer-links a{pointer-events:auto}.payment-overlay-root{z-index:140;place-items:center;padding:20px;display:grid;position:fixed;inset:0}.payment-overlay-backdrop{-webkit-backdrop-filter:blur(14px);background:#030a16c7;position:absolute;inset:0}.payment-overlay-card{z-index:1;background:linear-gradient(#101b31f0,#0b1426eb);border:1px solid #ffffff24;border-radius:28px;width:min(560px,100%);padding:24px;position:relative;box-shadow:0 30px 80px #00000057,inset 0 1px #ffffff14}.payment-overlay-status-row{justify-content:flex-start;margin-bottom:18px;display:flex}.payment-status-pill{color:#ffffffd6;background:#ffffff0f;border:1px solid #ffffff1f;border-radius:999px;align-items:center;gap:8px;min-height:34px;padding:0 14px;font-size:12px;font-weight:700;display:inline-flex}.payment-status-pill.is-waiting{color:#fff2b2;background:#f7d2371a;border-color:#f7d23742}.payment-status-pill.is-success{color:#bbf7d0;background:#10b9811f;border-color:#6ee7b73d}.payment-status-pill.is-timeout{color:#fecdd3;background:#f43f5e1f;border-color:#fb71853d}.payment-status-dot{background:currentColor;border-radius:999px;flex:none;width:8px;height:8px;box-shadow:0 0 14px}.payment-overlay-title{letter-spacing:-.05em;color:#fff;margin:0;font-size:max(28px,min(4vw,42px));font-weight:700;line-height:.98}.payment-overlay-copy{color:#ffffffc2;margin-top:12px;font-size:16px;line-height:1.55}.payment-overlay-note{color:#ffffffad;background:#ffffff0d;border:1px solid #ffffff14;border-radius:18px;margin-top:16px;padding:14px 16px;font-size:14px;line-height:1.5}.payment-overlay-actions{flex-wrap:wrap;gap:10px;margin-top:20px;display:flex}.payment-overlay-actions-stacked{flex-direction:column;align-items:stretch}.payment-overlay-btn{cursor:pointer;border-radius:999px;min-height:44px;padding:0 18px;font-size:14px;font-weight:700;transition:transform .2s,background .2s,border-color .2s}.payment-overlay-btn:hover{transform:translateY(-1px)}.payment-overlay-btn-primary{color:#fff;background:linear-gradient(90deg,#47b6f6 0%,#5da7ff 22%,#7c84ff 48%,#9c6dff 72%,#c25cf3 100%) 0 0/220% 220%;border:1px solid #ffffff29;animation:none;box-shadow:0 10px 30px #4760ff38,inset 0 1px #ffffff2e}.payment-overlay-btn-secondary{color:#fff;background:#ffffff0f;border:1px solid #ffffff24;box-shadow:inset 0 1px #ffffff14}.payment-overlay-btn-link{text-align:center;justify-content:center;align-items:center;width:100%;text-decoration:none;display:inline-flex}.accent-word{color:#f7d237}.text-emerald-300{color:#a7f3d0}.text-rose-300{color:#fda4af}.text-white\\/50{color:#ffffff80}@keyframes pageAmbient{0%{filter:hue-rotate();transform:translate(0)scale(1)}50%{filter:hue-rotate(4deg);transform:translate(0)scale(1.05)}to{filter:hue-rotate(-4deg);transform:translate(0)scale(1.02)}}@keyframes premiumGlassShift{0%{transform:translate(-12px)}50%{transform:translate(14px,-6px)}to{transform:translate(-12px)}}@keyframes tgGradientFlow{0%{background-position:0%}50%{background-position:100%}to{background-position:0%}}@keyframes tgShine{0%{transform:translate(-130%)}55%{transform:translate(130%)}to{transform:translate(130%)}}@keyframes pulseTinyYellow{0%{opacity:1;transform:scale(1)}50%{opacity:.72;transform:scale(1.22)}to{opacity:1;transform:scale(1)}}@keyframes snapshotPulse{0%{opacity:.88;box-shadow:inset 0 1px #ffffff14,0 16px 36px #00000042,0 0 #f7d23726}50%{opacity:1;box-shadow:inset 0 1px #ffffff14,0 16px 36px #00000042,0 0 0 10px #f7d23700}to{opacity:.88;box-shadow:inset 0 1px #ffffff14,0 16px 36px #00000042,0 0 #f7d23714}}@media (width<=1280px){.hero-section{min-height:720px}.hero-main-copy,.section-copy{font-size:19px}.stage-carousel-item-free{width:min(620px,62vw)}}@media (width<=1180px){.header-inner{grid-template-columns:1fr auto;align-items:center;gap:14px}.header-burger{display:inline-flex}.header-nav,.header-actions{grid-column:1/-1;width:100%;display:none}.header-nav.is-open,.header-actions.is-open{display:flex}.header-nav{flex-direction:column;align-items:flex-start;gap:14px;padding:14px 0 2px}.header-actions{justify-content:flex-start;gap:10px;padding-top:4px}.header-cta{justify-content:center;width:100%}.preview-grid,.cta-card,.hero-grid-frame,.preview-grid-strategy-layout{grid-template-columns:1fr}.hero-main-copy,.journey-progress-wrap{display:none}.preview-inline-inputs{grid-template-columns:1fr}.preview-inline-input-shell{min-height:68px;padding:0 18px}.preview-inline-input{width:90px;min-width:90px;font-size:18px}.preview-inline-input-meta{font-size:15px}.preview-section-headline{flex-direction:column;align-items:flex-start}.strategy-meta-row,.strategy-meta-row.is-soft{justify-content:flex-start}.preview-input-grid-visible,.dashboard-grid-structured,.model-grid-structured,.control-levers-grid{grid-template-columns:1fr}.control-lever{min-height:0;padding:0 0 14px;border:none!important}.control-lever:last-child{border-bottom:none}.control-lever-head{margin-bottom:14px;position:relative;top:auto;left:auto;right:auto}.strategy-chip-row{flex-direction:column;align-items:stretch;gap:12px}.strategy-chip{justify-content:flex-start;width:100%}.strategy-chip-label{text-align:left}.preview-controls-head{flex-direction:column;align-items:flex-start}.hero-chart-float{display:none}.stage-scheme-slide{flex:0 0 100%;min-width:100%}.stage-scheme-card{border-left:none}.stage-scheme-bottom,.start-cards-row-horizontal{grid-template-columns:1fr}.analysis-offers-desktop{display:none}.analysis-offers-mobile{display:block}.preview-side{position:static}.journey-compact,.results-grid-2x2,.tariff-comparison-grid,.journey-scroll-grid{grid-template-columns:1fr}.journey-stage-card{border-bottom:1px solid #ffffff14;min-height:0;border-right:none!important}.journey-stage-card:last-child{border-bottom:none}.journey-scroll-sticky{position:static}.journey-scroll-grid{border-bottom:none;grid-template-columns:1fr;gap:12px}.journey-stage-card{background:linear-gradient(#e0e1e317,#e0e1e30d);border:1px solid #ffffff1a;border-radius:24px;min-height:0;padding:20px 18px;opacity:1!important;filter:none!important;transform:none!important}.journey-stage-card:first-child{border-left:1px solid #ffffff1a}.journey-stage-title{max-width:none;margin-top:28px;font-size:28px}.journey-stage-text{max-width:none}.journey-progress-wrap{width:calc(100% + 12px);margin:14px 0 16px -12px}.journey-demo-bridge{flex-direction:column;align-items:flex-start}.journey-scroll-shell{min-height:auto}.journey-scroll-sticky{position:static;overflow:visible}.journey-scroll-grid,.journey-scroll-grid.journey-scroll-grid-shifted{transform:none}.stage-carousel-item-free{width:min(680px,78vw)}.analysis-right-card-plain{height:auto}.start-cards-row{gap:14px}.tariff-comparison-grid{grid-template-columns:1fr;gap:12px;margin-top:14px}.tariff-column{border-radius:24px;padding:18px 16px 20px}.tariff-column-head{margin-bottom:14px}.tariff-column-title{font-size:16px}.tariff-attention{height:30px;min-height:30px;padding:0 10px}.tariff-layout{grid-template-columns:1fr;row-gap:16px;min-height:0}.tariff-menu{gap:10px;padding-top:0}.tariff-menu-btn{border-radius:18px;min-height:46px;padding:0 14px;font-size:14px}.tariff-divider{background:linear-gradient(90deg,#ffffff05 0%,#ffffff6b 14% 86%,#ffffff05 100%);width:100%;height:1px}.tariff-content{padding-top:2px;padding-left:0}.tariff-paragraph-title{margin-bottom:16px;font-size:32px}.tariff-check-item,.tariff-note-item{grid-template-columns:18px 1fr;gap:12px;font-size:15px;line-height:1.45}.tariff-tag{min-height:36px;padding:8px 12px;font-size:13px}.start-card{flex:none}.start-card-inner{min-height:0;box-shadow:none;background:0 0;border:none;border-radius:24px}.start-card-frame{object-fit:contain;object-position:center;border-radius:24px;width:100%;height:auto;display:block}.start-card-title-chip{display:none}.start-card-price-float{top:var(--price-top-mobile,var(--price-top,auto));right:var(--price-right-mobile,var(--price-right,auto));bottom:var(--price-bottom-mobile,var(--price-bottom,auto));left:var(--price-left-mobile,var(--price-left,auto));font-size:max(28px,min(10vw,40px))}.start-card-btn{top:var(--button-top-mobile,var(--button-top,auto));right:var(--button-right-mobile,var(--button-right,auto));bottom:var(--button-bottom-mobile,var(--button-bottom,auto));left:var(--button-left-mobile,var(--button-left,auto));width:var(--button-width-mobile,var(--button-width,auto));min-height:38px;padding:0 14px;font-size:12px}.hero-chart-float{max-width:100%}.hero-chart-box,.hero-metric-square,.bar-chart-wrap,.hero-money-card,.hero-active-note,.journey-compact-card,.input-shell,.metric-card,.model-card,.slider-card,.preview-side,.stage-card-analytics,.signal-card,.result-doc-card-inner,.start-card-inner,.cta-card,.cta-box{box-shadow:0 10px 28px #00000029,inset 0 1px #ffffff0f;-webkit-backdrop-filter:none!important}.bar-chart-bar-horizontal,.hero-active-note,.hero-tag,.tg-gradient-btn,.ghost-link,.preview-example-chip{will-change:auto}.range-input{accent-color:#f7d237;height:24px}.range-input::-webkit-slider-runnable-track{background:#ffffff24;border-radius:999px;height:6px}.range-input::-webkit-slider-thumb{-webkit-appearance:none;background:#f7d237;border:2px solid #fff;border-radius:999px;width:22px;height:22px;margin-top:-8px;box-shadow:0 6px 18px #f7d23747}.range-input::-moz-range-track{background:#ffffff24;border-radius:999px;height:6px}.range-input::-moz-range-thumb{background:#f7d237;border:2px solid #fff;border-radius:999px;width:22px;height:22px;box-shadow:0 6px 18px #f7d23747}.stage-rings-grid.compact-metrics-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}.stage-ring-label{font-size:10px}.start-card-inner{background:0 0;border-radius:22px;min-height:0}.start-card-frame{border-radius:22px}.start-card-overlay{background:0 0}.stage-lite-copy-grid,.stage-lite-bottom{grid-template-columns:1fr}.stage-lite-title{font-size:max(34px,min(12vw,52px))}.analysis-grid,.preview-grid,.results-grid-2x2,.journey-compact,.dashboard-grid,.input-grid,.compact-metrics-grid{width:100%;max-width:100%}.cta-card{grid-template-columns:1fr;gap:14px}.tariff-panel-layout{grid-template-columns:1fr;gap:14px;min-height:0}.tariff-panel-nav{flex-flow:wrap;gap:10px;padding:0}.tariff-panel-tab{border-radius:12px;min-height:36px;padding:0 13px;font-size:12px}.tariff-panel-content{border-top:1px solid #ffffff1f;border-left:none;gap:14px;padding:14px 0 0}.tariff-panel-content-title{max-width:none;font-size:22px}.tariff-panel-content .tariff-check-item,.tariff-panel-content .tariff-note-item{font-size:13px;line-height:1.55}.page-footer{flex-direction:column;align-items:flex-start}}.tariff-comparison-grid-parallel{gap:28px}.tariff-compare-card{-webkit-backdrop-filter:blur(24px)saturate(135%);background:radial-gradient(circle at 18% 10%,#7ea3ff1f,#0000 24%),radial-gradient(circle at 72% 0,#7e6fff1a,#0000 28%),linear-gradient(#142344b8,#0815309e);border:1px solid #ffffff1f;border-radius:30px;padding:26px 26px 28px;position:relative;box-shadow:inset 0 1px #ffffff1a,0 18px 42px #00000024}.tariff-compare-card-head{justify-content:space-between;align-items:flex-start;gap:12px;margin-bottom:18px;display:flex}.tariff-compare-card-body{grid-template-columns:1fr;gap:14px;display:grid}.tariff-compare-section{background:linear-gradient(#ffffff14,#ffffff0a);border:1px solid #ffffff1a;border-radius:22px;padding:16px 16px 18px;box-shadow:inset 0 1px #ffffff0f}.tariff-compare-section-title{color:#fff;letter-spacing:-.03em;margin:0 0 14px;font-size:16px;font-weight:700;line-height:1.1}.tariff-compare-section .tariff-check-list,.tariff-compare-section .tariff-note-list{gap:12px}.tariff-compare-section .tariff-check-item,.tariff-compare-section .tariff-note-item{grid-template-columns:18px 1fr;gap:12px;font-size:15px;line-height:1.45}.tariff-compare-section .tariff-tag-list{gap:9px}.tariff-compare-section .tariff-tag{min-height:36px;padding:8px 12px;font-size:13px}@media (width<=1180px){.tariff-comparison-grid-parallel{grid-template-columns:1fr}}@media (width<=767px){.dashboard-metric-slot-revenue,.dashboard-metric-slot-costs{width:100%}.dashboard-metric-slot-revenue .metric-card,.dashboard-metric-slot-costs .metric-card{height:100%;min-height:188px}.model-grid-structured .model-card{height:100%;min-height:100px}.strategy-chip-row{align-items:stretch}.strategy-chip{width:100%}.strategy-chip-label{text-align:left!important}.offer-switch-row{margin:0 0 14px}.offer-switch-btn{flex:1 1 0;min-height:42px;padding:0 12px}.analysis-mobile-offer-card{margin-bottom:12px}.control-levers-grid{gap:12px;margin-top:12px}.control-lever{padding-bottom:8px}.control-lever-title{font-size:16px}.control-scale-row{margin-bottom:8px;font-size:12px}.control-value{margin-top:14px;font-size:16px}.control-range-input::-webkit-slider-runnable-track{height:5px}.control-range-input::-moz-range-track{height:5px}.control-range-input::-webkit-slider-thumb{width:18px;height:18px;margin-top:-6px}.control-range-input::-moz-range-thumb{width:18px;height:18px}.preview-side-reserve-window{display:none}.preview-mobile-fab{z-index:90;color:#fff;opacity:0;visibility:hidden;pointer-events:none;background:#0b1d3ac7;border:1px solid #ffffff1f;border-radius:18px;justify-content:center;align-items:center;width:54px;height:54px;font-size:28px;font-weight:700;line-height:1;transition:opacity .24s,transform .24s,visibility .24s,box-shadow .24s;display:inline-flex;position:fixed;top:30vh;right:20px;transform:translateY(6px);box-shadow:inset 0 1px #ffffff14,0 16px 36px #00000042}.preview-mobile-fab.is-visible{opacity:1;visibility:visible;pointer-events:auto;transform:translateY(0)}.preview-mobile-fab.is-pulsing{animation:2.2s ease-in-out infinite snapshotPulse}.preview-mobile-popup-root{z-index:130;place-items:center;padding:18px;display:grid;position:fixed;inset:0}.preview-mobile-popup-backdrop{-webkit-backdrop-filter:blur(20px);background:#030a16e6;border:0;position:absolute;inset:0}.preview-mobile-popup-card{z-index:1;width:min(720px,100%);max-height:min(78vh,900px);padding-top:48px;position:relative;overflow:auto}.preview-mobile-popup-close{color:#fff;background:#ffffff0f;border:1px solid #ffffff24;border-radius:999px;width:36px;height:36px;font-size:16px;line-height:1;position:absolute;top:14px;right:14px}.dashboard-grid-structured{grid-template-areas:"profit profit""revenue costs";align-items:stretch;gap:14px;grid-template-columns:repeat(2,minmax(0,1fr))!important}.dashboard-metric-slot-revenue{grid-area:revenue}.dashboard-metric-slot-costs{grid-area:costs}.dashboard-metric-slot-profit{grid-area:profit}.dashboard-metric-slot .metric-card{height:100%}.dashboard-metric-slot-profit .metric-card,.dashboard-metric-slot-revenue .metric-card,.dashboard-metric-slot-costs .metric-card{min-height:130px}.model-grid-structured{align-items:stretch;gap:14px;grid-template-columns:repeat(2,minmax(0,1fr))!important}.model-grid-structured .model-card{height:100%;min-height:130px;padding-bottom:28px;position:relative}.model-grid-structured .model-head{display:block}.model-grid-structured .model-delta-top{font-size:12px;line-height:1;position:absolute;bottom:-50px;right:10px}.model-grid-structured .model-main-value{margin-top:18px}.tariff-compare-card{-webkit-backdrop-filter:none;border-radius:24px;padding:18px 16px}.tariff-compare-card-body{gap:12px}.tariff-compare-section{border-radius:18px;padding:14px 14px 16px}.tariff-compare-section-title{margin-bottom:12px;font-size:15px}.tariff-compare-section .tariff-check-item,.tariff-compare-section .tariff-note-item{font-size:14px;line-height:1.4}}'
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/revenue_snapshot2026/app/page.tsx",
        lineNumber: 2011,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=Desktop_revenue_snapshot2026_app_page_tsx_b3dd6960._.js.map