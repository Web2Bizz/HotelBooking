import { THotel } from "@entities"

const getAll = (): Array<THotel> => {
    return [
        {
            id: '0',
            name: 'Название',
            country: 'Страна',
            city: 'Город',
            raiting: 5
        },
        {
            id: '1',
            name: 'Название',
            country: 'Страна',
            city: 'Город',
            raiting: 5
        },
        {
            id: '2',
            name: 'Название',
            country: 'Страна',
            city: 'Город',
            raiting: 5
        },
        {
            id: '3',
            name: 'Название',
            country: 'Страна',
            city: 'Город',
            raiting: 5
        },
        {
            id: '4',
            name: 'Название',
            country: 'Страна',
            city: 'Город',
            raiting: 5
        },
        {
            id: '5',
            name: 'Название',
            country: 'Страна',
            city: 'Город',
            raiting: 5
        },
        {
            id: '6',
            name: 'Название',
            country: 'Страна',
            city: 'Город',
            raiting: 5
        }
    ]
}

export const hotelApi = {getAll}