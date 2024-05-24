/* eslint-disable @typescript-eslint/ban-ts-comment */
import { trpc } from '@helpers'
import { AdminPageTitle, CustomCheckbox } from '@widgets'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import { useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
// import { FloatLabel } from 'primereact/floatlabel'
// import { InputTextarea } from 'primereact/inputtextarea'

interface IMainPageFormData {
	cover_type: string
	display_discount: boolean
	display_booking: boolean
	display_popular: boolean
	display_faq: boolean
}

export const MainPage = () => {
	const [getSettings] = trpc.useQueries((t) => [t.getFrontendMainPage('67342c88-fd1e-425b-99b1-3cdc427b914a')])

	const mutation = trpc.setFrontendMainPage.useMutation()

	const { control, handleSubmit, formState, reset } = useForm<IMainPageFormData>({
		defaultValues: async () => {
			return getSettings.data!
		},
		mode: 'all'
	})

	const [data, setData] = useState<IMainPageFormData>()

	useEffect(() => {
		console.log(getSettings.data)

		setData(getSettings.data as IMainPageFormData)
	}, [getSettings.data])

	useEffect(() => {
		if (data !== undefined) {
			reset({ ...data })
		}
	}, [data, reset])

	const onSubmit: SubmitHandler<IMainPageFormData> = (formData) => {
		mutation.mutate({
			...formData,
			id: '67342c88-fd1e-425b-99b1-3cdc427b914a',
			frontend_id: '67342c88-fd1e-425b-99b1-3cdc427b914a'
		})
	}

	return (
		<>
			<AdminPageTitle title={'Главная страница'} />
			<form className='col-4' onSubmit={handleSubmit(onSubmit)}>
				<h3>Приветствие</h3>
				<Dropdown className='col-12' placeholder='Выберете поведение фона' options={['Статичный фон', 'Карусель']} />
				<div className='my-5'>
					{/* @ts-ignore */}
					{/* <FloatLabel>
						<InputTextarea id='username' rows={5} cols={30} className='col-12' />
						<label htmlFor='username'>Описание сайта</label>
					</FloatLabel> */}
				</div>
				<Controller
					name='display_discount'
					control={control}
					render={({ field }) => <CustomCheckbox label='Отображать блок Скидок' {...field} />}
				/>
				<Controller
					name='display_booking'
					control={control}
					render={({ ...field }) => <CustomCheckbox label='Отображать кнопку Забронировать номер' {...field} />}
				/>
				<Controller
					name='display_popular'
					control={control}
					render={({ field }) => <CustomCheckbox label='Отображать блок Сейчас популярно' {...field} />}
				/>
				<Controller
					name='display_faq'
					control={control}
					render={({ field }) => <CustomCheckbox label='Отображать блок Часто задаваемые вопросы' {...field} />}
				/>
				<Button disabled={!formState.isDirty} label='Сохранить' severity='success' className='col-12 mt-3' />
			</form>
		</>
	)
}
