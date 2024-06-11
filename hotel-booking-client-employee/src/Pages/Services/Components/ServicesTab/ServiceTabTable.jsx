import { MoreOutlined } from '@ant-design/icons'
import { Button, Dropdown, Space, Table } from 'antd'
import { useState } from 'react'

const data = [
	{
		service_name: 'Бассейн',
		service_description: 'Бассейн',
		service_type: 'Общий',
		temp_accrual_rate: 'За гостя в сутки',
		service_cost: '250',
		service_photo: ''
	}
]

export default function ServiceTabTable(props) {
	const [items, setItems] = useState([
		{
			label: (
				<div className='room-service__list-settings'>
					<img src='/image/edit.png' />
					<p>Редактировать услугу</p>
				</div>
			),
			key: 'edit-service'
		},
		{
			label: (
				<div className='room-service__list-settings'>
					<img src='/image/delete.png' />
					<p>Удалить услугу</p>
				</div>
			),
			key: 'delete-service'
		}
	])
	const onClick = ({ key }) => {
		if (key === 'add-work') {
			props.setIsRepair(true)
		}
		if (key === 'planing-work') {
			props.setIsPlaning(true)
		}
		if (key === 'edit-work') {
			props.setIsEdit(true)
		}
	}

	const columns = [
		{
			title: 'Название',
			dataIndex: 'service_name',
			key: 'service_name'
		},
		{
			title: 'Описание',
			dataIndex: 'service_description',
			key: 'service_description'
		},
		{
			title: 'Тип услуги',
			dataIndex: 'service_type',
			key: 'service_type'
		},
		{
			title: 'Темп начисления цены',
			dataIndex: 'temp_accrual_rate',
			key: 'temp_accrual_rate'
		},
		{
			title: 'Цена',
			dataIndex: 'service_cost',
			key: 'service_cost'
		},
		{
			title: 'Фото',
			dataIndex: 'service_photo',
			key: 'service_photo'
		},

		{
			title: '',
			key: 'action',
			render: (_, record) => (
				<Space size='large'>
					<Dropdown menu={{ items, onClick, record }} trigger={['click']}>
						<Space>
							<Button onClick={() => setSelectedRow(record.key)} shape='circle' icon={<MoreOutlined />} />
						</Space>
					</Dropdown>
				</Space>
			)
		}
	]

	return <Table columns={columns} data={data} dataSource={data} />
}
