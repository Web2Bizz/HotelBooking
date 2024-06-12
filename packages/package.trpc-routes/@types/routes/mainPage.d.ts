declare const getFrontendMainPage: import("@trpc/server").BuildProcedure<"query", {
    _config: import("@trpc/server").RootConfig<{
        ctx: object;
        meta: object;
        errorShape: import("@trpc/server").DefaultErrorShape;
        transformer: import("@trpc/server").DefaultDataTransformer;
    }>;
    _ctx_out: object;
    _input_in: typeof import("@trpc/server").unsetMarker;
    _input_out: typeof import("@trpc/server").unsetMarker;
    _output_in: typeof import("@trpc/server").unsetMarker;
    _output_out: typeof import("@trpc/server").unsetMarker;
    _meta: object;
}, {
    cover_type: string;
    display_discount: boolean;
    display_booking: boolean;
    display_popular: boolean;
    display_faq: boolean;
    welcome_message: string;
}>;
declare const setFrontendMainPage: import("@trpc/server").BuildProcedure<"mutation", {
    _config: import("@trpc/server").RootConfig<{
        ctx: object;
        meta: object;
        errorShape: import("@trpc/server").DefaultErrorShape;
        transformer: import("@trpc/server").DefaultDataTransformer;
    }>;
    _meta: object;
    _ctx_out: object;
    _input_in: {
        welcome_message: string;
        cover_type?: string | undefined;
        display_discount?: boolean | undefined;
        display_booking?: boolean | undefined;
        display_popular?: boolean | undefined;
        display_faq?: boolean | undefined;
    };
    _input_out: {
        cover_type: string;
        display_discount: boolean;
        display_booking: boolean;
        display_popular: boolean;
        display_faq: boolean;
        welcome_message: string;
    };
    _output_in: typeof import("@trpc/server").unsetMarker;
    _output_out: typeof import("@trpc/server").unsetMarker;
}, any>;
export { getFrontendMainPage, setFrontendMainPage };
