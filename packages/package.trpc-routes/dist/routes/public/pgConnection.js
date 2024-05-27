"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pgConnectionaRouter = void 0;
const trpc_js_1 = require("../../trpc.js");
const server_1 = require("@trpc/server");
const index_js_1 = require("../../index.js");
exports.pgConnectionaRouter = (0, trpc_js_1.router)({
    checkConnection: trpc_js_1.publicProcedure
        .use(async (opts) => {
        const { PG_ADDRESS, PG_PORT, PG_DATABASE, PG_USER, PG_PASSWORD } = process.env;
        if (PG_ADDRESS === undefined)
            throw new server_1.TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
                message: 'PG_ADDRESS is undefined'
            });
        if (PG_PORT === undefined)
            throw new server_1.TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
                message: 'PG_PORT is undefined'
            });
        if (PG_DATABASE === undefined)
            throw new server_1.TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
                message: 'PG_DATABASE is undefined'
            });
        if (PG_USER === undefined)
            throw new server_1.TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
                message: 'PG_USER is undefined'
            });
        if (PG_PASSWORD === undefined)
            throw new server_1.TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
                message: 'PG_PASSWORD is undefined'
            });
        return opts.next({
            ctx: {
                PG_ADDRESS,
                PG_PORT,
                PG_DATABASE,
                PG_USER,
                PG_PASSWORD
            }
        });
    })
        .query(async (ctx) => {
        const client = (0, index_js_1.PgClient)();
        client.connect();
        client.end();
        return { status: 'OK' };
    }),
    getPgData: trpc_js_1.publicProcedure.query(async () => {
        const { PG_ADDRESS, PG_PORT, PG_DATABASE, PG_USER } = process.env;
        return { name: PG_DATABASE, host: PG_ADDRESS, port: PG_PORT, user: PG_USER };
    })
});
