/* eslint-disable @typescript-eslint/ban-ts-comment */
import { AddPriceTourContext } from '@contexts'
import { TourAddPricesForm } from '@features'
import { trpc } from '@helpers'
import { AdminPageTitle, CustomCheckbox } from '@widgets'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import { InputTextarea } from 'primereact/inputtextarea'
import { useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { Faq, FrontendMainPageConfig } from 'trpc-package'
import { TFaq } from '../../../../../packages/package.trpc-routes/@types/routes/faq'
import { WrapperUpload } from './WrapperUpload'

type TCoverType = {
	displayName: string
	name: string
}

const coverTypes: Array<TCoverType> = [
	{
		displayName: 'Статичный фон',
		name: 'static'
	},
	{
		displayName: 'Карусель',
		name: 'carusel'
	}
]

export const MainPage = () => {
	const mutation = trpc.setFrontendMainPage.useMutation()
	const addFaq = trpc.addFAQItem.useMutation()
	const deleteFaq = trpc.deleteFAQItem.useMutation()
	const editFaq = trpc.updateFAQItem.useMutation()
	const [getSettings] = trpc.useQueries((t) => [t.getFrontendMainPage()])
	const [getAllFAQ] = trpc.useQueries((t) => [t.getAllFAQ()])

	const [data, setData] = useState<FrontendMainPageConfig>()

	const [fields, setFields] = useState<Array<Faq>>()
	const [editedList, setEditedList] = useState<Set<string>>(new Set<string>())
	const [addedList, setAddedList] = useState<Set<string>>(new Set<string>())
	const [deleteList, setDeleteList] = useState<Set<string>>(new Set<string>())

	const { control, handleSubmit, reset } = useForm<FrontendMainPageConfig>({
		defaultValues: async () => {
			return getSettings.data!
		},
		mode: 'all'
	})

	useEffect(() => {
		setData(getSettings.data)

		setFields(getAllFAQ.data)
	}, [getAllFAQ.data, getSettings.data])

	useEffect(() => {
		if (data !== undefined) {
			reset({ ...data })
		}
	}, [data, reset])

	const onSubmit: SubmitHandler<FrontendMainPageConfig> = (formData) => {
		if (addedList.size > 0) {
			const a: Array<TFaq> = []

			addedList.forEach((id) => {
				const y = fields?.find((field) => field.id === id)
				if (y === undefined) return
				a.push(y)
			})

			addFaq.mutate(a)
		}

		if (editedList.size > 0) {
			editedList.forEach((id) => {
				const y = fields?.find((field) => field.id === id)
				if (y === undefined) return
				editFaq.mutate(y)
			})
		}

		if (deleteList.size > 0) {
			const a: Array<string> = []
			deleteList.forEach((id) => {
				a.push(id)
			})
			deleteFaq.mutate(a)
		}

		mutation.mutate({
			...formData
		})
	}

	const handleDelete = (id: string) => {
		if (addedList.has(id)) {
			const addList = addedList
			addList.delete(id)
			setAddedList(addList)
		} else {
			const origin = deleteList
			origin.add(id)
			setDeleteList(origin)
		}

		if (editedList.has(id)) {
			const origin = editedList
			origin.delete(id)
			setEditedList(origin)
		}
	}

	const handleEdit = (data: TFaq) => {
		if (addedList.has(data.id)) return

		const origin = editedList
		origin.add(data.id)
		setEditedList(origin)
	}

	const handleAppend = (data: TFaq) => {
		const origin = addedList
		origin.add(data.id)
		setAddedList(origin)
	}

	return (
		<>
			<AdminPageTitle title={'Главная страница'} />
			<form className='col-5' onSubmit={handleSubmit(onSubmit)}>
				<h3>Приветствие</h3>
				<Controller
					control={control}
					name='cover_type'
					render={({ field }) => (
						<Dropdown
							{...field}
							className='col-12'
							placeholder='Выберете поведение фона'
							options={coverTypes}
							optionLabel="displayName"
						/>
					)}
				/>
				<WrapperUpload />
				<Controller
					name='welcome_message'
					control={control}
					render={({ field }) => (
						<InputTextarea style={{ width: '100%' }} rows={7} {...field} />
					)}
				/>
				<Controller
					name='display_discount'
					control={control}
					render={({ field }) => (
						<CustomCheckbox label='Отображать блок Скидок' {...field} />
					)}
				/>
				<Controller
					name='display_booking'
					control={control}
					render={({ field }) => (
						<CustomCheckbox
							label='Отображать кнопку Забронировать номер'
							{...field}
						/>
					)}
				/>
				<Controller
					name='display_popular'
					control={control}
					render={({ field }) => (
						<CustomCheckbox
							label='Отображать блок Сейчас популярно'
							{...field}
						/>
					)}
				/>
				<Controller
					name='display_faq'
					control={control}
					render={({ field }) => (
						<CustomCheckbox
							label='Отображать блок Часто задаваемые вопросы'
							{...field}
						/>
					)}
				/>
				<AddPriceTourContext.Provider
					value={{ fields: fields ?? [], setFields: setFields }}
				>
					<TourAddPricesForm
						onAppend={handleAppend}
						onEdit={handleEdit}
						onDelete={handleDelete}
					/>
				</AddPriceTourContext.Provider>
				<Button label='Сохранить' icon='pi pi-save' className='col-12 mt-3' />
			</form>
		</>
	)
}
