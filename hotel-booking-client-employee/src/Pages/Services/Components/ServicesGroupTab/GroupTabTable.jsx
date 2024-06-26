import { MoreOutlined } from '@ant-design/icons'
import { Button, Dropdown, Space, Table } from 'antd'
import { useState } from 'react'
export default function GroupTabTable() {
	const dataSource = [
		{
			key: '1',
			name: 'Питание',
			description: '-'
		},
		{
			key: '2',
			name: 'Парковка',
			description: 'Какое-то описание'
		}
	]
	const columns = [
		{
			title: 'Название',
			dataIndex: 'name',
			key: 'name',
			render: (text) => (
				<Space size='middle'>
					<a style={{ color: '#3B92FF' }}>{text}</a>
				</Space>
			)
		},
		{
			title: 'Описание',
			dataIndex: 'description',
			key: 'description'
		},
		{
			title: 'Действие',
			dataIndex: 'action',
			key: 'action',
			align: 'center',
			render: (_, record) => (
				<Space size='large'>
					<Dropdown menu={{ items, onClick, record }} trigger={['click']}>
						<Space>
							<Button shape='circle' icon={<MoreOutlined />} />
						</Space>
					</Dropdown>
				</Space>
			)
		}
	]
	const [items, setItems] = useState([
		{
			label: (
				<div className='room-service__list-settings'>
					<img src='/image/edit.png' />
					<p>Редактировать группу услуг</p>
				</div>
			),
			key: 'edit-service'
		},
		{
			label: (
				<div className='room-service__list-settings'>
					<img src='/image/delete.png' />
					<p>Удалить группу услуг</p>
				</div>
			),
			key: 'delete-service'
		}
	])
	const onClick = ({ key }) => {
		if (key === 'cleaning') {
		}
		if (key === 'clean') {
		}
		if (key === 'checked') {
		}
		if (key === 'repair') {
			props.setIsRepair(true)
		}
	}
	return <Table dataSource={dataSource} columns={columns} pagination={false} />
}
