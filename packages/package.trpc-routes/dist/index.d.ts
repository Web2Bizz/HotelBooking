import { inferProcedureOutput } from '@trpc/server';
declare const appendToCleanJournal: import("@trpc/server").TRPCMutationProcedure<{
    input: {
        id: string;
        booking_id: string;
        date: string;
    };
    output: any;
}>;
declare const getClient: import("@trpc/server").TRPCQueryProcedure<{
    input: string;
    output: any;
}>;
declare const appendClient: import("@trpc/server").TRPCMutationProcedure<{
    input: {
        id: string;
        birthday: string;
    };
    output: any;
}>;
declare const getUserById: import("@trpc/server").TRPCQueryProcedure<{
    input: string;
    output: any;
}>;
declare const getFrontendConfig: import("@trpc/server").TRPCQueryProcedure<{
    input: string;
    output: any;
}>;
declare const setFrontendConfig: import("@trpc/server").TRPCMutationProcedure<{
    input: {
        id: string;
        hotel_id: string;
    };
    output: any;
}>;
declare const getFrontendFooter: import("@trpc/server").TRPCQueryProcedure<{
    input: number;
    output: any;
}>;
declare const setFrontendFooter: import("@trpc/server").TRPCMutationProcedure<{
    input: {
        id: number;
        frontend_id: string;
        display_logo?: boolean | undefined;
        display_label?: boolean | undefined;
        display_social_block?: boolean | undefined;
    };
    output: any;
}>;
declare const getFrontendHeader: import("@trpc/server").TRPCQueryProcedure<{
    input: string;
    output: any;
}>;
declare const setFrontendHeader: import("@trpc/server").TRPCMutationProcedure<{
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
declare const getFrontendMainPage: import("@trpc/server").TRPCQueryProcedure<{
    input: string;
    output: any;
}>;
declare const setFrontendMainPage: import("@trpc/server").TRPCMutationProcedure<{
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
declare const getFrontendProfile: import("@trpc/server").TRPCQueryProcedure<{
    input: string;
    output: any;
}>;
declare const setFrontendProfile: import("@trpc/server").TRPCMutationProcedure<{
    input: {
        id: string;
        frontend_id: string;
        avatar_shape?: string | undefined;
    };
    output: any;
}>;
declare const getNotifications: import("@trpc/server").TRPCQueryProcedure<{
    input: string;
    output: any;
}>;
declare const pushNotification: import("@trpc/server").TRPCMutationProcedure<{
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
declare const getPayment: import("@trpc/server").TRPCQueryProcedure<{
    input: string;
    output: any;
}>;
declare const appendPaymentMethod: import("@trpc/server").TRPCMutationProcedure<{
    input: {
        id: string;
        client_id: string;
        card_number: bigint;
        card_expire: string;
    };
    output: any;
}>;
declare const getReviewRoom: import("@trpc/server").TRPCQueryProcedure<{
    input: string;
    output: any;
}>;
declare const appendReviewRoom: import("@trpc/server").TRPCMutationProcedure<{
    input: {
        id: string;
        message: string;
        date: string;
        client_id: string;
        rate: number;
    };
    output: any;
}>;
declare const getReviews: import("@trpc/server").TRPCQueryProcedure<{
    input: {
        date: string;
        client_id: string;
    };
    output: any;
}>;
declare const appendReview: import("@trpc/server").TRPCMutationProcedure<{
    input: {
        id: string;
        message: string;
        date: string;
        client_id: string;
        rate: number;
    };
    output: any;
}>;
declare const getService: import("@trpc/server").TRPCQueryProcedure<{
    input: string;
    output: any;
}>;
declare const setService: import("@trpc/server").TRPCMutationProcedure<{
    input: {
        id: string;
        name: string;
        description: string;
        price: number;
        is_available?: boolean | undefined;
    };
    output: any;
}>;
declare const appendService: import("@trpc/server").TRPCMutationProcedure<{
    input: {
        id: string;
        name: string;
        description: string;
        price: number;
        is_available?: boolean | undefined;
    };
    output: any;
}>;
declare const getServiceReceipt: import("@trpc/server").TRPCQueryProcedure<{
    input: string;
    output: any;
}>;
declare const appendServiceReceipt: import("@trpc/server").TRPCMutationProcedure<{
    input: {
        id: string;
        date: string;
        client_id: string;
    };
    output: any;
}>;
declare const getServiceReceiptItem: import("@trpc/server").TRPCQueryProcedure<{
    input: string;
    output: any;
}>;
declare const appendServiceReceiptItem: import("@trpc/server").TRPCMutationProcedure<{
    input: {
        id: string;
        price: number;
        service_id: string;
        service_receipt_id: string;
    };
    output: any;
}>;
type ProcedureReturnType<TProcedure> = inferProcedureOutput<TProcedure>;
export type AppendToCleanJournalReturnType = ProcedureReturnType<typeof appendToCleanJournal>;
export type GetClientReturnType = ProcedureReturnType<typeof getClient>;
export type AppendClientReturnType = ProcedureReturnType<typeof appendClient>;
export type GetUserByIdReturnType = ProcedureReturnType<typeof getUserById>;
export type GetFrontendConfigReturnType = ProcedureReturnType<typeof getFrontendConfig>;
export type SetFrontendConfigReturnType = ProcedureReturnType<typeof setFrontendConfig>;
export type GetFrontendFooterReturnType = ProcedureReturnType<typeof getFrontendFooter>;
export type SetFrontendFooterReturnType = ProcedureReturnType<typeof setFrontendFooter>;
export type GetFrontendHeaderReturnType = ProcedureReturnType<typeof getFrontendHeader>;
export type SetFrontendHeaderReturnType = ProcedureReturnType<typeof setFrontendHeader>;
export type GetFrontendMainPageReturnType = ProcedureReturnType<typeof getFrontendMainPage>;
export type SetFrontendMainPageReturnType = ProcedureReturnType<typeof setFrontendMainPage>;
export type GetFrontendProfileReturnType = ProcedureReturnType<typeof getFrontendProfile>;
export type SetFrontendProfileReturnType = ProcedureReturnType<typeof setFrontendProfile>;
export type GetNotificationsReturnType = ProcedureReturnType<typeof getNotifications>;
export type PushNotificationReturnType = ProcedureReturnType<typeof pushNotification>;
export type GetPaymentReturnType = ProcedureReturnType<typeof getPayment>;
export type AppendPaymentMethodReturnType = ProcedureReturnType<typeof appendPaymentMethod>;
export type GetReviewRoomReturnType = ProcedureReturnType<typeof getReviewRoom>;
export type AppendReviewRoomReturnType = ProcedureReturnType<typeof appendReviewRoom>;
export type GetReviewsReturnType = ProcedureReturnType<typeof getReviews>;
export type AppendReviewReturnType = ProcedureReturnType<typeof appendReview>;
export type GetServiceReturnType = ProcedureReturnType<typeof getService>;
export type SetServiceReturnType = ProcedureReturnType<typeof setService>;
export type AppendServiceReturnType = ProcedureReturnType<typeof appendService>;
export type GetServiceReceiptReturnType = ProcedureReturnType<typeof getServiceReceipt>;
export type AppendServiceReceiptReturnType = ProcedureReturnType<typeof appendServiceReceipt>;
export type GetServiceReceiptItemReturnType = ProcedureReturnType<typeof getServiceReceiptItem>;
export type AppendServiceReceiptItemReturnType = ProcedureReturnType<typeof appendServiceReceiptItem>;
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
}>;
export type AppRouter = typeof appRouter;
export {};
