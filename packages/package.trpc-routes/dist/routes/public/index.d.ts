export declare const publicRouter: {
    siteDataRouter: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
        ctx: object;
        meta: object;
        errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
        transformer: false;
    }, {
        getName: import("@trpc/server").TRPCQueryProcedure<{
            input: void;
            output: import("../..").Hotel;
        }>;
    }>;
    pgConnectionaRouter: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
        ctx: object;
        meta: object;
        errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
        transformer: false;
    }, {
        checkConnection: import("@trpc/server").TRPCQueryProcedure<{
            input: void;
            output: import("../..").Response;
        }>;
        getPgData: import("@trpc/server").TRPCQueryProcedure<{
            input: void;
            output: import("../..").pgData;
        }>;
    }>;
};
