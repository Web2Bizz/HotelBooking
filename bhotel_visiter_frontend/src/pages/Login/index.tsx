import { Header } from '@widgets'
import LoginForm from './LoginForm'
import './style.scss'

const Login = () => {
	return (
		<>
			<Header />
			<div className='login-form'>
				<LoginForm />
			</div>
		</>
	)
}

export default Login
