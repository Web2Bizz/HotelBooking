import { Response, pgData } from './../../types/index.js';
export declare const pgConnectionaRouter: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
    ctx: object;
    meta: object;
    errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
    transformer: false;
}, {
    checkConnection: import("@trpc/server").TRPCQueryProcedure<{
        input: void;
        output: Response;
    }>;
    getPgData: import("@trpc/server").TRPCQueryProcedure<{
        input: void;
        output: pgData;
    }>;
}>;
