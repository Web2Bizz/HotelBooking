export declare const themeRoute: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
    ctx: object;
    meta: object;
    errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
    transformer: false;
}, {
    setTheme: import("@trpc/server").TRPCQueryProcedure<{
        input: string;
        output: void;
    }>;
    getTheme: import("@trpc/server").TRPCQueryProcedure<{
        input: void;
        output: string;
    }>;
}>;
