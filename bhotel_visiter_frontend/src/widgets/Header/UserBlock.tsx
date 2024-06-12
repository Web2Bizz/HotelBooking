import { UserOutlined } from "@ant-design/icons"
import { Avatar } from "antd"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "@contexts"

const UserBlock = (props: { display_details: boolean }) => {

    const { display_details } = props

    const navigate = useNavigate()
    const context = useContext(UserContext)
    
	return display_details !== undefined && (
		<div className='Header-user_profile' onClick={() => navigate('/profile')}>
			<div className='Header-user_profile__name'>
				{display_details && (
					<>
						<p>
							{context.name} {context.surname?.substring(0, 1)}.
						</p>
						<span>{context.role}</span>
					</>
				)}
			</div>
			<div>
				<Avatar shape='square' size={60} icon={<UserOutlined />} />
			</div>
		</div>
	)
}

export default UserBlock
