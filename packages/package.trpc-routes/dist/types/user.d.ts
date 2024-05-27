import { Entity } from "./entity.js";
export type User = {
    name: string;
    surname: string;
    fatherName: string;
    email: string;
} & Entity;
