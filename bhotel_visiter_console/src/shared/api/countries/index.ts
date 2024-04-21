import {TCountry} from "@entities";

const getAll = (): Array<TCountry> => {
    return [
        {
            id: '0',
            name: 'Германия',
            description: 'Описание категории 1'
        },
        {
            id: '1',
            name: 'Турция',
            description: 'Описание категории 2'
        },
        {
            id: '2',
            name: 'Израиль',
            description: 'Описание категории 3'
        },
        {
            id: '3',
            name: 'Россия',
            description: 'Описание категории 4'
        },
        {
            id: '4',
            name: 'Тайланд',
            description: 'Описание категории 5'
        }
    ]
}

export const countryApi = {getAll}