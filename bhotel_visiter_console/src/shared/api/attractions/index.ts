import { TAttraction } from "@entities"

const getAll = (): Array<TAttraction> => {
    return [
        {
            id: '',
            name: '',
            city: '',
            country: '',
            description: ''
        }
    ]
}

export const attractionApi = {getAll}