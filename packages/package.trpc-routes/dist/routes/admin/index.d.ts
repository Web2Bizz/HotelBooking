export declare const adminRouter: {
    themeRoute: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
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
    userRouter: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
        ctx: object;
        meta: object;
        errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
        transformer: false;
    }, {
        getAll: import("@trpc/server").TRPCQueryProcedure<{
            input: void;
            output: import("../../index.js").User[];
        }>;
        getById: import("@trpc/server").TRPCQueryProcedure<{
            input: string;
            output: import("../../index.js").User;
        }>;
        setById: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: string;
                name: string;
                surname: string;
                fatherName: string;
                email: string;
            };
            output: void;
        }>;
        deleteById: import("@trpc/server").TRPCQueryProcedure<{
            input: string;
            output: void;
        }>;
    }>;
};
