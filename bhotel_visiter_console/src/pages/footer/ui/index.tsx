import { AdminPageTitle, CustomCheckbox } from '@widgets'
import { SocialLink } from './SocialLink'
import { Button } from 'primereact/button'
import { trpc } from '@helpers'
import { useState, useEffect } from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'

interface IFormFooterSettings {
	isDisplayLogo: boolean
	isDisplayName: boolean
	isDisplaySocialBlock: boolean
}

export const FooterPage = () => {
	const [getSettings] = trpc.useQueries((t) => [t.getFrontendFooter()])

	const { control, handleSubmit, formState, reset } = useForm<IFormFooterSettings>({
		defaultValues: async () => {
			return getSettings.data!
		},
		mode: 'all'
	})

	// const mutation = trpc.setFrontendFooter.useMutation()

	const [data, setData] = useState<IFormFooterSettings>()

	useEffect(() => {
		setData(getSettings.data as IFormFooterSettings)
	}, [getSettings.data])

	useEffect(() => {
		if (data !== undefined) {
			reset({ ...data })
		}
	}, [data, reset])

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const onSubmit: SubmitHandler<IFormFooterSettings> = (_formData) => {
		// mutation.mutate({ ...formData })
	}

	return (
		<>
			<AdminPageTitle title={'Футер'} />
			<form className='col-4' onSubmit={handleSubmit(onSubmit)}>
				<h3>Логотип и бренд</h3>
				<Controller
					control={control}
					name='isDisplayLogo'
					render={({ field }) => <CustomCheckbox label='Отображать логотип' {...field} />}
				/>
				<Controller
					control={control}
					name='isDisplayName'
					render={({ field }) => <CustomCheckbox label='Отображать название' {...field} />}
				/>
				<Controller
					control={control}
					name='isDisplaySocialBlock'
					render={({ field }) => <CustomCheckbox label='Ссылки на социальные сети' {...field} />}
				/>
				<h3>Социальные сети</h3>
				<div className='flex flex-column gap-2'>
					<SocialLink domain={'https://vk.com/'} link={''} name={'ВКонтакте'} />
					<SocialLink domain={'https://t.me/'} link={''} name={'Телеграм'} />
					<SocialLink domain={'https://dzen.ru/'} link={''} name={'Дзен'} />
					<SocialLink domain={'https://pikabu.ru/'} link={''} name={'Пикабу'} />
					<SocialLink domain={'https://youtube.com/'} link={''} name={'YouTube'} />
					<SocialLink domain={'https://vimeo.com/'} link={''} name={'Vimeo'} />
					<SocialLink domain={'https://tiktok.com/'} link={''} name={'TikTok'} />
				</div>
				<Button disabled={!formState.isDirty} label='Сохранить' severity='success' className='col-12 mt-3' />
			</form>
		</>
	)
}
