declare const getHotelProperties: import("@trpc/server").BuildProcedure<"query", {
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
    id_hotel_properties: string;
    hotel_name: string;
    hotel_logo: string;
    hotel_country: string;
    hotel_region: string;
    hotel_city: string;
    hotel_street: string;
    hotel_number_house: string;
    hotel_count_floor: string;
    hotel_count_room: number;
    contact_email: string;
    contact_number_phone: string;
    owner_name: string;
    owner_number_phone: string;
    owner_email: string;
    id_personal_data_storage_policy: string;
}>;
export { getHotelProperties };
