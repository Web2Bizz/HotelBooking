import { useState, ChangeEvent, useEffect, useContext } from 'react'
import './style.scss'
import { Avatar, Input, Button } from 'antd'
import { trpc } from '@helpers'
import { useNavigate } from 'react-router-dom'
import { UserContext } from './../../app/contexts/userContext'
import { AppContext } from './../../app/contexts'

interface IFormHeaderSettings {
	display_logo: boolean
	display_name: boolean
	display_search: boolean
	display_booking: boolean
	isDisplayProfileDetails: boolean
	background_color: string
}

const Header = () => {
	const [searchValue, setSearchValue] = useState<string>('')
	const hotelData = useContext(AppContext)

	const onBooking = () => {
		console.log('booking')
	}
	const onChangeSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value)
	}

	const [getHeaderSettings] = trpc.useQueries((t) => [t.getFrontendHeader('67342c88-fd1e-425b-99b1-3cdc427b914a')])

	const navigate = useNavigate()

	const [headerData, setHeaderData] = useState<IFormHeaderSettings>()

	const context = useContext(UserContext)

	useEffect(() => {}, [])

	useEffect(() => {
		setHeaderData(getHeaderSettings.data as IFormHeaderSettings)
	}, [getHeaderSettings.data])

	return (
		Array.isArray(hotelData) && (
			<div className='Header-wrapper' style={{ backgroundColor: headerData?.background_color }}>
				<div className='Header-container'>
					<div className='Header-logo' onClick={() => navigate('/')}>
						{headerData?.display_logo && <Avatar shape='square' size={60} src={hotelData[0].hotel_logo} />}
						<p>{hotelData[0].hotel_name}</p>
					</div>
					{headerData?.display_search && (
						<div className='Header-search'>
							<Input
								size='large'
								placeholder='Найти номер'
								style={{ width: 556 }}
								className='custom-search'
								onChange={onChangeSearchValue}
							/>
						</div>
					)}
					<div className='Header-booking_button'>
						{headerData?.display_booking && (
							<Button size='large' onClick={onBooking} type='primary'>
								Забронировать
							</Button>
						)}
					</div>
					<div className='Header-user_profile' onClick={() => navigate('/profile')}>
						<div className='Header-user_profile__name'>
							{headerData?.isDisplayProfileDetails && (
								<>
									<p>
										{context.name} {context.surname[0]}.
									</p>
									<span>{context.role}</span>
								</>
							)}
						</div>
						<div>
							<Avatar shape='square' size={60} src={context.avatar} />
						</div>
					</div>
				</div>
			</div>
		)
	)
}

export default Header
