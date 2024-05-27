"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const trpc_js_1 = require("../../trpc.js");
const zod_1 = __importDefault(require("zod"));
const userModel = {
    id: zod_1.default.string(),
    name: zod_1.default.string(),
    surname: zod_1.default.string(),
    fatherName: zod_1.default.string(),
    email: zod_1.default.string()
};
exports.userRouter = (0, trpc_js_1.router)({
    getAll: trpc_js_1.publicProcedure.query(() => {
        return [];
    }),
    getById: trpc_js_1.publicProcedure.input(zod_1.default.string()).query((opts) => {
        const { input } = opts;
        return {
            id: '',
            name: '',
            surname: '',
            fatherName: '',
            email: ''
        };
    }),
    setById: trpc_js_1.publicProcedure.input(zod_1.default.object(userModel)).mutation((opts) => {
        const { input } = opts;
    }),
    deleteById: trpc_js_1.publicProcedure.input(zod_1.default.string()).query((opts) => {
        const { input } = opts;
    })
});
