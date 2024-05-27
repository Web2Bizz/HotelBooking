import { ProfileSettings } from '../../types/mainSettings.js';
export declare const profileRouter: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
    ctx: object;
    meta: object;
    errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
    transformer: false;
}, {
    setSettings: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            id: string;
            avatarShape: string;
        };
        output: void;
    }>;
    getSettings: import("@trpc/server").TRPCQueryProcedure<{
        input: string;
        output: ProfileSettings;
    }>;
}>;
