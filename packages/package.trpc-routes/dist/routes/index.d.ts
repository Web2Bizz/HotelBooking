export declare const appRouter: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
    ctx: object;
    meta: object;
    errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
    transformer: false;
}, import("@trpc/server/unstable-core-do-not-import").DecorateCreateRouterOptions<{
    adminRouter: {
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
                output: import("../index.js").User[];
            }>;
            getById: import("@trpc/server").TRPCQueryProcedure<{
                input: string;
                output: import("../index.js").User;
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
    clientRouter: {
        bookRouter: import("@trpc/server/unstable-core-do-not-import").Router<{
            ctx: object;
            meta: object;
            errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
            transformer: false;
        }, {}>;
        logoutRouter: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
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
        payRouter: import("@trpc/server/unstable-core-do-not-import").Router<{
            ctx: object;
            meta: object;
            errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
            transformer: false;
        }, {}>;
    };
    publicRouter: {
        siteDataRouter: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
            ctx: object;
            meta: object;
            errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
            transformer: false;
        }, {
            getName: import("@trpc/server").TRPCQueryProcedure<{
                input: void;
                output: import("../index.js").Hotel;
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
                output: import("../index.js").Response;
            }>;
            getPgData: import("@trpc/server").TRPCQueryProcedure<{
                input: void;
                output: import("../index.js").pgData;
            }>;
        }>;
    };
    consoleRoute: {
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
                output: import("../types/mainSettings.js").HeaderSettings;
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
                output: import("../types/mainSettings.js").MainPageSettings;
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
                output: import("../types/mainSettings.js").FooterSettings;
            }>;
        }>;
    };
}>>;
export type AppRouter = typeof appRouter;
