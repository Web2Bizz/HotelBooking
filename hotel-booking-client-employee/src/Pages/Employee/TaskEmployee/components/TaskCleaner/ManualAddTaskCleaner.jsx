import { Modal,Button } from "antd"

export default function ManualAddTaskCleaner({modalOpen, setModalOpen}) {
    const handleOk = () => {}

	const handleCancel = () => {
		setModalOpen(false)
	}
  return (
    <Modal
				open={modalOpen}
				title={'Разбор жалобы/притензии'}
				onOk={handleOk}
				onCancel={handleCancel}
				width={'60vw'}
				footer={[
					<Button key='back' onClick={handleCancel}>
						Отмена
					</Button>,
					<Button key='submit' type='primary' onClick={handleOk}>
						Закрыть жалобу/притензию
					</Button>
				]}
			>
                </Modal>
  )
}
