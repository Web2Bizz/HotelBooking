import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { InputText } from 'primereact/inputtext'
import { Toast } from 'primereact/toast'
import { classNames } from 'primereact/utils'
import { useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

type TForm = {
	login: string
	password: string
}

export const LoginPage = () => {
	const defaultValues: TForm = {
		login: '',
		password: ''
	}

	const toast = useRef<Toast>(null)
	const navigate = useNavigate()
	const { control, handleSubmit, formState } = useForm({ defaultValues })

	const onSubmit = async (data: TForm) => {
		const { login, password } = data

		if (login === '' || password === '') return

		const urlencoded = new URLSearchParams()
		urlencoded.append('login', login)
		urlencoded.append('password', password)

		const result = await fetch(
			`${import.meta.env.VITE_APP_ADMIN_API}/user/login`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				body: urlencoded
			}
		)

		if (result.status === 200) {
			const userData = await result.json()
			// console.log(userData[0], context)

			localStorage.setItem('userInfo', JSON.stringify(userData[0]))
			navigate('/')

			// context.setUserData(userData[0])
		}
	}

	return (
		<div className='h-screen flex justify-content-center align-items-center'>
			<Toast position='bottom-right' ref={toast} />
			<form
				className='col-12 sm:col-8 md:col-6 lg:col-5 lg:max-w-28rem'
				onSubmit={handleSubmit(onSubmit)}
			>
				<Card title='Войти'>
					<Controller
						name='login'
						control={control}
						rules={{ required: 'Введите логин' }}
						render={({ field, fieldState }) => (
							<div className='my-3'>
								<label htmlFor={field.name}></label>
								<span className='p-float-label'>
									<InputText
										id={field.name}
										className={classNames({ 'p-invalid': fieldState.error })}
										style={{ width: '100%' }}
										onChange={(e) => field.onChange(e.target.value)}
									/>
									<label htmlFor={field.name}>Ваш логин</label>
								</span>
							</div>
						)}
					/>
					<Controller
						name='password'
						control={control}
						rules={{ required: 'Введите логин' }}
						render={({ field, fieldState }) => (
							<div className='mt-5'>
								<label htmlFor={field.name}></label>
								<span className='p-float-label'>
									<InputText
										id={field.name}
										className={
											classNames({ 'p-invalid': fieldState.error }) + ' w-12'
										}
										onChange={(e) => field.onChange(e.target.value)}
										type='password'
									/>
									<label htmlFor={field.name}>Ваш пароль</label>
								</span>
							</div>
						)}
					/>
					<Button
						disabled={!formState.isValid}
						label='Войти'
						className='w-12 mt-5'
						value={'d'}
					/>
				</Card>
			</form>
		</div>
	)
}
