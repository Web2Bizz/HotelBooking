import { trpc } from '@helpers'
import { AdminPageTitle, CustomCheckbox } from '@widgets'
import { Button } from 'primereact/button'
import { ColorPicker } from 'primereact/colorpicker'
import { useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

interface IFormHeaderSettings {
	isDisplayLogo: boolean
	isDisplayName: boolean
	isDisplaySearch: boolean
	isDisplayBooking: boolean
	isDisplayProfileDetails: boolean
	backgroundColor: string
}

export const HeaderPage = () => {
	const [getHeaderSettings] = trpc.useQueries((t) => [
		t.consoleRoute.headerRouter.getSettings(
			'67342c88-fd1e-425b-99b1-3cdc427b914a'
		)
	])

	const { control, handleSubmit, formState, reset } =
		useForm<IFormHeaderSettings>({
			defaultValues: async () => {
				return getHeaderSettings.data!
			},
			mode: 'all'
		})

	const mutation = trpc.consoleRoute.headerRouter.setSettings.useMutation()

	const [data, setData] = useState<IFormHeaderSettings>()

	useEffect(() => {
		setData(getHeaderSettings.data as IFormHeaderSettings)
	}, [getHeaderSettings.data])

	useEffect(() => {
		if (data !== undefined) {
			reset({ ...data })
		}
	}, [data, reset])

	const onSubmit: SubmitHandler<IFormHeaderSettings> = (formData) => {
		mutation.mutate({
			...formData,
			backgroundColor: `#${formData.backgroundColor}`,
			id: '67342c88-fd1e-425b-99b1-3cdc427b914a'
		})
	}

	return (
		<>
			<AdminPageTitle title={'Шапка'} />
			<form className='col-4' onSubmit={handleSubmit(onSubmit)}>
				<h3>Цвет фона</h3>
				<Controller
					name='backgroundColor'
					control={control}
					render={({ field }) => (
						<ColorPicker
							format='hex'
							onChange={field.onChange}
							value={field.value}
						/>
					)}
				/>
				<h3>Логотип и бренд</h3>
				<Controller
					name='isDisplayLogo'
					control={control}
					render={({ field }) => (
						<CustomCheckbox label='Отображать логотип' {...field} />
					)}
				/>
				<Controller
					name='isDisplayName'
					control={control}
					render={({ field }) => (
						<CustomCheckbox label='Отображать название' {...field} />
					)}
				/>
				<Controller
					name='isDisplaySearch'
					control={control}
					render={({ field }) => (
						<CustomCheckbox label='Отображать поиск' {...field} />
					)}
				/>
				<h3>Действие</h3>
				<Controller
					name='isDisplayBooking'
					control={control}
					render={({ field }) => (
						<CustomCheckbox
							label='Отображать кнопку Забронировать номер'
							{...field}
						/>
					)}
				/>
				<h3>Аккаунт и пользователь</h3>
				<Controller
					name='isDisplayProfileDetails'
					control={control}
					render={({ field }) => (
						<CustomCheckbox
							label='Отображать фамилию и имя для пользователей'
							{...field}
						/>
					)}
				/>
				<Button
					disabled={!formState.isDirty}
					label='Сохранить'
					severity='success'
					className='col-12 mt-3'
				/>
			</form>
		</>
	)
}
