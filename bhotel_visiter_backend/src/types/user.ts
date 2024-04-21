import { Entity } from "./entity"

export type User = {
    name: string
    surname: string
    fatherName: string
    email: string
} & Entity