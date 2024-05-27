export declare const logoutRouter: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
    ctx: object;
    meta: object;
    errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
    transformer: false;
}, {
    logout: import("@trpc/server").TRPCQueryProcedure<{
        input: string;
        output: string;
    }>;
}>;
