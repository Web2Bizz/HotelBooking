import { CustomCheckbox } from '@widgets'
import { InputText } from 'primereact/inputtext'

type SocialLinkProps = {
	domain: string
	link: string
	name: string
	enabled: boolean
}

export const SocialLink = (props: SocialLinkProps) => {
	const { domain, link, name, enabled } = props

	return (
		<div className='card flex flex-column'>
			<CustomCheckbox value={enabled} label={name} />
			<div className='p-inputgroup flex-1 mt-2'>
				<span className='p-inputgroup-addon'>{domain}</span>
				<InputText placeholder='Website' value={link} />
			</div>
		</div>
	)
}
