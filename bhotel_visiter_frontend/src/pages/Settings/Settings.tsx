import {
	Button,
	Avatar,
	Form,
	Input,
	DatePicker,
	Row,
	Col,
	FormProps
} from 'antd'
import './style.scss'
import { useNavigate } from 'react-router-dom'
import { Header } from '@widgets'
import { UserOutlined } from '@ant-design/icons'
import { UserContext } from '@contexts'
import { useContext, useEffect } from 'react'

type SettingsField = {
	name: string
	surname: string
	father_name?: string
	phone?: string
	birthday?: string
	email?: string
	password?: string
	confirm_password?: string
}

const Settings = () => {
	const [form] = Form.useForm()
	const onFinish: FormProps<SettingsField>['onFinish'] = async (
		values: any
	) => {
		console.log('Received values:', values)
	}

	const context = useContext(UserContext)

	useEffect(() => {
		form.setFieldsValue({
			name: context.name,
			surname: context.surname,
			father_name: context.father_name,
			email: context.email,
			phone: context.phone,
			birthday: context.birthday
		})
	}, [])

	const navigate = useNavigate()

	return (
		<>
			<Header />
			<div
				className='Settings-container'
				style={{
					margin: '100px 250px',
					display: 'flex',
					gap: '20px'
				}}
			>
				<div className='Settings-info'>
					<Button
						icon={
							<i
								style={{ position: 'relative', top: 5 }}
								className='fi fi-ss-angle-double-left'
							></i>
						}
						onClick={() => navigate('/profile')}
					>
						{'Обратно в профиль'}
					</Button>
					<p>Редактировать профиль</p>
					<Avatar shape='square' size={268} icon={<UserOutlined />} />
				</div>
				<div className='Settings-form'>
					<div
						style={{
							display: 'flex',
							justifyContent: 'end'
						}}
					>
						<Button type={'primary'} onClick={() => form.submit()}>
							Сохранить изменения
						</Button>
					</div>
					<Form
						form={form}
						name='registration_form'
						layout='vertical'
						initialValues={{ remember: true }}
						onFinish={onFinish}
					>
						<Row gutter={[16, 16]}>
							<Col span={8}>
								<Form.Item<SettingsField>
									label='Имя'
									name='name'
									rules={[{ required: true, message: 'Введите ваше имя' }]}
								>
									<Input />
								</Form.Item>
							</Col>
							<Col span={8}>
								<Form.Item<SettingsField>
									label='Фамилия'
									name='surname'
									rules={[{ required: true, message: 'Введите вашу фамилию' }]}
								>
									<Input />
								</Form.Item>
							</Col>
							<Col span={8}>
								<Form.Item<SettingsField>
									label='Отчество'
									name='father_name'
									rules={[{ required: true, message: 'Введите ваше отчество' }]}
								>
									<Input />
								</Form.Item>
							</Col>
						</Row>
						<Row gutter={[16, 16]}>
							<Col span={24}>
								<Form.Item<SettingsField>
									label='Телефон'
									name='phone'
									rules={[
										{ required: true, message: 'Введите ваш номер телефона' }
									]}
								>
									<Input />
								</Form.Item>
							</Col>
						</Row>
						<Row gutter={[16, 16]}>
							<Col span={24}>
								<Form.Item<SettingsField>
									label='Почта'
									name='email'
									rules={[
										{
											required: true,
											type: 'email',
											message: 'Введите вашу почту'
										}
									]}
								>
									<Input />
								</Form.Item>
							</Col>
						</Row>
						<Row gutter={[16, 16]}>
							<Col span={12}>
								<Form.Item<SettingsField>
									label='Пароль'
									name='password'
									rules={[{ required: true, message: 'Введите ваш пароль' }]}
								>
									<Input.Password />
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item<SettingsField>
									label='Повтор пароля'
									name='confirm_password'
									dependencies={['password']}
									rules={[
										{ required: true, message: 'Повторите ваш пароль' },
										({ getFieldValue }) => ({
											validator(_, value) {
												if (!value || getFieldValue('password') === value) {
													return Promise.resolve()
												}
												return Promise.reject(new Error('Пароли не совпадают'))
											}
										})
									]}
								>
									<Input.Password />
								</Form.Item>
							</Col>
						</Row>
						<Row gutter={[16, 16]}>
							<Col span={24}>
								<Form.Item
									label='Дата рождения'
									name='birthday'
									rules={[
										{ required: true, message: 'Введите вашу дату рождения' }
									]}
								>
									<DatePicker
										style={{ width: '100%' }}
										placeholder='Выберите дату'
										format='YYYY-MM-DDTHH:mm:ss'
									/>
								</Form.Item>
							</Col>
						</Row>
					</Form>
				</div>
			</div>
		</>
	)
}

export default Settings
