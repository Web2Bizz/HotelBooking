import React from 'react'
import { List } from 'antd'
import ListItemTask from './ListItemTask'

const DataCleanerListTask = () => {
	const dataCleanerTasks = [
		{
			id: '231',
			title: 'Уборка номера',
			description: 'В комнате 431 пролили кофе, нужно прибраться.',
			status: 'Не назначена',
			color: 'red'
		},
		{
			id: '231',
			title: 'Уборка комнаты',
			description: 'В комнате 431 пролили кофе, нужно прибраться.',
			status: 'Не назначена',
			color: 'red'
		},
		{
			id: '831',
			title: 'Уборка хола',
			description: 'Один из посетителей разбил вазу, нужно убрать осколки.',
			status: 'Выполнена',
			color: 'blue'
		},
		{
			id: '561',
			title: 'Уборка туалетов',
			description: 'В туалете для сотрудников, на 2 этаже, грязный пол.',
			status: 'Выполняется',
			color: 'green'
		}
	]
	return (
		<List
			className='cleaner-list-task'
			itemLayout='vertical'
			pagination={{ defaultPageSize: 5 }}
			dataSource={dataCleanerTasks}
			renderItem={(item) => <ListItemTask item={item} />}
		/>
	)
}

export default DataCleanerListTask
