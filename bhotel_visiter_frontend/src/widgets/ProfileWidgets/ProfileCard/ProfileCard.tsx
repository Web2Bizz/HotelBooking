import { Avatar, Divider, Modal } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import { UserContext } from '../../../app/contexts/userContext'
import './style.scss'
import { UserOutlined } from '@ant-design/icons'

const ProfileCard = () => {
	const navigate = useNavigate()

	const context = useContext(UserContext)

	const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

	const showModal = () => {
		setIsModalOpen(true)
	}

	const handleOk = () => {
		setIsModalOpen(false)
		localStorage.removeItem('userInfo')
		context.setUserData(null)
		navigate('/')
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
							alignItems: 'start',
							flexDirection: 'column',
							paddingLeft: 50
						}}
					>
						<Avatar shape='square' size={268} icon={<UserOutlined />} />
						<div className='ProfileCard-name'>
							<p>
								{context.name} {context.surname}
							</p>
							<p>{context.father_name}</p>
						</div>
					</div>
					<div className='ProfileCard-buttons'>
						<ul className='PeculiaritiesRooms-custom-list'>
							<li
								className='PeculiaritiesRooms-custom-list-item'
								style={{ borderLeft: 'none' }}
							>
								<a
									className='profile__link'
									onClick={() => navigate('/settings')}
								>
									<i className='fi fi-rr-edit'></i>
									<span>Редактировать профиль</span>
								</a>
							</li>
							<li
								className='PeculiaritiesRooms-custom-list-item'
								style={{ borderLeft: 'none' }}
							>
								<a
									className='profile__link'
									onClick={() => navigate('/payments')}
								>
									<i className='fi fi-rr-credit-card'></i>
									<span>Способы оплаты</span>
								</a>
							</li>
							<li
								className='PeculiaritiesRooms-custom-list-item'
								style={{ borderLeft: 'none' }}
							>
								<a
									className='profile__link'
									onClick={() => navigate('/notifications')}
								>
									<i className='fi fi-rr-bell-ring'></i>
									<span>Уведомления</span>
								</a>
							</li>
							<li
								className='PeculiaritiesRooms-custom-list-item'
								style={{ borderLeft: 'none' }}
							>
								<a
									className='profile__link'
									onClick={() => navigate('/profile')}
								>
									<i className='fi fi-rr-database'></i>
									<span>История брони</span>
								</a>
							</li>
							<Divider />
							<li
								className='PeculiaritiesRooms-custom-list-item'
								style={{ borderLeft: 'none' }}
							>
								<a className='profile__link' href=''>
									<i className='fi fi-rr-comment-info'></i>
									<span>Справка</span>
								</a>
							</li>
							<li
								className='PeculiaritiesRooms-custom-list-item'
								style={{ borderLeft: 'none' }}
							>
								<a className='profile__link' type='button' onClick={showModal}>
									<i className='fi fi-rr-exit'></i>
									<span>Выйти</span>
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
