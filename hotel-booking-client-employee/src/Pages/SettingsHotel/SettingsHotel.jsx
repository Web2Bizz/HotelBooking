import './style.scss'
import { Card, Form, Input, Upload, Select, Collapse, Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

const PersonalDataStoragePolicyInfo = () => {
	return (
		<div>
			<p>
				Средства размещения как операторы персональных данных обязаны выбирать период их хранения строго в соответствии
				с применимым законодательством в сфере защиты персональных данных. Персональные данные гостя должны храниться не
				дольше, чем этого требуют цели обработки персональных данных.
			</p>
			<p>
				<b>Удаленные персональные данные не восстанавливаются.</b>
			</p>
			<p>
				Срок хранения персональных данных устанавливается с даты выезда гостя, изменение правила применяется ко всем
				бронированиям.
			</p>
			<p>
				Используйте вариант срока хранения “бесконечно", только если это разрешено применимым законодательством.
				Персональные данные будут храниться, пока вы не измените срок хранения или гость не потребует удалить его
				данные.
			</p>
		</div>
	)
}

export default function SettingsHotel() {
	return (
		<>
			<h2>Настройки отеля</h2>
			<div className='settings-hotel-container'>
				<Form>
					<Card title='Название и логотип'>
						<Form.Item label='Название отеля' name='hotel-name'>
							<Input placeholder='BookRoom' />
						</Form.Item>
						<Form.Item label='Логотип отеля' name='hotel-logo'>
							<div className='settings-hotel-logo-container'>
								<Upload action='/upload.do' listType='picture-card'>
									<button style={{ border: 0, background: 'none' }} type='button'>
										<PlusOutlined />
										<div style={{ marginTop: 8 }}>Загрузить</div>
									</button>
								</Upload>
								<div className='settings-hotel-logo'></div>
							</div>
						</Form.Item>
					</Card>
					<Card title='Политика хранения персональных данных гостей'>
						<Form.Item
							label='Срок хранения персональных данных с даты выезда гостя'
							name='id_personal_data_storage_policy'
						>
							<Select />
						</Form.Item>
						<Collapse
							ghost
							style={{ backgroundColor: '#E5F4FF' }}
							items={[
								{ key: 1, label: 'Правила хранения персональных данных', children: <PersonalDataStoragePolicyInfo /> }
							]}
						/>
					</Card>
					<Card title='Адрес'>
						<Form.Item label='Регион' name='hotel-region'>
							<Input placeholder='Ульяновская область' />
						</Form.Item>
						<Form.Item label='Город' name='hotel-city'>
							<Input placeholder='Димитровград' />
						</Form.Item>
						<Form.Item label='Улица' name='hotel-street'>
							<Input placeholder='Куйбышева' />
						</Form.Item>
						<Form.Item label='Номер дома' name='hotel-number-house'>
							<Input placeholder='300' />
						</Form.Item>
					</Card>
					<Card title='Телефон'>
						<Form.Item label='Контактный телефон' name='contact-number-phone'>
							<Input placeholder='+79081230101' />
						</Form.Item>
					</Card>
					<Card title='Электронная почта'>
						<Form.Item label='Email для рассылок' name='contact-email'>
							<Input placeholder='exampel@mail.com' />
						</Form.Item>
					</Card>
					<Card title='Общие настройки'>
						<Form.Item label='Количество комнат' name='hotel-number-room'>
							<Input placeholder='100' />
						</Form.Item>
						<Form.Item label='Количество этажей' name='hotel-number-floor'>
							<Input placeholder='5' />
						</Form.Item>
					</Card>
					<Form.Item>
						<div className='settings-hotel-button'>
							<Button type='primary' htmlType='submit'>
								Сохранить
							</Button>
						</div>
					</Form.Item>
				</Form>
			</div>
		</>
	)
}
