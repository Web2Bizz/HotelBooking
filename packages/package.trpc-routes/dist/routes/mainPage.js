"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setFrontendMainPage = exports.getFrontendMainPage = void 0;
const zod_1 = __importDefault(require("zod"));
const utils_1 = require("../utils");
const __1 = require("..");
const trpc_1 = require("../utils/trpc");
const getFrontendMainPage = trpc_1.t.procedure.query(async () => {
    const client = await (0, utils_1.PgClient)();
    const res = await client.query('SELECT * FROM frontend_main_page WHERE frontend_id = $1', [__1.frontend_id]);
    await client.end();
    return res.rows[0];
});
exports.getFrontendMainPage = getFrontendMainPage;
const setFrontendMainPage = trpc_1.t.procedure
    .input(zod_1.default.object({
    cover_type: zod_1.default.string().default('static'),
    display_discount: zod_1.default.boolean().default(true),
    display_booking: zod_1.default.boolean().default(true),
    display_popular: zod_1.default.boolean().default(false),
    display_faq: zod_1.default.boolean().default(true),
    welcome_message: zod_1.default.string()
}))
    .mutation(async ({ input }) => {
    const client = await (0, utils_1.PgClient)();
    const res = await client.query(`UPDATE frontend_main_page SET 
                display_discount = $1, 
                display_booking = $2, 
                display_popular = $3, 
                display_faq = $4,
                welcome_message = $6
            WHERE frontend_id = $5 RETURNING *`, [input.display_discount, input.display_booking, input.display_popular, input.display_faq, __1.frontend_id, input.welcome_message]);
    await client.end();
    return res.rows[0];
});
exports.setFrontendMainPage = setFrontendMainPage;
