import { Avatar, Modal } from 'antd'
import './style.scss'
import { useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import { UserContext } from '../../../app/contexts/userContext'

const ProfileCard = () => {
	const navigate = useNavigate()

	const context = useContext(UserContext)

	const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

	const showModal = () => {
		setIsModalOpen(true)
	}

	const handleOk = () => {
		setIsModalOpen(false)
	}

	const handleCancel = () => {
		setIsModalOpen(false)
	}

	return (
		<>
			<div className='ProfileCard-container'>
				<div className='ProfileCard-title'>
					<p>Профиль</p>
				</div>
				<div className='ProfileCard-content'>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							flexDirection: 'column'
						}}
					>
						<Avatar src={context.avatar} size={268} shape='circle' />
						<div className='ProfileCard-name'>
							<p>
								{context.name} {context.surname} {context.fatherName}
							</p>
						</div>
					</div>
					<div className='ProfileCard-buttons'>
						<ul className='PeculiaritiesRooms-custom-list'>
							<li className='PeculiaritiesRooms-custom-list-item'>
								<a onClick={() => navigate('/settings')}>Редактировать профиль</a>
							</li>
							<li className='PeculiaritiesRooms-custom-list-item'>
								<a onClick={() => navigate('/payments')}>Способы оплаты</a>
							</li>
							<li className='PeculiaritiesRooms-custom-list-item'>
								<a href=''>Справка</a>
							</li>
							<li className='PeculiaritiesRooms-custom-list-item'>
								<a type='button' onClick={showModal}>
									Выйти
								</a>
							</li>
						</ul>
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
				okButtonProps={{ style: { height: 'unset' } }}
				cancelButtonProps={{ style: { height: 'unset' } }}
			>
				<p>Вы уверены что хотите выйти?</p>
			</Modal>
		</>
	)
}

export default ProfileCard
