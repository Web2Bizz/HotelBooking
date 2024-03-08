import { Modal, Divider, Input } from 'antd'
const { TextArea } = Input

export default function GroupTabModal(props) {
	const handleOk = () => {
		props.setIsModalOpen(false)
	}
	const handleCancel = () => {
		props.setIsModalOpen(false)
	}
	return (
		<Modal title='Создание группы услуг' open={props.isModalOpen} onOk={handleOk} onCancel={handleCancel}>
			<Divider />
			<div className='d-flex flex-column'>
				<div className='group-tab-modal-inputs'>
					<p>Название</p>
					<div>
						<Input />
					</div>
				</div>
				<div className='group-tab-modal-inputs'>
					<p>Описание</p>
					<div>
						<TextArea
							// value={value}
							// onChange={(e) => setValue(e.target.value)}
							autoSize={{ minRows: 3, maxRows: 5 }}
						/>
					</div>
				</div>
			</div>
			<Divider />
		</Modal>
	)
}
