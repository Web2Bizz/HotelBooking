"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.headerRouter = void 0;
const server_1 = require("@trpc/server");
const index_js_1 = require("../../index.js");
const trpc_js_1 = require("../../trpc.js");
const zod_1 = __importDefault(require("zod"));
const headerProps = zod_1.default.object({
    isDisplayLogo: zod_1.default.boolean(),
    isDisplayName: zod_1.default.boolean(),
    isDisplaySearch: zod_1.default.boolean(),
    isDisplayBooking: zod_1.default.boolean(),
    isDisplayProfileDetails: zod_1.default.boolean(),
    backgroundColor: zod_1.default.string().startsWith('#'),
    id: zod_1.default.string().uuid()
});
exports.headerRouter = (0, trpc_js_1.router)({
    setSettings: trpc_js_1.publicProcedure.input(headerProps).mutation(async (opts) => {
        const { input } = opts;
        const client = (0, index_js_1.PgClient)();
        client.connect();
        client.query(`UPDATE public.frontend_header SET 
				display_logo=$1, 
				display_label=$2, 
				display_search=$3, 
				display_booking_button=$4, 
				display_details=$5,
				background_color=$6
			WHERE frontend_id=$7;`, [
            input.isDisplayLogo,
            input.isDisplayName,
            input.isDisplaySearch,
            input.isDisplayBooking,
            input.isDisplayProfileDetails,
            input.backgroundColor,
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
						display_search, 
						display_booking_button, 
						display_details,
						background_color,
						id
					FROM public.frontend_header 
					WHERE frontend_id=$1`, [hotel_id])
            .then((result) => {
            client.end();
            return {
                id: result.rows[0]['id'],
                isDisplayLogo: result.rows[0]['display_logo'],
                isDisplayBooking: result.rows[0]['display_booking_button'],
                isDisplayName: result.rows[0]['display_label'],
                isDisplayProfileDetails: result.rows[0]['display_details'],
                isDisplaySearch: result.rows[0]['display_search'],
                backgroundColor: result.rows[0]['background_color']
            };
        })
            .catch((err) => {
            client.end();
            throw new server_1.TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: err });
        });
    })
});
