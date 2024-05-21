import { useState } from 'react'
import { Input, Button, Select } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { userEditAction } from '../../store/actions/userAction'
import { useDispatch } from 'react-redux'

const EditUser = ({ setIsEditable, user }) => {
	const [editedUser, setEditedUser] = useState({ ...user })
	const dispatch = useDispatch()
	const onBackButton = () => {
		setIsEditable(false)
	}

	const handleSave = () => {
		dispatch(userEditAction(editedUser))
	}

	const items = [
		{
			value: 'admin',
			label: 'admin'
		},
		{
			value: 'user',
			label: 'user'
		},
		{
			value: 'manager',
			label: 'manager'
		}
	]

	return (
		<div>
			<div className='d-f jc-sb'>
				<h2>Редактирвоание пользователя</h2>
				<Button type='text' icon={<ArrowLeftOutlined />} onClick={() => onBackButton()}>
					Назад
				</Button>
			</div>
			<div>
				<p style={{ marginTop: '20px', marginBottom: '5px' }}>Логин</p>
				<Input
					placeholder='login123'
					value={editedUser?.login}
					onChange={(e) => setEditedUser({ ...editedUser, login: e.target.value })}
				/>
				<p style={{ marginTop: '20px', marginBottom: '5px' }}>Почта</p>
				<Input
					placeholder='example@mail.ru'
					value={editedUser?.email}
					onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
				/>
				<p style={{ marginTop: '20px', marginBottom: '5px' }}>Пароль</p>
				<Input.Password
					placeholder='password'
					value={editedUser?.password}
					onChange={(e) => setEditedUser({ ...editedUser, password: e.target.value })}
				/>
				<p style={{ marginTop: '20px', marginBottom: '5px' }}>Роль</p>
				<div className='d-f' style={{ flexDirection: 'column' }}>
					<Select
						placeholder='Роль пользователя'
						options={items}
						value={editedUser?.role}
						onChange={(value) => setEditedUser({ ...editedUser, role: value })}
					/>
					<Button type='primary' style={{ marginTop: '40px' }} onClick={handleSave}>
						Сохранить
					</Button>
				</div>
			</div>
		</div>
	)
}

export default EditUser
