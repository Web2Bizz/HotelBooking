"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.t = exports.appRouter = exports.frontend_id = void 0;
const uuid_1 = require("uuid");
const zod_1 = require("zod");
const routes_1 = require("./routes");
const index_1 = require("./utils/index");
const trpc_1 = require("./utils/trpc");
Object.defineProperty(exports, "t", { enumerable: true, get: function () { return trpc_1.t; } });
exports.frontend_id = '67342c88-fd1e-425b-99b1-3cdc427b914a';
// Procedure for clean_journal
const getCleanJournal = trpc_1.t.procedure.input(zod_1.z.string().uuid()).query(async ({ input }) => {
    const client = await (0, index_1.PgClient)();
    const res = await client.query('SELECT * FROM clean_journal WHERE id = $1', [input]);
    await client.end();
    return res.rows[0];
});
const addToCleanJournal = trpc_1.t.procedure
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
const getClient = trpc_1.t.procedure.input(zod_1.z.string().uuid()).query(async ({ input }) => {
    const client = await (0, index_1.PgClient)();
    const res = await client.query('SELECT * FROM client WHERE id = $1', [input]);
    await client.end();
    return res.rows[0];
});
const addClient = trpc_1.t.procedure
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
const getUserById = trpc_1.t.procedure.input(zod_1.z.string().uuid()).query(async ({ input }) => {
    const client = await (0, index_1.PgClient)();
    const res = await client.query('SELECT * FROM client WHERE id = $1', [input]);
    await client.end();
    return res.rows[0];
});
// Procedure for frontend_config
const getFrontendConfig = trpc_1.t.procedure.input(zod_1.z.string().uuid()).query(async ({ input }) => {
    const client = await (0, index_1.PgClient)();
    const res = await client.query('SELECT * FROM frontend_config WHERE id = $1', [input]);
    await client.end();
    return res.rows[0];
});
const setFrontendConfig = trpc_1.t.procedure
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
const getFrontendFooter = trpc_1.t.procedure.query(async () => {
    const client = await (0, index_1.PgClient)();
    const res = await client.query('SELECT * FROM frontend_footer WHERE frontend_id = $1', [exports.frontend_id]);
    await client.end();
    return res.rows[0];
});
const setFrontendFooter = trpc_1.t.procedure
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
        exports.frontend_id,
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
const getFrontendHeader = trpc_1.t.procedure.input(zod_1.z.string().uuid()).query(async ({ input }) => {
    const client = await (0, index_1.PgClient)();
    const res = await client.query('SELECT * FROM frontend_header WHERE frontend_id = $1', [input]);
    await client.end();
    return res.rows[0];
});
const setFrontendHeader = trpc_1.t.procedure
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
// Procedure for frontend_profile
const getFrontendProfile = trpc_1.t.procedure.input(zod_1.z.string().uuid()).query(async ({ input }) => {
    const client = await (0, index_1.PgClient)();
    const res = await client.query('SELECT * FROM frontend_profile WHERE id = $1', [input]);
    await client.end();
    return res.rows[0];
});
const setFrontendProfile = trpc_1.t.procedure
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
const getNotifications = trpc_1.t.procedure.input(zod_1.z.string().uuid()).query(async ({ input }) => {
    const client = await (0, index_1.PgClient)();
    const res = await client.query('SELECT * FROM notifications WHERE id = $1', [input]);
    await client.end();
    return res.rows[0];
});
const pushNotification = trpc_1.t.procedure
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
const getPayment = trpc_1.t.procedure.input(zod_1.z.string().uuid()).query(async ({ input }) => {
    const client = await (0, index_1.PgClient)();
    const res = await client.query('SELECT * FROM payment WHERE client_id = $1', [input]);
    await client.end();
    return res.rows;
});
const addPaymentMethod = trpc_1.t.procedure
    .input(zod_1.z.object({
    client_id: zod_1.z.string().uuid(),
    card_number: zod_1.z.string(),
    card_expire: zod_1.z.string(),
    card_user: zod_1.z.string()
}))
    .mutation(async ({ input }) => {
    const client = await (0, index_1.PgClient)();
    const res = await client.query(`INSERT INTO payment (id, client_id, card_number, card_expire, card_user) VALUES ('${(0, uuid_1.v4)()}', $1, $2, $3, $4) RETURNING *`, [input.client_id, input.card_number, input.card_expire, input.card_user]);
    await client.end();
    return res.rows[0];
});
// Procedure for review_room
const getReviewRoom = trpc_1.t.procedure.input(zod_1.z.string().uuid()).query(async ({ input }) => {
    const client = await (0, index_1.PgClient)();
    const res = await client.query('SELECT * FROM review_room WHERE id = $1', [input]);
    await client.end();
    return res.rows[0];
});
const addReviewRoom = trpc_1.t.procedure
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
const getReviews = trpc_1.t.procedure
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
const addReview = trpc_1.t.procedure
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
const getAllServices = trpc_1.t.procedure
    .query(async () => {
    const client = await (0, index_1.PgClient)();
    const res = await client.query('SELECT * FROM service');
    await client.end();
    return res.rows;
});
// Procedure for service
const getService = trpc_1.t.procedure.input(zod_1.z.string().uuid()).query(async ({ input }) => {
    const client = await (0, index_1.PgClient)();
    const res = await client.query('SELECT * FROM service WHERE id = $1', [input]);
    await client.end();
    return res.rows[0];
});
const setService = trpc_1.t.procedure
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
const addService = trpc_1.t.procedure
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
const getServiceReceipt = trpc_1.t.procedure.input(zod_1.z.string().uuid()).query(async ({ input }) => {
    const client = await (0, index_1.PgClient)();
    const res = await client.query('SELECT * FROM service_receipt WHERE id = $1', [input]);
    await client.end();
    return res.rows[0];
});
const addServiceReceipt = trpc_1.t.procedure
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
const getServiceReceiptItem = trpc_1.t.procedure.input(zod_1.z.string().uuid()).query(async ({ input }) => {
    const client = await (0, index_1.PgClient)();
    const res = await client.query('SELECT * FROM service_receipt_item WHERE id = $1', [input]);
    await client.end();
    return res.rows[0];
});
const addServiceReceiptItem = trpc_1.t.procedure
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
const addFAQItem = trpc_1.t.procedure
    .input(zod_1.z.array(zod_1.z.object({
    title: zod_1.z.string(),
    description: zod_1.z.string()
})))
    .mutation(async ({ input }) => {
    const client = await (0, index_1.PgClient)();
    let y = '';
    for (let i = 0; i < input.length; i++) {
        y += `INSERT INTO frontend_faq (id, frontend_id, title, description) VALUES ('${(0, uuid_1.v4)()}', '${exports.frontend_id}', '${input[i].title}', '${input[i].description}');`;
    }
    const res = await client.query(y);
    await client.end();
    return res.rows[0];
});
// Export the router
exports.appRouter = trpc_1.t.router({
    getAllServices,
    getHotelProperties: routes_1.getHotelProperties,
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
    getFrontendMainPage: routes_1.getFrontendMainPage,
    setFrontendMainPage: routes_1.setFrontendMainPage,
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
    updateFAQItem: routes_1.updateFAQItem,
    getAllFAQ: routes_1.getAllFAQ,
    deleteFAQItem: routes_1.deleteFAQItem
});
