import { PlusOutlined } from '@ant-design/icons'
import { Button, Input } from 'antd'
import MaskedInput from 'antd-mask-input'
import Cards from 'react-credit-cards-2'

export const CardForm = () => {
	return (
		<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
			<Cards number={54696900} expiry={''} cvc={''} name={''} focused={''} />
			<form style={{ marginTop: 20, width: '70%' }}>
				<MaskedInput style={{ height: 50, textAlign: 'center' }} mask={'0000 0000 0000 0000'} />
				<div style={{ display: 'flex', gap: 10 }}>
					<Input placeholder='Имя Фамилия' style={{ height: 50, marginTop: 10 }} />
					<MaskedInput style={{ height: 50, marginTop: 10, textAlign: 'center', width: '100px' }} mask={'00 / 00'} />
				</div>
				<MaskedInput style={{ height: 50, textAlign: 'center', marginTop: 10 }} mask={'000'} />
				<Button type='primary' icon={<PlusOutlined />} style={{ height: 50, width: '100%', marginTop: 10 }}>
					Добавить способ оплаты
				</Button>
			</form>
		</div>
	)
}
