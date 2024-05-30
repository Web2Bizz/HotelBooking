"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
const server_1 = require("@trpc/server");
const zod_1 = require("zod");
const index_1 = require("./utils/index");
const uuid_1 = require("uuid");
const t = server_1.initTRPC.create();
const frontend_id = '67342c88-fd1e-425b-99b1-3cdc427b914a';
// Procedure for clean_journal
const getCleanJournal = t.procedure.input(zod_1.z.string().uuid()).query(async ({ input }) => {
    const client = await (0, index_1.PgClient)();
    const res = await client.query('SELECT * FROM clean_journal WHERE id = $1', [input]);
    await client.end();
    return res.rows[0];
});
const addToCleanJournal = t.procedure
    .input(zod_1.z.object({
    id: zod_1.z.string().uuid(),
    booking_id: zod_1.z.string().uuid(),
    date: zod_1.z.string().refine((val) => !isNaN(Date.parse(val)), { message: 'Invalid date' })
}))
    .mutation(async ({ input }) => {
    const client = await (0, index_1.PgClient)();
    const res = await client.query('INSERT INTO clean_journal (id, booking_id, date) VALUES ($1, $2, $3) RETURNING *', [
        input.id,
        input.booking_id,
        input.date
    ]);
    await client.end();
    return res.rows[0];
});
// Procedure for client
const getClient = t.procedure.input(zod_1.z.string().uuid()).query(async ({ input }) => {
    const client = await (0, index_1.PgClient)();
    const res = await client.query('SELECT * FROM client WHERE id = $1', [input]);
    await client.end();
    return res.rows[0];
});
const addClient = t.procedure
    .input(zod_1.z.object({
    id: zod_1.z.string().uuid(),
    birthday: zod_1.z.string().refine((val) => !isNaN(Date.parse(val)), { message: 'Invalid date' })
}))
    .mutation(async ({ input }) => {
    const client = await (0, index_1.PgClient)();
    const res = await client.query('INSERT INTO client (id, birthday) VALUES ($1, $2) RETURNING *', [
        input.id,
        input.birthday
    ]);
    await client.end();
    return res.rows[0];
});
const getUserById = t.procedure.input(zod_1.z.string().uuid()).query(async ({ input }) => {
    const client = await (0, index_1.PgClient)();
    const res = await client.query('SELECT * FROM client WHERE id = $1', [input]);
    await client.end();
    return res.rows[0];
});
// Procedure for frontend_config
const getFrontendConfig = t.procedure.input(zod_1.z.string().uuid()).query(async ({ input }) => {
    const client = await (0, index_1.PgClient)();
    const res = await client.query('SELECT * FROM frontend_config WHERE id = $1', [input]);
    await client.end();
    return res.rows[0];
});
const setFrontendConfig = t.procedure
    .input(zod_1.z.object({
    id: zod_1.z.string().uuid(),
    hotel_id: zod_1.z.string().uuid()
}))
    .mutation(async ({ input }) => {
    const client = await (0, index_1.PgClient)();
    const res = await client.query('UPDATE frontend_config SET hotel_id = $1 WHERE id = $2 RETURNING *', [
        input.hotel_id,
        input.id
    ]);
    await client.end();
    return res.rows[0];
});
// Procedure for frontend_footer
const getFrontendFooter = t.procedure.query(async () => {
    const client = await (0, index_1.PgClient)();
    const res = await client.query('SELECT * FROM frontend_footer WHERE frontend_id = $1', [frontend_id]);
    await client.end();
    return res.rows[0];
});
const setFrontendFooter = t.procedure
    .input(zod_1.z.object({
    display_logo: zod_1.z.boolean().default(true),
    display_label: zod_1.z.boolean().default(true),
    display_social_block: zod_1.z.boolean().default(false),
    background_color: zod_1.z.string(),
    display_vk: zod_1.z.boolean().default(true),
    vk_link: zod_1.z.string(),
    display_dzen: zod_1.z.boolean().default(true),
    dzen_link: zod_1.z.string(),
    display_telegram: zod_1.z.boolean().default(true),
    telegram_link: zod_1.z.string(),
    display_youtube: zod_1.z.boolean().default(true),
    youtube_link: zod_1.z.string()
}))
    .mutation(async ({ input }) => {
    const client = await (0, index_1.PgClient)();
    const res = await client.query(`UPDATE frontend_footer SET 
			display_logo=$1, 
			display_label=$2, 
			display_social_block=$3, 
			background_color=$5, 
			display_vk=$6, 
			vk_link=$7, 
			display_dzen=$8, 
			dzen_link=$9, 
			display_telegram=$10, 
			telegram_link=$11, 
			display_youtube=$12, 
			youtube_link=$13 
			WHERE frontend_id = $4;`, [
        input.display_logo,
        input.display_label,
        input.display_social_block,
        frontend_id,
        input.background_color,
        input.display_vk,
        input.vk_link,
        input.display_dzen,
        input.dzen_link,
        input.display_telegram,
        input.telegram_link,
        input.display_youtube,
        input.youtube_link
    ]);
    await client.end();
    return res.rows[0];
});
// Procedure for frontend_header
const getFrontendHeader = t.procedure.input(zod_1.z.string().uuid()).query(async ({ input }) => {
    const client = await (0, index_1.PgClient)();
    const res = await client.query('SELECT * FROM frontend_header WHERE frontend_id = $1', [input]);
    await client.end();
    return res.rows[0];
});
const setFrontendHeader = t.procedure
    .input(zod_1.z.object({
    id: zod_1.z.string().uuid(),
    frontend_id: zod_1.z.string().uuid(),
    display_logo: zod_1.z.boolean().default(true),
    display_search: zod_1.z.boolean().default(true),
    display_details: zod_1.z.boolean().default(true),
    display_booking_button: zod_1.z.boolean().default(true),
    display_label: zod_1.z.boolean().default(false),
    background_color: zod_1.z.string().default('#3c3c3c')
}))
    .mutation(async ({ input }) => {
    const client = await (0, index_1.PgClient)();
    const res = await client.query('UPDATE frontend_header SET display_logo = $2, display_search = $3, display_details = $4, display_booking_button = $5, display_label = $6, background_color = $7 WHERE frontend_id = $1 RETURNING *', [
        input.frontend_id,
        input.display_logo,
        input.display_search,
        input.display_details,
        input.display_booking_button,
        input.display_label,
        input.background_color
    ]);
    await client.end();
    return res.rows[0];
});
// Procedure for frontend_main_page
const getFrontendMainPage = t.procedure.input(zod_1.z.string().uuid()).query(async ({ input }) => {
    const client = await (0, index_1.PgClient)();
    const res = await client.query('SELECT * FROM frontend_main_page WHERE frontend_id = $1', [input]);
    await client.end();
    return res.rows[0];
});
const setFrontendMainPage = t.procedure
    .input(zod_1.z.object({
    id: zod_1.z.string().uuid(),
    frontend_id: zod_1.z.string().uuid(),
    cover_type: zod_1.z.string().default('static'),
    display_discount: zod_1.z.boolean().default(true),
    display_booking: zod_1.z.boolean().default(true),
    display_popular: zod_1.z.boolean().default(false),
    display_faq: zod_1.z.boolean().default(true)
}))
    .mutation(async ({ input }) => {
    const client = await (0, index_1.PgClient)();
    const res = await client.query('UPDATE frontend_main_page SET display_discount = $1, display_booking = $2, display_popular = $3, display_faq = $4 WHERE frontend_id = $5 RETURNING *', [input.display_discount, input.display_booking, input.display_popular, input.display_faq, input.frontend_id]);
    await client.end();
    return res.rows[0];
});
// Procedure for frontend_profile
const getFrontendProfile = t.procedure.input(zod_1.z.string().uuid()).query(async ({ input }) => {
    const client = await (0, index_1.PgClient)();
    const res = await client.query('SELECT * FROM frontend_profile WHERE id = $1', [input]);
    await client.end();
    return res.rows[0];
});
const setFrontendProfile = t.procedure
    .input(zod_1.z.object({
    id: zod_1.z.string().uuid(),
    frontend_id: zod_1.z.string().uuid(),
    avatar_shape: zod_1.z.string().default('ROUND')
}))
    .mutation(async ({ input }) => {
    const client = await (0, index_1.PgClient)();
    const res = await client.query('UPDATE frontend_profile SET frontend_id = $1, avatar_shape = $2 WHERE id = $3 RETURNING *', [input.frontend_id, input.avatar_shape, input.id]);
    await client.end();
    return res.rows[0];
});
// Procedure for notifications
const getNotifications = t.procedure.input(zod_1.z.string().uuid()).query(async ({ input }) => {
    const client = await (0, index_1.PgClient)();
    const res = await client.query('SELECT * FROM notifications WHERE id = $1', [input]);
    await client.end();
    return res.rows[0];
});
const pushNotification = t.procedure
    .input(zod_1.z.object({
    id: zod_1.z.string().uuid(),
    client_id: zod_1.z.string().uuid(),
    is_readed: zod_1.z.boolean().default(false),
    title: zod_1.z.string(),
    message: zod_1.z.string(),
    date: zod_1.z
        .string()
        .refine((val) => !isNaN(Date.parse(val)), { message: 'Invalid date' })
        .optional()
}))
    .mutation(async ({ input }) => {
    const client = await (0, index_1.PgClient)();
    const res = await client.query('INSERT INTO notifications (id, client_id, is_readed, title, message, date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [input.id, input.client_id, input.is_readed, input.title, input.message, input.date || null]);
    await client.end();
    return res.rows[0];
});
// Procedure for payment
const getPayment = t.procedure.input(zod_1.z.string().uuid()).query(async ({ input }) => {
    const client = await (0, index_1.PgClient)();
    const res = await client.query('SELECT * FROM payment WHERE client_id = $1', [input]);
    await client.end();
    return res.rows[0];
});
const addPaymentMethod = t.procedure
    .input(zod_1.z.object({
    client_id: zod_1.z.string().uuid(),
    card_number: zod_1.z.bigint(),
    card_expire: zod_1.z.string(),
    card_user: zod_1.z.string()
}))
    .mutation(async ({ input }) => {
    const client = await (0, index_1.PgClient)();
    const res = await client.query(`INSERT INTO payment (client_id, card_number, card_expire, card_user) VALUES ('${(0, uuid_1.v4)()}', $2, $3, $4, $5) RETURNING *`, [input.client_id, input.card_number, input.card_expire, input.card_user]);
    await client.end();
    return res.rows[0];
});
// Procedure for review_room
const getReviewRoom = t.procedure.input(zod_1.z.string().uuid()).query(async ({ input }) => {
    const client = await (0, index_1.PgClient)();
    const res = await client.query('SELECT * FROM review_room WHERE id = $1', [input]);
    await client.end();
    return res.rows[0];
});
const addReviewRoom = t.procedure
    .input(zod_1.z.object({
    id: zod_1.z.string().uuid(),
    client_id: zod_1.z.string().uuid(),
    message: zod_1.z.string(),
    rate: zod_1.z.number(),
    date: zod_1.z.string().refine((val) => !isNaN(Date.parse(val)), { message: 'Invalid date' })
}))
    .mutation(async ({ input }) => {
    const client = await (0, index_1.PgClient)();
    const res = await client.query('INSERT INTO review_room (id, client_id, message, rate, date) VALUES ($1, $2, $3, $4, $5) RETURNING *', [input.id, input.client_id, input.message, input.rate, input.date]);
    await client.end();
    return res.rows[0];
});
// Procedure for reviews
const getReviews = t.procedure
    .input(zod_1.z.object({
    client_id: zod_1.z.string().uuid(),
    date: zod_1.z.string().refine((val) => !isNaN(Date.parse(val)), { message: 'Invalid date' })
}))
    .query(async ({ input }) => {
    const client = await (0, index_1.PgClient)();
    const res = await client.query('SELECT * FROM reviews WHERE client_id = $1 AND date = $2', [
        input.client_id,
        input.date
    ]);
    await client.end();
    return res.rows[0];
});
const addReview = t.procedure
    .input(zod_1.z.object({
    id: zod_1.z.string().uuid(),
    client_id: zod_1.z.string().uuid(),
    message: zod_1.z.string(),
    rate: zod_1.z.number(),
    date: zod_1.z.string().refine((val) => !isNaN(Date.parse(val)), { message: 'Invalid date' })
}))
    .mutation(async ({ input }) => {
    const client = await (0, index_1.PgClient)();
    const res = await client.query('INSERT INTO reviews (id, client_id, message, rate, date) VALUES ($1, $2, $3, $4, $5) RETURNING *', [input.id, input.client_id, input.message, input.rate, input.date]);
    await client.end();
    return res.rows[0];
});
const getAllServices = t.procedure
    .query(async () => {
    const client = await (0, index_1.PgClient)();
    const res = await client.query('SELECT * FROM service');
    await client.end();
    return res.rows;
});
// Procedure for service
const getService = t.procedure.input(zod_1.z.string().uuid()).query(async ({ input }) => {
    const client = await (0, index_1.PgClient)();
    const res = await client.query('SELECT * FROM service WHERE id = $1', [input]);
    await client.end();
    return res.rows[0];
});
const setService = t.procedure
    .input(zod_1.z.object({
    id: zod_1.z.string().uuid(),
    name: zod_1.z.string(),
    description: zod_1.z.string(),
    price: zod_1.z.number(),
    is_available: zod_1.z.boolean().default(true)
}))
    .mutation(async ({ input }) => {
    const client = await (0, index_1.PgClient)();
    const res = await client.query('UPDATE service SET name = $1, description = $2, price = $3, is_available = $4 WHERE id = $5 RETURNING *', [input.name, input.description, input.price, input.is_available, input.id]);
    await client.end();
    return res.rows[0];
});
const addService = t.procedure
    .input(zod_1.z.object({
    name: zod_1.z.string(),
    description: zod_1.z.string(),
    price: zod_1.z.number()
}))
    .mutation(async ({ input }) => {
    const client = await (0, index_1.PgClient)();
    const res = await client.query(`INSERT INTO service (id, name, description, price) VALUES ('${(0, uuid_1.v4)()}', $1, $2, $3) RETURNING *`, [input.name, input.description, input.price]);
    await client.end();
    return res.rows[0];
});
// Procedure for service_receipt
const getServiceReceipt = t.procedure.input(zod_1.z.string().uuid()).query(async ({ input }) => {
    const client = await (0, index_1.PgClient)();
    const res = await client.query('SELECT * FROM service_receipt WHERE id = $1', [input]);
    await client.end();
    return res.rows[0];
});
const addServiceReceipt = t.procedure
    .input(zod_1.z.object({
    id: zod_1.z.string().uuid(),
    client_id: zod_1.z.string().uuid(),
    date: zod_1.z.string().refine((val) => !isNaN(Date.parse(val)), { message: 'Invalid date' })
}))
    .mutation(async ({ input }) => {
    const client = await (0, index_1.PgClient)();
    const res = await client.query('INSERT INTO service_receipt (id, client_id, date) VALUES ($1, $2, $3) RETURNING *', [input.id, input.client_id, input.date]);
    await client.end();
    return res.rows[0];
});
// Procedure for service_receipt_item
const getServiceReceiptItem = t.procedure.input(zod_1.z.string().uuid()).query(async ({ input }) => {
    const client = await (0, index_1.PgClient)();
    const res = await client.query('SELECT * FROM service_receipt_item WHERE id = $1', [input]);
    await client.end();
    return res.rows[0];
});
const addServiceReceiptItem = t.procedure
    .input(zod_1.z.object({
    id: zod_1.z.string().uuid(),
    service_id: zod_1.z.string().uuid(),
    service_receipt_id: zod_1.z.string().uuid(),
    price: zod_1.z.number()
}))
    .mutation(async ({ input }) => {
    const client = await (0, index_1.PgClient)();
    const res = await client.query('INSERT INTO service_receipt_item (id, service_id, service_receipt_id, price) VALUES ($1, $2, $3, $4) RETURNING *', [input.id, input.service_id, input.service_receipt_id, input.price]);
    await client.end();
    return res.rows[0];
});
const addFAQItem = t.procedure
    .input(zod_1.z.array(zod_1.z.object({
    title: zod_1.z.string(),
    description: zod_1.z.string()
})))
    .mutation(async ({ input }) => {
    const client = await (0, index_1.PgClient)();
    let y = '';
    for (let i = 0; i < input.length; i++) {
        y += `INSERT INTO frontend_faq (id, frontend_id, title, description) VALUES ('${(0, uuid_1.v4)()}', '${frontend_id}', '${input[i].title}', '${input[i].description}');`;
    }
    const res = await client.query(y);
    await client.end();
    return res.rows[0];
});
const getAllFAQ = t.procedure.query(async () => {
    const client = await (0, index_1.PgClient)();
    const res = await client.query('SELECT * FROM public.frontend_faq;');
    await client.end();
    return res.rows;
});
const updateFAQItem = t.procedure
    .input(zod_1.z.object({
    id: zod_1.z.string().uuid(),
    title: zod_1.z.string(),
    description: zod_1.z.string()
}))
    .query(async ({ input }) => {
    const client = await (0, index_1.PgClient)();
    const res = await client.query('UPDATE frontend_faq SET title=$2, description=$3 WHERE id=$1 RETURNING *', [
        input.id,
        input.title,
        input.description
    ]);
    await client.end();
    return res.rows[0];
});
const deleteFAQItem = t.procedure.input(zod_1.z.array(zod_1.z.string().uuid())).mutation(async ({ input }) => {
    const client = await (0, index_1.PgClient)();
    let y = '';
    console.log(input.length);
    for (let i = 0; i < input.length; i++) {
        y += `DELETE FROM frontend_faq WHERE id='${input[i]}';`;
    }
    const res = await client.query(y);
    await client.end();
    return res.rows[0];
});
const getHotelProperties = t.procedure
    .query(async () => {
    const data = await fetch("http://87.242.117.193:9090/api/hotelSettings/getHotelProperties");
    return (await data.json());
});
// Export the router
exports.appRouter = t.router({
    getAllServices,
    getHotelProperties,
    getCleanJournal,
    addToCleanJournal,
    getClient,
    addClient,
    getUserById,
    getFrontendConfig,
    setFrontendConfig,
    getFrontendFooter,
    setFrontendFooter,
    getFrontendHeader,
    setFrontendHeader,
    getFrontendMainPage,
    setFrontendMainPage,
    getFrontendProfile,
    setFrontendProfile,
    getNotifications,
    pushNotification,
    getPayment,
    addPaymentMethod,
    getReviewRoom,
    addReviewRoom,
    getReviews,
    addReview,
    getService,
    setService,
    addService,
    getServiceReceipt,
    addServiceReceipt,
    getServiceReceiptItem,
    addServiceReceiptItem,
    addFAQItem,
    updateFAQItem,
    getAllFAQ,
    deleteFAQItem
});
