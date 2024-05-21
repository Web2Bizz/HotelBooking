import { ServiceCard, ServiceCommentCard } from '../../../features'
import './style.scss'

const ServiceSection = () => {
	return (
		<div className='ServiceSection-container'>
			<div className='ServiceSection-row'>
				<ServiceCard />
				<ServiceCard />
				<div className='ServiceSection-firstRow__text'>
					<h1>Название сервиса - это</h1>
					<ServiceCommentCard />
				</div>
				<ServiceCard />
			</div>
			<div className='ServiceSection-row'>
				<div className='ServiceSection-secondRow__text'>
					<ServiceCommentCard />
				</div>
				<ServiceCard />
				<ServiceCard />
				<div className='ServiceSection-secondRow__text'>
					<p>Название сервиса</p>
				</div>
			</div>
		</div>
	)
}

export default ServiceSection
