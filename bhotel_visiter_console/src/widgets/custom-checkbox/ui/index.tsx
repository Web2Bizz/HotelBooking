import { InputSwitch, InputSwitchChangeEvent } from 'primereact/inputswitch'
import { useEffect, useState } from 'react'

type CustomCheckboxProps = {
	label: string
	value?: boolean
	onChange?: (e: InputSwitchChangeEvent) => void
}

export const CustomCheckbox = (props: CustomCheckboxProps) => {
	const { label, value, onChange } = props
	const [isEnabled, setIsEnabled] = useState<boolean>(false)

	useEffect(() => {
		console.log(value)

		setIsEnabled(value ?? false)
	}, [value])

	return (
		<div className='flex row my-2'>
			<InputSwitch
				onChange={(e) => {
					onChange?.(e)
					setIsEnabled(e.value)
				}}
				className='mr-3'
				checked={isEnabled}
			/>
			{label}
		</div>
	)
}
