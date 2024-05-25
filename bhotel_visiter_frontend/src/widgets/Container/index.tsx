import './style.scss'

const Container = (props: { children: JSX.Element }) => {
	return <div className='container'>{props.children}</div>
}

export default Container
