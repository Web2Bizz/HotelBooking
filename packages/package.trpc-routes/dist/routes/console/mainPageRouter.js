"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainPageRouter = void 0;
const server_1 = require("@trpc/server");
const index_js_1 = require("../../index.js");
const trpc_js_1 = require("../../trpc.js");
const zod_1 = require("zod");
const inputProps = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    coverType: zod_1.z.string(),
    isDisplayDiscount: zod_1.z.boolean(),
    isDisplayBooking: zod_1.z.boolean(),
    isDisplayPopular: zod_1.z.boolean(),
    isDisplayFAQ: zod_1.z.boolean()
});
exports.mainPageRouter = (0, trpc_js_1.router)({
    getSettings: trpc_js_1.publicProcedure
        .input(zod_1.z.string().uuid())
        .query(async (opts) => {
        const { input } = opts;
        const client = (0, index_js_1.PgClient)();
        const hotel_id = input;
        client.connect();
        return client
            .query(`SELECT
                        id,
                        cover_type,
                        display_discount,
						display_booking,
						display_popular,
						display_faq
                    FROM public.frontend_main_page
                    WHERE frontend_id=$1;`, [hotel_id])
            .then((result) => {
            client.end();
            return {
                coverType: result.rows[0]['cover_type'],
                isDisplayDiscount: result.rows[0]['display_discount'],
                isDisplayBooking: result.rows[0]['display_booking'],
                isDisplayFAQ: result.rows[0]['display_faq'],
                isDisplayPopular: result.rows[0]['display_popular']
            };
        })
            .catch((err) => {
            client.end();
            throw new server_1.TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: err });
        });
    }),
    setSettings: trpc_js_1.publicProcedure.input(inputProps).mutation(async (opts) => {
        const { input } = opts;
        const client = (0, index_js_1.PgClient)();
        client.connect();
        client.query(`UPDATE public.frontend_main_page SET
                cover_type=$1,
                display_discount=$2,
				display_booking=$3,
				display_popular=$4,
				display_faq=$5
            WHERE frontend_id=$6;`, [
            input.coverType,
            input.isDisplayDiscount,
            input.isDisplayBooking,
            input.isDisplayPopular,
            input.isDisplayFAQ,
            input.id
        ]);
    })
});
