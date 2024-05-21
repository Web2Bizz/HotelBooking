import { Table, Space, Dropdown, Button, Modal, Input, message } from 'antd'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { userGetAction, userDeleteAction, resetMessagesAction } from '../../store/actions/userAction'
import { MoreOutlined, ExclamationCircleFilled, SearchOutlined } from '@ant-design/icons'
import EditUser from './EditUser'
import { isEmpty } from '../../services/functionService'

const Users = () => {
	const [searchText, setSearchText] = useState('')
	const [isEditable, setIsEditable] = useState(false)
	const [selectedRow, setSelectedRow] = useState()
	const [items, setItems] = useState([
		{
			label: 'Редактировать',
			key: 'edit'
		},
		{
			label: 'Удалить',
			key: 'delete'
		}
	])
	// Dropdown menu
	const onClick = ({ key }) => {
		if (key === 'delete') {
			showDeleteConfirm()
		}
		if (key === 'edit') {
			setIsEditable(true)
		}
	}

	//
	// Delete row
	//
	const { confirm } = Modal
	const showDeleteConfirm = () => {
		confirm({
			title: 'Вы уверены, что хотите удалить пользователя?',
			icon: <ExclamationCircleFilled />,
			okText: 'Да',
			okType: 'danger',
			cancelText: 'Нет',
			onOk() {
				dispatch(userDeleteAction(selectedRow?.id_user))
			}
		})
	}
	console.log(selectedRow)
	const [filteredInfo, setFilteredInfo] = useState({})
	const handleChange = (pagination, filters, sorter) => {
		setFilteredInfo(filters)
		setSortedInfo(sorter)
	}
	const columnsUsers = [
		{
			title: 'Логин',
			dataIndex: 'login',
			key: 'login',
			filteredValue: [searchText],
			onFilter: (value, record) =>
				String(record.login).toLowerCase().includes(value.toLowerCase()) ||
				String(record.email).toLowerCase().includes(value.toLowerCase())
		},
		{
			title: 'Почта',
			dataIndex: 'email',
			key: 'email'
		},
		{
			title: 'Пароль',
			dataIndex: 'password',
			key: 'password',
			render: () => <p>******</p>
		},
		{
			title: 'Роль',
			dataIndex: 'role',
			key: 'role',
			render: (text) => <h3>{text}</h3>,
			filters: [
				{ text: 'admin', value: 'admin' },
				{ text: 'user', value: 'user' },
				{ text: 'manager', value: 'manager' }
			],
			filteredValue: filteredInfo.role,
			onFilter: (value, record) => record.role.includes(value)
		},
		{
			title: '',
			key: 'action',
			render: (_, record) => (
				<Space size='large'>
					<Dropdown menu={{ items, onClick, record }} trigger={['click']}>
						<Space>
							<Button onClick={() => setSelectedRow(record)} shape='circle' icon={<MoreOutlined />} />
						</Space>
					</Dropdown>
				</Space>
			)
		}
	]
	const { users, success, error } = useSelector((state) => state.userStore)
	const [messageApi, contextHolder] = message.useMessage()
	const [data, setData] = useState([])
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(userGetAction())
	}, [])
	useEffect(() => {
		setData(users)
	}, [users])
	useEffect(() => {
		if (!isEmpty(success)) {
			successCreate(success)
			dispatch(userGetAction())
			dispatch(resetMessagesAction())
		} else if (!isEmpty(error)) {
			errorCreate(error)
			dispatch(resetMessagesAction())
		}
	}, [success, error])
	const successCreate = (success) => {
		messageApi.open({
			type: 'success',
			content: success
		})
	}
	const errorCreate = (error) => {
		messageApi.open({
			type: 'error',
			content: error
		})
	}
	return (
		<div>
			{contextHolder}
			{isEditable ? (
				<EditUser setIsEditable={setIsEditable} user={selectedRow} />
			) : (
				<>
					<h2>Таблица пользователи</h2>
					<div className='d-f jc-e'>
						<Input
							size={'large'}
							style={{ width: '16vw' }}
							placeholder='Поиск...'
							prefix={<SearchOutlined />}
							value={searchText}
							onChange={(e) => setSearchText(e.target.value)}
						/>
					</div>
					<Table
						pagination={{
							pageSize: 6
						}}
						onChange={handleChange}
						style={{ marginTop: '10px' }}
						columns={columnsUsers}
						dataSource={data}
					/>
				</>
			)}
		</div>
	)
}

export default Users
