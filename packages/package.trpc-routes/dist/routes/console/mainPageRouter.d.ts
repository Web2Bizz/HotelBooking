import { MainPageSettings } from '../../types/mainSettings.js';
export declare const mainPageRouter: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
    ctx: object;
    meta: object;
    errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
    transformer: false;
}, {
    getSettings: import("@trpc/server").TRPCQueryProcedure<{
        input: string;
        output: MainPageSettings;
    }>;
    setSettings: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            id: string;
            isDisplayBooking: boolean;
            coverType: string;
            isDisplayDiscount: boolean;
            isDisplayPopular: boolean;
            isDisplayFAQ: boolean;
        };
        output: void;
    }>;
}>;
