import { Button } from 'antd'
import DataCleanerListTask from './DataCleanerListTask'
import { useState } from 'react'
import ManualAddTaskCleaner from './ManualAddTaskCleaner'

const ListTaskCleaner = (props) => {
	const [modalOpen, setModalOpen] = useState(false);
	return (
		<>
		<ManualAddTaskCleaner modalOpen={modalOpen} setModalOpen={setModalOpen}/>
		<div className='list-view' key={props.key}>
			<div className='d-flex justify-content-between'>
				<h4>Задачи уборщиков</h4>
				<Button type='primary' onClick={() => setModalOpen(true)}>Создать задачу</Button>
			</div>
			<DataCleanerListTask />
		</div>

		</>
	)
}

export default ListTaskCleaner
