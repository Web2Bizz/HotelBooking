"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileRouter = void 0;
const server_1 = require("@trpc/server");
const zod_1 = __importDefault(require("zod"));
const index_js_1 = require("../../index.js");
const trpc_js_1 = require("../../trpc.js");
const profileProps = zod_1.default.object({
    avatarShape: zod_1.default.string(),
    id: zod_1.default.string().uuid()
});
exports.profileRouter = (0, trpc_js_1.router)({
    setSettings: trpc_js_1.publicProcedure.input(profileProps).mutation(async (opts) => {
        const { input } = opts;
        const client = (0, index_js_1.PgClient)();
        console.log(JSON.stringify(input));
        client.connect();
        client.query(`UPDATE public.frontend_profile SET 
				avatar_shape=$1,
			WHERE frontend_id=$2;`, [
            input.avatarShape,
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
						avatar_shape,
						id
					FROM public.frontend_profile
					WHERE frontend_id=$1`, [hotel_id])
            .then((result) => {
            client.end();
            return {
                id: result.rows[0]['id'],
                avatarShape: result.rows[0]['avatar_shape'],
            };
        })
            .catch((err) => {
            client.end();
            throw new server_1.TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: err });
        });
    })
});
