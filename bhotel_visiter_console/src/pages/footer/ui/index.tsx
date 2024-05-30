import { AdminPageTitle, CustomCheckbox } from '@widgets'
import { Button } from 'primereact/button'
import { trpc } from '@helpers'
import { useState, useEffect, useRef } from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { InputText } from 'primereact/inputtext'
import { ColorPicker } from 'primereact/colorpicker'
import { Toast } from 'primereact/toast'

interface IFormFooterSettings {
	display_logo: boolean
	display_label: boolean
	display_social_block: boolean
	background_color: string
	display_vk: boolean
	vk_link: string
	display_dzen: boolean
	dzen_link: string
	display_telegram: boolean
	telegram_link: string
	display_youtube: boolean
	youtube_link: string
}

export const FooterPage = () => {
	const [getSettings] = trpc.useQueries((t) => [t.getFrontendFooter()])

	const { control, handleSubmit, reset } = useForm<IFormFooterSettings>({
		defaultValues: async () => {
			return getSettings.data!
		},
		mode: 'all'
	})

	const mutation = trpc.setFrontendFooter.useMutation()

	const [data, setData] = useState<IFormFooterSettings>()
	const toast = useRef<Toast>(null)

	useEffect(() => {
		setData(getSettings.data as IFormFooterSettings)
	}, [getSettings.data])

	useEffect(() => {
		if (data !== undefined) {
			reset({ ...data })
		}
	}, [data, reset])

	const show = () => {
		toast.current?.show({ severity: 'success', summary: 'Успех!', detail: 'Данные успешно отправлены' })
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const onSubmit: SubmitHandler<IFormFooterSettings> = (formData) => {
		mutation.mutate({ ...formData })
		show()
	}

	return (
		<>
			<AdminPageTitle title={'Футер'} />
			<Toast ref={toast} />
			<form className='col-4' onSubmit={handleSubmit(onSubmit)}>
				<h3>Цветовая схема</h3>
				<Controller
					name='background_color'
					control={control}
					render={({ field }) => <ColorPicker format='hex' onChange={field.onChange} value={field.value} />}
				/>
				<h3>Логотип и бренд</h3>
				<Controller
					control={control}
					name='display_logo'
					render={({ field }) => <CustomCheckbox label='Отображать логотип' {...field} />}
				/>
				<Controller
					control={control}
					name='display_label'
					render={({ field }) => <CustomCheckbox label='Отображать название' {...field} />}
				/>
				<Controller
					control={control}
					name='display_social_block'
					render={({ field }) => <CustomCheckbox label='Ссылки на социальные сети' {...field} />}
				/>
				<h3>Социальные сети</h3>
				<div className='flex flex-column gap-2'>
					<div className='card flex flex-column'>
						<Controller
							control={control}
							name='display_vk'
							render={({ field }) => <CustomCheckbox {...field} label='ВКонтакте' />}
						/>
						<Controller
							control={control}
							name='vk_link'
							render={({ field }) => (
								<div className='p-inputgroup flex-1 mt-2'>
									<span className='p-inputgroup-addon'>https://vk.com</span>
									<InputText placeholder='Website' defaultValue={field.value} onChange={field.onChange} />
								</div>
							)}
						/>
					</div>
					<div className='card flex flex-column'>
						<Controller
							control={control}
							name='display_telegram'
							render={({ field }) => <CustomCheckbox {...field} label='Телеграм' />}
						/>
						<Controller
							control={control}
							name='telegram_link'
							render={({ field }) => (
								<div className='p-inputgroup flex-1 mt-2'>
									<span className='p-inputgroup-addon'>https://t.me</span>
									<InputText placeholder='Website' defaultValue={field.value} onChange={field.onChange} />
								</div>
							)}
						/>
					</div>
					<div className='card flex flex-column'>
						<Controller
							control={control}
							name='display_youtube'
							render={({ field }) => <CustomCheckbox {...field} label='YouTube' />}
						/>
						<Controller
							control={control}
							name='youtube_link'
							render={({ field }) => (
								<div className='p-inputgroup flex-1 mt-2'>
									<span className='p-inputgroup-addon'>https://youtube.com</span>
									<InputText placeholder='Website' defaultValue={field.value} onChange={field.onChange} />
								</div>
							)}
						/>
					</div>
					<div className='card flex flex-column'>
						<Controller
							control={control}
							name='display_dzen'
							render={({ field }) => <CustomCheckbox {...field} label='Дзен' />}
						/>
						<Controller
							control={control}
							name='dzen_link'
							render={({ field }) => (
								<div className='p-inputgroup flex-1 mt-2'>
									<span className='p-inputgroup-addon'>https://dzen.ru</span>
									<InputText placeholder='Website' defaultValue={field.value} onChange={field.onChange} />
								</div>
							)}
						/>
					</div>
				</div>
				<Button label='Сохранить' icon='pi pi-save' className='col-12 mt-3' />
			</form>
		</>
	)
}
