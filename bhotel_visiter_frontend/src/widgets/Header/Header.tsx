import { trpc } from '@helpers'
import { Avatar, Button, Input } from 'antd'
import { ChangeEvent, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Container from '../Container'
import { AppContext } from './../../app/contexts'
import { UserContext } from './../../app/contexts/userContext'
import UserBlock from './UserBlock'
import './style.scss'
import UnlogginedBlock from './UnlogginedBlock'

export interface IFormHeaderSettings {
	display_logo: boolean
	display_label: boolean
	display_search: boolean
	display_booking: boolean
	display_details: boolean
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

	const [getHeaderSettings] = trpc.useQueries((t) => [
		t.getFrontendHeader('67342c88-fd1e-425b-99b1-3cdc427b914a')
	])

	const navigate = useNavigate()

	const [headerData, setHeaderData] = useState<IFormHeaderSettings>()

	const context = useContext(UserContext)

	useEffect(() => {
		setHeaderData(getHeaderSettings.data as IFormHeaderSettings)
	}, [getHeaderSettings.data])

	return (
		Array.isArray(hotelData) && (
			<div
				className='Header-wrapper'
				style={{ backgroundColor: headerData?.background_color }}
			>
				<Container>
					<div className='Header-container'>
						<div className='Header-logo' onClick={() => navigate('/')}>
							{headerData?.display_logo && (
								<Avatar
									shape='square'
									size={60}
									src={hotelData.hotel_logo}
								/>
							)}
							{headerData?.display_label && <p>{hotelData.hotel_name}</p>}
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
						{context.isLoggined ? (
							<UserBlock display_details={headerData?.display_details} />
						) : (
							<UnlogginedBlock />
						)}
					</div>
				</Container>
			</div>
		)
	)
}

export default Header
