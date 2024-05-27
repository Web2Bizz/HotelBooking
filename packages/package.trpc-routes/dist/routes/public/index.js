"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicRouter = void 0;
const pgConnection_1 = require("./pgConnection");
const siteDataRoute_1 = require("./siteDataRoute");
exports.publicRouter = { siteDataRouter: siteDataRoute_1.siteDataRouter, pgConnectionaRouter: pgConnection_1.pgConnectionaRouter };
