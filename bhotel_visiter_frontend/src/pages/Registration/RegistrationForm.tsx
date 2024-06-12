import React from 'react'
import type { FormProps } from 'antd'
import { Button, Checkbox, Form, Input } from 'antd'

type FieldType = {
	username?: string
	password?: string
	remember?: string
}

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
	console.log('Success:', values)
}

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
	console.log('Failed:', errorInfo)
}

const RegistrationForm: React.FC = () => (
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
			label='Имя'
			name='username'
            wrapperCol={{ span: 40 }}
			rules={[{ required: true, message: 'Введите Ваше имя!' }]}
		>
			<Input size='large' />
		</Form.Item>
		<Form.Item<FieldType>
			label='Фамилия'
			name='username'
            wrapperCol={{ span: 40 }}
			rules={[{ required: true, message: 'Введите Вашу фамилию!' }]}
		>
			<Input size='large' />
		</Form.Item>
		<Form.Item<FieldType>
			label='Отчество'
			name='username'
            wrapperCol={{ span: 40 }}
		>
			<Input size='large' />
		</Form.Item>
		<Form.Item<FieldType>
			label='Логин или E-Mail'
			name='username'
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
			label='Подтверждение пароля'
			name='password'
            wrapperCol={{ span: 40 }}
			rules={[{ required: true, message: 'Введите пароль' }]}
		>
			<Input.Password size='large' />
		</Form.Item>
		<Form.Item wrapperCol={{ offset: 0, span: 40 }}>
			<Button type='primary' htmlType='submit' style={{ height: '40px', width: '100%' }}>
				Войти
			</Button>
		</Form.Item>
	</Form>
)

export default RegistrationForm
