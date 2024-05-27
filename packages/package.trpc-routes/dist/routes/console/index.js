"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consoleRoute = void 0;
const footerRoute_1 = require("./footerRoute");
const headerRoute_1 = require("./headerRoute");
const mainPageRouter_1 = require("./mainPageRouter");
exports.consoleRoute = {
    headerRouter: headerRoute_1.headerRouter,
    mainPageRouter: mainPageRouter_1.mainPageRouter,
    footerRouter: footerRoute_1.footerRouter
};
