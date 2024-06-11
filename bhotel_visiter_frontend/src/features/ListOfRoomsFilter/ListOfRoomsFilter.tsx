import { InputNumber, Radio, Slider, RadioChangeEvent, Checkbox } from 'antd'

type PriceFilterProps = {
	range: boolean
	min: number
	max: number
	defaultValue: [number, number]
	onAfterChange: (value: number[]) => void
}

type RoomTypeFilterProps = {
	options: { label: string; value: string }[]
	onChange: (e: RadioChangeEvent) => void
}

type GuestsFilterProps = {
	min: number
	max: number
	defaultValue: number
	onChange: (value: number | null) => void
}

type AmenitiesFilterProps = {
	options: { label: string; value: string }[]
	defaultValue?: string[]
	onChange: (checkedValues: string[]) => void
}

type FloorFilterProps = {
	options: { label: string; value: string }[]
	defaultValue?: string[]
	onChange: (checkedValues: string[]) => void
}

type FilterProps = {
	type: 'price' | 'roomType' | 'guests' | 'amenities' | 'floor'
} & (
	| PriceFilterProps
	| RoomTypeFilterProps
	| GuestsFilterProps
	| AmenitiesFilterProps
	| FloorFilterProps
)

const ListOfRoomsFilter: React.FC<FilterProps> = ({ type, ...props }) => {
	switch (type) {
		case 'price':
			const { range, ...sliderProps } = props as PriceFilterProps
			return <Slider range {...sliderProps} />
		case 'roomType':
			return <Radio.Group {...(props as RoomTypeFilterProps)} />
		case 'guests':
			return (
				<InputNumber
					{...(props as GuestsFilterProps)}
					style={{ width: '100%' }}
				/>
			)
		case 'amenities':
			const amenitiesProps = props as AmenitiesFilterProps
			return <Checkbox.Group {...amenitiesProps} />
		case 'floor':
			const floorProps = props as FloorFilterProps
			return <Checkbox.Group {...floorProps} />
		default:
			return null
	}
}

export default ListOfRoomsFilter
