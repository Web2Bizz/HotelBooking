import { RoomPreview } from '@pages'
import { RouteObject } from 'react-router-dom'

export const roomRouter: RouteObject[] = [
	{
		path: 'room',
		children: [
			{
				path: ':id',
				element: <RoomPreview />
			}
		]
	}
]
