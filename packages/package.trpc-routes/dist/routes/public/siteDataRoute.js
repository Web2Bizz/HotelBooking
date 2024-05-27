"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.siteDataRouter = void 0;
const server_1 = require("@trpc/server");
const trpc_js_1 = require("../../trpc.js");
exports.siteDataRouter = (0, trpc_js_1.router)({
    getName: trpc_js_1.publicProcedure.query(async () => {
        const { ADMIN_API_HOSTNAME } = process.env;
        if (ADMIN_API_HOSTNAME === undefined)
            throw new server_1.TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
                message: 'ADMIN_API_HOSTNAME is undefined'
            });
        return await fetch(`${ADMIN_API_HOSTNAME}/hotelSettings/getHotelProperties`, {
            method: 'GET',
            redirect: 'follow'
        })
            .then((response) => response.json())
            .catch((error) => console.error(error));
    })
});
