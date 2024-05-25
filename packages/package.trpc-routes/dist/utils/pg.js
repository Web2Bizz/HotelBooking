"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PgClient = void 0;
const pg_1 = __importDefault(require("pg"));
const { Client } = pg_1.default;
const PgClient = async () => {
    const client = new Client({
        host: process.env.PG_ADDRESS,
        port: process.env.PG_PORT,
        database: process.env.PG_DATABASE,
        user: process.env.PG_USER,
        password: process.env.PG_PASSWORD
    });
    await client.connect();
    return client;
};
exports.PgClient = PgClient;
