import { HeaderSettings } from '../../types/mainSettings.js';
export declare const headerRouter: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
    ctx: object;
    meta: object;
    errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
    transformer: false;
}, {
    setSettings: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            id: string;
            isDisplayLogo: boolean;
            isDisplayName: boolean;
            isDisplaySearch: boolean;
            isDisplayBooking: boolean;
            isDisplayProfileDetails: boolean;
            backgroundColor: string;
        };
        output: void;
    }>;
    getSettings: import("@trpc/server").TRPCQueryProcedure<{
        input: string;
        output: HeaderSettings;
    }>;
}>;
