import { PlusOutlined } from '@ant-design/icons'
import { UserContext } from '@contexts'
import { trpc } from '@helpers'
import { Button, Form, Input, InputRef, notification } from 'antd'
import MaskedInput from 'antd-mask-input'
import { FormProps, useForm } from 'antd/es/form/Form'
import { useContext, useRef, useState } from 'react'
import Cards from 'react-credit-cards-2'

type CardForm = {
	card_number: string
	card_expire: string
	card_user: string
	card_cvc: string
}

export const CardForm = () => {
	const mutation = trpc.addPaymentMethod.useMutation()

	const [api, contextHolder] = notification.useNotification();

	const [numberCard, setNumberCard] = useState<string>('0')
	const [cvc, setCvc] = useState<string>('0')
	const [expiry, setExpiry] = useState<string>('')
	const [owner, setOwner] = useState<string>('')

	const context = useContext(UserContext)

	const openNotification = () => {
		api.info({
		  message: `Успех!`,
		  description:
			'Платёжные данные успешно добавлены!',
		  placement: 'topRight',
		});
	  };

	const onFinish: FormProps<CardForm>['onFinish'] = async (values) => {
		await mutation.mutateAsync({
			client_id: context.id_user,
			...values
		})

		if (mutation.isSuccess) {
			openNotification()
		}

		console.log(values)
	}

	const onFinishFailed: FormProps<CardForm>['onFinishFailed'] = (errorInfo) => {
		console.log('Failed:', errorInfo)
	}

	return (
		<div
			style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
		>
			<Cards
				number={Number.parseInt(numberCard) ?? 0}
				expiry={expiry}
				cvc={cvc}
				name={owner}
				focused={''}
			/>
			<Form
				layout={'vertical'}
				name='card'
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete='off'
				style={{ marginTop: 20, width: '100%' }}
			>
				<Form.Item<CardForm>
					label='номер карты'
					name='card_number'
					rules={[{ required: true, message: 'Введите номер карты' }]}
				>
					<MaskedInput
						style={{ height: 50, textAlign: 'center' }}
						onChange={(e) => setNumberCard(e.target.value)}
						mask={'0000 0000 0000 0000'}
					/>
				</Form.Item>
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<Form.Item<CardForm>
						label='Владелец карты'
						name='card_user'
						rules={[{ required: true, message: 'Введите владельца карты' }]}
					>
						<Input
							placeholder='Имя Фамилия'
							onChange={(e) => setOwner(e.target.value)}
							style={{
								width: 'calc(290px)',
								height: 50,
								textTransform: 'uppercase'
							}}
						/>
					</Form.Item>
					<Form.Item<CardForm>
						rules={[{ required: true, message: 'Введите дату' }]}
						name='card_expire'
						label='дата'
					>
						<MaskedInput
							style={{
								height: 50,
								textAlign: 'center',
								width: '100px'
							}}
							mask={'00/00'}
							onChange={(e) => setExpiry(e.target.value)}
						/>
					</Form.Item>
				</div>
				<Form.Item<CardForm>
					rules={[{ required: true, message: 'Введите дату' }]}
					name='card_cvc'
					label='cvc'
				>
					<MaskedInput
						style={{ height: 50, textAlign: 'center', marginTop: 10 }}
						onChange={(e) => setCvc(e.target.value)}
						mask={'000'}
					/>
				</Form.Item>
				<Form.Item>
					<Button
						type='primary'
						htmlType='submit'
						icon={<PlusOutlined />}
						style={{ height: 50, width: '100%', marginTop: 10 }}
					>
						Добавить способ оплаты
					</Button>
				</Form.Item>
			</Form>
		</div>
	)
}
