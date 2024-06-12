import { Button } from "antd"
import './style.scss'
import { useNavigate } from "react-router-dom"

const UnlogginedBlock = () => {

    const navigate = useNavigate()
    
	return (
		<div className="unloggined-block">
			<Button size='large' onClick={() => navigate('/registration')}>Регистрация</Button>
			<Button size='large' onClick={() => navigate('/login')}>Войти</Button>
		</div>
	)
}

export default UnlogginedBlock
