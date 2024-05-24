const getAll = () => {
    return [
        {
			id: 0,
			name: 'Услуга 1',
			price: 100,
			description: 'Описание услуги 1',
			isAvailible: true
		},
		{
			id: 1,
			name: 'Услуга 2',
			price: 200,
			description: 'Описание услуги 2',
			isAvailible: false
		},
		{
			id: 2,
			name: 'Услуга 3',
			price: 300,
			description: 'Описание услуги 3',
			isAvailible: true
		},
		{
			id: 3,
			name: 'Услуга 4',
			price: 400,
			description: 'Описание услуги 4',
			isAvailible: true
		}
    ]
}

export const servicesApi = { getAll }