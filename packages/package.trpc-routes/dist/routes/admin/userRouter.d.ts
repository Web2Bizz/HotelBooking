import { User } from '../../types/index.js';
export declare const userRouter: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
    ctx: object;
    meta: object;
    errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
    transformer: false;
}, {
    getAll: import("@trpc/server").TRPCQueryProcedure<{
        input: void;
        output: User[];
    }>;
    getById: import("@trpc/server").TRPCQueryProcedure<{
        input: string;
        output: User;
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
