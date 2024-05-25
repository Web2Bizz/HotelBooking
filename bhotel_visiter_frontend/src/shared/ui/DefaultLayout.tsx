import { Footer, Header } from '@widgets'
import './style.scss'

export const DefaultLayout = (props: { children: JSX.Element }) => {
	return (
		<>
			<Header />
			<div className='content'>{props.children}</div>
			<Footer />
		</>
	)
}
