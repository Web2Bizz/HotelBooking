"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.footerRouter = void 0;
const server_1 = require("@trpc/server");
const index_js_1 = require("../../index.js");
const trpc_js_1 = require("../../trpc.js");
const zod_1 = __importDefault(require("zod"));
const footerProps = zod_1.default.object({
    isDisplayLogo: zod_1.default.boolean(),
    isDisplayName: zod_1.default.boolean(),
    isDisplaySocialBlock: zod_1.default.boolean(),
    id: zod_1.default.string().uuid()
});
exports.footerRouter = (0, trpc_js_1.router)({
    setSettings: trpc_js_1.publicProcedure.input(footerProps).mutation((opts) => {
        const { input } = opts;
        const client = (0, index_js_1.PgClient)();
        client.connect();
        client
            .query(`UPDATE public.frontend_footer SET 
				  display_logo=$1, 
				  display_label=$2, 
				  display_social_block=$3 
				WHERE frontend_id=$4;`, [
            input.isDisplayLogo,
            input.isDisplayName,
            input.isDisplaySocialBlock,
            input.id
        ]);
    }),
    getSettings: trpc_js_1.publicProcedure
        .input(zod_1.default.string().uuid())
        .query(async (opts) => {
        const { input } = opts;
        const client = (0, index_js_1.PgClient)();
        const hotel_id = input;
        client.connect();
        return client
            .query(`SELECT 
						display_logo, 
						display_label,
						display_social_block,
						id
					FROM public.frontend_footer 
					WHERE frontend_id=$1`, [hotel_id])
            .then((result) => {
            client.end();
            return {
                id: result.rows[0]['id'],
                isDisplayLogo: result.rows[0]['display_logo'],
                isDisplayName: result.rows[0]['display_label'],
                isDisplaySocialBlock: result.rows[0]['display_social_block']
            };
        })
            .catch((err) => {
            client.end();
            throw new server_1.TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: err });
        });
    })
});
