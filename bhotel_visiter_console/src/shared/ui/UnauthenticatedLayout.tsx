import { UserContext } from './../../app/contexts'
import { ReactNode, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const UnauthenticatedLayout = (props: { children: ReactNode }) => {
	const { children } = props

	const context = useContext(UserContext)
	const navigate = useNavigate()

	useEffect(() => {
		console.log(context);
		
		if (context.id_user !== '') {
			navigate('/')
		}
		
	}, [context, navigate])

	return children
}
