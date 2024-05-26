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
	const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false)

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

	const handleBookOk = () => {
		setIsBookingOpen(true)
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
						<Button type='primary' onClick={handleBookOk}>
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
			<Modal
				title='Статус заказа'
				open={isBookingOpen}
				onOk={handleDatailOk}
				cancelButtonProps={{ style: { display: 'none' } }}
				okText='Ок'
				okButtonProps={{ style: { height: 'unset' } }}
			>
				<p>Заказаны следующие дополнительные услуги:</p>
				<p style={{ display: 'flex', justifyContent: 'space-between' }}>
					<span>Премиум завтрак</span>
					<span>560 рублей</span>
				</p>
				<p style={{ display: 'flex', justifyContent: 'space-between' }}>
					<span>Мини бар</span>
					<span>1690 рублей</span>
				</p>
				<p style={{ display: 'flex', justifyContent: 'space-between' }}>
					<span>Прачечная</span>
					<span>400 рублей</span>
				</p>
				<hr />
				<h6 style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
					<span>Итого</span>
					<span>2650 рублей</span>
				</h6>
			</Modal>
		</>
	)
}
