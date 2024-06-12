import { UserContext } from '@contexts'
import type { FormProps } from 'antd'
import { Button, Checkbox, Form, Input } from 'antd'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

type FieldType = {
	login?: string
	password?: string
	remember?: string
}

const LoginForm = () => {
	const navigate = useNavigate()
	const context = useContext(UserContext)

	const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {

		const { login, password } = values

		if (login === '' || password === '') return
		
		var urlencoded = new URLSearchParams()
		urlencoded.append('login', values.login)
		urlencoded.append('password', values.password)

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
			console.log(userData[0], context)

			localStorage.setItem('userInfo', JSON.stringify(userData[0]))

			context.setUserData(userData[0])

			if (userData[0].role === 'admin') {
				// тут редирект на админку сделать
				console.log('admin')
			}

			if (userData[0].role === 'user') {
				navigate('/')
			}
		}
	}

	const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (
		errorInfo
	) => {
		console.log('Failed:', errorInfo)
	}

	return (
		<Form
			name='basic'
			labelCol={{ span: 40 }}
			wrapperCol={{ span: 20 }}
			style={{ width: 400 }}
			initialValues={{ remember: true }}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			layout={'vertical'}
			autoComplete='off'
		>
			<Form.Item<FieldType>
				label='Логин или E-Mail'
				name='login'
				wrapperCol={{ span: 40 }}
				rules={[{ required: true, message: 'Введите логин или почту!' }]}
			>
				<Input size='large' />
			</Form.Item>

			<Form.Item<FieldType>
				label='Пароль'
				name='password'
				wrapperCol={{ span: 40 }}
				rules={[{ required: true, message: 'Введите пароль' }]}
			>
				<Input.Password size='large' />
			</Form.Item>

			<Form.Item<FieldType>
				name='remember'
				valuePropName='checked'
				wrapperCol={{ span: 40 }}
			>
				<Checkbox>Запомнить меня</Checkbox>
			</Form.Item>

			<Form.Item wrapperCol={{ offset: 0, span: 40 }}>
				<Button
					type='primary'
					htmlType='submit'
					style={{ height: '40px', width: '100%' }}
				>
					Войти
				</Button>
			</Form.Item>
		</Form>
	)
}

export default LoginForm
