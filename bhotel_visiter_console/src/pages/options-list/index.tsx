import { servicesApi } from '@api'
import { AdminPageTitle } from '@widgets'
import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { useEffect, useState } from 'react'

type TService = {
	id: number
	name: string
	price: number
	description: string
	isAvailible: boolean
}

export const OptionsListPage = () => {
	const [products, setProducts] = useState<Array<TService>>([])

    useEffect(() => {
        const result = servicesApi.getAll()

        setProducts(result)
    }, [])

	return (
		<>
			<AdminPageTitle title={'Список услуг'} />
			<DataTable
				className='mt-3'
				value={products}
				tableStyle={{ minWidth: '50rem' }}
			>
				<Column field='id' header='ID'></Column>
				<Column field='name' header='Название'></Column>
				<Column field='price' header='Цена (руб)'></Column>
				<Column field='description' header='Описание'></Column>
				<Column field='isAvailible' header='Доступен'></Column>
			</DataTable>
			<div className='mt-3 flex flex-row gap-3'>
				<Button severity='danger' label='Удалить (0)' disabled />
				<Button severity='success' label='Обновить список' />
			</div>
		</>
	)
}
