"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
const trpc_js_1 = require("../trpc.js");
const index_js_1 = require("./admin/index.js");
const index_js_2 = require("./client/index.js");
const index_js_3 = require("./console/index.js");
const index_js_4 = require("./public/index.js");
exports.appRouter = (0, trpc_js_1.router)({
    adminRouter: index_js_1.adminRouter,
    clientRouter: index_js_2.clientRouter,
    publicRouter: index_js_4.publicRouter,
    consoleRoute: index_js_3.consoleRoute
});
