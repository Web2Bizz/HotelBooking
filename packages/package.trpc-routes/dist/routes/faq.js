"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFAQItem = exports.updateFAQItem = exports.getAllFAQ = void 0;
const zod_1 = __importDefault(require("zod"));
const utils_1 = require("../utils");
const trpc_1 = require("../utils/trpc");
const getAllFAQ = trpc_1.t.procedure.query(async () => {
    const client = await (0, utils_1.PgClient)();
    const res = await client.query('SELECT * FROM public.frontend_faq;');
    await client.end();
    return res.rows;
});
exports.getAllFAQ = getAllFAQ;
const updateFAQItem = trpc_1.t.procedure
    .input(zod_1.default.object({
    id: zod_1.default.string().uuid(),
    title: zod_1.default.string(),
    description: zod_1.default.string()
}))
    .mutation(async ({ input }) => {
    const client = await (0, utils_1.PgClient)();
    const res = await client.query('UPDATE frontend_faq SET title=$2, description=$3 WHERE id=$1 RETURNING *', [
        input.id,
        input.title,
        input.description
    ]);
    await client.end();
    return res.rows[0];
});
exports.updateFAQItem = updateFAQItem;
const deleteFAQItem = trpc_1.t.procedure.input(zod_1.default.array(zod_1.default.string().uuid())).mutation(async ({ input }) => {
    const client = await (0, utils_1.PgClient)();
    let y = '';
    console.log(input.length);
    for (let i = 0; i < input.length; i++) {
        y += `DELETE FROM frontend_faq WHERE id='${input[i]}';`;
    }
    const res = await client.query(y);
    await client.end();
    return res.rows[0];
});
exports.deleteFAQItem = deleteFAQItem;
