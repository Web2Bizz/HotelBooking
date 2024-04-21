import { TCity } from "@entities"

const getAll = (): Array<TCity> => {
    return [
        {
            id: '0',
            name: 'Берлин',
            country: 'Германия',
            description: ''
        },
        {
            id: '1',
            name: 'Дюсельдорф',
            country: 'Германия',
            description: ''
        },
        {
            id: '2',
            name: 'Фалькенштайн',
            country: 'Германия',
            description: ''
        },
        {
            id: '3',
            name: 'Кёльн',
            country: 'Германия',
            description: ''
        },
        {
            id: '4',
            name: 'Мюнхен',
            country: 'Германия',
            description: ''
        }
    ]
}

export const cityApi = {getAll}