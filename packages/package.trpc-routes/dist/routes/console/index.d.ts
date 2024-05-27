export declare const consoleRoute: {
    headerRouter: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
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
            output: import("../../types/mainSettings").HeaderSettings;
        }>;
    }>;
    mainPageRouter: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
        ctx: object;
        meta: object;
        errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
        transformer: false;
    }, {
        getSettings: import("@trpc/server").TRPCQueryProcedure<{
            input: string;
            output: import("../../types/mainSettings").MainPageSettings;
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
    footerRouter: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
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
                isDisplaySocialBlock: boolean;
            };
            output: void;
        }>;
        getSettings: import("@trpc/server").TRPCQueryProcedure<{
            input: string;
            output: import("../../types/mainSettings").FooterSettings;
        }>;
    }>;
};
