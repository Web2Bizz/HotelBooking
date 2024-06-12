export type TFaq = {
    id: string;
    title: string;
    description: string;
};
declare const getAllFAQ: import("@trpc/server").BuildProcedure<"query", {
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
}, TFaq[]>;
declare const updateFAQItem: import("@trpc/server").BuildProcedure<"mutation", {
    _config: import("@trpc/server").RootConfig<{
        ctx: object;
        meta: object;
        errorShape: import("@trpc/server").DefaultErrorShape;
        transformer: import("@trpc/server").DefaultDataTransformer;
    }>;
    _meta: object;
    _ctx_out: object;
    _input_in: {
        id: string;
        title: string;
        description: string;
    };
    _input_out: {
        id: string;
        title: string;
        description: string;
    };
    _output_in: typeof import("@trpc/server").unsetMarker;
    _output_out: typeof import("@trpc/server").unsetMarker;
}, any>;
declare const deleteFAQItem: import("@trpc/server").BuildProcedure<"mutation", {
    _config: import("@trpc/server").RootConfig<{
        ctx: object;
        meta: object;
        errorShape: import("@trpc/server").DefaultErrorShape;
        transformer: import("@trpc/server").DefaultDataTransformer;
    }>;
    _meta: object;
    _ctx_out: object;
    _input_in: string[];
    _input_out: string[];
    _output_in: typeof import("@trpc/server").unsetMarker;
    _output_out: typeof import("@trpc/server").unsetMarker;
}, any>;
export { getAllFAQ, updateFAQItem, deleteFAQItem };
