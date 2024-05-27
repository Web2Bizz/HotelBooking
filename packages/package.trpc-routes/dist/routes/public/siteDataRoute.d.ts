import { Hotel } from './../../types/index.js';
export declare const siteDataRouter: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
    ctx: object;
    meta: object;
    errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
    transformer: false;
}, {
    getName: import("@trpc/server").TRPCQueryProcedure<{
        input: void;
        output: Hotel;
    }>;
}>;
