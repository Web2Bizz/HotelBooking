import { Button, Avatar, Form, Input, DatePicker, Row, Col } from 'antd'
import './style.scss'
import { useNavigate } from 'react-router-dom'
import { Header } from '@widgets'

const Settings = () => {
	const [form] = Form.useForm()
	const onFinish = (values: any) => {
		console.log('Received values:', values)
	}

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
					<Button onClick={() => navigate('/profile')}>
						{'<< Обратно в профиль'}
					</Button>
					<p>Редактировать профиль</p>
					<Avatar
						src={
							'https://webgradients.com/public/webgradients_png/022%20Morpheus%20Den.png'
						}
						size={268}
					/>
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
								<Form.Item
									label='Имя'
									name='firstName'
									rules={[{ required: true, message: 'Введите ваше имя' }]}
								>
									<Input />
								</Form.Item>
							</Col>
							<Col span={8}>
								<Form.Item
									label='Фамилия'
									name='lastName'
									rules={[{ required: true, message: 'Введите вашу фамилию' }]}
								>
									<Input />
								</Form.Item>
							</Col>
							<Col span={8}>
								<Form.Item
									label='Отчество'
									name='fatherName'
									rules={[{ required: true, message: 'Введите ваше отчество' }]}
								>
									<Input />
								</Form.Item>
							</Col>
						</Row>
						<Row gutter={[16, 16]}>
							<Col span={24}>
								<Form.Item
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
								<Form.Item
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
								<Form.Item
									label='Пароль'
									name='password'
									rules={[{ required: true, message: 'Введите ваш пароль' }]}
								>
									<Input.Password />
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item
									label='Повтор пароля'
									name='confirmPassword'
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
