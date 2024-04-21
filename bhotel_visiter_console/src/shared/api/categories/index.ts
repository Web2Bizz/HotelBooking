import {TCategory} from "@entities";

const getAll = (): Array<TCategory> => {
    return [
        {
            id: '0',
            name: 'Категория 1',
            description: 'Описание категории 1'
        },
        {
            id: '1',
            name: 'Категория 2',
            description: 'Описание категории 2'
        },
        {
            id: '2',
            name: 'Категория 3',
            description: 'Описание категории 3'
        }
    ]
}

export const categoryApi = {getAll}