import { useState } from 'react'
import { List, Tag, Button, Modal } from 'antd'
import { CSSTransition } from 'react-transition-group'
import ContentAddEmployeeTask from './ContentAddEmployeeTask'
import '../../../Employee.scss'
import ConfirmModal from '../ConfirmModal'

export default function ListItemTask({ item }) {
	const [addTaskEmployee, setAddTaskEmployee] = useState(false)

	const setListActions = (item) => {
		let list = [<Tag color={item.color}>{item.status}</Tag>]
		const { confirm } = Modal
		
		switch (item.status) {
			case 'Выполняется':
				list.unshift(<Button onClick={() => ConfirmModal('Вы точно хотите отметить завершение работы сотрудника?', console.log)}>Завершить</Button>)
				list.unshift(
					<div className='list-employee-complete'>
						<p>Выполняет:</p>
						<p>Давыдов Петр Сергеевич</p>
						<p>Время: 00:02:34</p>
					</div>
				)
				return list
			case 'Выполнена':
				list.unshift(
					<div className='list-employee-complete'>
						<p>Выполнил:</p>
						<p>Понамарев Виктор Александрович</p>
						<p>Время: 00:10:34</p>
					</div>
				)
				return list
			case 'Не назначена':
				list.unshift(
					<div className='list-employee-complete'>
						<Button onClick={() => setAddTaskEmployee(!addTaskEmployee)}>
							{addTaskEmployee ? 'Отмена' : 'Назначить'}
						</Button>
					</div>
				)
				return list
			default:
				break
		}
	}

	return (
		<List.Item extra={setListActions(item)}>
			{/* <Skeleton avatar title={false} loading={item.loading} active> */}
			<List.Item.Meta avatar={'#' + item.id} title={item.title} description={item.description} />
			<CSSTransition in={addTaskEmployee} classNames='listView' timeout={300} >
				<ContentAddEmployeeTask
					status={item.status}
					addTaskEmployee={addTaskEmployee}
					setAddTaskEmployee={setAddTaskEmployee}
				/>
			</CSSTransition>
			{/* </Skeleton> */}
		</List.Item>
	)
}
