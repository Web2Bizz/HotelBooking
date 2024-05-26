export type TFaq = {
    id: string;
    frontend_id: string;
    title: string;
    description: string;
};
export declare const appRouter: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
    ctx: object;
    meta: object;
    errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
    transformer: false;
}, {
    getCleanJournal: import("@trpc/server").TRPCQueryProcedure<{
        input: string;
        output: any;
    }>;
    appendToCleanJournal: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            id: string;
            booking_id: string;
            date: string;
        };
        output: any;
    }>;
    getClient: import("@trpc/server").TRPCQueryProcedure<{
        input: string;
        output: any;
    }>;
    appendClient: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            id: string;
            birthday: string;
        };
        output: any;
    }>;
    getUserById: import("@trpc/server").TRPCQueryProcedure<{
        input: string;
        output: any;
    }>;
    getFrontendConfig: import("@trpc/server").TRPCQueryProcedure<{
        input: string;
        output: any;
    }>;
    setFrontendConfig: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            id: string;
            hotel_id: string;
        };
        output: any;
    }>;
    getFrontendFooter: import("@trpc/server").TRPCQueryProcedure<{
        input: number;
        output: any;
    }>;
    setFrontendFooter: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            id: number;
            frontend_id: string;
            display_logo?: boolean | undefined;
            display_label?: boolean | undefined;
            display_social_block?: boolean | undefined;
        };
        output: any;
    }>;
    getFrontendHeader: import("@trpc/server").TRPCQueryProcedure<{
        input: string;
        output: any;
    }>;
    setFrontendHeader: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            id: string;
            frontend_id: string;
            display_logo?: boolean | undefined;
            display_label?: boolean | undefined;
            display_search?: boolean | undefined;
            display_details?: boolean | undefined;
            display_booking_button?: boolean | undefined;
            background_color?: string | undefined;
        };
        output: any;
    }>;
    getFrontendMainPage: import("@trpc/server").TRPCQueryProcedure<{
        input: string;
        output: any;
    }>;
    setFrontendMainPage: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            id: string;
            frontend_id: string;
            cover_type?: string | undefined;
            display_discount?: boolean | undefined;
            display_booking?: boolean | undefined;
            display_popular?: boolean | undefined;
            display_faq?: boolean | undefined;
        };
        output: any;
    }>;
    getFrontendProfile: import("@trpc/server").TRPCQueryProcedure<{
        input: string;
        output: any;
    }>;
    setFrontendProfile: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            id: string;
            frontend_id: string;
            avatar_shape?: string | undefined;
        };
        output: any;
    }>;
    getNotifications: import("@trpc/server").TRPCQueryProcedure<{
        input: string;
        output: any;
    }>;
    pushNotification: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            id: string;
            message: string;
            client_id: string;
            title: string;
            date?: string | undefined;
            is_readed?: boolean | undefined;
        };
        output: any;
    }>;
    getPayment: import("@trpc/server").TRPCQueryProcedure<{
        input: string;
        output: any;
    }>;
    appendPaymentMethod: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            id: string;
            client_id: string;
            card_number: bigint;
            card_expire: string;
        };
        output: any;
    }>;
    getReviewRoom: import("@trpc/server").TRPCQueryProcedure<{
        input: string;
        output: any;
    }>;
    appendReviewRoom: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            id: string;
            message: string;
            date: string;
            client_id: string;
            rate: number;
        };
        output: any;
    }>;
    getReviews: import("@trpc/server").TRPCQueryProcedure<{
        input: {
            date: string;
            client_id: string;
        };
        output: any;
    }>;
    appendReview: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            id: string;
            message: string;
            date: string;
            client_id: string;
            rate: number;
        };
        output: any;
    }>;
    getService: import("@trpc/server").TRPCQueryProcedure<{
        input: string;
        output: any;
    }>;
    setService: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            id: string;
            name: string;
            description: string;
            price: number;
            is_available?: boolean | undefined;
        };
        output: any;
    }>;
    appendService: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            id: string;
            name: string;
            description: string;
            price: number;
            is_available?: boolean | undefined;
        };
        output: any;
    }>;
    getServiceReceipt: import("@trpc/server").TRPCQueryProcedure<{
        input: string;
        output: any;
    }>;
    appendServiceReceipt: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            id: string;
            date: string;
            client_id: string;
        };
        output: any;
    }>;
    getServiceReceiptItem: import("@trpc/server").TRPCQueryProcedure<{
        input: string;
        output: any;
    }>;
    appendServiceReceiptItem: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            id: string;
            price: number;
            service_id: string;
            service_receipt_id: string;
        };
        output: any;
    }>;
    appendFAQItem: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            title: string;
            description: string;
        }[];
        output: any;
    }>;
    updateFAQItem: import("@trpc/server").TRPCQueryProcedure<{
        input: {
            id: string;
            title: string;
            description: string;
        };
        output: any;
    }>;
    getAllFAQ: import("@trpc/server").TRPCQueryProcedure<{
        input: void;
        output: TFaq[];
    }>;
}>;
export type AppRouter = typeof appRouter;
