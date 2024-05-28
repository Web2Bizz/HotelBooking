import { RoomPreview } from '@pages'
import { DefaultLayout } from '@ui'
import { RouteObject } from 'react-router-dom'

export const roomRouter: RouteObject[] = [
	{
		path: 'room',
		children: [
			{
				path: ':id',
				element: (
					<DefaultLayout>
						<div style={{ paddingTop: 10 }}>
							<RoomPreview />
						</div>
					</DefaultLayout>
				)
			}
		]
	}
]
