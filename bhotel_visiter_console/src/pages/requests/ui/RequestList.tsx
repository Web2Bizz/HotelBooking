import { TRoom } from '@types'
import { Button } from 'primereact/button'
import { useEffect, useRef, useState } from 'react'
import { Socket } from 'socket.io-client'
import { RequestItem } from './RequestItem'

export const RequestList = () => {
	const socketIoRef = useRef<Socket>()
	const [rooms, setRooms] = useState<Array<TRoom>>([])
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)

	const fetchRooms = () => {
		setIsLoading(true)
		setError(null)

		fetch(`${import.meta.env.VITE_APP_SOCKET_DOMAIN}/rooms`, {
			method: 'GET'
		})
			.then((response) => response.json())
			.then((result) => {
				console.log(result)
				setRooms(result)
				setIsLoading(false)
			})
			.catch((error) => {
				setError('Ошибка: ' + error.message)
				setIsLoading(false)
			})
	}

	useEffect(() => {
		fetchRooms()

		if (socketIoRef.current === null) return
	}, [])

	if (isLoading) {
		return <div>Загрузка...</div>
	}

	if (error) {
		return <div>Ошибка: {error}</div>
	}

	return (
		<div className='request__list'>
			<Button label='Обновить' onClick={fetchRooms} />
			{rooms.map((item, index) => (
				<RequestItem
					date={new Date(Date.parse(item.date_of_creating))}
					{...item}
					key={index}
				/>
			))}
		</div>
	)
}
