"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHotelProperties = void 0;
const trpc_1 = require("../utils/trpc");
const getHotelProperties = trpc_1.t.procedure
    .query(async () => {
    const data = await fetch("http://87.242.117.193:9090/api/hotelSettings/getHotelProperties");
    return (await data.json());
});
exports.getHotelProperties = getHotelProperties;
