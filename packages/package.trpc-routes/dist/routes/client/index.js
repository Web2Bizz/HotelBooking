"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientRouter = void 0;
const bookRoute_js_1 = require("./bookRoute.js");
const logoutRoute_js_1 = require("./logoutRoute.js");
const payRoute_js_1 = require("./payRoute.js");
exports.clientRouter = { bookRouter: bookRoute_js_1.bookRouter, logoutRouter: logoutRoute_js_1.logoutRouter, payRouter: payRoute_js_1.payRouter };
