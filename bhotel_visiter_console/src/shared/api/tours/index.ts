import { TTour } from "@entities"

const getAll = ():Array<TTour> => {
    return [
        {
            id: "0",
            name: "name",
            description: "description",
            city: "city",
            country: "country",
            tarifCount: 1
        },
        {
            id: "1",
            name: "name",
            description: "description",
            city: "city",
            country: "country",
            tarifCount: 2
        },
        {
            id: "2",
            name: "name",
            description: "description",
            city: "city",
            country: "country",
            tarifCount: 0
        }
    ]
}

export const tourApi = {getAll}