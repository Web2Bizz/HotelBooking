"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutRouter = void 0;
const trpc_js_1 = require("../../trpc.js");
const zod_1 = __importDefault(require("zod"));
exports.logoutRouter = (0, trpc_js_1.router)({
    logout: trpc_js_1.publicProcedure.input(zod_1.default.string()).query(() => {
        return 'logout';
    })
});
