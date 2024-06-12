import { trpc } from '@helpers'
import { AdminPageTitle } from '@widgets'
import { Button } from 'primereact/button'
import { Checkbox } from 'primereact/checkbox'
import { Column, ColumnEditorOptions } from 'primereact/column'
import { DataTable, DataTableRowEditCompleteEvent } from 'primereact/datatable'
import {
	InputNumber,
	InputNumberValueChangeEvent
} from 'primereact/inputnumber'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { Tag } from 'primereact/tag'
import { Toast } from 'primereact/toast'
import { useEffect, useRef, useState } from 'react'

type TService = {
	id: number
	name: string
	price: number
	description: string
	is_available: boolean
}

export const OptionsListPage = () => {
	const [products, setProducts] = useState<Array<TService>>([])
	const [getServices] = trpc.useQueries((t) => [t.getAllServices()])
	const mutation = trpc.setService.useMutation()
	const toast = useRef<Toast>(null)

	useEffect(() => {
		getServices.refetch()
	}, [])

	const refresh = () => {
		getServices.refetch()
	}

	useEffect(() => {
		const result = getServices.data as Array<TService>

		setProducts(result)
	}, [getServices.data])

	const statusBodyTemplate = (rowData: TService) => {
		return (
			<Tag
				value={rowData.is_available ? 'Доступно' : 'Не доступно'}
				severity={rowData.is_available ? 'success' : 'warning'}
			/>
		)
	}

	const textEditor = (options: ColumnEditorOptions) => {
		return (
			<InputText
				type='text'
				value={options.value}
				style={{ width: '100%' }}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
					options.editorCallback!(e.target.value)
				}
			/>
		)
	}

	const priceBodyTemplate = (rowData: TService) => {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD'
		}).format(rowData.price)
	}

	const priceEditor = (options: ColumnEditorOptions) => {
		return (
			<InputNumber
				value={options.value}
				onValueChange={(e: InputNumberValueChangeEvent) =>
					options.editorCallback!(e.value)
				}
				mode='currency'
				currency='USD'
				locale='en-US'
			/>
		)
	}

	const descriptionEditor = (options: ColumnEditorOptions) => {
		return (
			<InputTextarea
				style={{ width: '100%' }}
				value={options.value}
				onChange={(e) => options.editorCallback!(e.target.value)}
			/>
		)
	}

	const availableEditor = (options: ColumnEditorOptions) => {
		console.log(options.value)

		return (
			<Checkbox
				checked={false}
				onChange={(e) => options.editorCallback!(e.target.value)}
			/>
		)
	}

	const show = () => {
		toast.current?.show({
			severity: 'success',
			summary: 'Успех!',
			detail: 'Данные успешно обновлены'
		})
	}

	const onRowEditComplete = async (e: DataTableRowEditCompleteEvent) => {
		const { id, name, is_available, description, price } = e.newData as TService

		await mutation.mutateAsync({
			id: id.toString(),
			name: name,
			description: description,
			price: price,
			is_available: is_available
		})

		if (getServices.isSuccess) {
			getServices.refetch()
			show()
		}

		console.log(e)
	}

	return (
		<>
			<AdminPageTitle title={'Список услуг'} />
			<Toast ref={toast} />
			<div className='mt-3 flex flex-row gap-3'>
				<Button
					icon='pi pi-trash'
					severity='danger'
					label='Удалить (0)'
					disabled
				/>
				<Button
					icon='pi pi-refresh'
					onClick={refresh}
					severity='success'
					label='Обновить список'
				/>
			</div>
			{getServices.isFetching && <p>Загрузка</p>}
			{getServices.isSuccess && !getServices.isLoading && products && (
				<DataTable
					dataKey='id'
					editMode='row'
					onRowEditComplete={onRowEditComplete}
					className='mt-3'
					value={products}
					tableStyle={{ minWidth: '50rem' }}
					paginator
					rows={5}
					rowsPerPageOptions={[5, 10, 25, 50]}
				>
					<Column style={{ width: 300 }} field='id' header='ID'></Column>
					<Column
						style={{ width: 300 }}
						editor={(options) => textEditor(options)}
						sortable
						field='name'
						header='Название'
					></Column>
					<Column
						style={{ width: 170 }}
						body={priceBodyTemplate}
						editor={(options) => priceEditor(options)}
						sortable
						field='price'
						header='Цена (руб)'
					></Column>
					<Column
						style={{ width: 400 }}
						editor={descriptionEditor}
						sortable
						field='description'
						header='Описание'
					></Column>
					<Column
						editor={availableEditor}
						body={statusBodyTemplate}
						sortable
						field='is_availible'
						header='Статус'
					></Column>
					<Column rowEditor={true} header='Действия'></Column>
				</DataTable>
			)}
		</>
	)
}
