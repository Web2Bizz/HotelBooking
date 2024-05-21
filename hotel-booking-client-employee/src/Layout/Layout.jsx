import React, { useState, useContext, useEffect, useLayoutEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Layout.scss'

import {
	HomeOutlined,
	EditOutlined,
	AuditOutlined,
	AppstoreOutlined,
	FireOutlined,
	DollarOutlined,
	FundOutlined,
	MenuUnfoldOutlined,
	MenuFoldOutlined,
	LogoutOutlined,
	SettingOutlined,
	UserOutlined
} from '@ant-design/icons'
import { Layout, Menu, theme, Button, message, Avatar, Dropdown, Divider } from 'antd'
import { ContextBooking } from '../context/booking.context'
import { useDispatch, useSelector } from 'react-redux'
import {
	getFacilityAction,
	getStatusAction,
	getTypeAction,
	getStatusDealAction,
	getCancelPolicyAction,
	getStatusGuestAction,
	getStatusGuestRoomAction,
	getStatusRepairAction,
	getPersonalDataStoragePolicyAction
} from '../store/actions/additionalsAction'
import { LoadingAction, logoutAction, userGetAction } from '../store/actions/userAction'
import { isEmpty, firstLetterNameUser } from '../services/functionService'
import {
	checkAndChangeStatusGuestAction,
	checkPersonalDataStoragePolicyAction,
	guestsGetAction
} from '../store/actions/bookingAction'
import { roomGetAction } from '../store/actions/roomAction'
import { dealGetAction } from '../store/actions/dealAction'
import { rateGetAction } from '../store/actions/rateAction'
import { hotelPropertiesGetAction, resetMessagesAction } from '../store/actions/hotelSettingsAction.js'

const { Header, Content, Footer, Sider } = Layout
const { useToken } = theme

export default function LayoutApp({ children }) {
	const {
		token: { colorBgContainer }
	} = theme.useToken()

	const { isAuth, success } = useSelector((state) => state.userStore)
	const { guests } = useSelector((state) => state.bookingStore)
	const { hotelProperties, success: HotelSuccess, error: HotelError } = useSelector((state) => state.hotelSettingsStore)
	const dispatch = useDispatch()
	const [user, setUser] = useState({})
	const [hotel, setHotel] = useState({})

	const [role, setRole] = useState()
	useEffect(() => {
		const userInfo = localStorage.getItem('userInfo')
		if (userInfo) {
			const role = JSON.parse(userInfo).role
			setRole(role)
		} else {
			console.log('В localStorage нет значения для userInfo')
		}
	}, [])

	useEffect(() => {
		dispatch(checkPersonalDataStoragePolicyAction())
		dispatch(userGetAction())
		dispatch(guestsGetAction())
		setUser(JSON.parse(localStorage.getItem('userInfo')))
		dispatch(LoadingAction(true))
	}, [])

	useEffect(() => {
		if (guests.length) {
			dispatch(checkAndChangeStatusGuestAction(guests))
		}
	}, [guests])

	useEffect(() => {
		loadData()
	}, [hotelProperties])

	useEffect(() => {
		dispatch(hotelPropertiesGetAction())
		dispatch(resetMessagesAction())
	}, [HotelError, HotelSuccess])

	const loadData = () => {
		if (hotelProperties.length <= 0) return
		const { hotel_logo, hotel_name } = hotelProperties[0]
		setHotel({
			hotel_logo,
			hotel_name
		})
	}

	const [load, setLoad] = useState(false)

	useEffect(() => {
		setUser(JSON.parse(localStorage.getItem('userInfo')))
		setLoad(true)
	}, [isAuth])

	useLayoutEffect(() => {
		dispatch(hotelPropertiesGetAction())
	}, [])

	useLayoutEffect(() => {
		if (!load) return
		if (user === undefined || user === null || Object.keys(user).length === 0) {
			navigation('/login')
		}
		// Проверяем hotelProperties
		else if (!hotelProperties || Object.keys(hotelProperties).length === 0) {
			navigation('/registration-hotel')
		}
		// Если оба условия не выполняются, переходим на '/overview'
		else {
			navigation(`/overview`)
			dispatch(getStatusAction())
			dispatch(getFacilityAction())
			dispatch(getTypeAction())
			dispatch(getStatusDealAction())
			dispatch(getCancelPolicyAction())
			dispatch(guestsGetAction())
			dispatch(roomGetAction())
			dispatch(dealGetAction())
			dispatch(rateGetAction())
			dispatch(getStatusGuestAction())
			dispatch(getStatusGuestRoomAction())
			dispatch(getStatusRepairAction())
			dispatch(getPersonalDataStoragePolicyAction())
		}
		dispatch(LoadingAction(false))
	}, [user])

	//
	// Notification
	//
	const [messageApi, contextHolder] = message.useMessage()
	useEffect(() => {
		if (!isEmpty(success)) {
			dispatch(resetMessagesAction())
			messageSuccess(success)
		}
		// eslint-disable-next-line
	}, [success])

	const messageSuccess = (text) => {
		messageApi.open({
			type: 'success',
			content: text
		})
	}

	//
	// Menu
	//
	function getItem(label, key, icon, children) {
		return {
			key,
			icon,
			children,
			label
		}
	}
	const { themeMenu } = useContext(ContextBooking)

	const items = [
		getItem('Обзор', 'overview', <HomeOutlined />),
		getItem('Статистика и отчеты', 'statisticAndReports', <FundOutlined />),
		getItem('Настройка отеля', 'setting-hotel', <SettingOutlined />),
		getItem('Оформление', 'frontdesk', <EditOutlined />),
		getItem('Гости', 'guest', <AuditOutlined />),
		getItem('Номера', 'room', <AppstoreOutlined />, [
			getItem('Все номера', 'allRoom'),
			getItem('Обслуживание', 'serviceRoom'),
			getItem('Ремонт номеров', 'repairRoom')
		]),
		getItem('Акции', 'deal', <FireOutlined />),
		getItem('Расценки', 'rate', <DollarOutlined />),
		getItem('Пользователи', 'users', <UserOutlined />)
		// getItem('Услуги', 'services', <FileDoneOutlined />),
		// getItem('Сотрудники', 'employee', <TeamOutlined />, [
		// 	getItem('Все', 'allEmployee'),
		// 	getItem('График', 'sсheduleEmployee'),
		// 	getItem('Задачи', 'taskEmployee')
		// ])
		// getItem('Дополнительно', 'advanced', <ControlOutlined />),
	]

	const filteredItems = items.filter((item) => {
		switch (item.key) {
			case 'overview':
				return true // Разрешить всегда
			case 'statisticAndReports':
				return role === 'admin' // Разрешить только для администратора
			case 'setting-hotel':
				return role === 'admin' // Разрешить для администратора и менеджера
			case 'frontdesk':
				return role === 'admin' || role === 'manager' // Разрешить для администратора и менеджера
			case 'guest':
				return role === 'admin' || role === 'manager' // Разрешить для администратора и менеджера
			case 'room':
				return role === 'admin' || role === 'manager' // Разрешить для администратора и менеджера
			case 'deal':
				return role === 'admin' || role === 'manager' // Разрешить только для администратора
			case 'rate':
				return role === 'admin' || role === 'manager' // Разрешить только для администратора
			case 'users':
				return role === 'admin' // Разрешить только для администратора
			default:
				return true
		}
	})

	//
	// Menu item click
	//
	const navigation = useNavigate()
	const onMenuItemClick = (e) => {
		navigation(`/${e.key}`)
	}

	//
	// Collapsed menu
	//
	const [collapsed, setCollapsed] = useState(false)
	const toggleCollapsed = () => {
		setCollapsed(!collapsed)
	}

	const { token } = useToken()
	const contentStyle = {
		backgroundColor: token.colorBgElevated,
		borderRadius: token.borderRadiusLG,
		boxShadow: token.boxShadowSecondary
	}
	const menuStyle = {
		boxShadow: 'none'
	}

	const onClick = ({ key }) => {
		if (key === 'exit') {
			dispatch(logoutAction())
			navigation('/login')
			messageSuccess('Вы успешно вышли из аккаунта')
		}
	}

	return (
		<>
			{contextHolder}
			<Layout className='min-vh-100 layout-container'>
				<Sider width={280} style={{ background: themeMenu === 'light' ? 'white' : '' }} collapsed={collapsed}>
					<div className='d-flex align-items-center justify-content-center'>
						<img src={hotel?.hotel_logo} alt='logo' style={{ width: '50px', marginLeft: collapsed ? '' : '10px' }} />
						<div className='loginPage__logo' style={collapsed ? { display: 'none' } : { display: 'block' }}>
							<p style={{ fontSize: '2em', alignItems: 'center', paddingTop: '2.2vh', lineHeight: '30px' }}>
								{hotel?.hotel_name}
							</p>
						</div>
					</div>
					<Menu
						onClick={onMenuItemClick}
						defaultSelectedKeys={['overview']}
						mode='inline'
						items={filteredItems}
						theme={themeMenu}
					/>
				</Sider>
				<Layout>
					<Header className='p-0' style={{ background: colorBgContainer }}>
						<div
							className='d-flex align-items-center justify-content-between'
							style={{ padding: '0 2vh 0 0', height: '100%' }}
						>
							<Button type='primary' onClick={toggleCollapsed} style={{ marginLeft: 16 }}>
								{collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
							</Button>
							<Dropdown
								menu={{
									items: [
										// getItem('Профиль', 'profile', <UserOutlined />),
										getItem('Выйти из аккаунта', 'exit', <LogoutOutlined />)
									],
									onClick
								}}
								dropdownRender={(menu) => (
									<div style={contentStyle}>
										<div style={{ padding: '1vh 2vh' }}>
											<div className='userInfo-dropdown'>
												<span>Логин: </span>
												<span> {user?.login}</span>
											</div>
											<div className='userInfo-dropdown'>
												<span>Роль: </span>
												<span> {user?.role}</span>
											</div>
										</div>
										<Divider style={{ margin: 0 }} />
										{React.cloneElement(menu, {
											style: menuStyle
										})}
									</div>
								)}
								trigger={['click']}
							>
								<Avatar shape='square' size='large' style={{ backgroundColor: '#3B92FF', cursor: 'pointer' }}>
									<p className='userName noselect'>{firstLetterNameUser(user?.login)}</p>
								</Avatar>
							</Dropdown>
						</div>
					</Header>

					<Content style={{ margin: '16px' }}>
						<div
							style={{
								padding: 24,
								minHeight: 360,
								background: colorBgContainer
							}}
						>
							{children}
						</div>
					</Content>
					<Footer style={{ textAlign: 'center' }}>ДИТИ НИЯУ МИФИ ©2023 Сделано Мясниковым Денисом</Footer>
				</Layout>
			</Layout>
		</>
	)
}
