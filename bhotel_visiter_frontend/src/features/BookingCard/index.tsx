import { useState } from 'react'
import './style.scss'
import { Button, Modal } from 'antd'

type BookingCardProps = {
	type: string
	image: string
}

export const BookingCard: React.FC<BookingCardProps> = ({ type, image }) => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
	const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false)

	const showModal = () => {
		setIsModalOpen(true)
	}

	const handleOk = () => {
		setIsModalOpen(false)
	}

	const handleCancel = () => {
		setIsModalOpen(false)
	}

	const showDatailModal = () => {
		setIsDetailsOpen(true)
	}

	const handleDatailOk = () => {
		setIsDetailsOpen(false)
	}

	return (
		<>
			<div className='BookingCard-container'>
				<div className='BookingCard-img'>
					<img src={'/' + image} alt='booking-img' />
				</div>
				<div className='BookingCard-content'>
					<div className='BookingCard-text'>
						<h1>Номер Черемшан</h1>
						<p>26.04.24 - 28.04.24</p>
						<p>Двухкомнатный номер</p>
					</div>
					<div className='BookingCard-buttons'>
						{type === 'history' ? (
							<Button style={{ opacity: 0 }}>Повторить бронь</Button>
						) : (
							<Button danger onClick={showModal}>
								Отменить бронь
							</Button>
						)}
						<Button type='primary' onClick={showDatailModal}>
							Детали
						</Button>
					</div>
				</div>
			</div>
			<Modal
				title='Подтверждение действий'
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
				cancelText='Отмена'
				okText='Подтвердить'
				okButtonProps={{ danger: true, style: { height: 'unset' } }}
				cancelButtonProps={{ style: { height: 'unset' } }}
			>
				<p>Вы уверены что хотите отменить бронь?</p>
			</Modal>
			<Modal
				title='Подробности брони'
				open={isDetailsOpen}
				onOk={handleDatailOk}
				okText='Ок'
				okButtonProps={{ style: { height: 'unset' } }}
			>
				<p>Сюда вписать все подробности брони</p>
			</Modal>
		</>
	)
}
