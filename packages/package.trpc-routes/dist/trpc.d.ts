export declare const router: {
    <TInput extends import("@trpc/server").TRPCRouterRecord>(input: TInput): import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
        ctx: object;
        meta: object;
        errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
        transformer: false;
    }, TInput>;
    <TInput_1 extends import("@trpc/server/unstable-core-do-not-import").CreateRouterOptions>(input: TInput_1): import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
        ctx: object;
        meta: object;
        errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
        transformer: false;
    }, import("@trpc/server/unstable-core-do-not-import").DecorateCreateRouterOptions<TInput_1>>;
};
export declare const publicProcedure: import("@trpc/server/unstable-core-do-not-import").ProcedureBuilder<object, object, object, typeof import("@trpc/server/unstable-core-do-not-import").unsetMarker, typeof import("@trpc/server/unstable-core-do-not-import").unsetMarker, typeof import("@trpc/server/unstable-core-do-not-import").unsetMarker, typeof import("@trpc/server/unstable-core-do-not-import").unsetMarker, false>;
