import { useState, ChangeEvent, useEffect } from 'react'
import './style.scss'
import { Avatar, Input, Button } from 'antd'
import { trpc } from '@helpers'

interface IFormHeaderSettings {
	isDisplayLogo: boolean
	isDisplayName: boolean
	isDisplaySearch: boolean
	isDisplayBooking: boolean
	isDisplayProfileDetails: boolean
	backgroundColor: string
}

const Header = () => {
	const [searchValue, setSearchValue] = useState<string>('')
	const onBooking = () => {
		console.log('booking')
	}
	const onChangeSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value)
	}

	const [getHeaderSettings] = trpc.useQueries((t) => [
		t.consoleRoute.headerRouter.getSettings(
			'67342c88-fd1e-425b-99b1-3cdc427b914a'
		)
	])

	const [headerData, setHeaderData] = useState<IFormHeaderSettings>()

	useEffect(() => {
		setHeaderData(getHeaderSettings.data as IFormHeaderSettings)
	}, [getHeaderSettings.data])

	const data = trpc.publicRouter.siteDataRouter.getName.useQuery().data as []

	return (
		<div className='Header-wrapper' style={{ backgroundColor: headerData?.backgroundColor }}>
			<div className='Header-container'>
				<div className='Header-logo'>
					{headerData?.isDisplayLogo && (
						<Avatar shape='square' size={60} src={null} />
					)}
					{headerData?.isDisplayName && (
						<p>{Array.isArray(data) && data[0]?.hotel_name}</p>
					)}
				</div>
				{headerData?.isDisplaySearch && (
					<div className='Header-search'>
						<Input
							size='large'
							placeholder='Найти отель'
							style={{ width: 556 }}
							className='custom-search'
							onChange={onChangeSearchValue}
						/>
					</div>
				)}
				<div className='Header-booking_button'>
					{headerData?.isDisplayBooking && (
						<Button size='large' onClick={onBooking} type='primary'>
							Забронировать номер
						</Button>
					)}
				</div>
				<div className='Header-user_profile'>
					<div className='Header-user_profile__name'>
						{headerData?.isDisplayProfileDetails && (
							<>
								<p>Николай С.</p>
								<span>Гость</span>
							</>
						)}
					</div>
					<div>
						<Avatar shape='square' size={60} src={null} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Header
