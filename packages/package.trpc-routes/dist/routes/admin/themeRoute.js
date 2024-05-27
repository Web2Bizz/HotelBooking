"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.themeRoute = void 0;
const zod_1 = require("zod");
const trpc_js_1 = require("../../trpc.js");
exports.themeRoute = (0, trpc_js_1.router)({
    setTheme: trpc_js_1.publicProcedure.input(zod_1.z.string()).query(() => { }),
    getTheme: trpc_js_1.publicProcedure.query(() => '')
});
